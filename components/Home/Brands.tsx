"use client";

import React, { useMemo } from "react";
import useGetAllBrands from "@/hooks/Brands/useGetAllBrands";
import { useI18n } from "@/locales/i18n";
import { ImageProvider } from "@/service/apis";

import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Brand = {
  id: string | number;
  name: string;
  image_url: string;
};

const BrandCard = React.memo(
  ({ brand, imageSrc }: { brand: Brand; imageSrc: string }) => (
    <div className="group flex h-20 min-w-[176px] items-center justify-center rounded-2xl border border-border/80 bg-card/95 px-4 shadow-[0_14px_34px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_42px_rgba(192,73,68,0.14)] sm:h-24 sm:min-w-[250px] sm:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted p-2 ring-1 ring-border/70 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 sm:h-12 sm:w-12 sm:rounded-2xl">
          <img
            src={`${ImageProvider}/${imageSrc}`}
            alt={brand.name}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <span className="truncate text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
          {brand.name}
        </span>
      </div>
    </div>
  ),
);

BrandCard.displayName = "BrandCard";

export default function Brands() {
  const { dir, t } = useI18n();
  const { data, isLoading } = useGetAllBrands();

  const { firstRow, secondRow } = useMemo(() => {
    const brands = (data?.data || []) as Brand[];
    const half = Math.ceil(brands.length / 2);

    return {
      firstRow: brands.slice(0, half),
      secondRow: brands.slice(half),
    };
  }, [data]);

  const brands = useMemo(() => {
    const mergedBrands = [...firstRow, ...secondRow];

    return [...mergedBrands, ...mergedBrands, ...mergedBrands, ...mergedBrands];
  }, [firstRow, secondRow]);

  if (isLoading) {
    return (
      <div className="bg-muted py-24 text-center font-semibold text-muted-foreground">
        {t("common.loading", "Loading...")}
      </div>
    );
  }

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-muted py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
            {t("brands.title", "Premium Brands")}
          </span>

          <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("brands.subtitle", "Browse vehicles by brand with ease")}
          </h2>
        </div>

        <div className="relative [transform:translateZ(0)]">
          <Swiper
            key={dir}
            dir={dir}
            modules={[Autoplay, FreeMode]}
            loop
            freeMode
            grabCursor
            speed={5000}
            slidesPerView="auto"
            spaceBetween={24}
            allowTouchMove
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: dir === "rtl",
            }}
            breakpoints={{
              0: {
                spaceBetween: 12,
              },
              640: {
                spaceBetween: 18,
              },
              1024: {
                spaceBetween: 24,
              },
            }}
            className="brands-swiper !overflow-visible"
          >
            {brands.map((brand, index) => (
              <SwiperSlide
                key={`${brand.id}-${index}`}
                className="!w-auto py-4"
              >
                <BrandCard brand={brand} imageSrc={brand.image_url} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-muted to-transparent rtl:bg-gradient-to-l sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-muted to-transparent rtl:bg-gradient-to-r sm:w-28" />
        </div>
      </div>

      <style jsx global>{`
        .brands-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          align-items: center;
        }
      `}</style>
    </section>
  );
}
