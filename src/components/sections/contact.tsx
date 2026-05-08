"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Send } from "lucide-react"
import { useState } from "react"

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const contactLinks = [
  {
    Icon: GithubIcon,
    label: "GitHub",
    value: "@sherryomer",
    href: "https://github.com/sherryomer",
    color: "slate",
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: "shahzadashehryar",
    href: "https://www.linkedin.com/in/shahzadashehryar/",
    color: "cyan",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "shahzadashehryar@gmail.com",
    href: "mailto:shahzadashehryar@gmail.com",
    color: "amber",
    isLucide: true,
  },
]

const iconColors: Record<string, string> = {
  slate: "bg-slate-500/12 border-slate-500/25 text-slate-400",
  cyan: "bg-cyan-500/12 border-cyan-500/25 text-cyan-400",
  amber: "bg-amber-500/12 border-amber-500/25 text-amber-400",
}

type FormStatus = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // Sign up at formspree.io and replace YOUR_FORMSPREE_ID with your form ID
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#070710]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-cyan-500 font-mono text-xs mb-3 tracking-[0.2em] uppercase">05 / Contact</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Let&apos;s <span className="text-cyan-400">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Open to AI/ML roles, consulting, and interesting projects. Drop me a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-3"
          >
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
              <div className="p-2.5 rounded-xl bg-slate-500/12">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Based in Pakistan</p>
              </div>
            </div>

            {contactLinks.map(({ Icon, label, value, href, color, isLucide }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className={`p-2.5 rounded-xl border ${iconColors[color]}`}>
                  {isLucide
                    ? <Icon className="w-5 h-5" />
                    : <Icon className="w-5 h-5" />
                  }
                </div>
                <div>
                  <p className="text-slate-500 text-[11px] uppercase tracking-wider">{label}</p>
                  <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-3xl bg-white/[0.025] border border-white/[0.08] h-full">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-5 rounded-full bg-emerald-500/12 border border-emerald-500/25 mb-5"
                  >
                    <Send className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-black text-white mb-2">Message received!</h3>
                  <p className="text-slate-400 text-sm mb-8">I&apos;ll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.1] text-white text-sm hover:bg-white/[0.12] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Something went wrong. Email me directly at{" "}
                      <a href="mailto:shahzadashehryar@gmail.com" className="underline">
                        shahzadashehryar@gmail.com
                      </a>
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-zinc-900 font-bold text-sm hover:bg-slate-100 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-black/20"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Shahzada Muhammad Shehryar · CS Graduate, LUMS
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/sherryomer" target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-300 transition-colors text-sm">GitHub</a>
            <a href="https://www.linkedin.com/in/shahzadashehryar/" target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-300 transition-colors text-sm">LinkedIn</a>
            <a href="mailto:shahzadashehryar@gmail.com"
              className="text-slate-600 hover:text-slate-300 transition-colors text-sm">Email</a>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
