"use client";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// BlurText
export function BlurText({
  text = "",
  delay = 300,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.35,
}: {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromStyle = useMemo(
    () => (direction === "top" ? { filter: "blur(10px)", opacity: 0, transform: "translateY(-20px)" } : { filter: "blur(10px)", opacity: 0, transform: "translateY(20px)" }),
    [direction]
  );
  const toStyle = { filter: "blur(0px)", opacity: 1, transform: "translateY(0px)" };
  const totalDurationMs = stepDuration * 1000;

  return (
    <p className={`blur-text ${className} flex flex-wrap`} ref={ref}>
      {elements.map((segment, index) => {
        const style: React.CSSProperties = {
          display: "inline-block",
          willChange: "transform, filter, opacity",
          transition: `transform ${totalDurationMs}ms ease, filter ${totalDurationMs}ms ease, opacity ${totalDurationMs}ms ease`,
          transitionDelay: `${(index * delay) / 1000}s`,
          ...(inView ? toStyle : fromStyle),
        };
        return (
          <span key={index} style={style}>
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </p>
  );
}

// Marquee (magicui-like)
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  className = "",
  durationSec = 20,
  gap = 24,
}: {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  durationSec?: number;
  gap?: number;
}) {
  const items = Array.isArray(children) ? (children as ReactNode[]) : [children];
  return (
    <div className={cn("group relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max items-center"
        style={{
          gap: `${gap}px`,
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${durationSec}s linear infinite`,
          animationPlayState: pauseOnHover ? "running" : undefined,
        }}
      >
        {items}
        {items}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .group:hover div[style*="animation"] {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
    </div>
  );
}

// Reveal on scroll
export function Reveal({
  children,
  delay = 2,
  y = 90,
  x = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShow(true), delay);
        } else {
          setShow(false);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: show ? "translate(0px, 0px) scale(1)" : `translate(${x}px, ${y}px) scale(0.96)`,
        opacity: show ? 1 : 0,
        transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

// LogoLoop
export function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#F4F5F6",
  fadeWidth = 64,
  ariaLabel = "Brand partners",
}: {
  logos: { src: string; alt: string; href?: string; title?: string }[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  fadeWidth?: number;
  ariaLabel?: string;
}) {
  const items = [...logos, ...logos];
  const totalWidth = (logoHeight * 2 + gap) * logos.length;
  const duration = Math.max(8, Math.round(totalWidth / speed));
  const animName = direction === "left" ? "loop-left" : "loop-right";
  return (
    <div role="region" aria-label={ariaLabel} className="group relative w-full overflow-hidden" style={{ height: `${logoHeight + 24}px` }}>
      {fadeOut ? (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0" style={{ width: `${fadeWidth}px`, background: `linear-gradient(90deg, ${fadeOutColor} 0%, rgba(255,255,255,0) 100%)` }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0" style={{ width: `${fadeWidth}px`, background: `linear-gradient(270deg, ${fadeOutColor} 0%, rgba(255,255,255,0) 100%)` }} />
        </>
      ) : null}
      <div className="flex w-max items-center" style={{ gap: `${gap}px`, animation: `${animName} ${duration}s linear infinite`, animationPlayState: pauseOnHover ? "running" : undefined }}>
        {items.map((l, i) => {
          const Card = (
            <div key={`${l.src}-${i}`} className={`flex items-center justify-center rounded-3xl border border-[#DFE3E8] bg-white px-6 transition ${scaleOnHover ? "hover:scale-[1.04]" : ""}`} style={{ minHeight: `${logoHeight + 16}px`, minWidth: `${logoHeight * 3}px` }} title={l.title ?? l.alt}>
              <Image src={l.src} alt={l.alt} width={logoHeight} height={logoHeight} className="object-contain" />
              <span className="ml-2 text-lg font-bold tracking-tight text-[#111111]">{l.title ?? l.alt}</span>
            </div>
          );
          return l.href ? (
            <a key={`a-${l.src}-${i}`} href={l.href} aria-label={l.title ?? l.alt}>
              {Card}
            </a>
          ) : (
            Card
          );
        })}
      </div>
      <style jsx>{`
        @keyframes loop-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes loop-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .group:hover div[style*="animation"] {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
    </div>
  );
}

// NeonGradientCard
export const NeonGradientCard: React.FC<{
  as?: ReactElement;
  className?: string;
  children?: ReactNode;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: { firstColor: string; secondColor: string; thirdColor?: string };
}> = ({ className, children, borderSize = 2, borderRadius = 20, neonColors = { firstColor: "#00bf63", secondColor: "#3bffa1", thirdColor: "#4b4d4e" }, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--neon-third-color": neonColors.thirdColor ?? "",
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor}${neonColors.thirdColor ? `, ${neonColors.thirdColor}` : ""})`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--after-blur": `${dimensions.width / 3}px`,
        } as CSSProperties
      }
      className={cn("relative z-10 size-full rounded-(--border-radius)", className)}
      {...props}
    >
      <div
        className={cn(
          "relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-white p-6",
          "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
          "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:content-['']",
          "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color),var(--neon-third-color))] before:bg-size-[100%_200%]",
          "before:animate-background-position-spin",
          "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
          "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur) after:content-['']",
          "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color),var(--neon-third-color))] after:bg-size-[100%_200%] after:opacity-80",
          "after:animate-background-position-spin",
          "wrap-break-word"
        )}
      >
        {children}
      </div>
    </div>
  );
};

// AnimatedThemeToggler
export function AnimatedThemeToggler() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    // Do not set state to avoid lint rule; just set document class.
    // Icon/title remain neutral to avoid hydration mismatch.
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
      title="Toggle theme"
    >
      <span className="text-lg">🌗</span>
    </button>
  );
}
