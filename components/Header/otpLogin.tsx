"use client";

import React, { FormEvent, useEffect, useState, useTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

function OtpLogin({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const { sendOtp, RequestOtp } = useAuthStore();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [isOtpSent, setIsOtpSent] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setError(null);
    setSuccess("");

    const fullPhoneNumber = `${phoneNumber.trim()}`;

    startTransition(async () => {
      try {
        await RequestOtp({
          loginMethod: "phone",
          phone: fullPhoneNumber,
        });
        setSuccess("تم إرسال رمز التحقق بنجاح.");
        setIsOtpSent(true);
        setResendCountdown(60);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : "حدث خطأ ما، يرجى المحاولة لاحقاً.");
      }
    });
  };

  const verifyOtp = async () => {
    setError(null);
    setSuccess("");

    startTransition(async () => {
      try {
        await sendOtp({
          phone: phoneNumber,
          otp: otp,
        });
        setSuccess("تم التحقق بنجاح، جاري تحويلك...");
        onOpenChange(false);
      } catch (err: unknown) {
        console.error("Verification Error:", err);
        setError(err instanceof Error ? err.message : "فشل التحقق من الرمز. يرجى إعادة المحاولة.");
      }
    });
  };

  return (
    <div
      className="flex flex-col items-stretch justify-center w-full max-w-md mx-auto"
      dir="rtl"
    >
      {!isOtpSent ? (
        <form onSubmit={requestOtp} className="space-y-3">
          <label
            htmlFor="phone-number"
            className="text-[14px] font-bold text-slate-700 block text-right"
          >
            رقم الجوال
          </label>
          <div className="flex h-12 overflow-hidden rounded-xl border border-input bg-background shadow-sm transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15">
            {/* أيقونة الهاتف ورمز السعودية الثابت */}
            <div
              className="flex items-center gap-1 px-3 border-l border-border bg-muted text-slate-600 select-none"
              dir="ltr"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-slate-700">+966</span>
            </div>
            <Input
              id="phone-number"
              className="h-full rounded-none border-0 bg-transparent px-4 text-left font-medium tracking-wide text-foreground shadow-none focus-visible:border-transparent focus-visible:ring-0 w-full"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="5xxxxxxxx"
              dir="ltr"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              } // منع إدخال أي شيء عدا الأرقام
            />
          </div>
          <p className="text-xs leading-5 text-muted-foreground text-right">
            الرجاء إدخال رقم الجوال السعودي الخاص بك المكون من 9 أرقام بدون
            الصفر الأول.
          </p>
        </form>
      ) : (
        /* واجهة إدخال رمز الـ OTP */
        <div className="space-y-4 text-center">
          <div className="space-y-1">
            <p className="text-[14px] font-bold text-slate-700">رمز التحقق</p>
            <p className="text-xs leading-5 text-muted-foreground">
              أدخل الرمز المكون من 6 أرقام المرسل إلى الرقم
              <span
                dir="ltr"
                className="font-semibold text-slate-800"
              >{`+966 ${phoneNumber}`}</span>
            </p>
          </div>

          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              containerClassName="w-full flex justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-10 h-12 text-base md:w-12"
                />
                <InputOTPSlot
                  index={1}
                  className="w-10 h-12 text-base md:w-12"
                />
                <InputOTPSlot
                  index={2}
                  className="w-10 h-12 text-base md:w-12"
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className="w-10 h-12 text-base md:w-12"
                />
                <InputOTPSlot
                  index={4}
                  className="w-10 h-12 text-base md:w-12"
                />
                <InputOTPSlot
                  index={5}
                  className="w-10 h-12 text-base md:w-12"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className="text-xs text-primary hover:underline font-medium"
          >
            تغيير رقم الجوال؟
          </button>
        </div>
      )}

      {/* زر الإجراء الرئيسي */}
      <Button
        disabled={
          (!isOtpSent ? !phoneNumber : otp.length < 6) ||
          isPending ||
          (!isOtpSent && resendCountdown > 0)
        }
        onClick={!isOtpSent ? () => requestOtp() : () => verifyOtp()}
        size="lg"
        className="mt-6 h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 focus-visible:ring-primary/30 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all"
      >
        {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        {!isOtpSent
          ? resendCountdown > 0
            ? `إعادة الإرسال خلال ${resendCountdown} ثانية`
            : isPending
              ? "جاري الإرسال..."
              : "إرسال رمز التحقق"
          : isPending
            ? "جاري التحقق..."
            : "تأكيد الرمز"}
      </Button>

      {/* التنبيهات والأخطاء */}
      <div className="min-h-14 pt-4 text-right">
        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive animate-in fade-in duration-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}
        {success && !error && (
          <p className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary animate-in fade-in duration-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{success}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default OtpLogin;
