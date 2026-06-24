"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ConnectionGraph = dynamic(() => import("./ConnectionGraph"), {
  ssr: false,
});

/**
 * Renders the full WebGL connection graph on capable devices, and a static
 * CSS gradient + grain fallback when the user prefers reduced motion or is
 * on a narrow/low-power device. Keeps the hero meaningful either way.
 */
export default function HeroBackground() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isNarrow = window.innerWidth < 640;
    setShouldRender3D(!prefersReducedMotion && !isNarrow);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-raised" />
      <div className="absolute inset-0 bg-grain opacity-60" />
      {shouldRender3D && (
        <Suspense fallback={null}>
          <ConnectionGraph />
        </Suspense>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
    </div>
  );
}
