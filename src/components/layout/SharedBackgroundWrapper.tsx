"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => ({ default: mod.MeshGradient })),
  { ssr: false }
);

interface SharedBackgroundWrapperProps {
  children: React.ReactNode;
}

export default function SharedBackgroundWrapper({ children }: SharedBackgroundWrapperProps) {
  // Start as false — MeshGradient only added after hydration on desktop.
  // This avoids any hydration mismatch and prevents a flash/reflow.
  const [showShader, setShowShader] = useState(false);

  useEffect(() => {
    // Only enable the shader on non-mobile, non-reduced-motion devices
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile && !prefersReduced) {
      setShowShader(true);
    }
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden border-y border-white/5">
      {/* Static gradient — always present, zero JS cost */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)" }}
      />

      {/* WebGL shader — only on desktop after hydration, fades in */}
      {showShader && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-50">
          <MeshGradient
            className="w-full h-full scale-[2]"
            colors={[
              "#000000", "#020617", "#06b6d4", "#22d3ee", "#67e8f9", "#0891b2",
              "#0ea5e9", "#1e1b4b", "#312e81", "#0f172a", "#111827", "#f97316",
              "#fb923c", "#164e63", "#0891b2", "#0369a1", "#075985", "#1e1b4b",
              "#2e1065", "#4c1d95", "#312e81", "#1e3a8a", "#172554", "#042f2e"
            ]}
            speed={0.15}
          />
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
