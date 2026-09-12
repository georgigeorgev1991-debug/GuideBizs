import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.join(__dirname, "..", "audit-frames");
fs.mkdirSync(outDir, { recursive: true });
const userData = path.join(outDir, ".chrome-profile");
fs.mkdirSync(userData, { recursive: true });

function waitPort(port) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tryOnce = () => {
      const req = http.get(
        { host: "127.0.0.1", port, path: "/json/version", timeout: 800 },
        (res) => {
          let body = "";
          res.on("data", (c) => (body += c));
          res.on("end", () => resolve(JSON.parse(body)));
        },
      );
      req.on("error", () => {
        if (Date.now() - start > 20000) reject(new Error("cdp timeout"));
        else setTimeout(tryOnce, 200);
      });
    };
    tryOnce();
  });
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(String(ev.data));
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  await send("Page.enable");
  await send("Runtime.enable");
  return { send, close: () => ws.close() };
}

async function waitReady(send) {
  await send("Runtime.evaluate", {
    expression:
      "new Promise((r) => { if (document.readyState === 'complete') r(true); else window.addEventListener('load', () => r(true), { once: true }); })",
    awaitPromise: true,
  });
  await new Promise((r) => setTimeout(r, 300));
}

async function main() {
  const port = 9224;
  const child = spawn(
    chrome,
    [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userData}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--disable-extensions",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  await waitPort(port);
  const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
  const page = list.find((t) => t.type === "page") || list[0];
  const session = await connect(page.webSocketDebuggerUrl);

  async function open(url, width, height) {
    await session.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 800,
    });
    await session.send("Page.navigate", { url });
    await waitReady(session.send);
  }

  async function shot(file) {
    const img = await session.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(outDir, file), Buffer.from(img.data, "base64"));
  }

  const measures = {};
  for (const [w, h] of [
    [390, 844],
    [768, 1024],
    [1440, 900],
  ]) {
    await open("http://localhost:3002/reizen/vier-dagen-overtocht", w, h);
    const evaled = await session.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('#garantie');
        const strip = el?.previousElementSibling;
        const r = el.getBoundingClientRect();
        const s = strip?.getBoundingClientRect();
        const vh = window.innerHeight;
        return {
          vw: window.innerWidth,
          vh,
          garantieTop: Math.round(r.top),
          garantieBottom: Math.round(r.bottom),
          garantieHeight: Math.round(r.height),
          stripBottom: s ? Math.round(s.bottom) : null,
          firstThird: Math.round(vh / 3),
          inFirstThird: r.bottom <= vh / 3 + 8,
          inFold: r.bottom <= vh,
        };
      })()`,
      returnByValue: true,
    });
    measures[w] = evaled.result.value;
  }
  fs.writeFileSync(path.join(outDir, "garantie.json"), JSON.stringify(measures, null, 2));

  await open("http://localhost:3002/prive-reizen", 1440, 900);
  await shot("prive-1440.png");
  const blaze1440 = await session.send("Runtime.evaluate", {
    expression: `(() => {
      const vh = window.innerHeight;
      const nodes = [...document.querySelectorAll('*')];
      const blaze = nodes.filter((n) => {
        const c = getComputedStyle(n).backgroundColor;
        return c === 'rgb(184, 74, 61)' || c === 'color(srgb 0.721569 0.290196 0.239216)';
      }).filter((n) => {
        const r = n.getBoundingClientRect();
        return r.width > 0 && r.top < vh && r.bottom > 0;
      });
      return blaze.map((n) => n.tagName + '.' + n.className + ' ' + n.textContent.trim().slice(0,40));
    })()`,
    returnByValue: true,
  });
  fs.writeFileSync(
    path.join(outDir, "blaze-prive.json"),
    JSON.stringify(blaze1440.result.value, null, 2),
  );

  await open("http://localhost:3002/prive-reizen", 390, 844);
  await shot("prive-390.png");

  await open("http://localhost:3002/prive-reizen#aanvraag", 1440, 900);
  await new Promise((r) => setTimeout(r, 2200));
  await session.send("Runtime.evaluate", {
    expression: `document.querySelector('form button[type=submit], form button')?.click()`,
  });
  await new Promise((r) => setTimeout(r, 1800));
  await session.send("Runtime.evaluate", {
    expression: `document.querySelector('#aanvraag')?.scrollIntoView()`,
  });
  await new Promise((r) => setTimeout(r, 200));
  await shot("prive-form-error.png");

  await open("http://localhost:3002/", 1440, 900);
  await session.send("Runtime.evaluate", {
    expression: `window.scrollTo(0, Math.round(document.body.scrollHeight * 0.35))`,
  });
  await new Promise((r) => setTimeout(r, 400));
  await shot("elevation-rail-1440.png");

  await open("http://localhost:3002/reizen/vier-dagen-overtocht", 1440, 900);
  const etappesY = await session.send("Runtime.evaluate", {
    expression: `Math.round(document.querySelector('#etappes').getBoundingClientRect().top + window.scrollY)`,
    returnByValue: true,
  });
  const y = etappesY.result.value;
  await session.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y - 80})` });
  await new Promise((r) => setTimeout(r, 400));
  await shot("itinerary-1440-top.png");
  await session.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y + 500})` });
  await new Promise((r) => setTimeout(r, 400));
  await shot("itinerary-1440-mid.png");
  await session.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y + 1100})` });
  await new Promise((r) => setTimeout(r, 400));
  await shot("itinerary-1440-late.png");

  await open("http://localhost:3002/reizen/vier-dagen-overtocht", 390, 844);
  await session.send("Runtime.evaluate", {
    expression: `document.querySelector('#etappes')?.scrollIntoView()`,
  });
  await new Promise((r) => setTimeout(r, 400));
  await shot("itinerary-390.png");

  session.close();
  child.kill();
  console.log(JSON.stringify(measures, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
