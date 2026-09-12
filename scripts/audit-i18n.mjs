const origin = process.argv[2] || "http://localhost:3000";
const xml = await (await fetch(origin + "/sitemap.xml")).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const path = new URL(m[1]).pathname;
  return path === "" ? "/" : path;
});
const dutchExpected = [
  "/",
  "/over-ons",
  "/praktisch",
  "/prive-reizen",
  "/reizen",
  "/reizen/vier-dagen-overtocht",
  "/verhalen",
  "/contact",
  "/algemene-voorwaarden",
  "/privacy",
  "/verhalen/wandelen-in-bulgarije",
  "/verhalen/versus-de-alpen",
  "/verhalen/is-bulgarije-veilig",
  "/verhalen/berghutten-in-bulgarije",
  "/verhalen/van-amsterdam-naar-de-bergen",
  "/verhalen/meerdaagse-wandelroutes",
];
const dutch = [...new Set(urls.filter((u) => !u.startsWith("/en")))].sort();
const missing = dutchExpected.filter((u) => !dutch.includes(u));
const extra = dutch.filter((u) => !dutchExpected.includes(u));
console.log("DUTCH sitemap paths:\n" + dutch.join("\n"));
console.log("missing vs previous:", missing.length ? missing : "none");
console.log("extra:", extra.length ? extra : "none");
console.log("EN paths:\n" + urls.filter((u) => u.startsWith("/en")).sort().join("\n"));

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
  ["/", "/en"],
  ["/reizen", "/en/trips"],
  ["/reizen/vier-dagen-overtocht", "/en/trips/four-day-crossing"],
  ["/prive-reizen", "/en/private-trips"],
  ["/over-ons", "/en/about"],
  ["/praktisch", "/en/practical"],
  ["/verhalen", "/en/stories"],
  ["/verhalen/wandelen-in-bulgarije", "/en/stories/hiking-in-bulgaria"],
  ["/contact", "/en/contact"],
  ["/algemene-voorwaarden", "/en/terms"],
  ["/privacy", "/en/privacy"],
];
for (const [nl, en] of pairs) {
  const nlHtml = await (await fetch(origin + nl)).text();
  const enHtml = await (await fetch(origin + en)).text();
  const nlSwitch = nlHtml.match(/lang="en"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*lang="en"/i);
  const enSwitch = enHtml.match(/lang="nl"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*lang="nl"/i);
  const fromNl = (nlSwitch?.[1] || nlSwitch?.[2] || "").replace(origin, "");
  const fromEn = (enSwitch?.[1] || enSwitch?.[2] || "").replace(origin, "");
  const nlOk = fromNl.endsWith(en) || fromNl === en;
  const enOk = fromEn.endsWith(nl) || fromEn === nl || (nl === "/" && (fromEn === "/" || fromEn.endsWith("/")));
  console.log(nl, "→", fromNl || "MISSING", nlOk ? "ok" : "FAIL expected " + en);
  console.log(en, "→", fromEn || "MISSING", enOk ? "ok" : "FAIL expected " + nl);
}

