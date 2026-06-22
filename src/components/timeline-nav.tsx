"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

// vertical spacing (px) between checkpoint dot centers
const GAP = 56
const TRACK_HEIGHT = (sections.length - 1) * GAP

export function TimelineNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // track how much of each section is in view, pick the most-visible one
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) ratios.set(entry.target.id, entry.intersectionRatio)
          else ratios.delete(entry.target.id)
        })

        let bestId = ""
        let bestRatio = -1
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) {
          const idx = sections.findIndex((s) => s.id === bestId)
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // fill travels down from the first dot to the active dot
  const fillHeight = active * GAP

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:block fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="relative" style={{ height: TRACK_HEIGHT, width: 16 }}>
        {/* dim track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px rounded-full bg-white/10"
          style={{ height: TRACK_HEIGHT }}
        />
        {/* accent fill that grows downward */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-[height] duration-500 ease-out"
          style={{ height: fillHeight }}
        />

        {sections.map((s, i) => {
          const isActive = i === active
          const isPassed = i < active

          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              aria-label={s.label}
              aria-current={isActive ? "true" : undefined}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ top: i * GAP, width: 24, height: 24 }}
            >
              {/* hover/active label */}
              <span
                className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-cyan-300"
                    : "opacity-0 translate-x-1 text-slate-400 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>

              {/* checkpoint dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-3.5 w-3.5 animate-pulse bg-cyan-400 ring-2 ring-cyan-400/30 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]"
                    : isPassed
                      ? "h-2.5 w-2.5 bg-cyan-400/70 group-hover:bg-cyan-300"
                      : "h-2 w-2 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
