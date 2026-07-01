"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CarFront,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CarModel from "./CarModel";

const heroBadges = [
  {
    label: "مفحوصة +200 نقطة",
    icon: BadgeCheck,
    className: "right-3 top-8 sm:right-10 lg:right-8 lg:top-16",
  },
  {
    label: "ضمان متوفر",
    icon: ShieldCheck,
    className: "left-3 top-24 sm:left-10 lg:left-5 lg:top-28",
  },
  {
    label: "تمويل شهري",
    icon: Banknote,
    className: "right-6 bottom-20 sm:right-16 lg:right-14 lg:bottom-28",
  },
  {
    label: "توصيل للبيت",
    icon: Truck,
    className: "left-5 bottom-10 sm:left-20 lg:left-14 lg:bottom-16",
  },
];

const searchFields = [
  {
    id: "brand",
    label: "الماركة",
    options: ["كل الماركات", "تويوتا", "هيونداي", "كيا", "مرسيدس"],
  },
  {
    id: "body",
    label: "نوع السيارة",
    options: ["كل الأنواع", "SUV", "سيدان", "كوبيه", "بيك أب"],
  },
  {
    id: "budget",
    label: "الميزانية",
    options: [
      "أي ميزانية",
      "أقل من 80,000",
      "80,000 - 150,000",
      "أكثر من 150,000",
    ],
  },
  {
    id: "city",
    label: "المدينة",
    options: ["كل المدن", "الرياض", "جدة", "الدمام", "الخبر"],
  },
];

const trustItems = [
  "سيارات مفحوصة",
  "أسعار واضحة",
  "تمويل مرن",
  "توصيل داخل السعودية",
];

