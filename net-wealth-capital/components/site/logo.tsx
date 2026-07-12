import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
  withText = true,
}: {
  className?: string;
  variant?: "default" | "light";
  withText?: boolean;
}) {
  const light = variant === "light";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="NWealth Capital home"
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-lg shadow-sm",
          light ? "bg-white/10 ring-1 ring-white/20" : "bg-primary"
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
          <path
            d="M4 18V9l5 4 6-8 5 6"
            stroke={light ? "white" : "var(--gold)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="5" r="1.6" fill={light ? "white" : "var(--gold)"} />
        </svg>
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-lg font-semibold tracking-tight",
              light ? "text-white" : "text-foreground"
            )}
          >
            NWealth
          </span>
          <span
            className={cn(
              "text-[0.6rem] font-medium uppercase tracking-[0.28em]",
              light ? "text-white/70" : "text-muted-foreground"
            )}
          >
            Capital
          </span>
        </span>
      )}
    </Link>
  );
}
