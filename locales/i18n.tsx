"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type Lang = "en" | "ar";
type Dict = Record<string, unknown>;

const dictionaries: Record<Lang, Dict> = { en, ar };

type I18nContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: string, fallback?: string) => string;
  setLang: (lang: Lang) => void;
  isRtl: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("lang") as Lang | null;
      if (stored === "ar" || stored === "en") return stored;
      const nav = navigator.language?.toLowerCase() ?? "en";
      return nav.startsWith("ar") ? "ar" : "en";
    }
    return "en";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";
  const isRtl = dir === "rtl";
  const dict = useMemo(() => dictionaries[lang], [lang]);

  const t = useMemo(() => (key: string, fallback?: string) => {
    const val = dict[key];
    return typeof val === "string" ? val : fallback ?? key;
  }, [dict]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir);
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  return (
    <I18nContext.Provider value={{ lang, dir, t, setLang, isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
