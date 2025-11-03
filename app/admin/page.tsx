"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!adminLoggedIn) {
      router.push("/")
    } else {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboard />
      <Footer />
    </div>
  )
}
