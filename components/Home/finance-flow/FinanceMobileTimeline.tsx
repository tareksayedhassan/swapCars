"use client";

import FinanceStepCard from "./FinanceStepCard";
import type { FinanceFlowStep } from "./types";

type FinanceMobileTimelineProps = {
  steps: FinanceFlowStep[];
};

export default function FinanceMobileTimeline({
  steps,
}: FinanceMobileTimelineProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 md:hidden">
      {steps.map((item) => (
        <FinanceStepCard
          key={`${item.step}-${item.label}`}
          {...item}
          tone={item.tone ?? "default"}
          className="max-w-full"
        />
      ))}
    </div>
  );
}
