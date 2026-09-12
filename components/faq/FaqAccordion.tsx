import type { FaqGroup } from "@/lib/types";

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.title} aria-labelledby={`faq-${group.title}`}>
          <h2 id={`faq-${group.title}`} className="font-display text-2xl">
            {group.title}
          </h2>
          <div className="mt-6 divide-y divide-glacier/25 border-y border-glacier/25">
            {group.items.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer py-2 text-base font-semibold outline-none">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-[var(--measure)] text-base font-normal">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
