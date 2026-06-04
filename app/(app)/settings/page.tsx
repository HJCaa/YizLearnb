"use client"

import { useState } from "react"
import { Bell, Moon, Palette, Shield, Sun, User } from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useRole } from "@/components/role-provider"

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={
        "relative h-6 w-11 rounded-full transition-colors " + (checked ? "bg-brand" : "bg-muted-foreground/30")
      }
    >
      <span
        className={
          "absolute top-0.5 size-5 rounded-full bg-card shadow transition-transform " +
          (checked ? "translate-x-[22px]" : "translate-x-0.5")
        }
      />
    </button>
  )
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { role, setRole } = useRole()
  const [notifs, setNotifs] = useState({ daily: true, weekly: true, achievement: false, marketing: false })

  return (
    <div className="space-y-6">
      <PageTitle title="设置" subtitle="管理你的账户、偏好与通知" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <User className="size-5 text-brand" />
              <h3 className="font-semibold text-foreground">个人资料</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex size-16 items-center justify-center rounded-full gradient-brand text-xl font-bold text-brand-foreground">
                弈
              </span>
              <div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  更换头像
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">支持 JPG / PNG，最大 2MB</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="昵称" defaultValue="弈知学员" />
              <Field label="邮箱" defaultValue="learner@yizlearn.com" />
              <Field label="学习目标" defaultValue="掌握机器学习核心概念" />
              <Field label="每日目标时长" defaultValue="60 分钟" />
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90">保存更改</Button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="size-5 text-brand" />
              <h3 className="font-semibold text-foreground">通知偏好</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { key: "daily" as const, title: "每日学习提醒", desc: "在设定时间提醒你开始学习" },
                { key: "weekly" as const, title: "每周学习报告", desc: "汇总你的学习进度与建议" },
                { key: "achievement" as const, title: "成就解锁通知", desc: "解锁新徽章时通知你" },
                { key: "marketing" as const, title: "产品与活动推送", desc: "接收新功能与课程上新信息" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={() => setNotifs((n) => ({ ...n, [item.key]: !n[item.key] }))} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Palette className="size-5 text-brand" />
              <h3 className="font-semibold text-foreground">外观</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors " +
                  (theme === "light" ? "border-brand bg-brand-soft" : "border-border hover:bg-accent")
                }
              >
                <Sun className="size-5 text-warning" />
                <span className="text-sm font-medium text-foreground">浅色</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors " +
                  (theme === "dark" ? "border-brand bg-brand-soft" : "border-border hover:bg-accent")
                }
              >
                <Moon className="size-5 text-indigo" />
                <span className="text-sm font-medium text-foreground">深色</span>
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="size-5 text-brand" />
              <h3 className="font-semibold text-foreground">角色与权限</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              当前角色：<Badge variant={role === "teacher" ? "brand" : "muted"}>{role === "teacher" ? "教师" : "学生"}</Badge>
            </p>
            <p className="mb-3 text-xs text-muted-foreground">切换到教师可在侧边栏访问课程管理等功能（演示用）。</p>
            <div className="flex gap-2">
              <Button
                variant={role === "student" ? "default" : "outline"}
                size="sm"
                className={role === "student" ? "bg-brand text-brand-foreground" : "bg-transparent"}
                onClick={() => setRole("student")}
              >
                学生
              </Button>
              <Button
                variant={role === "teacher" ? "default" : "outline"}
                size="sm"
                className={role === "teacher" ? "bg-brand text-brand-foreground" : "bg-transparent"}
                onClick={() => setRole("teacher")}
              >
                教师
              </Button>
            </div>
          </Card>

          <Card className="border-danger/30 p-5">
            <h3 className="mb-2 font-semibold text-danger">危险操作</h3>
            <p className="mb-3 text-xs text-muted-foreground">删除账户将清除所有学习数据，且无法恢复。</p>
            <Button variant="outline" size="sm" className="border-danger/40 bg-transparent text-danger hover:bg-danger-soft">
              删除账户
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </label>
  )
}
