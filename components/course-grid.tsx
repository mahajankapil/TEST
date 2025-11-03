"use client"

import CourseCard from "./course-card"
import { useMemo, useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  tech: string
  project: string
}

interface CourseGridProps {
  selectedTech: string | null
  selectedProject: string | null
}

export default function CourseGrid({ selectedTech, selectedProject }: CourseGridProps) {
  const [courses, setCourses] = useState<Project[]>([])

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setCourses(JSON.parse(savedProjects))
    } else {
      const defaultCourses = [
        {
          id: "1",
          title: "Chat Application",
          description: "Next.js Full Stack Project that ...",
          image: "/nextjs-testing-course.jpg",
          link: "/course/testing",
          tech: "js",
          project: "fullstack",
        },
        {
          id: "2",
          title: "Food Delivery App",
          description: "Next.js Full Stack Project that , fullstack...",
          image: "/nextjs-development.jpg",
          link: "/course/nextjs-16",
          tech: "react",
          project: "fullstack",
        },
        {
          id: "3",
          title: "Google Meet Clone",
          description: "Learn GSAP animation with JS Mastery. Practical GSAP tutorials, real projects...",
          image: "/web-animation-gsap.jpg",
          link: "/course/animations",
          tech: "gsap",
          project: "uiux",
        },
        {
          id: "4",
          title: "Chat GPT Clone",
          description: "Master advanced React patterns and best practices for building scalable apps...",
          image: "/react-advanced-patterns.jpg",
          link: "/course/react-patterns",
          tech: "react",
          project: "software",
        },
        {
          id: "5",
          title: "Full-Stack Web Development",
          description: "Build complete web applications with modern tools and frameworks...",
          image: "/fullstack-development.jpg",
          link: "/course/fullstack",
          tech: "database",
          project: "fullstack",
        },
        {
          id: "6",
          title: "UI/UX Design Fundamentals",
          description: "Learn design principles and create beautiful user interfaces from scratch...",
          image: "/ui-ux-design-concept.png",
          link: "/course/design",
          tech: "video",
          project: "uiux",
        },
        {
          id: "7",
          title: "Machine Learning Masterclass",
          description: "Build real-world ML models with Python and TensorFlow...",
          image: "/ml-masterclass.jpg",
          link: "/course/ml",
          tech: "js",
          project: "aiml",
        },
        {
          id: "8",
          title: "DevOps with Kubernetes",
          description: "Master containerization and orchestration for production deployments...",
          image: "/devops-kubernetes.jpg",
          link: "/course/devops",
          tech: "kubernetes",
          project: "devops",
        },
      ]
      setCourses(defaultCourses)
      localStorage.setItem("projects", JSON.stringify(defaultCourses))
    }
  }, [])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTech = !selectedTech || course.tech === selectedTech
      const matchesProject = !selectedProject || course.project === selectedProject
      return matchesTech && matchesProject
    })
  }, [selectedTech, selectedProject, courses])

  const getDisplayTitle = () => {
    if (selectedTech && selectedProject) {
      return "Projects"
    } else if (selectedTech) {
      return `${selectedTech.toUpperCase()} Courses`
    } else if (selectedProject) {
      const projectName =
        {
          fullstack: "Full Stack Web Dev",
          software: "Software",
          datascience: "Data Science",
          aiml: "AI/ML",
          cloud: "Cloud",
          devops: "DevOps",
          uiux: "UI/UX",
          cybersecurity: "Cybersecurity",
          graphic: "Graphic Design",
          blockchain: "Blockchain",
        }[selectedProject] || "Project"
      return `${projectName} Courses`
    }
    return "All Projects"
  }

  return (
    <section className="px-6 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold text-foreground">{getDisplayTitle()}</h2>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
