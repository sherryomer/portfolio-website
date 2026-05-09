"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    id: 1,
    company: "Simpaisa",
    companyUrl: "https://simpaisa.com",
    role: "AI Product Analyst",
    period: "Feb 2026 — Present",
    location: "Pakistan",
    description:
      "Building AI-driven automation at a fintech company — from RAG chatbots to fully automated merchant onboarding workflows. Sitting at the intersection of engineering and product strategy across PK, BD & NP markets.",
    achievements: [
      "Architected a dual-channel RAG chatbot (Telegram + Slack) for merchant onboarding using Supabase pgvector, GPT-4 & n8n — 85.3% pass rate on 200-question benchmark",
      "Automated merchant onboarding end-to-end via n8n: Jira ticket creation, service-type classification, accelerating time-to-live across markets",
      "Integrated production & mock APIs for Payins, Payouts & Remittance with async flows, retry schedulers & idempotency handling",
      "Bridged engineering and product teams through AI-first solutions and data-driven decisions",
    ],
    tags: ["RAG", "GPT-4", "n8n", "Supabase", "LangChain", "Fintech", "Product Analytics"],
    color: "cyan",
    current: true,
  },
  {
    id: 2,
    company: "Gspec Technologies",
    role: "AI Engineer",
    period: "Aug 2025 — Nov 2025",
    location: "Pakistan",
    description:
      "Designed and shipped bespoke AI solutions for clients across industries — fine-tuning LLMs, building full-stack AI applications, and deploying intelligent automation agents.",
    achievements: [
      "Fine-tuned OpenAI and open-source LLMs for domain-specific use cases — improved generative response accuracy by 22%",
      "Built a full-stack AI application for Airbnb listings analysis (web + iOS), processing and filtering 14,000+ listings via data engineering pipelines",
      "Deployed LangChain + n8n agents automating workflows and improving customer experience across multiple industries",
    ],
    tags: ["Python", "LangChain", "n8n", "LLM Fine-tuning", "FastAPI", "iOS"],
    color: "amber",
    current: false,
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">02 / Experience</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Where I&apos;ve <span className="text-cyan-400">Worked</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed">
            Building AI products in fintech and across industries — from fine-tuned LLMs to production RAG systems.
          </p>
        </motion.div>

        <div className="space-y-5 sm:space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.15 }}
            >
              <div
                className={`relative p-5 sm:p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
                  exp.current
                    ? "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/[0.12]"
                    : "bg-white/[0.025] border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.04]"
                }`}
              >
                {exp.current && (
                  <div className="absolute top-5 right-5 sm:top-7 sm:right-7">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 text-[11px] sm:text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </span>
                  </div>
                )}

                {/* Mobile: stack everything. Desktop: two columns */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
                  {/* Left column — metadata */}
                  <div className="w-full lg:w-48 xl:w-52 shrink-0 min-w-0">
                    <div className="flex items-center gap-2 mb-1 pr-20 lg:pr-0">
                      <h3 className="text-lg sm:text-xl font-black text-white leading-tight">{exp.company}</h3>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-300 transition-colors shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className={`text-sm font-bold mb-3 ${exp.color === "cyan" ? "text-cyan-400" : "text-amber-400"}`}>
                      {exp.role}
                    </p>
                    <div className="space-y-1.5 mb-4">
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

                  {/* Divider — only on desktop */}
                  <div className="hidden lg:block w-px bg-white/[0.08] self-stretch shrink-0" />

                  {/* Right column — description */}
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-400 leading-relaxed mb-5 text-sm sm:text-base">
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
                          className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                        >
                          <span
                            className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                              exp.color === "cyan" ? "bg-cyan-400" : "bg-amber-400"
                            }`}
                          />
                          <span className="min-w-0">{item}</span>
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
