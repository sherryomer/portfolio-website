"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const courses = [
  "Machine Learning",
  "Data Science",
  "Computer Vision",
  "Data Mining",
  "Databases",
  "Software Engineering",
  "Cloud Development",
  "Game Theory",
  "Business Communication",
  "Introduction to Psychology",
]

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#070710]">
      <div className="max-w-4xl mx-auto lg:pl-16">
        <SectionHeader
          tag="education.rec"
          meta="lums · cs"
          title={<>Where I <span className="text-cyan-400">Studied</span></>}
          className="mb-14 sm:mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pl-5 sm:pl-7 border-l-2 border-cyan-400/50"
        >
          <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]" />

          {/* record header line */}
          <div className="font-mono text-xs text-slate-500 mb-4">
            [Sep 2021 → May 2025]{" "}
            <span className="text-cyan-300/90">bachelors / computer-science</span>
          </div>

          <div className="flex items-start gap-4 mb-2">
            <span className="p-2.5 rounded-xl bg-cyan-500/12 border border-cyan-500/20 shrink-0">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                Bachelor&apos;s in Computer Science
              </h3>
              <p className="text-cyan-400 font-semibold text-sm mt-1">
                Lahore University of Management Sciences (LUMS)
              </p>
            </div>
          </div>

          {/* course manifest — mono index list, not pills */}
          <div className="mt-8">
            <p className="mono-label mb-4">{"// relevant coursework"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5 max-w-2xl">
              {courses.map((course, i) => (
                <motion.div
                  key={course}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="flex items-center gap-3 font-mono text-sm text-slate-300 border-b border-white/[0.05] pb-2"
                >
                  <span className="text-cyan-500/50 text-[11px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{course}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
