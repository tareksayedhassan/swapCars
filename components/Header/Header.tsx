"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, HandCoins, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/locales/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FinancingApplicationDialog } from "@/components/financing/FinancingApplicationDialog";
import useAuthStore from "@/store/useAuthStore";
import useNavItems from "@/data/Header/NavItems";
import { cn } from "@/lib/utils";

import { AuthSheet } from "./AuthSheet";
import { FilterPanel } from "./FilterPanel";
import MobelNavigate from "./MobelNavigate";
import MobelSheet from "./MobelSheet";
import { NotificationsDialog } from "./NotificationsDialog";
import { UserAccountMenu } from "./UserAccountMenu";
import TopSite from "./TopSite";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const [resumeFinancing, setResumeFinancing] = useState(false);

  const { t, lang, setLang, isRtl } = useI18n();
  const { user, isLoggedIn, logout, checkAuth } = useAuthStore();
  const navItems = useNavItems();
  const pathname = usePathname();

  const logoSrc = lang === "ar" ? "/logo/logo.ar.png" : "/logo/logo.en.png";
  const isHome = pathname === "/";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = () => {
    const nextLang = lang === "en" ? "ar" : "en";

    setLang(nextLang);
    localStorage.setItem("lang", nextLang);
    window.location.reload();
  };

  const handleFinancingClick = () => {
    if (isLoggedIn) {
      setFinancingOpen(true);
      return;
    }

    setResumeFinancing(true);
    setAuthOpen(true);
  };

  const handleAuthenticated = () => {
    if (resumeFinancing) {
      setResumeFinancing(false);
      setFinancingOpen(true);
    }
  };

  return (
    <>
      <TopSite scrolled={scrolled} />

      <header
        dir={isRtl ? "rtl" : "ltr"}
        className={cn(
          "sticky z-50 w-full px-3 transition-all duration-500 ease-out sm:px-4",
          scrolled ? "top-2" : "top-2.5 lg:top-4",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-8 mx-auto hidden h-24 max-w-5xl rounded-full bg-primary/10 blur-3xl lg:block" />

        <div
          className={cn(
            "relative mx-auto flex h-15 max-w-7xl items-center gap-2 overflow-visible rounded-[1.35rem] border px-2.5 backdrop-blur-2xl transition-all duration-500 sm:h-16 sm:gap-3 sm:px-4 lg:h-[74px] lg:px-5",
            "before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(1.35rem-1px)] before:bg-linear-to-b before:from-white/80 before:to-white/35",
            scrolled
              ? "border-slate-200/90 bg-white/95 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.7)]"
              : "border-white/90 bg-white/86 shadow-[0_22px_60px_-38px_color-mix(in_srgb,var(--primary)_65%,transparent)]",
          )}
        >
          <Link
            href="/"
            aria-label="Go to homepage"
            aria-current={isHome ? "page" : undefined}
            className={cn(
              "group/logo relative z-10 flex h-11 shrink-0 items-center rounded-2xl px-1.5 py-1 sm:h-12",
              "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
              isHome && "bg-primary/5",
            )}
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100 group-aria-[current=page]/logo:opacity-100" />

            <Image
              key={logoSrc}
              src={logoSrc}
              alt="SwapCar Logo"
              width={132}
              height={72}
              className="relative h-auto w-24 object-contain drop-shadow-sm transition-transform duration-300 group-hover/logo:scale-[1.035] sm:w-28 lg:w-[126px]"
              priority
              onError={(event) => {
                event.currentTarget.src = "/logo/logo.ar.png";
              }}
            />
          </Link>

          <div className="relative z-10 hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <NavigationMenu dir={isRtl ? "rtl" : "ltr"}>
              <NavigationMenuList className="gap-0.5 rounded-2xl border border-slate-200/70 bg-slate-50/75 p-1 shadow-inner shadow-white">
                {navItems?.map((item, index) => (
                  <NavigationMenuItem key={`${item.label}-${index}`}>
                    <NavigationMenuTrigger
                      className={cn(
                        "group/nav-trigger relative h-10 gap-2 rounded-xl bg-transparent px-3 text-[13px] font-semibold text-slate-700 xl:px-3.5",
                        "transition-all duration-300 hover:-translate-y-px hover:bg-white hover:text-primary hover:shadow-sm",
                        "focus-visible:ring-4 focus-visible:ring-primary/10",
                        "data-[state=open]:bg-white data-[state=open]:text-primary data-[state=open]:shadow-sm",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-primary/10",
                          "transition-all duration-300",
                          "group-hover/nav-trigger:bg-primary group-hover/nav-trigger:text-primary-foreground group-hover/nav-trigger:ring-primary/0",
                          "group-data-[state=open]/nav-trigger:bg-primary group-data-[state=open]/nav-trigger:text-primary-foreground group-data-[state=open]/nav-trigger:ring-primary/0",
                        )}
                      >
                        {item.icon}
                      </span>

                      <span className="whitespace-nowrap">{item.label}</span>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="z-50 rounded-3xl border-0 bg-transparent p-0 shadow-none">
                      <div className="rounded-3xl bg-transparent p-0">
                        <FilterPanel item={item} />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="relative z-10 hidden w-[210px] shrink-0 md:block xl:w-[300px]">
            <div
              className={cn(
                "pointer-events-none absolute inset-0 rounded-xl transition-all duration-300",
                searchFocused ? "bg-primary/10 blur-md" : "bg-transparent",
              )}
            />

            <Search
              className={cn(
                "pointer-events-none absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors duration-200",
                isRtl ? "right-3.5" : "left-3.5",
                searchFocused ? "text-primary" : "text-slate-400",
              )}
            />

            <Input
              placeholder={t("header.search", "Search cars, models, services")}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "relative h-10 rounded-xl border-slate-200/80 bg-slate-50/90 text-sm font-medium text-slate-700 shadow-inner shadow-slate-200/40 lg:h-11",
                "transition-all duration-300 placeholder:text-slate-400",
                "focus-visible:border-primary/40 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10",
                isRtl ? "pr-10 pl-4" : "pl-10 pr-4",
              )}
            />
          </div>

          <div className="relative z-10 ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {isLoggedIn && (
              <NotificationsDialog notifications={user?.notifications || []} />
            )}

            <Button
              type="button"
              variant="outline"
              aria-label={t("financingApplication.trigger", "Open financing")}
              onClick={handleFinancingClick}
              className={cn(
                "group/financing h-10 rounded-xl border-primary/15 bg-linear-to-b from-primary to-primary/90 px-3 text-sm font-bold text-primary-foreground shadow-[0_10px_22px_-14px_var(--primary)] lg:h-11",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary hover:shadow-[0_16px_30px_-16px_var(--primary)]",
                "active:translate-y-0 active:shadow-sm",
                "focus-visible:ring-4 focus-visible:ring-primary/15",
              )}
            >
              <HandCoins className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/financing:-rotate-6 group-hover/financing:scale-110" />

              <span className="hidden sm:inline">
                {t("header.financing", "Financing")}
              </span>
            </Button>

            <button
              type="button"
              onClick={handleLanguageChange}
              className={cn(
                "group/language hidden h-10 items-center gap-2 rounded-xl border border-slate-200/80 bg-white/85 px-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur lg:h-11",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/10 hover:text-primary",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 lg:flex",
              )}
              aria-label={t("header.language", "Switch language")}
            >
              <Globe2 className="h-4 w-4 text-primary transition-transform duration-300 group-hover/language:rotate-12" />

              <span className="flex items-center text-[13px] font-semibold">
                <span
                  className={cn(
                    "transition-colors",
                    lang === "en" ? "text-primary" : "text-slate-400",
                  )}
                >
                  En
                </span>

                <span className="mx-1 text-slate-300">/</span>

                <span
                  className={cn(
                    "transition-colors",
                    lang === "ar" ? "text-primary" : "text-slate-400",
                  )}
                >
                  Ar
                </span>
              </span>
            </button>

            {isLoggedIn && <UserAccountMenu user={user} logout={logout} />}

            <MobelSheet />
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-8 -bottom-5 mx-auto h-8 max-w-6xl rounded-full blur-2xl transition-all duration-500",
            scrolled
              ? "bg-slate-900/20"
              : "bg-linear-to-r from-transparent via-primary/24 to-transparent",
          )}
        />
      </header>

      <FinancingApplicationDialog
        open={financingOpen}
        onOpenChange={setFinancingOpen}
        trigger={null}
      />

      <AuthSheet
        open={authOpen}
        onOpenChange={(open) => {
          setAuthOpen(open);
          if (!open) setResumeFinancing(false);
        }}
        onAuthenticated={handleAuthenticated}
      />

      <div className="h-3 sm:h-5" />

      <MobelNavigate />
    </>
  );
}
