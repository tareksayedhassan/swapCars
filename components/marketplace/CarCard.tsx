import React from "react";
import { Car, SaudiRiyal } from "lucide-react";
import { Card } from "../ui/card";

import { ArrowUpDown, Fuel, Gauge, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/store/useFilter";
import { CardImageSwiper } from "../Home/cars/CardImageSwiper";
import { getCarLabel } from "../Home/cars/getCarLabel";
import { Badge } from "../ui/badge";
import SpecChip from "../Home/cars/SpecChip";

const CarCard = ({ car, variant = "carousel" }: any) => {
  const router = useRouter();
  return (
    <div
      className={
        variant === "grid" || variant === "list" ? "w-full h-full" : ""
      }
    >
      <div
        className={
          variant === "grid" || variant === "list"
            ? "w-full h-full"
            : "h-full w-[min(300px,calc(100vw-2rem))] flex-none scroll-snap-align-start md:w-[330px] lg:w-[350px]"
        }
      >
        <Card
          onClick={() => router.push(`/cars/${car.id}`)}
          className={`cursor-pointer group flex overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-950 shadow-sm ${
            variant === "list"
              ? "flex-col sm:flex-row h-auto items-stretch min-w-0"
              : "flex-col h-full"
          }`}
        >
          {/* Image Section */}
          <div
            className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${
              variant === "list"
                ? "w-full sm:w-[320px] shrink-0 aspect-16/10"
                : "aspect-16/10"
            }`}
          >
            <CardImageSwiper
              images={car.InventoryImage ?? []}
              alt={getCarLabel(car)}
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <Car className="size-12 text-muted-foreground/20" />
                </div>
              }
            />

            <div className="absolute top-3 left-3 z-20">
              {car.condition && (
                <Badge className="bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-900 backdrop-blur-sm border-none dark:bg-zinc-800/90 dark:text-zinc-100">
                  {car.condition}
                </Badge>
              )}
            </div>

            <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between">
              <div className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg flex items-center gap-1">
                <SaudiRiyal size={14} /> {car.price}
              </div>
              <div className="flex gap-1">
                {car.make && (
                  <span className="rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                    {car.make}
                  </span>
                )}
                {car.origin && (
                  <span className="rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                    {car.origin}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Content Body */}
            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 justify-center">
              <div>
                <h3 className="line-clamp-1 text-sm font-bold tracking-tight">
                  {getCarLabel(car)}
                </h3>
                <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
                  <p className="min-w-0 truncate text-xs text-muted-foreground">
                    {car.color_exterior}
                  </p>
                  {car.category && (
                    <span className="shrink-0 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                      {car.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <SpecChip icon={Gauge}>{car.mileage} mi</SpecChip>
                <SpecChip icon={Fuel}>{car.fuel_type}</SpecChip>
                <SpecChip icon={ArrowUpDown}>{car.transmission}</SpecChip>
                <SpecChip icon={Zap}>{car.horsepower} HP</SpecChip>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarCard;
