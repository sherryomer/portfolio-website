"use client"

import { motion } from "framer-motion"
import { ArrowRight, Briefcase, MapPin, Zap } from "lucide-react"

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const stats = [
  { icon: Briefcase, label: "Experience", value: "2+ Years", color: "cyan" },
  { icon: MapPin, label: "Location", value: "Pakistan", color: "slate" },
  { icon: Zap, label: "Focus", value: "AI & Fintech", color: "amber" },
]

const colorMap = {
  cyan: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
  slate: { bg: "bg-slate-500/15", text: "text-slate-400" },
  amber: { bg: "bg-amber-500/15", text: "text-amber-400" },
}

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070710]" />
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(8,145,178,0.08)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 w-full h-full bg-[radial-gradient(ellipse_50%_40%_at_50%_120%,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Name — staggered reveal */}
        <div className="mb-8 space-y-0 leading-none">
          {[
            { word: "Shahzada", solid: true },
            { word: "Muhammad", solid: true },
            { word: "Shehryar", solid: false },
          ].map(({ word, solid }, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 56, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: 0.1 + i * 0.17,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className={`block font-black tracking-tight leading-none ${
                  solid
                    ? "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white/80"
                    : "text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white"
                }`}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-cyan-500/40" />
          <span className="text-cyan-400 font-medium tracking-wide text-sm sm:text-base">
            AI/ML Engineer &amp; Product Analyst
          </span>
          <span className="h-px w-12 bg-cyan-500/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-14 leading-relaxed"
        >
          Building intelligent systems at the intersection of LLMs, voice AI, and fintech automation.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          {stats.map((stat) => {
            const c = colorMap[stat.color as keyof typeof colorMap]
            return (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]"
              >
                <div className={`p-1.5 rounded-lg ${c.bg}`}>
                  <stat.icon className={`w-3.5 h-3.5 ${c.text}`} />
                </div>
                <span className="text-sm font-medium text-slate-300">{stat.value}</span>
              </div>
            )
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white text-zinc-900 font-bold text-sm hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-black/30"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-white font-bold text-sm hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-200"
          >
            Let&apos;s Talk
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="https://github.com/sherryomer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/[0.08] text-slate-500 hover:text-white hover:border-white/[0.18] transition-all duration-200"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/shahzadashehryar/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/[0.08] text-slate-500 hover:text-white hover:border-white/[0.18] transition-all duration-200"
          >
            <LinkedinIcon />
          </a>
          <a
            href="mailto:shahzadashehryar16@gmail.com"
            className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-500 hover:text-white hover:border-white/[0.18] transition-all duration-200 text-xs font-mono"
          >
            shahzadashehryar16@gmail.com
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection("experience")}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-slate-700 hover:text-slate-500 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
