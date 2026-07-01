import type React from "react";

type Booleanish = boolean | "true" | "false" | "";

interface ModelViewerElementAttributes
  extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: "auto" | "lazy" | "eager" | string;
  reveal?: "auto" | "interaction" | "manual" | string;
  "interaction-prompt"?: "auto" | "when-focused" | "none" | string;
  ar?: Booleanish;
  "ar-modes"?: string;
  "auto-rotate"?: Booleanish;
  "camera-controls"?: Booleanish;
  "disable-zoom"?: Booleanish;
  "shadow-intensity"?: number | string;
  "shadow-softness"?: number | string;
  exposure?: number | string;
  "environment-image"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  scale?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementAttributes;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementAttributes;
    }
  }
}

export {};
