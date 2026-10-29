export const EN_PLACEHOLDER_TOKEN = "⟦EN⟧";

const SKIP = new Set([
  "path",
  "slug",
  "src",
  "gpxUrl",
  "startDate",
  "endDate",
  "publishedAt",
  "status",
  "sleeps",
  "difficulty",
  "id",
  "portraitKey",
  "heroImageKey",
  "galleryKeys",
  "imageKeys",
  "name",
  "firstName",
  "toNl",
]);

export function enCopy<T>(value: T, key = ""): T {
  if (Array.isArray(value)) {
    return value.map((entry) => enCopy(entry, key)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([nextKey, nested]) => [
        nextKey,
        enCopy(nested, nextKey),
      ]),
    ) as T;
  }

  // Sprint 1: keep existing EN strings as-is so `npm run build` can pass.
  // Sprint 4 may reintroduce marking until final copy lands.
  return value;
}
