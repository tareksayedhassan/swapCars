"use client"

import { useCallback, useMemo, useState } from "react"

type AuthUser = {
  name?: string
  fullName?: string
  avatar?: string
  email?: string
  phone?: string
  notifications?: Array<{
    id: number
    title: string
    body: string
    type: "Booking" | "financing" | "Register_New_Account"
    isRead: boolean
    createdAt: Date
  }>
}

const STORAGE_KEY = "swapcars-demo-user"

export default function useAuthStore() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      setUser(null)
      setIsLoggedIn(false)
      return
    }

    try {
      const parsed = JSON.parse(raw) as AuthUser
      setUser(parsed)
      setIsLoggedIn(true)
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
      setUser(null)
      setIsLoggedIn(false)
    }
  }, [])

  const logout = useCallback(async () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setIsLoggedIn(false)
  }, [])

  const RequestOtp = useCallback(async (_payload?: { loginMethod?: string; phone?: string }) => {
    void _payload
    await new Promise((resolve) => setTimeout(resolve, 350))
  }, [])

  const sendOtp = useCallback(async ({ phone }: { phone: string; otp: string }) => {
    const nextUser: AuthUser = {
      name: "SwapCar User",
      phone,
      notifications: [],
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    setIsLoggedIn(true)
  }, [])

  return useMemo(
    () => ({ user, isLoggedIn, logout, checkAuth, RequestOtp, sendOtp }),
    [RequestOtp, checkAuth, isLoggedIn, logout, sendOtp, user],
  )
}
