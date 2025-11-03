"use client"

import { Bell, ChevronDown, Code2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import AdminLoginModal from "./admin-login-modal"

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsAdminLoggedIn(adminLoggedIn)
  }, [])

  const handleAdminLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsAdminLoggedIn(false)
    setIsDropdownOpen(false)
  }

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true)
    setIsLoginModalOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white text-sm">
              <Code2 className="h-6 w-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-bold tracking-wider text-foreground">COLLEGE</span>
              <span className="text-xs font-bold tracking-wider text-foreground">WISHLIST</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link href="/all-courses" className="text-sm font-medium text-foreground hover:text-primary transition">
              All Courses
            </Link>
            <Link href="/learning-path" className="text-sm font-medium text-foreground hover:text-primary transition">
              Learning Path
            </Link>
            {isAdminLoggedIn && (
              <Link href="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition">
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 hover:bg-muted/50 transition" aria-label="Notifications">
              <Bell className="h-5 w-5 text-foreground" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted/50 transition"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                <ChevronDown
                  className={`h-4 w-4 text-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm hover:bg-muted text-foreground transition rounded-t-lg"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-3 text-sm hover:bg-muted text-foreground transition border-t border-border"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/saved"
                    className="block px-4 py-3 text-sm hover:bg-muted text-foreground transition border-t border-border"
                  >
                    Saved Courses
                  </Link>
                  {!isAdminLoggedIn ? (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true)
                        setIsDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted text-primary transition border-t border-border"
                    >
                      Admin Login
                    </button>
                  ) : (
                    <button
                      onClick={handleAdminLogout}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted text-destructive transition border-t border-border"
                    >
                      Admin Logout
                    </button>
                  )}
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-muted text-foreground transition border-t border-border rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </>
  )
}
