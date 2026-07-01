import React from "react";

export default function Loading() {
  const rawId = React.useId().replace(/:/g, "");
  const windowClipId = `swapcar-window-clip-${rawId}`;
  const carStrokeId = `swapcar-car-stroke-${rawId}`;
  const glassGradientId = `swapcar-glass-${rawId}`;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/95 backdrop-blur-[2px]">
      <div
        className="relative flex h-[220px] w-[350px] items-center justify-center"
        style={
          {
            "--swapcar-primary": "#C04944",
            "--swapcar-red": "#c01810",
            "--swapcar-orange": "#c96b32",
          } as React.CSSProperties
        }
        aria-label="Loading"
        role="status"
      >
        {/* soft background glow */}
        <div className="swapcar-glow" />

        {/* speed lines */}
        <span className="swapcar-speed-line swapcar-speed-line-1" />
        <span className="swapcar-speed-line swapcar-speed-line-2" />
        <span className="swapcar-speed-line swapcar-speed-line-3" />

        {/* moving belt */}
        <div className="swapcar-belt absolute bottom-[40px] z-0 h-[20px] w-[285px] overflow-hidden rounded-full shadow-inner">
          <div className="swapcar-belt-track" />
        </div>

        {/* shadow */}
        <div className="swapcar-shadow absolute bottom-[65px] z-0 h-[12px] w-[165px] rounded-full bg-black/10 blur-[2px]" />

        {/* car */}
        <svg
          viewBox="0 0 150 82"
          className="swapcar-car relative z-10 w-[215px] drop-shadow-[0_14px_16px_rgba(0,0,0,0.14)]"
        >
          <defs>
            <linearGradient id={carStrokeId} x1="0" y1="0" x2="150" y2="82">
              <stop offset="0%" stopColor="#C04944" />
              <stop offset="55%" stopColor="#c01810" />
              <stop offset="100%" stopColor="#c96b32" />
            </linearGradient>

            <linearGradient
              id={glassGradientId}
              x1="36"
              y1="26"
              x2="117"
              y2="44"
            >
              <stop offset="0%" stopColor="#fff7f6" />
              <stop offset="100%" stopColor="#ffe3dc" />
            </linearGradient>

            <clipPath id={windowClipId}>
              <path d="M45 26h58l14 18H36z" />
            </clipPath>
          </defs>

          {/* body */}
          <path
            d="M18 50h10l15-26h58l19 26h14c7 0 12 5 12 12v5H8v-5c0-7 5-12 10-12z"
            fill="#fffdfc"
            stroke={`url(#${carStrokeId})`}
            strokeWidth="4.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* lower accent */}
          <path
            d="M18 57h116"
            fill="none"
            stroke="#c96b32"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* glass */}
          <path
            d="M45 26h58l14 18H36z"
            fill={`url(#${glassGradientId})`}
            stroke={`url(#${carStrokeId})`}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* logo on glass */}
          <image
            href="/swapcar-logo-cropped.png"
            x="46"
            y="30"
            width="60"
            height="12"
            preserveAspectRatio="xMidYMid meet"
            clipPath={`url(#${windowClipId})`}
          />

          {/* glass separators */}
          <path
            d="M60 26l-9 18M101 26l14 18"
            fill="none"
            stroke="#C04944"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* wheels */}
          <g className="swapcar-wheel">
            <circle
              cx="43"
              cy="67"
              r="10"
              fill="white"
              stroke="#c01810"
              strokeWidth="4.5"
            />
            <path
              d="M43 57v20M33 67h20M36 60l14 14M50 60L36 74"
              stroke="#C04944"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>

          <g className="swapcar-wheel">
            <circle
              cx="111"
              cy="67"
              r="10"
              fill="white"
              stroke="#c01810"
              strokeWidth="4.5"
            />
            <path
              d="M111 57v20M101 67h20M104 60l14 14M118 60l-14 14"
              stroke="#C04944"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        </svg>

        <style>{`
          .swapcar-glow {
            position: absolute;
            width: 245px;
            height: 120px;
            border-radius: 999px;
            background:
              radial-gradient(circle, rgba(192, 73, 68, 0.16), transparent 68%),
              radial-gradient(circle, rgba(201, 107, 50, 0.12), transparent 72%);
            filter: blur(10px);
            transform: translateY(6px);
          }

          .swapcar-speed-line {
            position: absolute;
            left: 24px;
            height: 3px;
            border-radius: 999px;
            background: linear-gradient(
              90deg,
              transparent,
              var(--swapcar-orange),
              var(--swapcar-primary),
              transparent
            );
            opacity: 0;
            animation: swapcarSpeedMove 0.85s linear infinite;
          }

          .swapcar-speed-line-1 {
            top: 82px;
            width: 58px;
          }

          .swapcar-speed-line-2 {
            top: 106px;
            width: 38px;
            animation-delay: 0.15s;
          }

          .swapcar-speed-line-3 {
            top: 130px;
            width: 48px;
            animation-delay: 0.3s;
          }

          .swapcar-belt {
            background: linear-gradient(
              90deg,
              var(--swapcar-red),
              var(--swapcar-primary)
            );
          }

          .swapcar-belt::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.28),
              transparent 55%,
              rgba(0, 0, 0, 0.08)
            );
            z-index: 1;
            pointer-events: none;
          }

          .swapcar-belt-track {
            width: 220%;
            height: 100%;
            background-image: repeating-linear-gradient(
              90deg,
              var(--swapcar-orange) 0 28px,
              transparent 28px 54px
            );
            opacity: 0.9;
            animation: swapcarBeltMove 0.52s linear infinite;
          }

          .swapcar-car {
            animation: swapcarCarFloat 0.75s ease-in-out infinite;
          }

          .swapcar-wheel {
            animation: swapcarWheelSpin 0.55s linear infinite;
            transform-box: fill-box;
            transform-origin: center;
          }

          .swapcar-shadow {
            animation: swapcarShadowPulse 0.75s ease-in-out infinite;
          }

          @keyframes swapcarCarFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-7px) rotate(-1deg);
            }
          }

          @keyframes swapcarWheelSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes swapcarBeltMove {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-54px);
            }
          }

          @keyframes swapcarSpeedMove {
            0% {
              transform: translateX(42px);
              opacity: 0;
            }

            35% {
              opacity: 1;
            }

            100% {
              transform: translateX(-58px);
              opacity: 0;
            }
          }

          @keyframes swapcarShadowPulse {
            0%, 100% {
              transform: scaleX(1);
              opacity: 0.12;
            }

            50% {
              transform: scaleX(0.78);
              opacity: 0.22;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
