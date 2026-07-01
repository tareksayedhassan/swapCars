"use client";

import React, { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/ui/marquee";
import useGetAllBrands from "@/hooks/Brands/useGetAllBrands";
import { ImageProvider } from "@/service/apis";
import { useI18n } from "@/locales/i18n";

const BrandCard = React.memo(
  ({ brand, imageSrc }: { brand: any; imageSrc: string }) => (
    <div className="group mx-4 flex h-20 min-w-[200px] items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 shadow-sm transition-transform duration-300 will-change-transform hover:scale-105 sm:min-w-[260px]">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0">
          <img
            src={`${ImageProvider}/${imageSrc}`}
            alt={brand.name}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="whitespace-nowrap text-base font-bold text-[#111111] sm:text-lg">
          {brand.name}
        </span>
      </div>
    </div>
  ),
);

BrandCard.displayName = "BrandCard";

export default function Brands() {
  const { t } = useI18n();
  const { data, isLoading } = useGetAllBrands();

  const { firstRow, secondRow } = useMemo(() => {
    const brands = data?.data || [];
    const half = Math.ceil(brands.length / 2);
    return {
      firstRow: brands.slice(0, half),
      secondRow: brands.slice(half),
    };
  }, [data]);

  if (isLoading) return <div className="py-24 text-center">Loading...</div>;

  return (
    <section className="relative overflow-hidden bg-[#F4F5F6] py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="mb-16">
          <SectionHeader
            title={t("brands.title", "Premium Brands")}
            subtitle={t(
              "brands.subtitle",
              "Browse premium vehicles and get funding immediately",
            )}
          />
        </div>

        <div className="relative flex flex-col gap-y-8 [transform:translateZ(0)]">
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((brand: any) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  imageSrc={brand.image_url}
                />
              ))}
            </Marquee>
          </div>

          <div className="relative overflow-hidden">
            <Marquee reverse pauseOnHover className="[--duration:22s]">
              {secondRow.map((brand: any) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  imageSrc={brand.image_url}
                />
              ))}
            </Marquee>
          </div>

          {/* Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F4F5F6] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F4F5F6] to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
