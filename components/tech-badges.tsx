"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const techBadges = [
  
 
  // { id: "notion", label: "Web dev", category: "tech", color: "bg-gray-500", textColor: "text-black", icon: "⚛️" },
  
]

const projectBadges = [
  // {
  //   id: "fullstack",
  //   label: "Full Stack",
  //   category: "project",
  //   color: "bg-purple-500",
  //   textColor: "text-white",
  //   icon: "📚",
  // },
  // {
  //   id: "software",
  //   label: "Software",
  //   category: "project",
  //   color: "bg-indigo-500",
  //   textColor: "text-white",
  //   icon: "💻",
  // },
  // {
  //   id: "datascience",
  //   label: "Data Science",
  //   category: "project",
  //   color: "bg-pink-500",
  //   textColor: "text-white",
  //   icon: "📊",
  // },
  // { id: "aiml", label: "AI/ML", category: "project", color: "bg-rose-500", textColor: "text-white", icon: "🤖" },
  // { id: "cloud", label: "Cloud", category: "project", color: "bg-sky-500", textColor: "text-white", icon: "☁️" },
  // { id: "devops", label: "DevOps", category: "project", color: "bg-orange-500", textColor: "text-white", icon: "⚙️" },
  // { id: "uiux", label: "UI/UX", category: "project", color: "bg-red-500", textColor: "text-white", icon: "🎨" },
  // {
  //   id: "cybersecurity",
  //   label: "Security",
  //   category: "project",
  //   color: "bg-emerald-600",
  //   textColor: "text-white",
  //   icon: "🔐",
  // },
  // {
  //   id: "graphic",
  //   label: "Graphic Design",
  //   category: "project",
  //   color: "bg-amber-500",
  //   textColor: "text-white",
  //   icon: "🖼️",
  // },
  // {
  //   id: "blockchain",
  //   label: "Blockchain",
  //   category: "project",
  //   color: "bg-teal-500",
  //   textColor: "text-white",
  //   icon: "⛓️",
  // },
]

const mainProjectBadges = projectBadges.slice(0, 6)
const hiddenProjectBadges = projectBadges.slice(6)

interface TechBadgesProps {
  selectedTech: string | null
  onSelectTech: (tech: string | null) => void
  selectedProject: string | null
  onSelectProject: (project: string | null) => void
}

export default function TechBadges({ selectedTech, onSelectTech, selectedProject, onSelectProject }: TechBadgesProps) {
  const [showMore, setShowMore] = useState(false)

  const handleBadgeClick = (id: string, category: string) => {
    if (category === "tech") {
      onSelectTech(selectedTech === id ? null : id)
    } else {
      onSelectProject(selectedProject === id ? null : id)
    }
  }

  const allBadges = [...techBadges, ...mainProjectBadges, ...(showMore ? hiddenProjectBadges : [])]

  const activeBadge = allBadges.find(
    (b) => (b.category === "tech" && selectedTech === b.id) || (b.category === "project" && selectedProject === b.id),
  )

  return (
    <div className="space-y-6 px-6 py-8 lg:px-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
        {techBadges.map((badge) => (
          <BadgeButton
            key={badge.id}
            badge={badge}
            isSelected={selectedTech === badge.id}
            onClick={() => handleBadgeClick(badge.id, badge.category)}
          />
        ))}

        {mainProjectBadges.map((badge) => (
          <BadgeButton
            key={badge.id}
            badge={badge}
            isSelected={selectedProject === badge.id}
            onClick={() => handleBadgeClick(badge.id, badge.category)}
          />
        ))}

        {hiddenProjectBadges.length > 0 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex items-center justify-center gap-1 rounded-2xl font-bold shadow-lg transition-all duration-200 cursor-pointer px-4 py-3 md:px-5 md:py-4 ${
              showMore
                ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
                : "bg-slate-600 text-white hover:bg-slate-700 hover:scale-105"
            }`}
            title="View more categories"
          >
            <span className="text-sm md:text-base font-semibold">View More</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {showMore && hiddenProjectBadges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
          {hiddenProjectBadges.map((badge) => (
            <BadgeButton
              key={badge.id}
              badge={badge}
              isSelected={selectedProject === badge.id}
              onClick={() => handleBadgeClick(badge.id, badge.category)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface BadgeButtonProps {
  badge: (typeof techBadges)[0]
  isSelected: boolean
  onClick: () => void
}

function BadgeButton({ badge, isSelected, onClick }: BadgeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-2xl font-bold shadow-lg transition-all duration-200 cursor-pointer px-3 py-2 md:px-4 md:py-3 min-w-[70px] md:min-w-[90px] ${
        badge.color
      } ${badge.textColor} ${
        isSelected
          ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
          : "hover:scale-105 active:scale-95"
      }`}
      title={`Filter by ${badge.label}`}
    >
      <span className="text-xl md:text-2xl">{badge.icon}</span>
      <span className="text-xs md:text-sm font-semibold mt-1 text-center leading-tight">{badge.label}</span>
    </button>
  )
}
