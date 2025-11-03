"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import TechBadges from "@/components/tech-badges"
import CourseGrid from "@/components/course-grid"
import Footer from "@/components/footer"

export default function Home() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TechBadges
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />
        <CourseGrid selectedTech={selectedTech} selectedProject={selectedProject} />
      </main>
      <Footer />
    </div>
  )
}