export default function Hero() {
  const [paymentMode, setPaymentMode] = useState<"cash" | "monthly">("cash");
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <main className="overflow-hidden bg-[#fff7f5] text-[#251111] selection:bg-[#c04944]/20">
      <section
        dir="ltr"
        aria-labelledby="hero-heading"
        className="relative isolate min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(192,73,68,0.24),transparent_28%),radial-gradient(circle_at_20%_18%,rgba(255,231,227,0.95),transparent_30%),linear-gradient(135deg,#fff7f5_0%,#fffaf8_42%,#f8e1dc_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#c04944]/30 to-transparent" />
        <div className="absolute -right-28 top-28 -z-10 h-80 w-80 rounded-full bg-[#c04944]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-12 -z-10 h-96 w-96 rounded-full bg-[#ffd9d4]/65 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div
            dir="rtl"
            className="relative z-10 order-1 flex flex-col items-start text-right lg:pt-4"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c04944]/15 bg-white/75 px-4 py-2 text-sm font-black text-[#7d2f2c] shadow-[0_18px_44px_-30px_rgba(192,73,68,0.65)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#c04944]" />
              تجربة شراء سيارات أذكى وأسهل في السعودية
            </div>

            <h1
              id="hero-heading"
              className="max-w-3xl text-4xl font-black leading-[1.1] tracking-[-0.02em] text-[#251111] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              امتلك سيارتك بثقة مع{" "}
              <span className="bg-gradient-to-l from-[#c04944] via-[#9f3430] to-[#251111] bg-clip-text text-transparent">
                Swap Car
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#6e5552] sm:text-lg lg:text-xl lg:leading-9">
              اكتشف سيارات مفحوصة بعناية، قارن الأسعار بوضوح، واختر طريقة الدفع
              المناسبة لك — كاش أو تمويل — في تجربة مصممة للسوق السعودي.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-2xl bg-[#c04944] px-7 text-base font-black text-white shadow-[0_22px_50px_-18px_rgba(192,73,68,0.85)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#aa3f3a] hover:shadow-[0_28px_62px_-18px_rgba(192,73,68,0.95)] focus-visible:ring-4 focus-visible:ring-[#c04944]/25"
              >
                <Link href="/MarketPlace">
                  <Search className="h-5 w-5" />
                  اعثر على سيارتي
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl border-[#c04944]/20 bg-white/75 px-7 text-base font-black text-[#7d2f2c] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_44px_-34px_rgba(192,73,68,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#c04944]/35 hover:bg-[#fff1ef] hover:text-[#c04944] focus-visible:ring-4 focus-visible:ring-[#c04944]/20"
              >
                <Link href="/MarketPlace">
                  <CarFront className="h-5 w-5" />
                  تصفح السيارات
                </Link>
              </Button>
            </div>

            <form
              aria-label="بحث السيارات"
              className="group mt-9 w-full rounded-[1.75rem] border border-[#c04944]/14 bg-white/82 p-4 shadow-[0_30px_90px_-48px_rgba(73,25,23,0.45)] backdrop-blur-2xl transition-all duration-300 hover:border-[#c04944]/24 hover:bg-white sm:p-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-[#c04944]/10 bg-[#fff2f0] p-1">
                {[
                  { value: "cash", label: "السعر الكاش" },
                  { value: "monthly", label: "القسط الشهري" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={paymentMode === option.value}
                    onClick={() =>
                      setPaymentMode(option.value as "cash" | "monthly")
                    }
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-black transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c04944]/20",
                      paymentMode === option.value
                        ? "bg-[#c04944] text-white shadow-[0_14px_30px_-16px_rgba(192,73,68,0.95)]"
                        : "text-[#7b625f] hover:bg-white hover:text-[#c04944]",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {searchFields.map((field) => (
                  <label key={field.id} htmlFor={field.id} className="block">
                    <span className="mb-2 block text-sm font-black text-[#3a2020]">
                      {field.label}
                    </span>
                    <select
                      id={field.id}
                      name={field.id}
                      className="h-12 w-full rounded-2xl border border-[#c04944]/14 bg-[#fffaf9] px-4 text-sm font-bold text-[#251111] shadow-inner shadow-[#c04944]/5 outline-none transition-all duration-300 hover:border-[#c04944]/28 focus:border-[#c04944]/60 focus:ring-4 focus:ring-[#c04944]/12"
                    >
                      {field.options.map((option) => (
                        <option
                          key={option}
                          className="bg-white text-[#251111]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              <Button
                type="submit"
                className="mt-4 h-14 w-full rounded-2xl bg-[#251111] text-base font-black text-white shadow-[0_22px_48px_-26px_rgba(37,17,17,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a1b1a] hover:shadow-[0_24px_52px_-24px_rgba(37,17,17,0.9)] focus-visible:ring-4 focus-visible:ring-[#251111]/20"
              >
                <Search className="h-5 w-5" />
                شوف السيارات المناسبة
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-[#c04944]/10 bg-white/58 px-4 py-3 text-sm font-black text-[#6e5552] shadow-[0_18px_45px_-38px_rgba(192,73,68,0.65)] backdrop-blur-xl">
              {trustItems.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {item}
                  {index < trustItems.length - 1 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c04944]" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="relative order-2 min-h-[360px] sm:min-h-[460px] lg:min-h-[650px]">
            <div className="absolute inset-x-2 top-8 bottom-8 rounded-[2.5rem] border border-white/22 bg-[radial-gradient(circle_at_63%_28%,rgba(255,202,196,0.24),transparent_30%),linear-gradient(140deg,#351615_0%,#170b0b_54%,#090606_100%)] shadow-[0_34px_90px_-42px_rgba(73,25,23,0.9)] lg:inset-x-0" />
            <div className="absolute left-1/2 top-[45%] h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c04944]/26 blur-3xl lg:h-[34rem] lg:w-[34rem]" />
            <div className="absolute left-[50%] top-[47%] h-[18rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-12 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-2xl lg:bottom-20" />

            <div className="relative h-full min-h-[360px] animate-[swapCarEnter_900ms_ease-out_both] sm:min-h-[460px] lg:min-h-[650px]">
              {imageLoaded ? (
                <CarModel />
              ) : (
                <div className="absolute inset-x-8 top-24 rounded-[2rem] border border-white/14 bg-white/10 p-8 text-center text-sm font-bold text-white/80 backdrop-blur-xl">
                  {/* Replace /public/images/swap-car-hero-suv.png to restore the premium car visual. */}
                  صورة السيارة غير متوفرة مؤقتا
                </div>
              )}
            </div>

            <div dir="rtl" className="pointer-events-none absolute inset-0">
              {heroBadges.map((badge, index) => {
                const Icon = badge.icon;

                return (
                  <div
                    key={badge.label}
                    className={cn(
                      "absolute inline-flex items-center gap-2 rounded-2xl border border-white/16 bg-white/88 px-3 py-2 text-xs font-black text-[#3a2020] shadow-[0_22px_52px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:px-4 sm:py-2.5 sm:text-sm",
                      badge.className,
                    )}
                    style={{
                      animation: `swapBadgeFloat 4.8s ease-in-out ${index * 0.35}s infinite`,
                    }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c04944] text-white shadow-[0_12px_24px_-14px_rgba(192,73,68,0.95)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    {badge.label}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-6 right-4 hidden items-center gap-2 rounded-full border border-white/12 bg-white/12 px-4 py-2 text-sm font-black text-white backdrop-blur-xl sm:flex">
              <MapPin className="h-4 w-4 text-[#ffb1aa]" />
              تجربة مصممة للسوق السعودي
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes swapCarEnter {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes swapBadgeFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
}
