"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Lock } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const projects = [
  {
    id: 1,
    name: "SleepApply",
    subtitle: "Job Search Operating System",
    description:
      "SleepApply (formerly JOBOT) is a full job-search operating system — listing aggregation via Google Jobs, saved-jobs Kanban tracking, AI CV Intelligence (ATS scoring + prioritized fixes), AI CV Tailoring per job, and Auto Apply that drafts cover letters and screening answers, with autonomous send on mailto applications.",
    tech: ["TypeScript", "Next.js 14", "Supabase", "NextAuth", "OpenAI GPT-4", "SerpAPI"],
    github: null,
    liveUrl: "https://job-search-app-ten-lemon.vercel.app/auth/signin",
    isPrivate: true,
    color: "cyan",
    category: "Full-Stack",
    featured: true,
  },
  {
    id: 2,
    name: "Simpaisa AI Chatbot",
    subtitle: "Production · Fintech",
    description:
      "Production RAG chatbot deployed at Simpaisa — merchant support across Slack, WhatsApp, Telegram, and web. 3-agent LangGraph pipeline (Knowledge, Persona, Orchestrator) on Qwen3-32B + Kimi K2, hybrid retrieval (RRF fusion + LLM reranking) over an OKF-structured Supabase pgvector knowledge base.",
    tech: ["TypeScript", "LangGraph", "Groq", "Qwen3-32B", "Kimi K2", "Supabase pgvector"],
    github: null,
    liveUrl: "https://simpaisa-chatbot.onrender.com",
    isPrivate: true,
    color: "amber",
    category: "Fintech AI",
    featured: false,
  },
  {
    id: 7,
    name: "ROAR MMA",
    subtitle: "Client Project · MMA Gym",
    description:
      "A professional website built for a client — ROAR Martial Arts gym. Full-screen hero, training programs, class schedule, coach profiles, pricing tiers, gallery, and a free-trial sign-up flow. Bold red-on-black design with smooth scroll-driven motion, deployed on a custom domain.",
    tech: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "Framer Motion"],
    github: null,
    liveUrl: "https://www.roarmartialarts.com",
    isPrivate: true,
    color: "rose",
    category: "Web / Frontend",
    featured: false,
  },
  {
    id: 8,
    name: "ROOM 404",
    subtitle: "Branching Thriller Web Game",
    description:
      "A psychological murder-mystery web game where every decision rewrites the outcome. You wake in a hotel room with a body, no memory, and a detective at the door. 5 acts of branching choices unlock fragmented memory shards and four true endings — plus a hidden fifth that assembles the real night. All progress persists in the browser.",
    tech: ["TypeScript", "Next.js 14", "Tailwind CSS", "Framer Motion", "Zustand"],
    github: null,
    liveUrl: "https://room-404-ruby.vercel.app",
    isPrivate: true,
    color: "violet",
    category: "Game / Interactive",
    featured: false,
  },
  {
    id: 4,
    name: "YOLOv8 Object Detection",
    subtitle: "Computer Vision",
    description:
      "Custom-trained YOLOv8 model with 95%+ detection accuracy on image and video streams. Optimized inference to 30+ FPS for real-time pet monitoring applications.",
    tech: ["Python", "YOLOv8", "PyTorch", "OpenCV"],
    github: "https://github.com/sherryomer/Object-Detection-using-YOLOv8",
    liveUrl: null,
    isPrivate: false,
    color: "cyan",
    category: "Computer Vision",
    featured: false,
  },
  {
    id: 5,
    name: "Eveon Client Chatbot",
    subtitle: "Client Project",
    description:
      "Client-facing conversational AI chatbot — handles customer support workflows with LLM-powered responses and smart escalation logic.",
    tech: ["HTML", "JavaScript", "OpenAI API"],
    github: null,
    liveUrl: "https://eveon-chatbot.onrender.com",
    isPrivate: true,
    color: "amber",
    category: "Chatbot",
    featured: false,
  },
  {
    id: 6,
    name: "Time Series Forecasting",
    subtitle: "Predictive Modeling",
    description:
      "ML-based sales forecasting using regression, SARIMAX, and Prophet — 85% prediction accuracy. Led analysis across 50+ stores improving forecasting insights by 25%.",
    tech: ["Python", "Pandas", "Scikit-learn", "Prophet", "SARIMAX"],
    github: "https://github.com/sherryomer/Time-Series-Predictive-Modeling-",
    liveUrl: null,
    isPrivate: false,
    color: "slate",
    category: "Data Science",
    featured: false,
  },
]

