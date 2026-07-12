import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  label: string;
  description?: string;
}

export function Steps({
  steps,
  current,
  className,
}: {
  steps: StepItem[];
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex w-full flex-col gap-4 md:flex-row md:items-start", className)}>
      {steps.map((step, i) => {
        const status = i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <li key={i} className="flex flex-1 items-start gap-3 md:flex-col md:items-center md:text-center">
            <div className="flex items-center gap-3 md:w-full md:flex-col">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  status === "complete" && "border-accent bg-accent text-accent-foreground",
                  status === "current" && "border-primary bg-primary text-primary-foreground",
                  status === "upcoming" && "border-border bg-background text-muted-foreground"
                )}
              >
                {status === "complete" ? <Check className="size-4" /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "hidden h-px flex-1 md:block",
                    status === "complete" ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
            <div className="md:mt-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 hidden text-xs text-muted-foreground md:block">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
