import React, { useState } from "react";
import { Car, Home, Watch, Search, LayoutGrid, List } from "lucide-react";
import { Category } from "@/types/marketplace";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/store/useFilter";
import { useI18n } from "@/locales/i18n";
import { cn } from "@/lib/utils";

const CATEGORIES: {
  id: Category;
  labelKey: string;
  fallback: string;
  icon: any;
}[] = [
  {
    id: "cars",
    labelKey: "marketplace.categories.cars",
    fallback: "Cars",
    icon: Car,
  },
  {
    id: "real-estate",
    labelKey: "marketplace.categories.realEstate",
    fallback: "Real Estate",
    icon: Home,
  },
  {
    id: "accessories",
    labelKey: "marketplace.categories.accessories",
    fallback: "Accessories",
    icon: Watch,
  },
];
type ViewMode = {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
};
export default function MarketplaceTopNav({ viewMode, setViewMode }: ViewMode) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { filters, setFilter } = useFilters();
  const { t, isRtl } = useI18n();

  return (
    <div className="flex w-full flex-col gap-4 border-b border-gray-100 bg-white px-4 py-3 xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:py-0 sm:px-8">
      <div className="no-scrollbar flex min-w-0 items-center gap-5 overflow-x-auto xl:shrink-0 xl:gap-6">
        {CATEGORIES.map((c) => {
          const isActive = filters.type === c.id;
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setFilter({ type: c.id })}
              className={`flex shrink-0 items-center gap-2 py-2 border-b-2 font-bold text-[14px] transition-all duration-300 whitespace-nowrap xl:py-4 ${
                isActive
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-emerald-500 hover:border-gray-200"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-emerald-500" : "text-gray-400"}`}
              />
              {t(c.labelKey, c.fallback)}
            </button>
          );
        })}
      </div>

      <div className="relative hidden min-w-[220px] flex-1 md:block xl:max-w-md">
        <Search
          className={cn(
            "absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-all",
            isRtl ? "right-3" : "left-3",
            searchFocused ? "text-emerald-500 scale-110" : "text-gray-400",
          )}
        />
        <input
          type="text"
          placeholder={t(
            "marketplace.searchPlaceholder",
            "Search marketplace...",
          )}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          value={filters.q || ""}
          onChange={(e) => setFilter({ q: e.target.value })}
          className={cn(
            "h-10 w-full rounded-xl border border-transparent bg-gray-50 text-sm outline-none transition-all focus:border-emerald-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/5",
            isRtl ? "pr-10 pl-4" : "pl-10 pr-4",
          )}
        />
      </div>
      <div className="flex w-max shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "grid"
              ? "bg-white dark:bg-zinc-800 text-emerald-600 shadow-sm"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          }`}
          aria-label={t("marketplace.gridView", "Grid view")}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "list"
              ? "bg-white dark:bg-zinc-800 text-emerald-600 shadow-sm"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          }`}
          aria-label={t("marketplace.listView", "List view")}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
      {/* 3. Results & Shadcn Select (Right) */}
      <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-4">
        <div className="h-6 w-px bg-gray-100 hidden sm:block" />

        {/* Shadcn UI Select */}
        <Select
          value={filters.sort || "newest"}
          onValueChange={(value) => setFilter({ sort: value })}
        >
          <SelectTrigger className="h-9 w-[120px] border-none bg-transparent font-bold text-gray-700 focus:ring-0 focus:ring-offset-0 hover:text-emerald-600 transition-colors shadow-none sm:w-[140px]">
            <SelectValue placeholder={t("marketplace.sortBy", "Sort by")} />
          </SelectTrigger>
          <SelectContent align={isRtl ? "start" : "end"} className="rounded-xl">
            <SelectItem value="newest" className="text-sm">
              {t("marketplace.sort.newest", "Newest First")}
            </SelectItem>
            <SelectItem value="popular" className="text-sm">
              {t("marketplace.sort.popular", "Most Popular")}
            </SelectItem>
            <SelectItem value="price_asc" className="text-sm">
              {t("marketplace.sort.priceAsc", "Price: Low to High")}
            </SelectItem>
            <SelectItem value="price_desc" className="text-sm">
              {t("marketplace.sort.priceDesc", "Price: High to Low")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
