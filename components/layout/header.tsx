"use client"

import { useState } from "react"
import { Bell, ChevronDown, Moon, Sun, GraduationCap, BookUser } from "lucide-react"
import { useRole, type Role } from "@/components/role-provider"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const { role, setRole } = useRole()
  const { theme, toggleTheme } = useTheme()
  const [roleOpen, setRoleOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const roleLabel = role === "student" ? "学生" : "教师"

  return (
    <header className="sticky top-0 z-30 bg-card">
      <div className="flex h-12 items-center justify-between px-4 md:px-6">
        <span className="text-sm font-semibold text-foreground md:hidden">弈知 · YizLearn</span>
        <div className="hidden md:block" />
        <div className="flex items-center gap-2">
          {/* 角色切换 */}
          <div className="relative">
            <button
              onClick={() => setRoleOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
            >
              {role === "student" ? <GraduationCap className="size-4" /> : <BookUser className="size-4" />}
              {roleLabel}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            {roleOpen ? (
              <div className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
                {(["student", "teacher"] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r)
                      setRoleOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-secondary",
                      role === r ? "text-brand" : "text-foreground",
                    )}
                  >
                    {r === "student" ? <GraduationCap className="size-4" /> : <BookUser className="size-4" />}
                    {r === "student" ? "学生" : "教师"}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* 主题切换 */}
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
            aria-label="切换主题"
          >
            {theme === "light" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
          </button>

          {/* 通知 */}
          <button className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary" aria-label="通知">
            <Bell className="size-[18px]" />
            <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-danger text-[9px] font-semibold text-white">
              3
            </span>
          </button>

          {/* 用户 */}
          <div className="relative">
            <button onClick={() => setUserOpen((v) => !v)} className="flex items-center gap-1.5">
              <span className="flex size-8 items-center justify-center rounded-full gradient-brand text-xs font-semibold text-white">
                张
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            {userOpen ? (
              <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground">张三</p>
                  <p className="text-xs text-muted-foreground">{roleLabel}</p>
                </div>
                <div className="border-t border-border" />
                <a href="/settings" className="block px-3 py-1.5 text-xs text-foreground hover:bg-secondary">
                  设置
                </a>
                <a href="/login" className="block px-3 py-1.5 text-xs text-danger hover:bg-secondary">
                  退出登录
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* 底部 2px 渐变线 */}
      <div className="h-0.5 w-full gradient-brand" />
    </header>
  )
}
