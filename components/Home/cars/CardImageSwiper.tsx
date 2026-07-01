"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { ImageProvider } from "@/service/apis";

/* ── Props ──────────────────────────────────────────────────────────── */

export type CardImage = {
  image_url: string;
};

interface CardImageSwiperProps {
  /** Array of inventory images to display */
  images: CardImage[];

  /** Alt text for images */
  alt: string;
  /** Fallback element shown when there are no images */
  fallback: React.ReactNode;
  /** sizes attribute for next/image */
  sizes?: string;
  /** Additional class names for the root wrapper */
  className?: string;
  /** Compact mode — renders as a small, self-contained thumbnail (not absolute-positioned) */
  compact?: boolean;
}

export function CardImageSwiper({
  images,
  alt,
  fallback,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  compact = false,
}: CardImageSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  /* ── Shared style tokens ────────────────────────────────────────────── */
  const wrapperBase = compact
    ? "relative w-40 h-28 shrink-0 rounded-xl overflow-hidden shadow-sm group/compact"
    : "absolute inset-0 z-0";

  if (!images || images.length === 0) {
    return compact ? (
      <div className={`${wrapperBase} ${className ?? ""}`}>{fallback}</div>
    ) : (
      <>{fallback}</>
    );
  }

  /* Single image — no carousel needed */
  if (images.length === 1) {
    return (
      <div className={`${wrapperBase} ${className ?? ""}`}>
        <Image
          loader={({ src }) => src}
          src={`${ImageProvider}/${images[0].image_url}`}
          alt={alt}
          fill
          unoptimized
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  /* Multiple images — render Swiper carousel */
  return (
    <div className={`${wrapperBase} ${className ?? ""}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={`card-image-swiper h-full w-full ${
          compact ? "card-image-swiper--compact" : ""
        }`}
        /* Prevent card click from propagating when swiping */
        onTouchStart={(_, e) => e.stopPropagation?.()}
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.image_url || i}>
            <div className="relative w-full h-full">
              <Image
                loader={({ src }) => src}
                src={`${ImageProvider}/${img.image_url}`}
                alt={`${alt} — image ${i + 1} of ${images.length}`}
                fill
                unoptimized
                sizes={sizes}
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Custom Prev / Next Arrows ────────────────────────────────── */}
      {compact ? (
        /* Compact arrows — smaller, reveal on hover via group/compact */
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slidePrev();
            }}
            aria-label="Previous image"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10
                       flex size-5 items-center justify-center rounded-full
                       bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow
                       hover:bg-white dark:hover:bg-zinc-700
                       hover:scale-110 active:scale-90 transition-all
                       opacity-0 group-hover/compact:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="size-3 text-zinc-700 dark:text-zinc-200" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slideNext();
            }}
            aria-label="Next image"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10
                       flex size-5 items-center justify-center rounded-full
                       bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow
                       hover:bg-white dark:hover:bg-zinc-700
                       hover:scale-110 active:scale-90 transition-all
                       opacity-0 group-hover/compact:opacity-100 cursor-pointer"
          >
            <ChevronRight className="size-3 text-zinc-700 dark:text-zinc-200" />
          </button>
        </>
      ) : (
        /* Full-size arrows */
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slidePrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       flex size-7 items-center justify-center rounded-full
                       bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-md
                       hover:bg-white dark:hover:bg-zinc-900
                       hover:scale-110 active:scale-95 transition-all
                       opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="size-4 text-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slideNext();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       flex size-7 items-center justify-center rounded-full
                       bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-md
                       hover:bg-white dark:hover:bg-zinc-900
                       hover:scale-110 active:scale-95 transition-all
                       opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="size-4 text-foreground" />
          </button>
        </>
      )}

      {/* ── Image Counter (hidden in compact mode) ───────────────────── */}
      {!compact && (
        <div className="absolute top-2 right-2 z-10 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm pointer-events-none">
          {images.length} photos
        </div>
      )}
    </div>
  );
}
