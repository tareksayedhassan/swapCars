import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        "disable-zoom"?: boolean | string;
        "shadow-intensity"?: number | string;
        "shadow-softness"?: number | string;
        exposure?: number | string;
        "environment-image"?: string;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        scale?: string;
        style?: React.CSSProperties;
        className?: string;
      };
    }
  }
}

export {};
