"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor trail: your REAL system cursor stays visible and untouched.
 * This only adds a soft glowing ring that lags behind it for a bit of
 * flair, and grows/recolors when hovering interactive elements
 * (data-cursor="link"|"view"). Disabled entirely on touch/coarse-pointer devices.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "view">("default");

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        setVisible(true);
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      setVariant((target?.dataset.cursor as "link" | "view") ?? "default");
    };

    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const ringSize = variant === "default" ? 32 : variant === "link" ? 52 : 68;

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 z-[199] pointer-events-none rounded-full border-2 transition-[width,height,border-color,background-color,opacity] duration-200 ease-out flex items-center justify-center"
      style={{
        width: ringSize,
        height: ringSize,
        opacity: visible ? 1 : 0,
        borderColor: variant === "default" ? "rgba(255,107,74,0.6)" : "rgba(74,158,255,0.8)",
        backgroundColor: variant === "view" ? "rgba(74,158,255,0.1)" : "transparent",
        willChange: "transform",
      }}
    >
      {variant === "view" && (
        <span className="font-mono-stack text-[9px] uppercase tracking-widest text-signal-blue">
          view
        </span>
      )}
    </div>
  );
}
