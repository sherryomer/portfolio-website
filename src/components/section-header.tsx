"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Model-card style section header. Replaces the generic "0X / Section" marker
 * with a mono field-tag line (e.g. `§ experience.log`), an optional right-aligned
 * meta chip, and a large display heading.
 */
export function SectionHeader({
  tag,
  meta,
  title,
  sub,
  className = "",
}: {
  tag: string
  meta?: string
  title: ReactNode
  sub?: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs sm:text-sm text-cyan-400/80 tracking-tight">
          <span className="text-cyan-600/70">§</span> {tag}
        </span>
        <span className="flex-1 border-t border-dashed border-white/[0.09]" />
        {meta && (
          <span className="font-mono text-[11px] text-slate-600 tracking-tight shrink-0">
            [ {meta} ]
          </span>
        )}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mt-4">
          {sub}
        </p>
      )}
    </motion.div>
  )
}
