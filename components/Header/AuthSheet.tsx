"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/i18n";

import OtpLogin from "./otpLogin";
import { BASE_URL } from "@/service/apis";

type AuthSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated?: () => void;
};

export function AuthSheet({ open, onOpenChange, onAuthenticated }: AuthSheetProps) {
  const { t, lang, isRtl } = useI18n();

  const [googleLoading, setGoogleLoading] = useState(false);

  const googleHref = `${BASE_URL}/auth/google`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRtl ? "rtl" : "ltr"}
        aria-describedby="auth-dialog-description"
        overlayClassName="bg-slate-950/40 backdrop-blur-md transition-all duration-300"
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[500px] overflow-y-auto rounded-2xl border border-white/10 bg-background p-5 shadow-2xl focus:outline-none sm:p-8"
      >
        <DialogHeader className="gap-0 pb-2 text-start">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/10 shadow-sm">
              <Image
                src={lang === "ar" ? "/logo/logo.ar.png" : "/logo/logo.en.png"}
                alt="SwapCar"
                width={60}
                height={40}
                className="object-contain"
                priority
              />
            </span>

            <div className="min-w-0">
              <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                {t("auth.title")}
              </DialogTitle>
              <DialogDescription
                id="auth-dialog-description"
                className="mt-1 text-xs leading-5 text-muted-foreground"
              >
                {t(
                  "auth.description",
                  "Sign in quickly with Google or your phone number.",
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          <div className="rounded-xl border border-primary/10 bg-primary/10 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  {t("auth.secureTitle", "Simple secure access")}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-700">
                  {t(
                    "auth.secureDescription",
                    "Choose Google for instant access or confirm your phone with a one-time code.",
                  )}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={googleHref}
            onClick={() => setGoogleLoading(true)}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-4 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-xs font-black text-primary">
                G
              </span>
            )}
            {googleLoading
              ? t("auth.googleLoading", "Opening Google...")
              : t("auth.google", "Continue with Google")}
          </Link>

          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-border/70" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t("auth.or", "or")}
            </span>
            <Separator className="flex-1 bg-border/70" />
          </div>

          <motion.div
            key={"phone"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <OtpLogin
              onOpenChange={(nextOpen) => {
                onOpenChange(nextOpen);
                if (!nextOpen) onAuthenticated?.();
              }}
            />
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
