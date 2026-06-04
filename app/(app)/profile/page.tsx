"use client"

import { useState } from "react"
import Link from "next/link"
import { Brain, Target, Activity, ArrowRight, RefreshCw, Bot } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { RingGauge } from "@/components/ui/ring-gauge"
import { PageTitle } from "@/components/layout/page-title"
import { MiniRadar } from "@/components/charts/mini-radar"
import { cn } from "@/lib/utils"

type Level = "proficient" | "developing" | "beginner" | "not-started"

const levelMeta: Record<Level, { label: string; variant: "success" | "brand" | "warning" | "muted" }> = {
  proficient: { label: "熟练", variant: "success" },
  developing: { label: "发展中", variant: "brand" },
  beginner: { label: "入门", variant: "warning" },
  "not-started": { label: "未开始", variant: "muted" },
}

const skills: { name: string; value: number; level: Level }[] = [
  { name: "Java 基础语法", value: 80, level: "proficient" },
  { name: "面向对象编程", value: 60, level: "developing" },
  { name: "集合框架", value: 40, level: "beginner" },
  { name: "多线程编程", value: 20, level: "beginner" },
  { name: "接口与抽象类", value: 30, level: "developing" },
  { name: "设计模式", value: 10, level: "not-started" },
]

// 24 小时活跃度（固定值，避免水合不一致）；20:00-01:00 为高活跃时段
const hourlyActivity = [
  72, 50, 28, 22, 18, 20, 26, 34, 40, 38, 30, 42, 48, 36, 44, 40, 46, 52, 58, 66, 88, 92, 84, 78,
]

const tabs = [
  { id: "cognitive", label: "认知状态", icon: Brain },
  { id: "preference", label: "学习偏好", icon: Target },
  { id: "behavior", label: "行为模式", icon: Activity },
] as const

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("cognitive")
  const [prefs, setPrefs] = useState<string[]>(["课件文档", "实战案例"])

  const togglePref = (p: string) => setPrefs((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))

  return (
    <div>
      <PageTitle
        title="学习画像"
        subtitle="基于你的认知、偏好与行为，AI 为你绘制的多维学习者画像"
        action={
          <div className="flex items-center gap-3">
            <Link href="/path" className="text-sm font-medium text-brand hover:underline">
              查看学习路径 →
            </Link>
            <div className="hidden rounded-xl border border-border bg-card p-1 md:block">
              <MiniRadar size={96} />
            </div>
          </div>
        }
      />

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl border border-border bg-card p-1">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition",
                tab === t.id ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === "cognitive" ? (
        <Card className="p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">知识点掌握度</h2>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{s.value}%</span>
                    <Badge variant={levelMeta[s.level].variant}>{levelMeta[s.level].label}</Badge>
                  </div>
                </div>
                <ProgressBar value={s.value} />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-foreground">薄弱点</p>
            <div className="flex flex-wrap gap-2">
              {["多态应用", "接口设计", "线程同步"].map((w) => (
                <Badge key={w} variant="danger">
                  {w}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ) : null}

      {tab === "preference" ? (
        <Card className="space-y-6 p-6">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">偏好的内容类型</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["课件文档", "交互练习", "实战案例"].map((c) => (
                <button
                  key={c}
                  onClick={() => togglePref(c)}
                  className={cn(
                    "rounded-lg border p-4 text-sm font-medium transition",
                    prefs.includes(c) ? "border-brand bg-brand-soft text-brand" : "border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">难度偏好</p>
            <div className="flex items-center gap-1 text-lg text-amber-400">
              {"★★★☆☆".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">进阶</span>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">偏好的呈现格式</p>
            <div className="flex flex-wrap gap-2">
              {["Markdown", "思维导图", "幻灯片"].map((f) => (
                <Badge key={f} variant="brand">
                  {f}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ) : null}

      {tab === "behavior" ? (
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-medium text-foreground">活跃时段</p>
            <p className="mt-1 text-2xl font-bold text-foreground">20:00 - 23:00</p>
            <p className="mb-3 text-xs text-muted-foreground">夜间学习型</p>
            <div className="flex h-12 items-end gap-0.5">
              {hourlyActivity.map((height, h) => {
                const active = h >= 20 || h <= 1
                return (
                  <div
                    key={h}
                    className={cn("flex-1 rounded-sm", active ? "bg-brand" : "bg-secondary")}
                    style={{ height: `${height}%` }}
                  />
                )
              })}
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <RingGauge percent={75} label="60 分钟" caption="平均单次学习时长" color="var(--indigo)" />
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-foreground">参与度</p>
            <p className="mb-3 mt-1 text-2xl font-bold text-foreground">85%</p>
            <ProgressBar value={85} />
            <p className="mt-3 text-xs text-muted-foreground">高于同阶段学习者平均水平</p>
          </Card>
        </div>
      ) : null}

      {/* AI 诊断 */}
      <Card className="mt-6 border-l-4 border-brand bg-brand-soft/40 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Bot className="size-4 text-brand" />
          <h3 className="text-base font-semibold text-foreground">AI 诊断摘要</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          你的 Java 基础语法掌握扎实，面向对象编程正在稳步发展，但在多态应用与接口设计上仍较薄弱。结合你偏好实战案例、习惯夜间高强度学习的特点，建议在接下来的路径中增加多态相关的编码练习，并通过一个综合项目将继承、接口与集合框架串联起来，巩固知识体系。
        </p>
      </Card>

      <div className="mt-6 flex justify-end gap-3">
        <button className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
          <RefreshCw className="size-4" /> 重新测评
        </button>
        <Link href="/path" className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          查看学习路径 <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
