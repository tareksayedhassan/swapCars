"use client";

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
import { useI18n } from "@/locales/i18n";
import { cn } from "@/lib/utils";
import CarModel from "./CarModel";

type PaymentMode = "cash" | "monthly";

const heroBadges = [
  {
    labelKey: "hero.badges.inspected",
    fallback: "200+ point inspected",
    icon: BadgeCheck,
    className: "end-3 top-8 sm:end-10 lg:end-8 lg:top-16",
  },
  {
    labelKey: "hero.badges.warranty",
    fallback: "Warranty available",
    icon: ShieldCheck,
    className: "start-3 top-24 sm:start-10 lg:start-5 lg:top-28",
  },
  {
    labelKey: "hero.badges.finance",
    fallback: "Monthly financing",
    icon: Banknote,
    className: "end-6 bottom-20 sm:end-16 lg:end-14 lg:bottom-28",
  },
  {
    labelKey: "hero.badges.delivery",
    fallback: "Home delivery",
    icon: Truck,
    className: "start-5 bottom-10 sm:start-20 lg:start-14 lg:bottom-16",
  },
];

const searchFields = [
  {
    id: "brand",
    labelKey: "hero.search.brand",
    fallback: "Brand",
    optionKeys: [
      ["hero.search.brand.all", "All brands"],
      ["hero.search.brand.toyota", "Toyota"],
      ["hero.search.brand.hyundai", "Hyundai"],
      ["hero.search.brand.kia", "Kia"],
      ["hero.search.brand.mercedes", "Mercedes"],
    ],
  },
  {
    id: "body",
    labelKey: "hero.search.body",
    fallback: "Body type",
    optionKeys: [
      ["hero.search.body.all", "All types"],
      ["hero.search.body.suv", "SUV"],
      ["hero.search.body.sedan", "Sedan"],
      ["hero.search.body.coupe", "Coupe"],
      ["hero.search.body.pickup", "Pickup"],
    ],
  },
  {
    id: "budget",
    labelKey: "hero.search.budget",
    fallback: "Budget",
    optionKeys: [
      ["hero.search.budget.any", "Any budget"],
      ["hero.search.budget.low", "Under 80,000"],
      ["hero.search.budget.mid", "80,000 - 150,000"],
      ["hero.search.budget.high", "Over 150,000"],
    ],
  },
  {
    id: "city",
    labelKey: "hero.search.city",
    fallback: "City",
    optionKeys: [
      ["hero.search.city.all", "All cities"],
      ["hero.search.city.riyadh", "Riyadh"],
      ["hero.search.city.jeddah", "Jeddah"],
      ["hero.search.city.dammam", "Dammam"],
      ["hero.search.city.khobar", "Khobar"],
    ],
  },
];

const paymentOptions: Array<{
  value: PaymentMode;
  labelKey: string;
  fallback: string;
}> = [
  {
    value: "cash",
    labelKey: "hero.payment.cash",
    fallback: "Cash price",
  },
  {
    value: "monthly",
    labelKey: "hero.payment.monthly",
    fallback: "Monthly payment",
  },
];

const trustItems = [
  ["hero.trust.inspected", "Inspected cars"],
  ["hero.trust.clearPrices", "Clear prices"],
  ["hero.trust.flexibleFinance", "Flexible financing"],
  ["hero.trust.delivery", "Delivery across Saudi Arabia"],
] as const;

