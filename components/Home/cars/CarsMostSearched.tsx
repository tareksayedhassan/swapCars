"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Search, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/Custom/SectionHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useGetCars from "@/hooks/Cars/useGetCars";
import { useI18n } from "@/locales/i18n";
import CarCard from "@/components/marketplace/CarCard";

type CarSummary = {
  id: string | number;
};

const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

function CarouselButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "left" | "right";
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      onClick={onClick}
      aria-label={label}
      className="h-11 w-11 rounded-full border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:translate-y-0"
    >
      <Icon className="size-5" />
    </Button>
  );
}

function CarsMostSearchedSkeleton() {
  return (
    <>
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="h-[360px] w-[min(300px,calc(100vw-2rem))] flex-none animate-pulse rounded-2xl border border-border/70 bg-card shadow-sm md:w-[330px] lg:w-[350px]"
        >
          <div className="h-44 bg-muted" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-3/4 rounded-full bg-muted" />
            <div className="h-3 w-1/2 rounded-full bg-muted" />
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="h-4 rounded-full bg-muted" />
              <div className="h-4 rounded-full bg-muted" />
              <div className="h-4 rounded-full bg-muted" />
              <div className="h-4 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function CarsMostSearchedState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/70 px-6 text-center">
      <Search className="mb-4 size-8 text-primary" />
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function CarsMostSearched() {
  const { t, dir, isRtl } = useI18n();
  const { data, isLoading, error } = useGetCars();
  const scrollRef = useRef<HTMLDivElement>(null);

  const response = data as { data?: CarSummary[] } | undefined;
  const cars = Array.isArray(response?.data) ? response.data : [];

  const scroll = (direction: "previous" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const distance = container.clientWidth * 0.82;
    const offset =
      direction === "previous"
        ? isRtl
          ? distance
          : -distance
        : isRtl
          ? -distance
          : distance;

    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section dir={dir} className="bg-background py-24">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <ShieldCheck className="size-4" />
              {t("most.badge", "Saudi market favorites")}
            </div>

            <SectionHeader
              title={t("most.title", "Most Searched Vehicles")}
              subtitle={t(
                "most.subtitle",
                "A curated look at the cars customers in Saudi Arabia are comparing most right now.",
              )}
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground sm:inline-flex">
              {t("most.count", "Live picks")}
            </span>

            <div className="flex gap-2 rtl:flex-row-reverse">
              <CarouselButton
                direction="left"
                label={t("most.previous", "Previous cars")}
                onClick={() => scroll("previous")}
              />
              <CarouselButton
                direction="right"
                label={t("most.next", "Next cars")}
                onClick={() => scroll("next")}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-background to-transparent md:block",
              isRtl && "left-auto right-0 bg-gradient-to-l",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-background to-transparent md:block",
              isRtl && "left-0 right-auto bg-gradient-to-r",
            )}
          />

          <div
            ref={scrollRef}
            className="no-scrollbar flex w-full snap-x gap-5 overflow-x-auto scroll-smooth pb-5 pt-1 sm:gap-6"
          >
            {isLoading ? (
              <CarsMostSearchedSkeleton />
            ) : error ? (
              <CarsMostSearchedState
                title={t("most.errorTitle", "Cars are unavailable")}
                description={t(
                  "most.errorDescription",
                  "We could not load the most searched vehicles right now. Please try again shortly.",
                )}
              />
            ) : cars.length > 0 ? (
              cars.map((car) => (
                <div key={car.id} className="flex-none snap-start">
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <CarsMostSearchedState
                title={t("most.emptyTitle", "No cars to show yet")}
                description={t(
                  "most.emptyDescription",
                  "Once listings are available, the most searched cars will appear here.",
                )}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
