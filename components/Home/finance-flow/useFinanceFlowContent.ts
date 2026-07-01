"use client";

import { useMemo } from "react";
import type { useI18n } from "@/locales/i18n";
import type { FinanceFlowStep } from "./types";

type Translator = ReturnType<typeof useI18n>["t"];

export function useFinanceFlowContent(t: Translator) {
  return useMemo(() => {
    const choose: FinanceFlowStep = {
      step: "01",
      label: t("financeFlow.choose.label", "Start"),
      title: t("financeFlow.choose.title", "Choose your car"),
      description: t(
        "financeFlow.choose.description",
        "Browse verified cars and pick the one that fits your budget.",
      ),
    };

    const cashStart: FinanceFlowStep = {
      step: "02",
      tone: "cash",
      label: t("financeFlow.cash.label", "Cash"),
      title: t("financeFlow.cash.title", "Pay directly"),
      description: t(
        "financeFlow.cash.description",
        "Reserve your car and complete the payment securely.",
      ),
    };

    const cashDone: FinanceFlowStep = {
      step: "03",
      tone: "cash",
      label: t("financeFlow.cashDone.label", "Fast handover"),
      title: t("financeFlow.cashDone.title", "Confirm and receive"),
      description: t(
        "financeFlow.cashDone.description",
        "We verify the process and prepare your car for delivery.",
      ),
    };

    const financeStart: FinanceFlowStep = {
      step: "02",
      tone: "finance",
      label: t("financeFlow.finance.label", "Finance"),
      title: t("financeFlow.finance.title", "Apply for funding"),
      description: t(
        "financeFlow.finance.description",
        "Submit your finance request directly from the app.",
      ),
    };

    const financeDone: FinanceFlowStep = {
      step: "03",
      tone: "finance",
      label: t("financeFlow.financeDone.label", "Approval"),
      title: t("financeFlow.financeDone.title", "Get your offer"),
      description: t(
        "financeFlow.financeDone.description",
        "Review the offer, confirm your plan, and continue smoothly.",
      ),
    };

    const drive: FinanceFlowStep = {
      step: "04",
      tone: "final",
      label: t("financeFlow.drive.label", "Done"),
      title: t("financeFlow.drive.title", "Drive your car"),
      description: t(
        "financeFlow.drive.description",
        "Finish the process smoothly and receive your car with confidence.",
      ),
    };

    return {
      heading: {
        badge: t("financeFlow.badge", "Cash or Finance"),
        title: t("financeFlow.title", "Choose the way that fits you"),
        subtitle: t(
          "financeFlow.subtitle",
          "A simple app journey that lets you buy your next car in cash or through flexible financing.",
        ),
      },
      app: {
        title: t("financeFlow.app.title", "SwapCars App"),
        description: t(
          "financeFlow.app.description",
          "One smooth journey for cash buyers and finance customers.",
        ),
      },
      desktop: {
        choose,
        cashStart,
        cashDone,
        financeStart,
        financeDone,
        drive,
      },
      mobileSteps: [
        choose,
        cashStart,
        financeStart,
        {
          ...drive,
          description: t(
            "financeFlow.drive.mobileDescription",
            "Finish the process smoothly and receive your car with confidence.",
          ),
        },
      ],
    };
  }, [t]);
}
