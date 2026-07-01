import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import MarketplaceSidebar from "./MarketplaceSidebar";
import { useI18n } from "@/locales/i18n";

const MobileSheet = () => {
  const { t, isRtl } = useI18n();

  return (
    <div>
      <div className="flex lg:hidden w-full px-5 pt-5 pb-0 items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900 tracking-tight">
          {t("marketplace.title", "Marketplace")}
        </h3>
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-sm transition-all hover:bg-emerald-100 active:scale-95">
            <SlidersHorizontal className="w-4 h-4" />
            {t("marketplace.filters.title", "Filters")}
          </SheetTrigger>
          <SheetContent
            side={isRtl ? "right" : "left"}
            className="w-[min(350px,calc(100vw-1rem))] p-0 border-none bg-white"
          >
            <SheetTitle className="sr-only">
              {t("marketplace.filters.sheetTitle", "Marketplace Filters")}
            </SheetTitle>
            <div className="h-full pt-8">
              <MarketplaceSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileSheet;
