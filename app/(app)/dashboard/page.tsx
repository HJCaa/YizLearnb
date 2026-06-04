"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookOpenCheck,
  Brain,
  Clock,
  Flame,
  Lightbulb,
  Bot,
  BookOpen,
  PenLine,
  Target,
  RefreshCw,
  BarChart3,
  X,
} from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { RingGauge } from "@/components/ui/ring-gauge"
import { StatCard } from "@/components/dashboard/stat-card"
import { HeatmapGrid } from "@/components/dashboard/heatmap-grid"
import { cn } from "@/lib/utils"

const suggestions = [
  {
    id: 1,
    title: "加强「多态应用」专项训练",
    desc: "你在多态的运行时绑定与向上转型上失分较多，建议在下一个 Session 前插入一组编码练习。",
  },
  {
    id: 2,
    title: "调整接口与抽象类的学习顺序",
    desc: "将「接口与抽象类」提前到多态之后，便于知识迁移，减少概念混淆。",
  },
  {
    id: 3,
    title: "缩短单次学习时长至 45 分钟",
    desc: "你的专注度在 45 分钟后明显下降，分段学习有助于提升知识留存率。",
  },
]

const activities = [
  { time: "今天 21:24", title: "完成会话「类与对象」练习，得分 88", icon: PenLine, tone: "success" as const, tag: "测验" },
  { time: "今天 20:10", title: "阅读资源「继承与多态 · 知识精讲」", icon: BookOpen, tone: "brand" as const, tag: "学习" },
  { time: "昨天 22:05", title: "AI 重新规划学习路径（自适应调整）", icon: RefreshCw, tone: "brand" as const, tag: "路径" },
  { time: "昨天 20:40", title: "完成 Session「类与对象」", icon: Target, tone: "success" as const, tag: "已完成" },
  { time: "06-01 19:30", title: "查看综合评估报告", icon: BarChart3, tone: "warning" as const, tag: "评估" },
]

const pathNodes = [
  { id: "S1", title: "Java 基础回顾", status: "completed" as const },
  { id: "S2", title: "类与对象", status: "completed" as const },
  { id: "S3", title: "继承与多态", status: "in_progress" as const },
  { id: "S4", title: "接口与抽象类", status: "pending" as const },
  { id: "S5", title: "综合实战项目", status: "pending" as const },
]

