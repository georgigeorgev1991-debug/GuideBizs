import type { ReactNode } from "react";

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[var(--measure)] space-y-4 text-base font-normal ${className}`.trim()}
    >
      {children}
    </div>
  );
}
