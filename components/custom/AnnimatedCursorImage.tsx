"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function AnimatedCursorZoomImage({ src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const move = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    container.addEventListener("mousemove", move);
    return () => container.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      className="group relative h-110 cursor-none overflow-hidden rounded-3xl"
    >
      {/* IMAGE */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* DARK OVERLAY (optional) */}
      <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />

      {/* CUSTOM CURSOR */}
      {showCursor && (
        <div
          className="pointer-events-none absolute z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs font-semibold text-white backdrop-blur-md transition-transform duration-75"
          style={{
            transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
          }}
        >
          ZOOM
        </div>
      )}
    </div>
  );
}
