"use client";

import React, { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import type { FinanceFlowStep, FinanceFlowTone } from "./types";

type FinanceStepCardProps = FinanceFlowStep & {
  className?: string;
};

const toneClasses: Record<FinanceFlowTone, string> = {
  default: "border-border bg-card/90",
  cash: "border-primary/25 bg-card/95",
  finance: "border-primary/20 bg-card/95",
  final: "border-primary/30 bg-primary/5",
};

const FinanceStepCard = memo(
  forwardRef<HTMLDivElement, FinanceStepCardProps>(function FinanceStepCard(
    { step, label, title, description, tone = "default", className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative z-10 w-full max-w-[280px] rounded-3xl border p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.14)]",
          toneClasses[tone],
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {label}
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-sm font-black text-foreground transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110">
            {step}
          </span>
        </div>

        <h3 className="text-lg font-black tracking-tight text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    );
  }),
);

FinanceStepCard.displayName = "FinanceStepCard";

export default FinanceStepCard;
