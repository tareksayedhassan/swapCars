"use client"

import { Car, Gauge, KeyRound, ShieldCheck, Sparkles } from "lucide-react"

import { useI18n } from "@/locales/i18n"

export default function useNavItems() {
  const { t } = useI18n()

  return [
    {
      type: "cars",
      label: t("header.nav.buyCars", "Buy cars"),
      description: t("header.nav.buyCarsDescription", "New, used, and certified options"),
      icon: <Car className="h-4 w-4" />,
      filters: [
        { group: t("header.filters.popular", "Popular"), options: ["Toyota", "Hyundai", "Kia", "Genesis", "Nissan", "Mercedes"] },
        { group: t("header.filters.budget", "Budget"), options: ["Under 50K", "50K - 100K", "100K - 180K", "180K+"] },
        { group: t("header.filters.body", "Body"), options: ["Sedan", "SUV", "Truck", "Coupe", "Family"] },
      ],
    },
    {
      type: "swap",
      label: t("header.nav.swap", "Swap"),
      description: t("header.nav.swapDescription", "Trade your current car faster"),
      icon: <Sparkles className="h-4 w-4" />,
      filters: [
        { group: t("header.filters.condition", "Condition"), options: ["Excellent", "Very good", "Good", "Needs inspection"] },
        { group: t("header.filters.timeline", "Timeline"), options: ["Today", "This week", "Flexible"] },
      ],
    },
    {
      type: "inspection",
      label: t("header.nav.inspection", "Inspection"),
      description: t("header.nav.inspectionDescription", "Verified cars and trusted reports"),
      icon: <ShieldCheck className="h-4 w-4" />,
      filters: [
        { group: t("header.filters.report", "Report"), options: ["Certified", "Warranty", "Low mileage", "Single owner"] },
        { group: t("header.filters.performance", "Performance"), options: ["Eco", "Sport", "Hybrid", "Electric"] },
      ],
    },
    {
      type: "services",
      label: t("header.nav.services", "Services"),
      description: t("header.nav.servicesDescription", "Financing, keys, and ownership help"),
      icon: <KeyRound className="h-4 w-4" />,
      filters: [
        { group: t("header.filters.services", "Services"), options: ["Financing", "Insurance", "Transfer", "Maintenance"] },
        { group: t("header.filters.speed", "Speed"), options: ["Instant", "24 hours", "This week"] },
      ],
    },
    {
      type: "performance",
      label: t("header.nav.performance", "Performance"),
      description: t("header.nav.performanceDescription", "Cars built around the drive"),
      icon: <Gauge className="h-4 w-4" />,
      filters: [
        { group: t("header.filters.drive", "Drive"), options: ["AWD", "RWD", "Turbo", "V6", "V8"] },
        { group: t("header.filters.style", "Style"), options: ["Luxury", "Sport", "Classic", "Adventure"] },
      ],
    },
  ]
}
