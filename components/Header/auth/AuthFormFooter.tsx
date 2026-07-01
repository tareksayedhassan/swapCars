"use client";

import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type AuthFormFooterProps = {
  helper: string;
  error: string | null;
  submitting: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel: string;
};

export function AuthFormFooter({
  helper,
  error,
  submitting,
  disabled,
  label,
  loadingLabel,
}: AuthFormFooterProps) {
  return (
    <div className="space-y-4 pt-2">
      <p className="text-xs leading-5 text-muted-foreground">{helper}</p>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={submitting || disabled}
        className="h-12 w-full rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 focus-visible:ring-primary/30 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? loadingLabel : label}
      </Button>
    </div>
  );
}
