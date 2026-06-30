"use client"

import { motion } from "framer-motion"
import { Brain, Code2, Layers, Mic, LineChart, Database } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const skillGroups = [
  {
    id: "llms",
    name: "AI & LLMs",
    icon: Brain,
    color: "cyan",
    skills: [
      "LangChain", "LlamaIndex", "OpenAI API", "Anthropic API",
      "RAG Systems", "Fine-tuning", "Prompt Engineering",
      "Vector Databases", "Embeddings", "Agents",
    ],
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: LineChart,
    color: "amber",
    skills: [
      "YOLOv8", "PyTorch", "Scikit-learn", "HuggingFace",
      "Computer Vision", "NLP", "Time Series", "TensorFlow",
    ],
  },
  {
    id: "voice",
    name: "Voice AI",
    icon: Mic,
    color: "slate",
    skills: [
      "Whisper API", "ElevenLabs", "Voice Agents",
      "Speech-to-Text", "Text-to-Speech", "Audio Processing",
    ],
  },
  {
    id: "data",
    name: "Data Science",
    icon: Database,
    color: "cyan",
    skills: [
      "Pandas", "NumPy", "SQL", "Jupyter",
      "Data Visualization", "Statistical Analysis", "ETL",
    ],
  },
  {
    id: "code",
    name: "Programming",
    icon: Code2,
    color: "slate",
    skills: [
      "Python", "TypeScript", "JavaScript",
      "SQL", "Bash / Shell", "HTML / CSS",
    ],
  },
  {
    id: "stack",
    name: "Frameworks & Cloud",
    icon: Layers,
    color: "amber",
    skills: [
      "FastAPI", "Next.js", "React", "Streamlit",
      "Docker", "AWS", "Vercel", "Git",
    ],
  },
]

const labelColor: Record<string, string> = {
  cyan: "text-cyan-400",
  amber: "text-amber-400",
  slate: "text-slate-400",
}
const iconBg: Record<string, string> = {
  cyan: "bg-cyan-500/12 text-cyan-400",
  amber: "bg-amber-500/12 text-amber-400",
  slate: "bg-slate-500/12 text-slate-400",
}

const allTech = [
  "Python", "TypeScript", "LangChain", "OpenAI API", "RAG",
  "FastAPI", "Next.js", "YOLOv8", "PyTorch", "Pandas",
  "SQL", "Docker", "AWS", "Whisper API", "HuggingFace",
  "Streamlit", "Git", "ChromaDB", "LlamaIndex", "ElevenLabs",
]

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 section-alt">
      <div className="max-w-5xl mx-auto lg:pl-16">
        <SectionHeader
          tag="skills.map"
          meta={`${skillGroups.length} domains`}
          title={<>My <span className="text-cyan-400">Toolkit</span></>}
          sub="Technologies I reach for when building AI systems, ML models, and data products."
          className="mb-16 sm:mb-20"
        />

        {/* Typographic matrix — category (left) · skill manifest (right), rule-separated rows */}
        <div className="border-t border-white/[0.1]">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group grid grid-cols-1 md:grid-cols-[minmax(0,13rem)_1fr] gap-2 md:gap-8 py-6 border-b border-white/[0.1] hover:bg-white/[0.012] transition-colors"
            >
              {/* category cell */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-600 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`p-1.5 rounded-lg ${iconBg[group.color]}`}>
                  <group.icon className="w-4 h-4" />
                </span>
                <h3 className={`font-mono text-sm font-medium ${labelColor[group.color]}`}>
                  {group.name}
                </h3>
              </div>

              {/* skill manifest — flowing, middot-separated, not pills */}
              <p className="text-slate-300 leading-relaxed text-sm sm:text-[15px] md:pt-0.5 pl-8 md:pl-0">
                {group.skills.map((skill, i) => (
                  <span key={skill}>
                    <span className="hover:text-cyan-300 transition-colors">{skill}</span>
                    {i < group.skills.length - 1 && (
                      <span className="text-slate-700 px-1.5">/</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Daily Stack as a marquee ticker (real author-labeled data) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="mono-label">{"// daily stack"}</span>
            <span className="flex-1 border-t border-dashed border-white/[0.09]" />
          </div>
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track">
              {[...allTech, ...allTech].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="font-mono text-sm text-slate-400 mx-5 inline-flex items-center gap-5"
                >
                  {tech}
                  <span className="text-cyan-500/40">◆</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
