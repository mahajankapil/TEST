"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, X, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

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

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    tech: "",
    project: "",
    price: "",
    features: "",
    buyLink: "",
  })

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      const defaultProjects = [
        {
          id: "1",
          title: "Chat Application",
          description: "Next.js Full Stack Project that ...",
          image: "/nextjs-testing-course.jpg",
          link: "/course/testing",
          tech: "js",
          project: "fullstack",
          price: "₹99/-",
          features: ["Life Time Access", "Installation Video"],
          buyLink: "https://razorpay.com/...",
        },
        {
          id: "2",
          title: "Food Delivery App",
          description: "Next.js Full Stack Project that , fullstack...",
          image: "/nextjs-development.jpg",
          link: "/course/nextjs-16",
          tech: "react",
          project: "fullstack",
          price: "₹199/-",
          features: ["Fast Delivery", "Multiple Payment Options"],
          buyLink: "https://razorpay.com/...",
        },
        {
          id: "3",
          title: "Google Meet Clone",
          description: "Learn GSAP animation with JS Mastery. Practical GSAP tutorials, real projects...",
          image: "/web-animation-gsap.jpg",
          link: "/course/animations",
          tech: "gsap",
          project: "uiux",
          price: "₹299/-",
          features: ["HD Video Calls", "Screen Sharing"],
          buyLink: "https://razorpay.com/...",
        },
        {
          id: "4",
          title: "Chat GPT Clone",
          description: "Master advanced React patterns and best practices for building scalable apps...",
          image: "/react-advanced-patterns.jpg",
          link: "/course/react-patterns",
          tech: "react",
          project: "software",
          price: "₹399/-",
          features: ["Advanced Patterns", "Scalable Architecture"],
          buyLink: "https://razorpay.com/...",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("projects", JSON.stringify(defaultProjects))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setFormData({ ...formData, image: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = () => {
    if (!formData.title || !formData.link) {
      alert("Please fill in at least title and link")
      return
    }

    if (!formData.image) {
      alert("Please upload an image")
      return
    }

    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f)

    if (editingId) {
      setProjects(
        projects.map((p) => (p.id === editingId ? { ...formData, features: featuresArray, id: editingId } : p)),
      )
      setSuccessMessage("Project updated successfully!")
      setEditingId(null)
    } else {
      const newProject: Project = {
        ...formData,
        features: featuresArray,
        id: Date.now().toString(),
      }
      setProjects([...projects, newProject])
      setSuccessMessage("Project added successfully!")
    }

    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      tech: "",
      project: "",
      price: "",
      features: "",
      buyLink: "",
    })
    setImagePreview("")
    setIsAddingProject(false)

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id))
      setSuccessMessage("Project deleted successfully!")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleEditProject = (project: Project) => {
    const featuresString = Array.isArray(project.features)
      ? project.features.join(", ")
      : (project.features as unknown as string) || ""

    setFormData({
      ...project,
      features: featuresString,
    })
    setImagePreview(project.image)
    setEditingId(project.id)
    setIsAddingProject(true)
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      tech: "",
      project: "",
      price: "",
      features: "",
      buyLink: "",
    })
    setImagePreview("")
    setEditingId(null)
    setIsAddingProject(false)
  }

  return (
    <main className="px-6 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {showSuccess && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/20 border border-green-500/30 px-4 py-3 animate-in slide-in-from-top">
            <Check className="h-5 w-5 text-green-500" />
            <p className="text-sm font-medium text-green-700">{successMessage}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
            <p className="text-sm text-muted-foreground mt-2">
              All changes are saved and visible to all users immediately
            </p>
          </div>
          {!isAddingProject && (
            <Button
              onClick={() => setIsAddingProject(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Project
            </Button>
          )}
        </div>

        {isAddingProject && (
          <Card className="p-6 mb-8 border border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingId ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Title *</label>
                <Input
                  placeholder="Project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <Input
                  placeholder="Project description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Project Link / Href *</label>
                <Input
                  placeholder="/course/example or https://example.com"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Upload Image *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center w-full px-3 py-2 rounded-md border border-input bg-background text-foreground cursor-pointer hover:bg-muted/50 transition">
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-sm">Choose image</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tech Tag</label>
                <select
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  <option value="">Select tech</option>
                  <option value="js">JavaScript</option>
                  <option value="react">React</option>
                  <option value="gsap">GSAP</option>
                  <option value="database">Database</option>
                  <option value="video">Video</option>
                  <option value="kubernetes">Kubernetes</option>
                  <option value="cloud">Cloud</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Project Category</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  <option value="">Select category</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="uiux">UI/UX</option>
                  <option value="software">Software</option>
                  <option value="aiml">AI/ML</option>
                  <option value="devops">DevOps</option>
                  <option value="datascience">Data Science</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Price (e.g., ₹99/-)</label>
                <Input
                  placeholder="₹99/-"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Features (comma-separated)</label>
                <Input
                  placeholder="Life Time Access, Installation Video, Instant Email Delivery"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">Buy Link / Razorpay URL</label>
                <Input
                  placeholder="https://razorpay.com/... or your payment link"
                  value={formData.buyLink}
                  onChange={(e) => setFormData({ ...formData, buyLink: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            {imagePreview && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-3">Image Preview:</p>
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-40 rounded-lg object-cover" />
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleAddProject} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingId ? "Update Project" : "Add Project"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </Card>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Tech</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-muted/30 transition">
                  <td className="px-4 py-3 text-foreground font-medium">{project.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">
                    {project.description?.substring(0, 30)}...
                  </td>
                  <td className="px-4 py-3 text-foreground text-sm font-semibold">{project.price || "-"}</td>
                  <td className="px-4 py-3 text-foreground text-sm">{project.tech}</td>
                  <td className="px-4 py-3 text-foreground text-sm">{project.project}</td>
                  <td className="px-4 py-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 hover:bg-muted rounded-md transition text-foreground"
                      title="Edit project"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 hover:bg-destructive/20 rounded-md transition text-destructive"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects added yet.</p>
            <Button onClick={() => setIsAddingProject(true)} className="bg-primary hover:bg-primary/90">
              Add Your First Project
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
