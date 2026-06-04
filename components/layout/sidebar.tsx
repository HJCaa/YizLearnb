"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav"
import { useRole } from "@/components/role-provider"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const { role } = useRole()
  const items = navItems.filter((item) => !item.teacherOnly || role === "teacher")

  return (
    <aside className="sticky top-0 hidden h-screen w-[180px] shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-12 items-center px-4">
        <span className="text-sm font-semibold text-white">弈知 · YizLearn</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {items.map((item, index) => {
          const active = pathname.startsWith(item.href)
          const Icon = item.icon
          const showDivider = item.teacherOnly && index === items.findIndex((i) => i.teacherOnly)
          return (
            <div key={item.href}>
              {showDivider ? <div className="my-2 border-t border-sidebar-border" /> : null}
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-medium text-white"
                    : "text-sidebar-foreground hover:bg-white/5 hover:text-white",
                )}
              >
                {active ? <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-brand" /> : null}
                <Icon className="size-[18px] shrink-0" />
                <span>{item.label}</span>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="flex items-center gap-2 px-4 py-3 text-[11px] text-slate-400">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        <span>AI 引擎运行中</span>
      </div>
    </aside>
  )
}

export function MobileTabBar() {
  const pathname = usePathname()
  const { role } = useRole()
  const items = navItems.filter((item) => !item.teacherOnly || role === "teacher").slice(0, 5)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-sidebar-border bg-sidebar md:hidden">
      {items.map((item) => {
        const active = pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("flex flex-col items-center gap-0.5 text-[10px]", active ? "text-brand" : "text-slate-400")}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
