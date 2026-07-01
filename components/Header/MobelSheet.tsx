import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ArrowLeft, ChevronLeft, Globe2, Info, Menu, Phone, Search, X } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import useNavItems from "@/data/Header/NavItems";
import { useI18n } from "@/locales/i18n";
import { useApplyFilter } from "@/hooks/useApplyFilter";
const MobelSheet = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const NAV_ITEMS = useNavItems();
  const { lang, t, setLang, isRtl } = useI18n();
  const { handleFilter } = useApplyFilter();

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    window.location.reload();
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="group h-10 w-10 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/10 hover:text-primary focus-visible:ring-4 focus-visible:ring-primary/15 lg:hidden"
          >
            <Menu className="h-4.5 w-4.5 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isRtl ? "right" : "left"}
          showCloseButton={false}
          className="w-[min(400px,calc(100vw-1rem))] overflow-hidden border-slate-200/80 bg-white p-0 shadow-2xl"
        >
          <SheetHeader className="flex-row items-center justify-between border-b border-slate-100/80 bg-linear-to-b from-slate-50/80 to-white px-5 pb-3 pt-5">
            <div className="flex h-12 items-center gap-3 rounded-2xl bg-white px-2 shadow-sm ring-1 ring-slate-200/70">
              <Image
                src={lang === "ar" ? "/logo/logo.ar.png" : "/logo/logo.en.png"}
                alt="SwapCar"
                width={92}
                height={60}
                className="object-contain"
              />
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-slate-50/90 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-4 focus-visible:ring-primary/15"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
            <SheetTitle className="sr-only">{t("header.menu")}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full" dir={isRtl ? "rtl" : "ltr"}>
            {/* Search */}
            <div className="px-5 pt-2 pb-4">
              <div className="relative">
                <Search className="absolute end-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t(
                    "header.searchGlobal",
                    "Search for cars, real estate, and accessories.",
                  )}
                  className="h-11 w-full rounded-xl border-slate-200/80 bg-slate-50/80 pe-11 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus-visible:border-primary/40 focus-visible:bg-white focus-visible:ring-primary/10"
                />
              </div>
            </div>

            {/* Navigation items */}
            <div className="flex-1 overflow-y-auto px-3">
              {NAV_ITEMS?.map((item) => (
                <div key={item.label} className="mb-1">
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label,
                      )
                    }
                    aria-expanded={expandedItem === item.label}
                    className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition-all duration-200 hover:bg-slate-50 aria-expanded:bg-primary/5 aria-expanded:text-primary"
                  >
                    <div className="rounded-xl bg-primary/10 p-2 text-primary transition-all duration-200 group-hover/item:bg-primary group-hover/item:text-primary-foreground group-aria-expanded/item:bg-primary group-aria-expanded/item:text-primary-foreground">
                      {item.icon}
                    </div>
                    <div className="flex-1 text-start">
                      <span className="block text-[15px] font-bold">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium text-slate-400">
                        {item.description}
                      </span>
                    </div>
                    <ChevronLeft
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-out ${
                        expandedItem === item.label ? "-rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable sub-menu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expandedItem === item.label
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-4 pb-2 pe-3 ps-14 pt-1">
                      {item?.filters?.map((fg) => (
                        <div key={fg.group}>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            {fg.group}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {fg?.options?.map((opt: string) => (
                              <SheetClose key={opt} asChild>
                                <button
                                  onClick={() => handleFilter(opt, item.type)}
                                  className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-px hover:bg-primary/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                >
                                  {opt}
                                </button>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                      <SheetClose asChild>
                        <button
                          onClick={() => handleFilter("", item.type)}
                          className="group/browse flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          {t("header.browseAll")}
                          <ArrowLeft className="h-4 w-4 transition-transform ltr:group-hover/browse:-translate-x-1 rtl:rotate-180 rtl:group-hover/browse:translate-x-1" />
                        </button>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              ))}

              {/* Separator */}
              <div className="mx-3 my-3 h-px bg-linear-to-l from-transparent via-slate-200/70 to-transparent" />

              {/* Extra links */}
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-primary"
                >
                  <div className="rounded-xl bg-slate-100/70 p-2 text-slate-400">
                    <Info className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="font-medium text-[15px]">
                    {t("header.about")}
                  </span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-primary"
                >
                  <div className="rounded-xl bg-slate-100/70 p-2 text-slate-400">
                    <Phone className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="font-medium text-[15px]">
                    {t("header.contact")}
                  </span>
                </Link>
              </SheetClose>
            </div>

            {/* Language Switcher */}
            <div className="px-4 pb-2">
              <button
                onClick={handleLanguageChange}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 transition-all duration-300 hover:-translate-y-px hover:border-primary/25 hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
              >
                <Globe2 className="h-4 w-4 text-primary" />
                <div className="flex items-center text-[13px] font-semibold">
                  <span
                    className={
                      lang === "en" ? "text-primary" : "text-slate-400"
                    }
                  >
                    En
                  </span>
                  <span className="mx-1 text-slate-300">/</span>
                  <span
                    className={
                      lang === "ar" ? "text-primary" : "text-slate-400"
                    }
                  >
                    Ar
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-slate-100/80 p-4">
              <SheetClose asChild></SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobelSheet;
