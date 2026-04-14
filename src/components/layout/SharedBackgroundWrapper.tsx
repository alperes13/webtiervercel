"use client";

import React from "react";
import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => ({ default: mod.MeshGradient })),
  { ssr: false }
);

interface SharedBackgroundWrapperProps {
  children: React.ReactNode;
}

export default function SharedBackgroundWrapper({ children }: SharedBackgroundWrapperProps) {
  return (
    <div className="relative w-full bg-black overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-50 select-none overflow-hidden w-full h-full">
        <div className="w-full h-full max-w-full overflow-hidden">
          <MeshGradient
            className="w-full h-full scale-[1.2] md:scale-[2]"
            colors={[
              "#000000", "#020617", "#06b6d4", "#22d3ee", "#67e8f9", "#0891b2",
              "#0ea5e9", "#1e1b4b", "#312e81", "#0f172a", "#111827", "#f97316",
              "#fb923c", "#164e63", "#0891b2", "#0369a1", "#075985", "#1e1b4b",
              "#2e1065", "#4c1d95", "#312e81", "#1e3a8a", "#172554", "#042f2e"
            ]}
            speed={0.4}
          />
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
