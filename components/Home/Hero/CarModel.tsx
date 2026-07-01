"use client";

import { memo, useEffect, useState, useSyncExternalStore } from "react";

const MODEL_SRC = "/model/2025_chery_jaecoo_j7.glb";
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribeToDesktopMediaQuery(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getDesktopMediaQuerySnapshot() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(DESKTOP_MEDIA_QUERY).matches
  );
}

function CarModel({ altText }: { altText: string }) {
  const shouldLoadViewer = useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    () => false,
  );
  const [viewerReady, setViewerReady] = useState(false);

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
      <div className="relative hidden h-full w-full lg:block">
        {!viewerReady}

        {viewerReady && (
          <model-viewer
            className="h-full w-full"
            src={MODEL_SRC}
            alt={altText}
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
