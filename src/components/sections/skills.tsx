"use client"

import { motion } from "framer-motion"
import { Brain, Code2, Layers, Mic, LineChart, Database } from "lucide-react"

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

const colorConfig = {
  cyan: {
    iconBg: "bg-cyan-500/12",
    iconText: "text-cyan-400",
    tag: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/18",
    label: "text-cyan-400",
  },
  amber: {
    iconBg: "bg-amber-500/12",
    iconText: "text-amber-400",
    tag: "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/18",
    label: "text-amber-400",
  },
  slate: {
    iconBg: "bg-slate-500/12",
    iconText: "text-slate-400",
    tag: "bg-slate-500/10 border-slate-500/20 text-slate-300 hover:bg-slate-500/18",
    label: "text-slate-400",
  },
}

const allTech = [
  "Python", "TypeScript", "LangChain", "OpenAI API", "RAG",
  "FastAPI", "Next.js", "YOLOv8", "PyTorch", "Pandas",
  "SQL", "Docker", "AWS", "Whisper API", "HuggingFace",
  "Streamlit", "Git", "ChromaDB", "LlamaIndex", "ElevenLabs",
]

export function Skills() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">04 / Skills</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            My <span className="text-cyan-400">Toolkit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Technologies I reach for when building AI systems, ML models, and data products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skillGroups.map((group, index) => {
            const c = colorConfig[group.color as keyof typeof colorConfig]
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="p-6 rounded-3xl bg-white/[0.025] border border-white/[0.08] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${c.iconBg}`}>
                    <group.icon className={`w-5 h-5 ${c.iconText}`} />
                  </div>
                  <h3 className={`font-bold text-sm ${c.label}`}>{group.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + i * 0.035, duration: 0.3 }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-default ${c.tag}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 rounded-3xl bg-white/[0.025] border border-white/[0.08]"
        >
          <p className="text-center text-slate-500 text-xs font-medium mb-6 uppercase tracking-[0.18em]">Daily Stack</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {allTech.map((tech, i) => (
              <motion.span
                key={`${tech}-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-xl text-sm bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-500/[0.07] transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
