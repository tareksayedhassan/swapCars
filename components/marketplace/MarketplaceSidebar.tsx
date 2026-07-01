import React, { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { realEstateTypes } from "@/data/RealEstateType";
import { Gift, Loader2, SaudiRiyal } from "lucide-react";
import { useFilters } from "@/store/useFilter";
import useGetAllBrands from "@/hooks/Brands/useGetAllBrands";
import { Slider } from "../ui/slider";
import { AccessoryCategory } from "@/data/Accessories/AccessoriesTypeOptions";
import { useI18n } from "@/locales/i18n";

export default function MarketplaceSidebar() {
  const { filters, setFilter } = useFilters();
  const { t } = useI18n();
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrands("");
  const [range, setRange] = useState([0, 1000000]);

  const brandsOptions = useMemo(() => {
    return brandsData?.data?.map((brand: any) => brand.name) || [];
  }, [brandsData]);

  const CATEGORY_FILTERS = {
    cars: [
      {
        id: "brand",
        label: t("marketplace.filters.brand", "Brand"),
        options: brandsOptions,
        isLoading: brandsLoading,
      },
      {
        id: "condition",
        label: t("marketplace.filters.condition", "Car Condition"),
        options: [
          t("marketplace.options.new", "New"),
          t("marketplace.options.used", "Used"),
        ],
      },
      {
        id: "year",
        label: t("marketplace.filters.year", "Year"),
        options: ["2025", "2024", "2023", "2022", "2021"],
      },

      {
        id: "fuelType",
        label: t("marketplace.filters.fuelType", "Fuel Type"),
        options: [
          t("marketplace.options.petrol", "Petrol"),
          t("marketplace.options.diesel", "Diesel"),
          t("marketplace.options.electric", "Electric"),
          t("marketplace.options.hybrid", "Hybrid"),
        ],
      },
      {
        id: "transmission",
        label: t("marketplace.filters.transmission", "Transmission"),
        options: [
          t("marketplace.options.manual", "Manual"),
          t("marketplace.options.automatic", "Automatic"),
          "CVT",
        ],
      },
      {
        id: "hasOffer",
        label: t("marketplace.filters.specialOffers", "Special Offers"),
        options: [t("marketplace.options.offersOnly", "Offers Only")],
        isSpecial: true,
      },
    ],
    "real-estate": [
      {
        id: "propertyType",
        label: t("marketplace.filters.propertyType", "Property Type"),
        options: realEstateTypes.map((r) => r.label),
      },
      {
        id: "rooms",
        label: t("marketplace.filters.rooms", "Rooms"),
        options: ["1", "2", "3", "4+"],
      },
      {
        id: "bathrooms",
        label: t("marketplace.filters.bathrooms", "Bathrooms"),
        options: ["1", "2", "3+"],
      },
      {
        id: "hasOffer",
        label: t("marketplace.filters.specialOffers", "Special Offers"),
        options: [t("marketplace.options.offersOnly", "Offers Only")],
        isSpecial: true,
      },
    ],
    accessories: [
      {
        id: "category",
        label: t("marketplace.filters.accessoryType", "Accessory Type"),
        options: Object.values(AccessoryCategory),
      },
      {
        id: "material",
        label: t("marketplace.filters.material", "Material"),
        options: [
          t("marketplace.options.carbonFiber", "Carbon Fiber"),
          t("marketplace.options.plastic", "Plastic"),
          t("marketplace.options.leather", "Leather"),
          t("marketplace.options.metal", "Metal"),
        ],
      },
      {
        id: "hasOffer",
        label: t("marketplace.filters.specialOffers", "Special Offers"),
        options: [t("marketplace.options.offersOnly", "Offers Only")],
        isSpecial: true,
      },
    ],
  };

  const activeFilters =
    CATEGORY_FILTERS[filters.type as keyof typeof CATEGORY_FILTERS];

  const handlePriceChange = (value: number[]) => {
    setRange(value);
    setFilter({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  const handleCheckboxChange = (filterId: string, optionValue: string) => {
    const newValue = filters[filterId] === optionValue ? "" : optionValue;

    setFilter({
      ...filters,
      [filterId]: newValue,
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-140px)] w-full border-e border-gray-100 bg-white transition-transform duration-300">
      <div className="p-5 sm:p-8 space-y-8">
        {/* Pricing Module */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both max-w-sm">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider">
              {t("marketplace.filters.priceRange", "Price Range")}
            </h3>
            <div className="flex items-center gap-1 text-emerald-600 font-bold tabular-nums">
              <span>{range[0]}</span>
              <span className="text-gray-300 font-light">-</span>
              <span>{range[1]}</span>
              <SaudiRiyal className="ms-1 h-3.5 w-3.5" />
            </div>
          </div>

          <div className="px-2">
            <Slider
              value={range}
              max={1000000}
              step={1000}
              onValueChange={(value) => handlePriceChange(value)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-between px-1 text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
            <span>{t("marketplace.filters.min", "Min")}: 0</span>
            <span>{t("marketplace.filters.max", "Max")}: 1000000+</span>
          </div>
        </div>

        {/* Dynamic Category Blocks */}
        {activeFilters ? (
          activeFilters.map((filterGroup, idx) => (
            <div
              key={filterGroup.id}
              className="pt-6 border-t border-gray-100/80 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
              style={{ animationDelay: `${(idx + 1) * 75}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-gray-900 tracking-tight">
                  {filterGroup.label}
                </h3>
              </div>

              <div className="space-y-3.5">
                {filterGroup.options.map((option: any) => {
                  const isActive = filters[filterGroup.id] === option;
                  const isOfferType = filterGroup.isSpecial;

                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer group w-full"
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isActive}
                        onChange={() =>
                          handleCheckboxChange(filterGroup.id, option)
                        }
                      />

                      {/* Custom Checkbox Design */}
                      <div
                        className={`w-5 h-5 shrink-0 rounded-[6px] border flex items-center justify-center transition-all duration-200 
                      ${
                        isActive
                          ? isOfferType
                            ? "bg-orange-500 border-orange-500 shadow-[0_2px_8px_rgba(249,115,22,0.3)] scale-110"
                            : "bg-emerald-500 border-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.3)] scale-110"
                          : "bg-white border-gray-300 group-hover:border-emerald-500 shadow-sm"
                      }`}
                      >
                        {isActive && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-3.5 h-3.5 text-white stroke-current stroke-[3] animate-in zoom-in duration-200"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Label Text */}
                      <span
                        className={`text-[13px] sm:text-sm flex items-center gap-2 transition-colors duration-200 
                      ${
                        isActive
                          ? isOfferType
                            ? "text-orange-700 font-semibold"
                            : "text-emerald-700 font-semibold"
                          : "text-gray-600 group-hover:text-emerald-600"
                      }`}
                      >
                        {isOfferType && (
                          <Gift
                            className={`w-3.5 h-3.5 ${
                              isActive ? "text-orange-500" : "text-orange-400"
                            }`}
                          />
                        )}
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm italic">
            {t("marketplace.filters.empty", "Select a category to see filters")}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
