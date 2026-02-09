"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface Props {
  src: string
  alt: string
}

export default function AnimatedCursorZoomImage({ src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showCursor, setShowCursor] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const move = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    container.addEventListener("mousemove", move)
    return () => container.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      className="group relative h-110 rounded-3xl overflow-hidden cursor-none"
    >
      {/* IMAGE */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="
          object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
      />

      {/* DARK OVERLAY (optional) */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

      {/* CUSTOM CURSOR */}
      {showCursor && (
        <div
          className="
            pointer-events-none absolute z-20
            w-16 h-16 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/40
            flex items-center justify-center
            text-white text-xs font-semibold
            transition-transform duration-75
          "
          style={{
            transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
          }}
        >
          ZOOM
        </div>
      )}
    </div>
  )
}
