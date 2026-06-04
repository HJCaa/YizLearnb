"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap,
  Search,
  PenLine,
  FileStack,
  Check,
  Loader2,
  Clock,
  FileText,
  Network,
  ListChecks,
  ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { PageTitle } from "@/components/layout/page-title"
import { cn } from "@/lib/utils"

type Phase = "completed" | "in_progress" | "pending"

const chapters: { name: string; status: Phase }[] = [
  { name: "类与对象", status: "completed" },
  { name: "继承", status: "completed" },
  { name: "多态", status: "in_progress" },
  { name: "接口", status: "pending" },
]

const explore = [
  { title: "基础知识", icon: FileText, items: ["封装", "继承", "多态", "抽象类", "接口"] },
  { title: "实践要点", icon: ListChecks, items: ["方法重写规则", "super 用法", "向上转型"] },
  { title: "解题策略", icon: Network, items: ["类图分析", "职责拆分", "接口隔离"] },
]

const resources = [
  { type: "课件", typeVariant: "brand", icon: FileText, title: "继承与多态 · 知识精讲", diff: "进阶", date: "2026-06-01" },
  { type: "思维导图", typeVariant: "indigo", icon: Network, title: "面向对象三大特性总览", diff: "入门", date: "2026-06-01" },
  { type: "练习题", typeVariant: "success", icon: ListChecks, title: "多态应用专项练习（10 题）", diff: "进阶", date: "2026-06-01" },
  { type: "课件", typeVariant: "brand", icon: FileText, title: "接口与抽象类对比详解", diff: "进阶", date: "2026-06-01" },
] as const

export default function ResourcesPage() {
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(100)

  const handleGenerate = () => {
    setGenerating(true)
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setGenerating(false)
          return 100
        }
        return p + 5
      })
    }, 120)
  }

  return (
    <div>
      <PageTitle
        title="资源中心"
        subtitle="AI 三阶段生成个性化学习资源"
        action={
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {generating ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
            {generating ? "生成中..." : "一键生成全部"}
          </button>
        }
      />

      {generating ? (
        <Card className="mb-6 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">AI 正在生成资源…</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </Card>
      ) : null}

      {/* 三阶段流水线 */}
      <div className="space-y-4">
        {/* 阶段一 */}
        <PhaseCard index="一" title="知识探索" icon={Search} status="completed">
          <div className="grid gap-4 sm:grid-cols-3">
            {explore.map((col) => {
              const Icon = col.icon
              return (
                <div key={col.title} className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Icon className="size-4 text-brand" />
                    {col.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {col.items.map((it) => (
                      <span key={it} className="rounded-full bg-brand-soft px-2 py-0.5 text-xs text-brand">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </PhaseCard>

        {/* 阶段二 */}
        <PhaseCard index="二" title="并行草拟" icon={PenLine} status="in_progress" badge="2/4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {chapters.map((c) => (
              <div
                key={c.name}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 text-center text-sm",
                  c.status === "completed" && "border-success bg-success-soft/40",
                  c.status === "in_progress" && "border-brand bg-brand-soft/40",
                  c.status === "pending" && "border-dashed border-border text-muted-foreground",
                )}
              >
                {c.status === "completed" ? (
                  <Check className="size-5 text-success" />
                ) : c.status === "in_progress" ? (
                  <Loader2 className="size-5 animate-spin text-brand" />
                ) : (
                  <Clock className="size-5 text-muted-foreground" />
                )}
                <span className="font-medium text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ProgressBar value={50} />
          </div>
        </PhaseCard>

        {/* 阶段三 */}
        <PhaseCard index="三" title="整合与出题" icon={FileStack} status="pending">
          <p className="text-sm text-muted-foreground">等待阶段二完成后自动启动。</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 opacity-50">
            {["题目数量：10", "难度分布：进阶为主", "题型：单选 + 编程"].map((t) => (
              <div key={t} className="rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
                {t}
              </div>
            ))}
          </div>
        </PhaseCard>
      </div>

      {/* 已生成资源 */}
      <h2 className="mb-3 mt-8 text-base font-semibold text-foreground">已生成资源</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => {
          const Icon = r.icon
          return (
            <motion.div key={r.title} whileHover={{ y: -2 }}>
              <Card className="flex h-full flex-col p-4 transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant={r.typeVariant}>{r.type}</Badge>
                  <Badge variant="muted">{r.diff}</Badge>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <Link href="/session/3" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                  查看 <ArrowRight className="size-3.5" />
                </Link>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* 质量评分 */}
      <h2 className="mb-3 mt-8 text-base font-semibold text-foreground">质量评分</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <ScoreCard label="语言流畅性" score="4.2" percent={84} />
        <ScoreCard label="知识覆盖" score="4.5" percent={90} />
        <ScoreCard label="答案正确性" score="4.0" percent={80} />
      </div>
    </div>
  )
}

function PhaseCard({
  index,
  title,
  icon: Icon,
  status,
  badge,
  children,
}: {
  index: string
  title: string
  icon: typeof Search
  status: Phase
  badge?: string
  children: React.ReactNode
}) {
  const meta: Record<Phase, { label: string; variant: "success" | "brand" | "muted" }> = {
    completed: { label: "已完成", variant: "success" },
    in_progress: { label: "进行中", variant: "brand" },
    pending: { label: "待开始", variant: "muted" },
  }
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
            <Icon className="size-[18px]" />
          </span>
          <h3 className="font-semibold text-foreground">
            阶段{index}：{title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {badge ? <span className="text-xs text-muted-foreground">{badge}</span> : null}
          <Badge variant={meta[status].variant}>{meta[status].label}</Badge>
        </div>
      </div>
      {children}
    </Card>
  )
}

function ScoreCard({ label, score, percent }: { label: string; score: string; percent: number }) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-base font-bold text-foreground">★ {score}</span>
      </div>
      <ProgressBar value={percent} />
    </Card>
  )
}
