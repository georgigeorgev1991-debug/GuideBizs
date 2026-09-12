import { Link } from "@/i18n/navigation";
import type { AppHref } from "@/lib/href";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "bg-blaze text-snowfield hover:bg-blaze/90",
  secondary: "border border-snowfield text-snowfield hover:bg-snowfield/10",
};

const base =
  "inline-flex h-11 min-h-11 min-w-11 items-center justify-center px-5 text-sm font-semibold";

type ButtonAsButton = {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  href: string | AppHref;
  prefetch?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & (ButtonAsButton | ButtonAsLink);

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, prefetch, ...rest } = props;
    if (typeof href === "object" || (typeof href === "string" && href.startsWith("/"))) {
      return (
        <Link href={href as AppHref} prefetch={prefetch} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="submit"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
