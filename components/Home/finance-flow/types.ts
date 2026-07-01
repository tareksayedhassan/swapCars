export type FinanceFlowTone = "default" | "cash" | "finance" | "final";

export type FinanceFlowStep = {
  step: string;
  label: string;
  title: string;
  description: string;
  tone?: FinanceFlowTone;
};