export default function Hero() {
  const { dir, isRtl, t } = useI18n();
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("cash");

  return (
    <main className="overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <section
        dir={dir}
        aria-labelledby="hero-heading"
        className="relative isolate min-h-[calc(100vh-96px)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,color-mix(in_srgb,var(--primary)_24%,transparent),transparent_28%),radial-gradient(circle_at_20%_18%,color-mix(in_srgb,var(--primary)_10%,white),transparent_30%),linear-gradient(135deg,#fff7f5_0%,#fffaf8_42%,#f8e1dc_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute end-[-7rem] top-28 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] start-12 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="relative z-10 order-1 flex flex-col items-start text-start lg:pt-4">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/75 px-4 py-2 text-sm font-black text-primary shadow-[0_18px_44px_-30px_rgba(192,73,68,0.65)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              {t("hero.badge", "Find your next car")}
            </div>

            <h1
              id="hero-heading"
              className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t("hero.title", "Swap, finance, and drive your dream car")}{" "}
              <span className="bg-gradient-to-l from-primary via-primary to-foreground bg-clip-text text-transparent">
                Swap Car
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-muted-foreground sm:text-lg lg:text-xl lg:leading-9">
              {t(
                "hero.subtitle",
                "Explore verified cars, compare options, and get flexible funding in one smooth experience.",
              )}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-2xl bg-primary px-7 text-base font-black text-primary-foreground shadow-[0_22px_50px_-18px_rgba(192,73,68,0.85)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_28px_62px_-18px_rgba(192,73,68,0.95)] focus-visible:ring-4 focus-visible:ring-primary/25"
              >
                <Link href="/MarketPlace">
                  <Search className="h-5 w-5" />
                  {t("hero.primaryButton", "Browse Cars")}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl border-primary/20 bg-card/75 px-7 text-base font-black text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_44px_-34px_rgba(192,73,68,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:ring-4 focus-visible:ring-primary/20"
              >
                <Link href="/MarketPlace">
                  <CarFront className="h-5 w-5" />
                  {t("hero.secondaryButton", "How It Works")}
                </Link>
              </Button>
            </div>

            <form
              aria-label={t("hero.searchLabel", "Search cars")}
              className="group mt-9 w-full rounded-3xl border border-primary/15 bg-card/85 p-4 shadow-[0_30px_90px_-48px_rgba(73,25,23,0.45)] backdrop-blur-2xl transition-all duration-300 hover:border-primary/25 hover:bg-card sm:p-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-primary/10 bg-primary/10 p-1">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={paymentMode === option.value}
                    onClick={() => setPaymentMode(option.value)}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-black transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      paymentMode === option.value
                        ? "bg-primary text-primary-foreground shadow-[0_14px_30px_-16px_rgba(192,73,68,0.95)]"
                        : "text-muted-foreground hover:bg-card hover:text-primary",
                    )}
                  >
                    {t(option.labelKey, option.fallback)}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {searchFields.map((field) => (
                  <label key={field.id} htmlFor={field.id} className="block">
                    <span className="mb-2 block text-sm font-black text-foreground">
                      {t(field.labelKey, field.fallback)}
                    </span>
                    <select
                      id={field.id}
                      name={field.id}
                      aria-label={t(field.labelKey, field.fallback)}
                      className="h-12 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm font-bold text-foreground shadow-inner shadow-primary/5 outline-none transition-all duration-300 hover:border-primary/30 focus:border-primary/70 focus:bg-card focus:ring-4 focus:ring-primary/15"
                    >
                      {field.optionKeys.map(([key, fallback]) => (
                        <option key={key} className="bg-card text-foreground">
                          {t(key, fallback)}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              <Button
                type="submit"
                className="mt-4 h-14 w-full rounded-2xl bg-foreground text-base font-black text-background shadow-[0_22px_48px_-26px_rgba(37,17,17,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-[0_24px_52px_-24px_rgba(37,17,17,0.9)] focus-visible:ring-4 focus-visible:ring-foreground/20"
              >
                <Search className="h-5 w-5" />
                {t("hero.searchSubmit", "Show matching cars")}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-primary/10 bg-card/60 px-4 py-3 text-sm font-black text-muted-foreground shadow-[0_18px_45px_-38px_rgba(192,73,68,0.65)] backdrop-blur-xl">
              {trustItems.map(([key, fallback], index) => (
                <span key={key} className="inline-flex items-center gap-3">
                  {t(key, fallback)}
                  {index < trustItems.length - 1 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="relative order-2 min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[650px]">
            <div className="absolute inset-x-2 bottom-8 top-8 rounded-3xl border border-white/20 bg-[radial-gradient(circle_at_63%_28%,rgba(255,202,196,0.24),transparent_30%),linear-gradient(140deg,#351615_0%,#170b0b_54%,#090606_100%)] shadow-[0_34px_90px_-42px_rgba(73,25,23,0.9)] sm:rounded-[2rem] lg:inset-x-0" />
            <div className="absolute left-1/2 top-[45%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl lg:h-[32rem] lg:w-[32rem]" />
            <div className="absolute left-1/2 top-[47%] h-[16rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl lg:w-[32rem]" />
            <div className="absolute bottom-12 left-1/2 h-14 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/65 blur-2xl lg:bottom-20" />

            <div className="relative h-full min-h-[360px] animate-[swapCarEnter_900ms_ease-out_both] [isolation:isolate] sm:min-h-[460px] lg:min-h-[650px]">
              <CarModel altText={t("hero.modelAlt", "Swap Car luxury SUV")} />
            </div>

            <div className="pointer-events-none absolute inset-0" dir={dir}>
              {heroBadges.map((badge, index) => {
                const Icon = badge.icon;

                return (
                  <div
                    key={badge.labelKey}
                    className={cn(
                      "absolute inline-flex max-w-[11rem] items-center gap-2 rounded-2xl border border-white/20 bg-white/90 px-3 py-2 text-xs font-black leading-5 text-foreground shadow-[0_18px_42px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:max-w-none sm:px-4 sm:py-2.5 sm:text-sm",
                      badge.className,
                    )}
                    style={{
                      animation: `swapBadgeFloat 4.8s ease-in-out ${index * 0.35}s infinite`,
                    }}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_12px_24px_-14px_rgba(192,73,68,0.95)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    {t(badge.labelKey, badge.fallback)}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-6 end-4 hidden items-center gap-2 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm font-black text-white backdrop-blur-xl sm:flex">
              <MapPin
                className={cn("h-4 w-4 text-primary", isRtl && "scale-x-[-1]")}
              />
              {t("hero.location", "Built for the Saudi market")}
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
