"use client"

import { motion } from "framer-motion"
import { ExternalLink, Lock } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "University AI Chatbot",
    subtitle: "Senior Project @ LUMS",
    description:
      "RAG-powered AI chatbot built for LUMS using LangChain and OpenAI. Streamlines student and faculty query resolution with real-time information retrieval from institutional knowledge bases.",
    tech: ["Python", "LangChain", "OpenAI API", "RAG", "ChromaDB", "FastAPI"],
    github: "https://github.com/sherryomer/SPROJ",
    isPrivate: false,
    color: "cyan",
    category: "AI / RAG",
    featured: true,
  },
  {
    id: 2,
    name: "YOLOv8 Object Detection",
    subtitle: "Computer Vision",
    description:
      "Real-time object detection using a custom-trained YOLOv8 model on image and video streams. Trained on a custom dataset with high accuracy for practical monitoring use cases.",
    tech: ["Python", "YOLOv8", "PyTorch", "OpenCV"],
    github: "https://github.com/sherryomer/Object-Detection-using-YOLOv8",
    isPrivate: false,
    color: "amber",
    category: "Computer Vision",
    featured: false,
  },
  {
    id: 3,
    name: "Time Series Forecasting",
    subtitle: "Predictive Modeling",
    description:
      "Predictive modeling on time series data — feature engineering, ML-based forecasting, and visualization using Python data science stack.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter"],
    github: "https://github.com/sherryomer/Time-Series-Predictive-Modeling-",
    isPrivate: false,
    color: "slate",
    category: "Data Science",
    featured: false,
  },
  {
    id: 4,
    name: "BookYolo",
    subtitle: "Full-Stack Web App",
    description:
      "Full-stack book application with a JavaScript frontend and Node.js backend. Browse, search, and manage book collections with a clean web interface.",
    tech: ["JavaScript", "Node.js", "HTML", "CSS"],
    github: "https://github.com/sherryomer/BookYoloWebFrontend",
    isPrivate: false,
    color: "cyan",
    category: "Full-Stack",
    featured: false,
  },
  {
    id: 5,
    name: "Simpaisa AI Chatbot",
    subtitle: "Production · Fintech",
    description:
      "Production-grade AI chatbot deployed at Simpaisa for merchant support and onboarding automation. Handles high-volume fintech queries end-to-end.",
    tech: ["TypeScript", "LangChain", "OpenAI", "Next.js"],
    github: null,
    isPrivate: true,
    color: "amber",
    category: "Fintech AI",
    featured: false,
  },
  {
    id: 6,
    name: "Eveon Client Chatbot",
    subtitle: "Client Project",
    description:
      "Client-facing conversational AI chatbot — handles customer support workflows with LLM-powered responses and smart escalation logic.",
    tech: ["HTML", "JavaScript", "OpenAI API"],
    github: null,
    isPrivate: true,
    color: "slate",
    category: "Chatbot",
    featured: false,
  },
]

const colorConfig = {
  cyan: {
    badge: "bg-cyan-500/12 border-cyan-500/25 text-cyan-300",
    tag: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    topBar: "from-transparent via-cyan-500/50 to-transparent",
    hover: "hover:border-cyan-500/25",
  },
  amber: {
    badge: "bg-amber-500/12 border-amber-500/25 text-amber-300",
    tag: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    topBar: "from-transparent via-amber-500/50 to-transparent",
    hover: "hover:border-amber-500/25",
  },
  slate: {
    badge: "bg-slate-500/12 border-slate-500/25 text-slate-300",
    tag: "bg-slate-500/10 border-slate-500/20 text-slate-300",
    topBar: "from-transparent via-slate-500/40 to-transparent",
    hover: "hover:border-slate-500/25",
  },
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[0]
  featured?: boolean
}) {
  const c = colorConfig[project.color as keyof typeof colorConfig]

  return (
    <div
      className={`group relative h-full rounded-3xl border bg-white/[0.025] ${c.hover} border-white/[0.08] hover:bg-white/[0.05] transition-all duration-500 flex flex-col overflow-hidden ${
        featured ? "p-8 min-h-[380px]" : "p-6"
      }`}
    >
      {featured && (
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${c.topBar} opacity-60`} />
      )}

      <div className="flex items-start justify-between mb-5">
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.badge}`}>
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.isPrivate && (
            <span className="flex items-center gap-1 text-[11px] text-slate-600">
              <Lock className="w-3 h-3" />
              Private
            </span>
          )}
          {!project.isPrivate && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className={`font-black text-white mb-1 leading-tight ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          {project.name}
        </h3>
        <p className={`mb-4 font-medium text-slate-500 ${featured ? "text-sm" : "text-xs"}`}>
          {project.subtitle}
        </p>
        <p className={`text-slate-400 leading-relaxed ${featured ? "text-base" : "text-sm"}`}>
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border ${c.tag}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#070710]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">03 / Projects</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Things I&apos;ve <span className="text-cyan-400">Built</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Real projects — AI systems, ML models, and production applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <ProjectCard project={featured} featured />
          </motion.div>

          {rest.slice(0, 2).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {rest.slice(2).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 3) * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="https://github.com/sherryomer"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.18] font-medium text-sm transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View all projects on GitHub
            <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
