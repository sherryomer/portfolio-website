"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const experiences = [
  {
    id: 1,
    company: "Simpaisa",
    companyUrl: "https://simpaisa.com",
    role: "AI Product Analyst",
    period: "Feb 2026 — Present",
    periodShort: "Feb 2026 → now",
    slug: "simpaisa / ai-product-analyst",
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
    periodShort: "Aug 2025 → Nov 2025",
    slug: "gspec-technologies / ai-engineer",
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

const accent = {
  cyan: { text: "text-cyan-400", rule: "bg-cyan-400", dot: "bg-cyan-400", soft: "text-cyan-300/90" },
  amber: { text: "text-amber-400", rule: "bg-amber-400/60", dot: "bg-amber-400", soft: "text-amber-300/90" },
}

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 section-alt">
      <div className="max-w-4xl mx-auto lg:pl-16">
        <SectionHeader
          tag="experience.log"
          meta="2 entries"
          title={<>Where I&apos;ve <span className="text-cyan-400">Worked</span></>}
          sub="Building AI products in fintech and across industries — from fine-tuned LLMs to production RAG systems."
          className="mb-16 sm:mb-20"
        />

        <div className="space-y-14 sm:space-y-16">
          {experiences.map((exp, index) => {
            const a = accent[exp.color as keyof typeof accent]
            const featured = exp.current
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative pl-5 sm:pl-7 ${
                  featured ? "border-l-2 border-cyan-400/50" : "border-l border-white/[0.1]"
                }`}
              >
                {/* node on the rail */}
                <span
                  className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${a.dot} ${
                    featured ? "shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]" : ""
                  }`}
                />

                {/* log header line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs mb-3">
                  <span className="text-slate-500">[{exp.periodShort}]</span>
                  <span className={a.soft}>{exp.slug}</span>
                  {featured && (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      live
                    </span>
                  )}
                </div>

                {/* company + role, scaled by importance */}
                <div className="flex items-center gap-2.5 mb-1">
                  <h3
                    className={`font-display font-bold text-white tracking-tight ${
                      featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    }`}
                  >
                    {exp.company}
                  </h3>
                  {exp.companyUrl && (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${exp.company} website`}
                      className="text-slate-600 hover:text-slate-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className={`text-sm font-semibold mb-5 ${a.text}`}>
                  {exp.role} <span className="text-slate-600 font-normal font-mono">· {exp.location}</span>
                </p>

                <p
                  className={`text-slate-400 leading-relaxed mb-6 ${
                    featured ? "text-base max-w-2xl" : "text-sm max-w-xl"
                  }`}
                >
                  {exp.description}
                </p>

                {/* achievements as a tree, not bullet pills */}
                <ul className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, i) => {
                    const isLast = i === exp.achievements.length - 1
                    return (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                        className="flex gap-3 text-slate-300 text-sm leading-relaxed"
                      >
                        <span className={`font-mono shrink-0 ${a.text} opacity-60`}>
                          {isLast ? "└─" : "├─"}
                        </span>
                        <span className="min-w-0">{item}</span>
                      </motion.li>
                    )
                  })}
                </ul>

                {/* stack woven as a single inline mono line */}
                <p className="font-mono text-xs leading-relaxed">
                  <span className="text-slate-600">stack: </span>
                  {exp.tags.map((tag, i) => (
                    <span key={tag}>
                      <span className={a.soft}>{tag}</span>
                      {i < exp.tags.length - 1 && <span className="text-slate-700"> · </span>}
                    </span>
                  ))}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
