"use client";

import FinanceDesktopFlow from "@/components/Home/finance-flow/FinanceDesktopFlow";
import FinanceMobileTimeline from "@/components/Home/finance-flow/FinanceMobileTimeline";
import { useFinanceFlowContent } from "@/components/Home/finance-flow/useFinanceFlowContent";
import { useI18n } from "@/locales/i18n";

export default function FinanceFlow() {
  const { t, dir } = useI18n();
  const content = useFinanceFlowContent(t);

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-background py-24 text-foreground"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 12%, hsl(var(--primary) / 0.12), transparent 34%), radial-gradient(circle at 88% 22%, hsl(var(--accent) / 0.22), transparent 30%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1300px] px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            {content.heading.badge}
          </span>

          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.heading.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {content.heading.subtitle}
          </p>
        </div>

        <FinanceDesktopFlow app={content.app} steps={content.desktop} />
        <FinanceMobileTimeline steps={content.mobileSteps} />
      </div>
    </section>
  );
}
