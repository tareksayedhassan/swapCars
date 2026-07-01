"use client";

import { useMemo, useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import FinanceAppHub from "./FinanceAppHub";
import FinanceStepCard from "./FinanceStepCard";
import type { FinanceFlowStep } from "./types";

type FinanceDesktopFlowProps = {
  app: {
    title: string;
    description: string;
  };
  steps: {
    choose: FinanceFlowStep;
    cashStart: FinanceFlowStep;
    cashDone: FinanceFlowStep;
    financeStart: FinanceFlowStep;
    financeDone: FinanceFlowStep;
    drive: FinanceFlowStep;
  };
};

const beamStyle = {
  pathWidth: 2,
  pathOpacity: 0.18,
  pathColor: "hsl(var(--border))",
  gradientStartColor: "hsl(var(--primary))",
  gradientStopColor: "hsl(var(--accent))",
};

export default function FinanceDesktopFlow({
  app,
  steps,
}: FinanceDesktopFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chooseRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const cashStartRef = useRef<HTMLDivElement>(null);
  const cashDoneRef = useRef<HTMLDivElement>(null);
  const financeStartRef = useRef<HTMLDivElement>(null);
  const financeDoneRef = useRef<HTMLDivElement>(null);
  const driveRef = useRef<HTMLDivElement>(null);

  const beams = useMemo(
    () => [
      { fromRef: chooseRef, toRef: appRef, duration: 3, pathOpacity: 0.2 },
      {
        fromRef: appRef,
        toRef: cashStartRef,
        curvature: -90,
        duration: 4,
        delay: 0.4,
      },
      {
        fromRef: cashStartRef,
        toRef: cashDoneRef,
        duration: 3.5,
        delay: 0.8,
      },
      {
        fromRef: cashDoneRef,
        toRef: driveRef,
        curvature: 90,
        duration: 4,
        delay: 1.2,
      },
      {
        fromRef: appRef,
        toRef: financeStartRef,
        curvature: 90,
        duration: 4,
        delay: 0.5,
      },
      {
        fromRef: financeStartRef,
        toRef: financeDoneRef,
        duration: 3.5,
        delay: 0.9,
      },
      {
        fromRef: financeDoneRef,
        toRef: driveRef,
        curvature: -90,
        duration: 4,
        delay: 1.3,
      },
    ],
    [],
  );

  return (
    <div
      ref={containerRef}
      className="relative hidden min-h-[640px] grid-cols-[1fr_260px_1fr] gap-10 md:grid"
    >
      <div className="flex flex-col items-center justify-center gap-8 pt-24">
        <FinanceStepCard ref={cashStartRef} {...steps.cashStart} />
        <FinanceStepCard ref={cashDoneRef} {...steps.cashDone} />
      </div>

      <div className="flex flex-col items-center justify-between">
        <FinanceStepCard
          ref={chooseRef}
          {...steps.choose}
          className="max-w-[260px]"
        />

        <FinanceAppHub ref={appRef} {...app} />

        <FinanceStepCard
          ref={driveRef}
          {...steps.drive}
          className="max-w-[260px]"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 pt-24">
        <FinanceStepCard ref={financeStartRef} {...steps.financeStart} />
        <FinanceStepCard ref={financeDoneRef} {...steps.financeDone} />
      </div>

      {beams.map((beam, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          {...beamStyle}
          {...beam}
        />
      ))}
    </div>
  );
}
