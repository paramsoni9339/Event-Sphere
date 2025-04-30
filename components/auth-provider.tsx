"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Mock user data
  const mockUsers = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin" as const,
      avatar: "https://ui-avatars.com/api/?name=Admin+User&background=6d28d9&color=fff",
    },
    {
      id: "2",
      name: "Test User",
      email: "user@example.com",
      password: "password123",
      role: "user" as const,
      avatar: "https://ui-avatars.com/api/?name=Test+User&background=6d28d9&color=fff",
    },
  ]

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("eventhub-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("eventhub-user")
      }
    }
    setIsLoading(false)
  }, [])

  // Protect admin routes
  useEffect(() => {
    if (!isLoading) {
      if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
        router.push("/auth/login")
        toast({
          title: "Access denied",
          description: "You need admin privileges to access this page",
          variant: "destructive",
        })
      }
    }
  }, [pathname, user, isLoading, router, toast])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("eventhub-user", JSON.stringify(userWithoutPassword))

      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      })

      // Redirect admin users to admin dashboard
      if (userWithoutPassword.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // In a real app, you would create a new user in the database
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      })

      router.push("/auth/login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was a problem creating your account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("eventhub-user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
