import { Rocket, UserRound, Map, BookOpen, LayoutDashboard, FolderKanban, Settings, type LucideIcon } from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  teacherOnly?: boolean
}

export const navItems: NavItem[] = [
  { label: "引导", href: "/onboarding", icon: Rocket },
  { label: "画像", href: "/profile", icon: UserRound },
  { label: "路径", href: "/path", icon: Map },
  { label: "资源", href: "/resources", icon: BookOpen },
  { label: "仪表盘", href: "/dashboard", icon: LayoutDashboard },
  { label: "课程管理", href: "/admin/courses", icon: FolderKanban, teacherOnly: true },
  { label: "设置", href: "/settings", icon: Settings },
]
