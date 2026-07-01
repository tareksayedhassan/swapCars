"use client";

import { forwardRef } from "react";

type FinanceAppHubProps = {
  title: string;
  description: string;
};

const FinanceAppHub = forwardRef<HTMLDivElement, FinanceAppHubProps>(
  function FinanceAppHub({ title, description }, ref) {
    return (
      <div
        ref={ref}
        className="relative z-10 flex h-[250px] w-[210px] flex-col items-center justify-center rounded-[2rem] border border-border bg-background p-5 text-center shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
      >
        <div className="absolute inset-3 rounded-[1.5rem] border border-border/70" />

        <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-2xl font-black text-primary-foreground shadow-lg">
          S
        </div>

        <h3 className="relative text-xl font-black text-foreground">{title}</h3>

        <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="relative mt-5 h-2 w-20 rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-primary" />
        </div>
      </div>
    );
  },
);

FinanceAppHub.displayName = "FinanceAppHub";

export default FinanceAppHub;
