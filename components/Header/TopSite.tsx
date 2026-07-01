"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopSite = ({ scrolled }: { scrolled: boolean }) => {
  const { t, isRtl } = useI18n();
  const pathname = usePathname();

  const utilityLinks = [
    { href: "/about", label: t("header.about", "About") },
    { href: "/contact", label: t("header.contact", "Contact") },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "relative hidden overflow-hidden lg:block",
        "border-b border-slate-100/80 bg-linear-to-r from-slate-50 via-white to-slate-50",
        "transition-all duration-500 ease-out",
        scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_30%),radial-gradient(circle_at_82%_50%,rgba(15,23,42,0.06),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-semibold text-slate-600">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>

          {t("header.welcome", "Premium car marketplace for confident deals")}
        </span>

        <div className="flex items-center gap-1 rounded-full border border-slate-200/75 bg-white/80 p-1 shadow-sm shadow-slate-200/70 backdrop-blur-xl">
          {utilityLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-primary/10 hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSite;