const accentText: Record<string, string> = {
  cyan: "text-cyan-300/90",
  amber: "text-amber-300/90",
  slate: "text-slate-300/90",
  rose: "text-rose-300/90",
  violet: "text-violet-300/90",
}
const accentHover: Record<string, string> = {
  cyan: "hover:border-cyan-500/30",
  amber: "hover:border-amber-500/30",
  slate: "hover:border-slate-500/30",
  rose: "hover:border-rose-500/30",
  violet: "hover:border-violet-500/30",
}
const accentRule: Record<string, string> = {
  cyan: "via-cyan-500/50",
  amber: "via-amber-500/50",
  slate: "via-slate-500/40",
  rose: "via-rose-500/50",
  violet: "via-violet-500/50",
}

// Deliberately varied column spans so no two cells match.
// index → lg span class (featured handled separately).
const spanFor = (i: number) => {
  // pattern across the 6 non-featured entries on a 6-col grid
  const spans = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2"]
  return spans[i % spans.length]
}

function ProjectEntry({
  project,
  reg,
  featured = false,
}: {
  project: (typeof projects)[0]
  reg: string
  featured?: boolean
}) {
  return (
    <div
      className={`group relative h-full flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] ${accentHover[project.color]} transition-colors duration-300 overflow-hidden ${
        featured ? "p-7 sm:p-9" : "p-5 sm:p-6"
      }`}
    >
      <div className={`absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent ${accentRule[project.color]} to-transparent opacity-0 group-hover:opacity-70 transition-opacity`} />

      {/* registry header line */}
      <div className="flex items-center justify-between gap-3 mb-5 font-mono text-[11px]">
        <span className="flex items-center gap-2 text-slate-600">
          <span className="text-slate-700">{reg}</span>
          <span className={accentText[project.color]}>{project.category}</span>
        </span>
        {project.isPrivate && (
          <span className="flex items-center gap-1 text-slate-600 shrink-0">
            <Lock className="w-3 h-3" />
            private
          </span>
        )}
      </div>

      <h3
        className={`font-display font-bold text-white tracking-tight leading-tight mb-1.5 ${
          featured ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"
        }`}
      >
        {project.name}
      </h3>
      <p className={`font-mono text-slate-500 mb-4 ${featured ? "text-sm" : "text-xs"}`}>
        {project.subtitle}
      </p>

      <p className={`text-slate-400 leading-relaxed ${featured ? "text-base max-w-xl" : "text-sm"}`}>
        {project.description}
      </p>

      {/* stack as inline mono line, links as mono actions */}
      <div className="mt-auto pt-6">
        <p className="font-mono text-[11px] leading-relaxed mb-4">
          <span className="text-slate-600">stack: </span>
          {project.tech.map((t, i) => (
            <span key={t}>
              <span className="text-slate-400">{t}</span>
              {i < project.tech.length - 1 && <span className="text-slate-700"> · </span>}
            </span>
          ))}
        </p>
        {(project.liveUrl || (!project.isPrivate && project.github)) && (
          <div className="flex items-center gap-5 font-mono text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/l flex items-center gap-1.5 text-white"
              >
                <span className="border-b border-cyan-400/40 group-hover/l:border-cyan-400 pb-0.5 transition-colors">live</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            )}
            {!project.isPrivate && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/c flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <span className="border-b border-white/15 group-hover/c:border-white/40 pb-0.5 transition-colors">code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#070710]">
      <div className="max-w-6xl mx-auto lg:pl-16">
        <SectionHeader
          tag="projects.registry"
          meta={`${projects.length} records`}
          title={<>Things I&apos;ve <span className="text-cyan-400">Built</span></>}
          sub="Real projects — AI systems, ML models, and production applications."
          className="mb-16 sm:mb-20"
        />

        {/* Asymmetric registry: featured spans wide, rest vary column width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-fr">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-6"
          >
            <ProjectEntry project={featured} reg="reg/00" featured />
          </motion.div>

          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className={spanFor(i)}
            >
              <ProjectEntry project={project} reg={`reg/${String(i + 1).padStart(2, "0")}`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center sm:justify-start"
        >
          <a
            href="https://github.com/sherryomer"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 font-mono text-sm text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-cyan-400">→</span>
            <span className="border-b border-white/15 group-hover:border-white/40 pb-0.5 transition-colors">
              all_repositories()
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
