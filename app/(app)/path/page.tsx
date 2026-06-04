"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { RefreshCw, Check, ChevronDown, Clock, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RingGauge } from "@/components/ui/ring-gauge"
import { PageTitle } from "@/components/layout/page-title"
import { cn } from "@/lib/utils"

type Status = "completed" | "in_progress" | "pending"

const sessions: { id: number; title: string; minutes: number; status: Status; topics: string[] }[] = [
  { id: 1, title: "Java 基础回顾", minutes: 90, status: "completed", topics: ["变量与数据类型", "流程控制", "数组基础"] },
  { id: 2, title: "类与对象", minutes: 120, status: "completed", topics: ["类的定义", "构造方法", "this 关键字"] },
  { id: 3, title: "继承与多态", minutes: 150, status: "in_progress", topics: ["继承机制", "方法重写", "向上转型", "多态应用"] },
  { id: 4, title: "接口与抽象类", minutes: 120, status: "pending", topics: ["抽象类", "接口定义", "默认方法"] },
  { id: 5, title: "综合实战项目", minutes: 180, status: "pending", topics: ["项目架构", "模块拆分", "联调测试"] },
]

const statusMeta: Record<Status, { label: string; variant: "success" | "brand" | "muted" }> = {
  completed: { label: "已完成", variant: "success" },
  in_progress: { label: "进行中", variant: "brand" },
  pending: { label: "待开始", variant: "muted" },
}

export default function PathPage() {
  const [expanded, setExpanded] = useState<number | null>(3)

  return (
    <div>
      <PageTitle
        title="学习路径"
        subtitle="AI 为你规划的 5 个学习 Session，循序渐进达成目标"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand-soft">
            <RefreshCw className="size-4" /> 重新规划
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.85fr_1fr]">
        {/* 时间轴 */}
        <Card className="p-6">
          <div className="relative pl-2">
            {sessions.map((s, i) => {
              const meta = statusMeta[s.status]
              const isOpen = expanded === s.id
              return (
                <div key={s.id} className="relative pb-6 pl-8 last:pb-0">
                  {i < sessions.length - 1 ? (
                    <span className="absolute left-[7px] top-5 h-full w-0.5 bg-border" />
                  ) : null}
                  {/* dot */}
                  {s.status === "in_progress" ? (
                    <span className="absolute left-0 top-1 flex size-[18px] items-center justify-center">
                      <span className="absolute inline-flex size-[18px] animate-ping rounded-full bg-brand/40" />
                      <span className="relative size-[18px] rounded-full border-2 border-brand bg-brand" />
                    </span>
                  ) : s.status === "completed" ? (
                    <span className="absolute left-0.5 top-1.5 flex size-3.5 items-center justify-center rounded-full bg-success text-white">
                      <Check className="size-2.5" />
                    </span>
                  ) : (
                    <span className="absolute left-0.5 top-1.5 size-3.5 rounded-full border-2 border-border bg-card" />
                  )}

                  <button
                    onClick={() => setExpanded(isOpen ? null : s.id)}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition",
                      s.status === "in_progress" ? "border-l-4 border-brand bg-brand-soft/30" : "border-border hover:bg-secondary/50",
                      s.status === "pending" && "opacity-70",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">S{s.id}</span>
                        <span className="font-medium text-foreground">{s.title}</span>
                      </div>
                      <ChevronDown className={cn("size-4 text-muted-foreground transition", isOpen && "rotate-180")} />
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" /> {s.minutes} 分钟
                      </span>
                      <Badge variant={meta.variant}>{s.status === "in_progress" ? "当前 · 进行中" : meta.label}</Badge>
                    </div>
                    <AnimatePresence>
                      {isOpen ? (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 flex flex-wrap gap-2 overflow-hidden"
                        >
                          {s.topics.map((t) => (
                            <span key={t} className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </div>
              )
            })}
          </div>
        </Card>

        {/* 质量指标 */}
        <div className="space-y-5">
          <Card className="p-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">路径质量</h3>
            <div className="flex justify-around">
              <RingGauge percent={84} label="4.2" caption="进阶合理性" color="var(--brand)" />
              <RingGauge percent={90} label="4.5" caption="参与匹配度" color="var(--indigo)" />
            </div>
          </Card>
          <Card className="border-l-4 border-brand bg-brand-soft/40 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="size-4 text-brand" />
              <h3 className="text-base font-semibold text-foreground">AI 优化说明</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              考虑到你已掌握基础语法，路径直接从类与对象切入，并将耗时最长的「继承与多态」安排在状态最佳的学习时段。接口与抽象类紧随多态之后，便于知识迁移，最后以综合项目收尾，形成完整闭环。
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
