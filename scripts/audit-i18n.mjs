const origin = process.argv[2] || "http://localhost:3000";
const xml = await (await fetch(origin + "/sitemap.xml")).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const path = new URL(m[1]).pathname;
  return path === "" ? "/" : path;
});
const enExpected = [
  "/",
  "/about",
  "/practical",
  "/private-trips",
  "/trips",
  "/trips/four-day-crossing",
  "/stories",
  "/contact",
  "/terms",
  "/privacy",
  "/stories/hiking-in-bulgaria",
  "/stories/versus-the-alps",
  "/stories/is-bulgaria-safe",
  "/stories/mountain-huts-in-bulgaria",
  "/stories/from-amsterdam-to-the-mountains",
  "/stories/multi-day-walking-routes",
];
const en = [...new Set(urls.filter((u) => !u.startsWith("/nl")))].sort();
const missing = enExpected.filter((u) => !en.includes(u));
const extra = en.filter((u) => !enExpected.includes(u));
console.log("EN sitemap paths:\n" + en.join("\n"));
console.log("missing vs expected:", missing.length ? missing : "none");
console.log("extra:", extra.length ? extra : "none");
console.log("NL paths:\n" + urls.filter((u) => u.startsWith("/nl")).sort().join("\n"));

const routes = [
  "/",
  "/trips",
  "/trips/four-day-crossing",
  "/private-trips",
  "/about",
  "/practical",
  "/stories",
  "/stories/hiking-in-bulgaria",
  "/contact",
  "/terms",
  "/privacy",
  "/nl",
  "/nl/reizen",
  "/nl/reizen/vier-dagen-overtocht",
  "/nl/prive-reizen",
  "/nl/over-ons",
  "/nl/praktisch",
  "/nl/verhalen",
  "/nl/verhalen/wandelen-in-bulgarije",
  "/nl/contact",
  "/nl/algemene-voorwaarden",
  "/nl/privacy",
];
console.log("\nHREFLANG AUDIT");
for (const route of routes) {
  const res = await fetch(origin + route, { redirect: "manual" });
  const loc = res.headers.get("location");
  if (res.status >= 300 && res.status < 400) {
    console.log(route, "REDIRECT", res.status, loc);
    continue;
  }
  const html = await res.text();
  const lang = html.match(/<html[^>]*lang="([^"]+)"/);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  const alts = [...html.matchAll(/hrefLang="([^"]+)" href="([^"]+)"/g)].map(
    (row) => `${row[1]} → ${row[2]}`,
  );
  const needed = ["nl-NL", "nl-BE", "en", "x-default"];
  const have = new Set([...html.matchAll(/hrefLang="([^"]+)"/g)].map((m) => m[1]));
  const miss = needed.filter((k) => !have.has(k));
  console.log(
    route,
    "status=" + res.status,
    "htmlLang=" + (lang?.[1] || "?"),
    "canon=" + (canonical?.[1] || "?"),
    miss.length ? "MISSING " + miss.join(",") : "alts ok",
  );
  for (const alt of alts) {
    console.log("   ", alt);
  }
}

console.log("\nLANGUAGE SWITCHER");
const pairs = [
  ["/", "/nl"],
  ["/trips", "/nl/reizen"],
  ["/trips/four-day-crossing", "/nl/reizen/vier-dagen-overtocht"],
  ["/private-trips", "/nl/prive-reizen"],
  ["/about", "/nl/over-ons"],
  ["/practical", "/nl/praktisch"],
  ["/stories", "/nl/verhalen"],
  ["/stories/hiking-in-bulgaria", "/nl/verhalen/wandelen-in-bulgarije"],
  ["/contact", "/nl/contact"],
  ["/terms", "/nl/algemene-voorwaarden"],
  ["/privacy", "/nl/privacy"],
];
for (const [enPath, nlPath] of pairs) {
  const enHtml = await (await fetch(origin + enPath)).text();
  const nlHtml = await (await fetch(origin + nlPath)).text();
  const enSwitch = enHtml.match(/lang="nl"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*lang="nl"/i);
  const nlSwitch = nlHtml.match(/lang="en"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*lang="en"/i);
  const fromEn = (enSwitch?.[1] || enSwitch?.[2] || "").replace(origin, "");
  const fromNl = (nlSwitch?.[1] || nlSwitch?.[2] || "").replace(origin, "");
  const enOk = fromEn.endsWith(nlPath) || fromEn === nlPath;
  const nlOk =
    fromNl.endsWith(enPath) ||
    fromNl === enPath ||
    (enPath === "/" && (fromNl === "/" || fromNl.endsWith("/")));
  console.log(enPath, "→", fromEn || "MISSING", enOk ? "ok" : "FAIL expected " + nlPath);
  console.log(nlPath, "→", fromNl || "MISSING", nlOk ? "ok" : "FAIL expected " + enPath);
}
