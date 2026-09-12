import puppeteer from "puppeteer-core";

const origin = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const routes = [
  "/",
  "/reizen",
  "/reizen/vier-dagen-overtocht",
  "/prive-reizen",
  "/over-ons",
  "/praktisch",
  "/verhalen",
  "/verhalen/wandelen-in-bulgarije",
  "/contact",
  "/algemene-voorwaarden",
  "/privacy",
  "/en",
  "/en/trips",
  "/en/trips/four-day-crossing",
  "/en/private-trips",
  "/en/about",
  "/en/practical",
  "/en/stories",
  "/en/stories/hiking-in-bulgaria",
  "/en/contact",
  "/en/terms",
  "/en/privacy",
];

const executablePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-first-run", "--disable-gpu"],
});

const failures = [];

try {
  for (const route of routes) {
    const page = await browser.newPage();
    const logs = [];
    page.on("pageerror", (error) => {
      logs.push({ type: "exception", text: error.stack || String(error) });
    });
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        logs.push({ type: "console.error", text: msg.text() });
      }
      if (msg.type() === "warning") {
        logs.push({ type: "console.warn", text: msg.text() });
      }
    });
    await page.goto(`${origin}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    const body = await page.evaluate(() => document.body?.innerText ?? "");
    const fatal = /Application error: a client-side exception/i.test(body);
    const real = logs.filter(
      (row) =>
        !/Failed to load resource/i.test(row.text) &&
        !/net::ERR_/i.test(row.text) &&
        !/third-party cookie/i.test(row.text),
    );
    if (fatal || real.length) {
      failures.push({ route, fatal, logs: real });
      console.log(`FAIL ${route}${fatal ? " (fatal overlay)" : ""}`);
      for (const row of real) {
        console.log(
          `  ${row.type}: ${row.text.split("\n").slice(0, 8).join("\n  ")}`,
        );
      }
    } else {
      console.log(`ok   ${route}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`check:runtime failed (${failures.length} routes)`);
  process.exit(1);
}

console.log("check:runtime ok");
