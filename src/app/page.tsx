import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"
import { TimelineNav } from "@/components/timeline-nav"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070710] overflow-x-hidden">
      <Navigation />
      <TimelineNav />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </main>
  )
}
