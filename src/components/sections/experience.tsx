"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    id: 1,
    company: "Simpaisa",
    companyUrl: "https://simpaisa.com",
    role: "AI Product Analyst",
    period: "2024 — Present",
    location: "Pakistan",
    type: "Full-time · Fintech",
    description:
      "Leading AI-driven automation at a fintech company — building and integrating chatbots, automating merchant onboarding workflows, and turning product data into actionable decisions. The role sits at the intersection of engineering and product strategy.",
    achievements: [
      "Built AI chatbot integrations handling end-to-end merchant support queries",
      "Automated merchant onboarding pipeline — reduced processing time by 60%",
      "Drove product analytics initiatives surfacing actionable business insights",
      "Bridged engineering and product teams through AI-first solutions",
    ],
    tags: ["LangChain", "OpenAI", "Product Analytics", "Process Automation", "Fintech"],
    color: "cyan",
    current: true,
  },
  {
    id: 2,
    company: "AI Startup",
    role: "AI Engineer",
    period: "2023 — 2024",
    location: "Pakistan",
    type: "Full-time · Service-based",
    description:
      "Designed and shipped bespoke AI solutions for clients across industries. Delivered everything from conversational chatbots to real-time voice agents — building full-stack AI products using LLMs, RAG pipelines, and speech processing.",
    achievements: [
      "Delivered 5+ production chatbot systems across different client verticals",
      "Built end-to-end voice agent pipelines: STT → LLM processing → TTS",
      "Implemented domain-specific RAG architectures with custom knowledge bases",
      "Created a reusable AI wrapper library abstracting multiple LLM providers",
    ],
    tags: ["Python", "LangChain", "Voice AI", "RAG", "FastAPI", "LLMs"],
    color: "amber",
    current: false,
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">02 / Experience</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Where I&apos;ve <span className="text-cyan-400">Worked</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Two years building AI products — from client chatbots to fintech automation pipelines.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.15 }}
            >
              <div
                className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                  exp.current
                    ? "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/[0.12]"
                    : "bg-white/[0.025] border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.04]"
                }`}
              >
                {exp.current && (
                  <div className="absolute top-7 right-7">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </span>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left column */}
                  <div className="lg:w-52 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-white">{exp.company}</h3>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className={`text-sm font-bold mb-4 ${exp.color === "cyan" ? "text-cyan-400" : "text-amber-400"}`}>
                      {exp.role}
                    </p>
                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border ${
                            exp.color === "cyan"
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                              : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex-1 lg:border-l lg:border-white/[0.08] lg:pl-8">
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
                      {exp.description}
                    </p>
                    <ul className="space-y-3">
                      {exp.achievements.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.07 }}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span
                            className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                              exp.color === "cyan" ? "bg-cyan-400" : "bg-amber-400"
                            }`}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
