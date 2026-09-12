import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

import { STORY_IDS } from "@/content/shared/stories";
import type { AppLocale, StoryId, StoryMeta } from "@/lib/types";
import { site } from "@/lib/site";

function storiesDir(locale: AppLocale) {
  return path.join(process.cwd(), "content", locale, "stories");
}

function fill(value: string) {
  return value
    .replaceAll("{{range}}", site.range)
    .replaceAll("{site.range}", site.range)
    .replaceAll("{site.brand}", site.brand);
}

function prepare(raw: string) {
  return fill(raw.replace(/^import .*$/gm, ""));
}

async function readAll(locale: AppLocale): Promise<{ meta: StoryMeta; body: string }[]> {
  const dir = storiesDir(locale);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".mdx"));
  const stories = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const published = data.publishedAt;
      const publishedAt =
        published instanceof Date
          ? published.toISOString().slice(0, 10)
          : String(published);
      const id = String(data.id) as StoryId;
      if (!STORY_IDS.includes(id)) {
        throw new Error(`Unknown story id “${id}” in ${file}`);
      }
      const meta: StoryMeta = {
        id,
        slug: String(data.slug),
        titel: fill(String(data.titel)),
        description: fill(String(data.description)),
        publishedAt,
      };
      return { meta, body: prepare(content) };
    }),
  );

  return stories.sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export async function listStories(locale: AppLocale): Promise<StoryMeta[]> {
  return (await readAll(locale)).map((story) => story.meta);
}

export async function getStory(
  locale: AppLocale,
  slug: string,
): Promise<{
  meta: StoryMeta;
  content: ReactNode;
  previous: StoryMeta | null;
  next: StoryMeta | null;
} | null> {
  const stories = await readAll(locale);
  const index = stories.findIndex((story) => story.meta.slug === slug);
  if (index < 0) {
    return null;
  }

  const { content } = await compileMDX({
    source: stories[index].body,
    components: {
      h1: (props) => (
        <h1
          className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl"
          {...props}
        />
      ),
      p: (props) => <p className="mt-6 max-w-[var(--measure)] text-base" {...props} />,
    },
  });

  const chronological = [...stories].sort((a, b) =>
    a.meta.publishedAt.localeCompare(b.meta.publishedAt),
  );
  const chronoIndex = chronological.findIndex((story) => story.meta.slug === slug);

  return {
    meta: stories[index].meta,
    content,
    previous: chronological[chronoIndex - 1]?.meta ?? null,
    next: chronological[chronoIndex + 1]?.meta ?? null,
  };
}
