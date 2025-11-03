import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface CourseCardProps {
  id: string
  title: string
  description: string
  badge?: string
  image: string
  link: string
  ctaText?: string
}

export default function CourseCard({
  id,
  title,
  description,
  badge,
  image,
  link,
  ctaText = "Check it now",
}: CourseCardProps) {
  const isExternal = link.startsWith("http://") || link.startsWith("https://")

  const cardContent = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary bg-card/50 shadow-sm transition hover:shadow-md">
      {/* Image Container */}
      <div className="relative h-40 w-full overflow-hidden md:h-48">
        <Image
          src={image || "/placeholder.svg?height=200&width=300&query=course"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-muted/80 px-3 py-1 backdrop-blur-sm">
          <span className="text-xs font-medium text-foreground">{badge}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{description}</p>

        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition">
          {ctaText}
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )

  return <Link href={`/project/${id}`}>{cardContent}</Link>
}
