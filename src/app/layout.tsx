import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ClientShell } from "./client-shell"

export const metadata: Metadata = {
  title: "Shiok Cards",
  description: "SG hawker food memory card game",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shiok Cards",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#DC2626",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-sans antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
