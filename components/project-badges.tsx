"use client"

const projectCategories = [
  { id: "fullstack", label: "Full Stack Web Dev", color: "bg-purple-500", textColor: "text-white", icon: "🌐" },
  { id: "software", label: "Software", color: "bg-indigo-500", textColor: "text-white", icon: "💻" },
  { id: "datascience", label: "Data Science", color: "bg-orange-500", textColor: "text-white", icon: "📊" },
  { id: "aiml", label: "AI/ML", color: "bg-pink-500", textColor: "text-white", icon: "🤖" },
  { id: "cloud", label: "Cloud", color: "bg-blue-600", textColor: "text-white", icon: "☁️" },
  { id: "devops", label: "DevOps", color: "bg-red-500", textColor: "text-white", icon: "⚙️" },
  { id: "uiux", label: "UI/UX", color: "bg-teal-500", textColor: "text-white", icon: "🎨" },
  { id: "cybersecurity", label: "Cybersecurity", color: "bg-red-700", textColor: "text-white", icon: "🔒" },
  { id: "graphic", label: "Graphic Design", color: "bg-amber-500", textColor: "text-white", icon: "✨" },
  { id: "blockchain", label: "Blockchain", color: "bg-yellow-600", textColor: "text-black", icon: "⛓️" },
]

interface ProjectBadgesProps {
  selectedProject: string | null
  onSelectProject: (project: string | null) => void
}

export default function ProjectBadges({ selectedProject, onSelectProject }: ProjectBadgesProps) {
  return (
    <div className="space-y-6 px-6 py-8 lg:px-8 border-t border-border/50">
      <h3 className="text-lg font-semibold text-foreground">Project Categories</h3>
      <div className="flex flex-wrap justify-start gap-3">
        {projectCategories.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(selectedProject === project.id ? null : project.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium shadow-md transition-all duration-200 md:px-5 md:py-3 cursor-pointer ${
              project.color
            } ${project.textColor} ${
              selectedProject === project.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-105"
                : "hover:scale-105 hover:shadow-lg"
            }`}
            title={`Filter by ${project.label}`}
          >
            <span className="text-lg md:text-xl">{project.icon}</span>
            <span className="text-sm md:text-base hidden sm:inline">{project.label}</span>
            <span className="text-sm md:text-base sm:hidden">{project.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto flex items-start gap-3 rounded-lg bg-muted/30 px-4 py-3">
        <span className="mt-1 text-lg">💡</span>
        <p className="text-sm text-muted-foreground">
          {selectedProject
            ? `Showing courses for ${projectCategories.find((p) => p.id === selectedProject)?.label}. Click again to clear filter.`
            : "Explore courses by project type to find what interests you."}
        </p>
      </div>
    </div>
  )
}
