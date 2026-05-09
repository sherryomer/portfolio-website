"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

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
    <section id="education" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#070710]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">05 / Education</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Where I <span className="text-cyan-400">Studied</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] border border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
              {/* Icon + degree */}
              <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-cyan-500/12 border border-cyan-500/20 shrink-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-white mb-0.5">
                    Bachelor&apos;s in Computer Science
                  </h3>
                  <p className="text-cyan-400 font-semibold text-sm mb-1">
                    Lahore University of Management Sciences
                  </p>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Sep 2021 – May 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/[0.07]" />

            {/* Relevant courses */}
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-[0.18em] mb-4">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, i) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-cyan-500/25 hover:text-cyan-300 hover:bg-cyan-500/[0.06] transition-all duration-200 cursor-default"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
