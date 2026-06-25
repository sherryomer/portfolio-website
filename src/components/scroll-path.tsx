"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

// Sections the journey line connects, in vertical order down the page.
const SECTION_IDS = ["hero", "experience", "projects", "skills", "education", "contact"]

type Point = { x: number; y: number }

// SSR-safe layout effect (avoids hydration warning when there's no DOM).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Build a smooth vertical S-curve through the anchor points using cubic beziers
// whose control points sit at the vertical midpoint between neighbours. This
// makes the left/right crossings happen in the gaps *between* sections.
function buildPath(points: Point[]): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const midY = (prev.y + cur.y) / 2
    d += ` C ${prev.x.toFixed(1)} ${midY.toFixed(1)}, ${cur.x.toFixed(1)} ${midY.toFixed(
      1
    )}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`
  }
  return d
}

export function ScrollPath() {
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [points, setPoints] = useState<Point[]>([])
  const [active, setActive] = useState<boolean[]>(() => SECTION_IDS.map(() => false))
  const reducedMotion = useRef(false)

  // Scroll progress across the whole document (0 at top → 1 at bottom).
  const { scrollYProgress } = useScroll()
  // Smooth the raw progress so the line draws fluidly instead of snapping.
  const drawProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  })

  // Measure the document + each section, then compute the winding anchor points.
  const measure = () => {
    if (typeof window === "undefined") return

    const width = document.documentElement.clientWidth
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )
    const scrollY = window.scrollY

    const isMobile = width < 768
    const cx = width / 2

    // Desktop: anchors sit near the edges of the centered content (max-w-5xl ≈
    // 1024px) so the line sweeps through the gutters and inter-section gaps.
    // Mobile: keep a thin, gently-waving line pinned to the left gutter.
    const amplitude = isMobile ? Math.min(width * 0.06, 22) : Math.min(width * 0.3, 340)
    const baseX = isMobile ? Math.max(width * 0.07, 22) : cx

    const pts: Point[] = []
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + scrollY + rect.height / 2
      // Alternate sides to create the winding/snake effect.
      const dir = i % 2 === 0 ? -1 : 1
      // Hero (first) starts centred for a clean entry point.
      const offset = i === 0 ? (isMobile ? 0 : 0) : dir * amplitude
      pts.push({ x: baseX + offset, y: centerY })
    })

    setDims({ width, height })
    setPoints(pts)
  }

  useIsoLayoutEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    measure()

    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    window.addEventListener("resize", onResize)

    // Recompute when content reflows (fonts/images loading, dynamic heights).
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)

    // One more pass after fonts settle.
    const t = window.setTimeout(measure, 400)

    return () => {
      window.removeEventListener("resize", onResize)
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Activate a section's node once it scrolls into view (stays lit afterwards).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = [...prev]
          let changed = false
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const idx = SECTION_IDS.indexOf(entry.target.id)
            if (idx !== -1 && !next[idx]) {
              next[idx] = true
              changed = true
            }
          })
          return changed ? next : prev
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
  const accent = "#22d3ee" // cyan-400, matches the site accent

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 top-0 left-0 z-[1] overflow-hidden"
      style={{ height: dims.height }}
    >
      <svg
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        fill="none"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="scrollpath-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <filter id="scrollpath-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint full track of the road (undrawn portion). */}
        <path
          d={pathD}
          stroke="#ffffff"
          strokeOpacity={0.06}
          strokeWidth={strokeW}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* The drawn portion — reveals from top to bottom as you scroll. */}
        <motion.path
          d={pathD}
          stroke="url(#scrollpath-grad)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#scrollpath-glow)"
          style={
            reducedMotion.current
              ? { pathLength: 1, opacity: 0.7 }
              : { pathLength: drawProgress, opacity: 0.85 }
          }
        />

        {/* Section nodes — glow once their section is reached. */}
        {points.map((p, i) => {
          const lit = active[i]
          return (
            <g key={SECTION_IDS[i]}>
              {/* outer halo */}
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 9 : 5}
                fill={accent}
                opacity={lit ? 0.18 : 0.08}
                style={{ transition: "r 400ms ease, opacity 400ms ease" }}
              />
              {/* core node */}
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 4 : 2.5}
                fill={lit ? accent : "#475569"}
                filter={lit ? "url(#scrollpath-glow)" : undefined}
                style={{ transition: "r 400ms ease, fill 400ms ease" }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
