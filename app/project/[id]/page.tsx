"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  tech: string
  project: string
  price: string
  features: string[]
  buyLink: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const projects = JSON.parse(savedProjects)
      const foundProject = projects.find((p: Project) => p.id === params.id)
      setProject(foundProject || null)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <p className="text-muted-foreground">Loading project...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-6 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleBuyClick = () => {
    if (project.buyLink) {
      window.open(project.buyLink, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Projects</span>
            </button>
          </Link>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Project Image */}
            <div className="w-full">
              <div className="relative w-full bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                <div className="relative aspect-square w-full">
                  <Image
                    src={project.image || "/placeholder.svg?height=600&width=600&query=project"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Project Details */}
            <div className="w-full flex flex-col justify-start">
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">{project.title}</h1>

              {/* Tech Stack Subtitle */}
              <p className="text-lg text-muted-foreground mb-8 font-medium">{project.description}</p>

              {/* Price - Large and Bold */}
              {project.price && (
                <div className="mb-10">
                  <p className="text-5xl font-bold text-accent">{project.price}</p>
                </div>
              )}

              {/* Features List */}
              {project.features && project.features.length > 0 && (
                <div className="mb-10">
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-base text-foreground">
                        <span className="text-accent font-bold text-xl">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buy Button - Prominent Blue */}
              <div className="mt-4">
                {project.buyLink && (
                  <button
                    onClick={handleBuyClick}
                    className="w-full sm:w-auto px-12 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg transition duration-200 shadow-lg"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack Info Below */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-muted-foreground">Technology:</span>
              <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground">
                {project.tech}
              </span>
              {project.project && (
                <>
                  <span className="text-sm font-semibold text-muted-foreground">Category:</span>
                  <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground">
                    {project.project}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
