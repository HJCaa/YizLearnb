import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { RoleProvider } from "@/components/role-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "弈知 · YizLearn — AI 驱动的个性化学习平台",
  description: "弈知 YizLearn 是一个 AI 驱动的个性化学习平台，提供学习画像、智能路径规划、资源生成与学习仪表盘。",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <RoleProvider>{children}</RoleProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
