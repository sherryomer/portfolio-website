"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

// Status block — real data only.
const status = [
  { k: "experience", v: "2+ years" },
  { k: "location", v: "Pakistan" },
  { k: "focus", v: "AI · Data · Fintech" },
]

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-5 sm:px-8 lg:px-12 pt-28 pb-20"
    >
      <div className="absolute inset-0 bg-[#070710]" />
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_30%_-10%,rgba(8,145,178,0.10)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_50%_50%_at_80%_90%,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

      {/* Asymmetric: content hangs left; right column holds the readout. The
          ScrollPath SVG continues threading the far-left gutter as the focal line. */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center pl-2 sm:pl-8 lg:pl-20">
        {/* Left / main — name + eyebrow */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-7 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase"
          >
            <span className="text-cyan-400">▸</span>
            <span className="text-slate-400">
              AI/ML Engineer
              <span className="text-slate-700"> · </span>
              Data Scientist
              <span className="text-slate-700"> · </span>
              Product Analyst
            </span>
          </motion.div>

          {/* Art-directed name: given names as a tight mono kicker, surname as the
              oversized display anchor. Retires the even 3-line stack. */}
          <div className="mb-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-sm sm:text-base text-slate-500 tracking-tight mb-1 pl-1"
            >
              Shahzada Muhammad
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-[0.92] tracking-[-0.02em] text-[20vw] xs:text-7xl sm:text-8xl lg:text-[8.5rem]"
            >
              Shehryar
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-slate-400 max-w-md leading-relaxed mb-9 pl-1"
          >
            Building intelligent systems at the intersection of AI, data science, and fintech automation.
          </motion.p>

          {/* CTAs as mono function-call links — not pill buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-x-7 gap-y-4 pl-1"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group flex items-center gap-2 font-mono text-sm text-white"
            >
              <span className="text-cyan-400">→</span>
              <span className="border-b border-cyan-400/40 group-hover:border-cyan-400 pb-0.5 transition-colors">
                run_work()
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">→</span>
              <span className="border-b border-white/15 group-hover:border-white/40 pb-0.5 transition-colors">
                open_contact()
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right / readout — status block + social, bordered panel */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="lg:col-span-5 lg:justify-self-end w-full lg:max-w-xs"
        >
          <div className="relative rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5 sm:p-6">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <p className="mono-label mb-4">{"// status"}</p>
            <div className="space-y-3">
              {status.map((s) => (
                <div key={s.k} className="flex items-baseline gap-3 font-mono text-[13px]">
                  <span className="text-slate-500">{s.k}</span>
                  <span className="leader" />
                  <span className="text-slate-200 shrink-0">{s.v}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <p className="mono-label mb-3">{"// connect"}</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/sherryomer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg border border-white/[0.08] text-slate-500 hover:text-white hover:border-white/[0.2] transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/shahzadashehryar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg border border-white/[0.08] text-slate-500 hover:text-white hover:border-white/[0.2] transition-colors"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="mailto:shahzadashehryar16@gmail.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-white/[0.08] text-slate-500 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors font-mono text-[10px] truncate"
                >
                  shahzadashehryar16@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("experience")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.8 },
          y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-700 hover:text-slate-500 transition-colors"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.button>
    </section>
  )
}