export default function DashboardPage() {
  const router = useRouter()
  const [adopting, setAdopting] = useState<number | null>(null)
  const [adopted, setAdopted] = useState<number[]>([])

  const confirmAdopt = () => {
    if (adopting !== null) setAdopted((prev) => [...prev, adopting])
    setAdopting(null)
    // 自适应闭环：采纳建议后进入路径重规划
    setTimeout(() => router.push("/path"), 400)
  }

  return (
    <div className="space-y-6">
      <PageTitle title="学习仪表盘" subtitle="2026 年 6 月 1 日 · 欢迎回来，张三" />

      {/* ROW 1 — 概览卡 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Clock} value={2.5} decimals={1} suffix="小时" label="今日学习时长" delta="+12%" deltaPositive />
        <StatCard icon={Target} value={3} suffix="/ 5" label="已完成 Session" progress={60} />
        <StatCard icon={Brain} value={12} suffix="个" label="已掌握知识点" delta="本周 +3" deltaPositive />
        <StatCard icon={Flame} value={7} suffix="天" label="连续学习" delta="最长 12 天" deltaPositive />
      </div>

      {/* ROW 2 — 掌握矩阵 + 综合评估 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.85fr_1fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="size-[18px] text-brand" />
            <h3 className="font-semibold text-foreground">知识点掌握矩阵</h3>
            <span className="text-xs text-muted-foreground">（Bloom 认知层次 × 知识点）</span>
          </div>
          <HeatmapGrid />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-foreground">综合评估</h3>
          <div className="grid grid-cols-2 gap-4">
            <RingGauge percent={78} label="78%" caption="知识掌握" color="var(--brand)" size={92} />
            <RingGauge percent={65} label="65%" caption="学习效率" color="var(--success)" size={92} />
            <RingGauge percent={82} label="82%" caption="专注程度" color="var(--chart-5)" size={92} />
            <RingGauge percent={70} label="70%" caption="进步幅度" color="var(--chart-4)" size={92} />
          </div>
        </Card>
      </div>

      {/* ROW 3 — AI 诊断 + 策略建议 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-l-4 border-brand bg-brand-soft/40 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Bot className="size-4 text-brand" />
            <h3 className="font-semibold text-foreground">AI 诊断报告</h3>
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              你已完成 5 个 Session 中的 3 个，整体进度良好。<strong className="text-foreground">类与对象</strong>、
              <strong className="text-foreground">继承</strong> 两个模块掌握扎实，在记忆与理解层次得分均超过 80。
            </p>
            <p>
              当前 <strong className="text-foreground">「继承与多态」</strong> 正在学习中，
              <strong className="text-foreground">多态</strong> 在「应用」与「分析」层次仍较薄弱（45 / 30 分），
              建议结合编码练习强化运行时绑定与向上转型的理解。专注度在单次 45 分钟后下降，可考虑分段学习。
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="size-4 text-brand" />
            <h3 className="font-semibold text-foreground">策略调整建议</h3>
          </div>
          <div className="space-y-3">
            {suggestions.map((s) => {
              const done = adopted.includes(s.id)
              return (
                <div key={s.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    {done ? (
                      <Badge variant="success">已采纳</Badge>
                    ) : (
                      <button
                        onClick={() => setAdopting(s.id)}
                        className="rounded-lg bg-brand px-3 py-1 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        采纳
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* ROW 4 — 最近活动 */}
      <Card className="p-5">
        <h3 className="mb-4 font-semibold text-foreground">最近学习活动</h3>
        <ol className="relative space-y-5 border-l border-border pl-5">
          {activities.map((act, i) => {
            const Icon = act.icon
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-card bg-brand-soft text-brand">
                  <Icon className="size-3" />
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">{act.time}</span>
                  <Badge variant={act.tone}>{act.tag}</Badge>
                </div>
                <p className="mt-1 text-sm text-foreground">{act.title}</p>
              </li>
            )
          })}
        </ol>
      </Card>

      {/* ROW 5 — 学习路径进度 */}
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">学习路径进度</h3>
          <span className="text-sm text-muted-foreground">4 周精通 Java 面向对象编程</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {pathNodes.map((n) => (
            <span
              key={n.id}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium",
                n.status === "completed" && "border-success/40 bg-success-soft text-success",
                n.status === "in_progress" && "border-brand/40 bg-brand-soft text-brand",
                n.status === "pending" && "border-border bg-secondary text-muted-foreground",
              )}
            >
              {n.status === "completed" ? "✓" : n.status === "in_progress" ? "●" : "○"} {n.id} {n.title}
            </span>
          ))}
        </div>
        <ProgressBar value={40} />
        <p className="mt-2 text-sm text-muted-foreground">已完成 2 / 5 个 Session，第 3 个进行中（整体 40%）</p>
      </Card>

      {/* 采纳确认弹窗 */}
      <AnimatePresence>
        {adopting !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4"
            onClick={() => setAdopting(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-base font-semibold text-foreground">采纳该建议？</h4>
                <button onClick={() => setAdopting(null)} className="text-muted-foreground hover:text-foreground" aria-label="关闭">
                  <X className="size-4" />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                采纳后，AI 将基于此建议重新规划你的学习路径。我们会带你前往「学习路径」页面查看调整对比。
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setAdopting(null)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  取消
                </button>
                <button
                  onClick={confirmAdopt}
                  className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  <RefreshCw className="size-4" /> 确认并重新规划
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
