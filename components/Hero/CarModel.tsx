"use client";

import { memo, useEffect, useState } from "react";

const MODEL_SRC = "/model/2025_chery_jaecoo_j7.glb";
const POSTER_SRC = "/images/swap-car-hero-suv.png";

function StaticCarFallback() {
  const [hasPoster, setHasPoster] = useState(true);

  if (!hasPoster) {
    return (
      <div className="absolute inset-x-8 top-20 rounded-[2rem] border border-white/14 bg-white/10 p-8 text-center text-sm font-bold text-white/80 backdrop-blur-xl sm:top-28">
        {/* Add an optimized /public/images/swap-car-hero-suv.png render for the mobile/static fallback. */}
        صورة السيارة غير متوفرة مؤقتا
      </div>
    );
  }

  return (
    <img
      src={POSTER_SRC}
      alt="Swap Car luxury SUV"
      width={980}
      height={620}
      loading="eager"
      decoding="async"
      onError={() => setHasPoster(false)}
      className="absolute left-1/2 top-1/2 h-auto w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_32px_50px_rgba(0,0,0,0.45)] sm:w-[104%]"
    />
  );
}

function CarModel() {
  const [shouldLoadViewer, setShouldLoadViewer] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    setShouldLoadViewer(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldLoadViewer(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadViewer || viewerReady) {
      return;
    }

    let isMounted = true;

    void import("@google/model-viewer").then(() => {
      if (isMounted) {
        setViewerReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [shouldLoadViewer, viewerReady]);

  return (
    <div className="relative h-[360px] w-full overflow-hidden [contain:layout_paint_style] sm:h-[460px] lg:h-[650px]">
      <div className="relative h-full w-full lg:hidden">
        <StaticCarFallback />
      </div>

      <div className="relative hidden h-full w-full lg:block">
        {!viewerReady && <StaticCarFallback />}

        {viewerReady && (
          <model-viewer
            className="h-full w-full"
            src={MODEL_SRC}
            alt="Swap Car luxury SUV"
            poster={POSTER_SRC}
            auto-rotate
            camera-controls
            disable-zoom
            shadow-intensity="0.8"
            shadow-softness="0.85"
            exposure="1.05"
            environment-image="neutral"
            camera-orbit="-32deg 72deg 4.4m"
            field-of-view="27deg"
            loading="lazy"
            reveal="auto"
            interaction-prompt="none"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              contain: "layout paint style",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(CarModel);
