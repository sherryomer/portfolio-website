"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"

// Sections the journey line connects, top to bottom.
const SECTION_IDS = ["hero", "experience", "projects", "skills", "education", "contact"]

type Point = { x: number; y: number }

// SSR-safe layout effect.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Smooth vertical curve through the anchors: cubic beziers whose control points
// sit at the vertical midpoint between neighbours, so transitions stay gentle.
function buildPath(points: Point[]): string {
  if (points.length < 2) return points.length ? `M ${points[0].x} ${points[0].y}` : ""
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const my = ((prev.y + cur.y) / 2).toFixed(1)
    d += ` C ${prev.x.toFixed(1)} ${my}, ${cur.x.toFixed(1)} ${my}, ${cur.x.toFixed(
      1
    )} ${cur.y.toFixed(1)}`
  }
  return d
}

export function ScrollPath() {
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [points, setPoints] = useState<Point[]>([])
  const [active, setActive] = useState<boolean[]>(() => SECTION_IDS.map(() => false))
  const reduced = useRef(false)
  const last = useRef({ width: 0, height: 0 })

  // Draw progress is tied DIRECTLY to scroll (no spring) so there's zero idle
  // repaint work — the line only redraws while the user is actually scrolling.
  const { scrollYProgress } = useScroll()

  const measure = () => {
    if (typeof window === "undefined") return

    const width = document.documentElement.clientWidth
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )

    // Skip redundant updates (avoids re-render storms from sub-pixel reflows).
    if (
      width === last.current.width &&
      Math.abs(height - last.current.height) < 4 &&
      points.length
    ) {
      return
    }
    last.current = { width, height }

    const scrollY = window.scrollY
    const isMobile = width < 768

    // A consistent left-margin "rail". On wide screens it sits in the gutter to
    // the left of the centred content (max-w-5xl ≈ 1024px); on narrow screens it
    // tucks into the section padding. It never crosses the content.
    const contentHalf = 512
    const gutterLeft = Math.max(width / 2 - contentHalf, 0)
    const laneX = isMobile
      ? 22
      : Math.max(36, Math.min(gutterLeft - 44, 132))
    const amp = isMobile ? 8 : 22

    const pts: Point[] = []
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + scrollY + rect.height / 2
      // Gentle alternating wave; first node starts on the rail centre.
      const offset = i === 0 ? 0 : (i % 2 === 0 ? -1 : 1) * amp
      pts.push({ x: laneX + offset, y: centerY })
    })

    setDims({ width, height })
    setPoints(pts)
  }

  useIsoLayoutEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    measure()

    let raf = 0
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    window.addEventListener("resize", schedule)
    // Recompute when the document height changes (fonts/images, dynamic content).
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    // Settle pass after fonts load.
    const t = window.setTimeout(measure, 450)

    return () => {
      window.removeEventListener("resize", schedule)
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Light a section's node once it enters view (stays lit afterwards).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          let next = prev
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const idx = SECTION_IDS.indexOf(entry.target.id)
            if (idx !== -1 && !next[idx]) {
              if (next === prev) next = [...prev]
              next[idx] = true
            }
          })
          return next
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  if (dims.width === 0 || points.length < 2) return null

  const isMobile = dims.width < 768
  const pathD = buildPath(points)
  const strokeW = isMobile ? 1.5 : 2

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        height: dims.height,
        // Promote to its own GPU layer so page scrolling just translates this
        // layer instead of triggering main-thread repaints of a huge surface.
        transform: "translateZ(0)",
        willChange: "transform",
        contain: "layout paint style",
      }}
    >
      <svg
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        fill="none"
        shapeRendering="geometricPrecision"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="scrollpath-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Faint full track (painted once, never animates). */}
        <path
          d={pathD}
          stroke="#ffffff"
          strokeOpacity={0.07}
          strokeWidth={strokeW}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Drawn portion — reveals top→bottom, bound straight to scroll. No
            filters, so the per-frame repaint stays cheap. */}
        <motion.path
          d={pathD}
          stroke="url(#scrollpath-grad)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeOpacity={0.9}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduced.current ? 1 : scrollYProgress }}
        />

        {/* Section nodes — glow (via cheap concentric circles) once reached. */}
        {points.map((p, i) => {
          const lit = active[i]
          return (
            <g key={SECTION_IDS[i]}>
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 11 : 0}
                fill="#22d3ee"
                opacity={lit ? 0.14 : 0}
                style={{ transition: "r 350ms ease, opacity 350ms ease" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 6.5 : 4}
                fill="#22d3ee"
                opacity={lit ? 0.28 : 0}
                style={{ transition: "r 350ms ease, opacity 350ms ease" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 3.5 : 2.5}
                fill={lit ? "#67e8f9" : "#475569"}
                style={{ transition: "r 350ms ease, fill 350ms ease" }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
