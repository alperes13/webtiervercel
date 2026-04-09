"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { MoveDirection, MoveDirectionAlt, RecursivePartial, IOptions } from "@tsparticles/engine";

type SparklesDirection =
  | "none"
  | "bottom"
  | "left"
  | "right"
  | "top"
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight"
  | "outside"
  | "inside"
  | MoveDirection
  | MoveDirectionAlt;

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Record<string, unknown>;
  direction?: SparklesDirection;
}

let particlesEnginePromise: Promise<void> | null = null;

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
  direction = "none",
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    if (!particlesEnginePromise) {
      particlesEnginePromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }

    particlesEnginePromise.then(() => setIsReady(true));
  }, [shouldRender]);

  const particleOptions = useMemo<RecursivePartial<IOptions>>(
    () => ({
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      detectRetina: false,
      fpsLimit: 60,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        color: {
          value: color,
        },
        move: {
          enable: true,
          direction,
          straight: false,
          outModes: {
            default: "out",
          },
          speed: {
            min: minSpeed ?? Math.max(speed * 0.35, 0.2),
            max: speed,
          },
        },
        number: {
          value: density,
          density: {
            enable: true,
            width: 1200,
            height: 800,
          },
        },
        opacity: {
          value: {
            min: minOpacity ?? Math.max(opacity * 0.18, 0.1),
            max: opacity,
          },
          animation: {
            enable: true,
            speed: opacitySpeed,
            sync: false,
          },
        },
        size: {
          value: {
            min: minSize ?? Math.max(size * 0.6, 1),
            max: size,
          },
        },
      },
      ...options,
    }),
    [
      background,
      color,
      density,
      direction,
      minOpacity,
      minSize,
      minSpeed,
      opacity,
      opacitySpeed,
      options,
      size,
      speed,
    ]
  );

  return (
    <div ref={containerRef} className={className}>
      {shouldRender && isReady ? (
        <Particles
          id={id}
          className="pointer-events-none absolute inset-0"
          options={particleOptions}
        />
      ) : null}
    </div>
  );
}
