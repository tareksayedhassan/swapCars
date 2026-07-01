import { useI18n } from "@/locales/i18n";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useApplyFilter } from "@/hooks/useApplyFilter";

interface FilterOption {
  group: string;
  options: string[];
}

interface FilterPanelProps {
  item: {
    type: string;
    filters: FilterOption[];
    icon: React.ReactNode;
    label: string;
    description: string;
  };
}

export function FilterPanel({ item }: FilterPanelProps) {
  const { t, lang } = useI18n();
  const { handleFilter } = useApplyFilter();

  const totalOptions = item.filters.reduce(
    (acc, fg) => acc + (fg.options?.length || 0),
    0,
  );

  const filterCount = item.filters.length;

  const getLayoutStyles = () => {
    if (filterCount <= 2) return { width: "w-[480px]", cols: "grid-cols-2" };
    if (filterCount <= 4)
      return { width: "w-[680px]", cols: "grid-cols-2 sm:grid-cols-4" };
    if (filterCount <= 6) return { width: "w-[780px]", cols: "grid-cols-3" };
    return { width: "w-[960px]", cols: "grid-cols-4" };
  };

  const { width, cols } = getLayoutStyles();

  return (
    <div
      className={`p-5 sm:p-6 ${width} max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-white/80`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100/70">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          {item.icon}
        </div>
        <div className="flex-1">
          <span className="font-bold text-gray-900 block leading-tight">
            {item.label}
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            {item.description}
          </span>
        </div>

        {totalOptions > 0 && (
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {t("header.Suggestions")} {totalOptions}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className={`grid ${cols} gap-x-4 gap-y-5 lg:gap-x-6`}>
        {item.filters?.map((fg) => (
          <div key={fg.group} className="space-y-2.5 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
              {fg.group}
            </p>
            <ScrollArea className="h-[300px] pr-4">
              <div className="flex flex-col gap-1">
                {fg.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleFilter(opt, item.type)}
                    className="group/link flex items-center gap-2.5 text-[13px] text-gray-600 py-2 px-2.5 rounded-xl transition-all hover:text-primary hover:bg-primary/10 w-full text-right"
                  >
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-primary group-hover/link:scale-125 transition-all" />
                    <span className="truncate">{opt}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-5 pt-4 border-t border-gray-100/70">
        <button
          onClick={() => handleFilter("", item.type)}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/browse"
        >
          {t("header.browseAll")}
          <ArrowLeft
            className={`w-4 h-4 transition-transform ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
          />
        </button>
      </div>
    </div>
  );
}
