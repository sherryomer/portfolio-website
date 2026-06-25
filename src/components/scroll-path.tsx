"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"

// Sections the journey line connects, top to bottom.
const SECTION_IDS = ["hero", "experience", "projects", "skills", "education", "contact"]

type Point = { x: number; y: number }
type Geom = { railX: number; halo: number; mid: number; core: number; stroke: number }

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

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

export function ScrollPath() {
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [nodes, setNodes] = useState<Point[]>([])
  const [pathD, setPathD] = useState("")
  const [geom, setGeom] = useState<Geom>({ railX: 0, halo: 0, mid: 0, core: 0, stroke: 2 })
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
      nodes.length
    ) {
      return
    }
    last.current = { width, height }

    const scrollY = window.scrollY

    // Sections use different content widths (max-w-5xl/6xl/7xl) centred with
    // px-4/6/8 padding, so there's no consistent side gutter. We measure each
    // section's real content box (top/bottom/left). The line then:
    //   • hugs the left padding gutter while passing a section's content
    //     (the one strip guaranteed empty at every width), and
    //   • swoops rightward into the EMPTY vertical gap between sections.
    // That keeps a genuine winding "journey" feel while never crossing content.
    const fallbackPad = width >= 1024 ? 32 : width >= 640 ? 24 : 16
    let gutter = Infinity
    const boxes: { top: number; bottom: number; center: number }[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      // Target the real content wrapper (the centred max-w-* container), NOT the
      // section's first child — that can be a full-bleed decorative background.
      // The section's own padding-left is a guaranteed-empty floor for the rail.
      const container = el.querySelector<HTMLElement>('[class*="max-w-"]')
      const padLeft = parseFloat(getComputedStyle(el).paddingLeft) || fallbackPad
      const cr = container?.getBoundingClientRect()
      const left = cr && cr.width > 0 ? Math.max(padLeft, cr.left) : padLeft
      gutter = Math.min(gutter, left)

      const box = cr && cr.width > 0 ? cr : el.getBoundingClientRect()
      const top = box.top + scrollY
      const bottom = box.bottom + scrollY
      boxes.push({ top, bottom, center: (top + bottom) / 2 })
    })

    if (boxes.length < 2) return
    if (!Number.isFinite(gutter)) gutter = fallbackPad
    gutter = Math.max(gutter, 10)

    // Rail centreline + node radii fit inside the (tightest) left gutter, with
    // ~4px clearance from content. Capped so it stays slim on ultrawide screens.
    const railX = clamp(gutter * 0.42, 8, 60)
    const halo = clamp(gutter - railX - 4, 3, 13)
    const mid = halo * 0.55
    const core = Math.max(2.2, halo * 0.34)
    const stroke = halo > 9 ? 2 : 1.5

    // How far the line swoops into the empty inter-section gap.
    const bowAmp = width < 768 ? clamp(width * 0.16, 40, 72) : clamp(width * 0.2, 110, 240)
    const bowX = railX + bowAmp

    // Waypoints: down the rail through each content box, bow through each gap.
    const wp: Point[] = []
    boxes.forEach((b, i) => {
      wp.push({ x: railX, y: b.top })
      wp.push({ x: railX, y: b.bottom })
      if (i < boxes.length - 1) {
        const gapTop = b.bottom
        const gapBottom = boxes[i + 1].top
        // Only swoop when there's real empty vertical room; otherwise stay rail.
        if (gapBottom - gapTop > 48) {
          wp.push({ x: bowX, y: (gapTop + gapBottom) / 2 })
        }
      }
    })

    // Nodes sit on the rail at each section's content centre.
    const nds: Point[] = boxes.map((b) => ({ x: railX, y: b.center }))

    setDims({ width, height })
    setGeom({ railX, halo, mid, core, stroke })
    setPathD(buildPath(wp))
    setNodes(nds)
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

  if (dims.width === 0 || nodes.length < 2 || !pathD) return null

  const strokeW = geom.stroke

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
        {nodes.map((p, i) => {
          const lit = active[i]
          return (
            <g key={SECTION_IDS[i]}>
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? geom.halo : 0}
                fill="#22d3ee"
                opacity={lit ? 0.14 : 0}
                style={{ transition: "r 350ms ease, opacity 350ms ease" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? geom.mid : geom.core}
                fill="#22d3ee"
                opacity={lit ? 0.28 : 0}
                style={{ transition: "r 350ms ease, opacity 350ms ease" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? geom.core : Math.max(2, geom.core - 1)}
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
