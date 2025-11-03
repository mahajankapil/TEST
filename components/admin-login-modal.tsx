"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (password === "123") {
      localStorage.setItem("adminLoggedIn", "true")
      onLogin()
      setPassword("")
      setError("")
    } else {
      setError("Invalid password")
      setPassword("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-6 w-96 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Admin Login</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="w-full"
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleLogin} className="flex-1 bg-primary hover:bg-primary/90">
              Login
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
