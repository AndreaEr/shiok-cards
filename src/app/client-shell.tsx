"use client"

import { useEffect } from "react"

export function ClientShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
    }
  }, [])

  return (
    <main className="min-h-dvh max-w-md mx-auto">
      {children}
    </main>
  )
}
