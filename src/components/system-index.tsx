"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "hero", label: "index" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
]

export function SystemIndex() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  // Active section via most-visible IntersectionObserver (same approach as before).
  useEffect(() => {
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

  // Scroll progress for the mobile strip bar.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Desktop: right system-index rail ───────────────────────────── */}
      {/* Hidden over the hero (active 0) so it never collides with the hero's
          right-hand status panel; fades in once the content sections begin. */}
      <nav
        aria-label="Section index"
        className={`hidden md:block fixed right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 select-none transition-opacity duration-500 ${
          active === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Compact: index + tick always; section label floats LEFT (into the
            empty margin) only when active/hovered, on a backdrop chip so it stays
            legible if it ever grazes content. Mirrors the original rail footprint. */}
        <div className="mb-3 flex justify-end text-cyan-400 pr-0.5">
          <span className="text-[10px]">◆</span>
        </div>
        <ul className="space-y-2">
          {sections.map((s, i) => {
            const isActive = i === active
            const isPassed = i < active
            return (
              <li key={s.id} className="flex justify-end">
                <button
                  onClick={() => scrollTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex items-center justify-end gap-2 font-mono text-[11px] tracking-tight"
                >
                  {/* floating label — absolute, doesn't add width */}
                  <span
                    className={`absolute right-full mr-2.5 whitespace-nowrap rounded-md px-2 py-0.5 bg-[#070710]/80 backdrop-blur-sm transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0 text-cyan-300"
                        : "opacity-0 translate-x-1 text-slate-300 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`tabular-nums ${
                      isActive ? "text-cyan-400" : isPassed ? "text-cyan-400/40" : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  >
                    {String(i).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive ? "w-5 bg-cyan-400" : "w-2.5 bg-white/15 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── Mobile: top status strip + progress bar ────────────────────── */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-[#070710]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center justify-between px-4 h-9 font-mono text-[11px]">
          <span className="flex items-center gap-2">
            <span className="text-cyan-500/80">◆</span>
            <span className="tabular-nums text-cyan-400">{String(active).padStart(2, "0")}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">{sections[active].label}</span>
          </span>
          <span className="tabular-nums text-slate-600">
            {String(Math.round(progress * 100)).padStart(2, "0")}%
          </span>
        </div>
        <div className="h-px bg-white/[0.06]">
          <div
            className="h-full bg-cyan-400/80 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </>
  )
}
