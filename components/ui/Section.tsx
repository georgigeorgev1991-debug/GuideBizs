import type { ReactNode } from "react";

type Tone = "granite" | "pine" | "snowfield";

const tones: Record<Tone, string> = {
  granite: "bg-granite text-snowfield",
  pine: "bg-pine text-snowfield",
  snowfield: "bg-snowfield text-ink",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  tone = "granite",
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tones[tone]} px-6 py-16 md:px-12 md:py-24 lg:px-16 ${className}`.trim()}
    >
      {children}
    </section>
  );
}
