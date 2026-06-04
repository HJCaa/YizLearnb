"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Lightbulb, FileText, Pencil, Rocket, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const suggestions = ["Java 后端开发", "Android 开发", "大数据开发", "全栈开发"]
const steps = ["设定目标", "填写背景", "确认生成"]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState("")
  const [major, setMajor] = useState("")
  const [grade, setGrade] = useState("")
  const [background, setBackground] = useState("")
  const [loading, setLoading] = useState(false)

  const goConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const generate = () => {
    setLoading(true)
    setTimeout(() => router.push("/profile"), 1500)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="flex h-12 items-center justify-between px-6">
        <span className="text-sm font-semibold text-foreground">弈知</span>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          跳过
        </Link>
      </div>
      <div className="h-0.5 w-full gradient-brand" />

      <div className="mx-auto w-full max-w-[720px] px-4 py-10">
        {/* 进度指示 */}
        <div className="mb-10 flex items-center justify-center">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition",
                    i < step
                      ? "bg-success text-white"
                      : i === step
                        ? "bg-brand text-white"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <span className={cn("text-xs", i === step ? "font-medium text-foreground" : "text-muted-foreground")}>{label}</span>
              </div>
              {i < steps.length - 1 ? (
                <div className={cn("mx-2 h-px w-16 md:w-24", i < step ? "bg-success" : "bg-border")} />
              ) : null}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <div className="mb-6 text-center">
                <h1 className="text-[28px] font-bold text-foreground text-balance">开始你的学习之旅</h1>
                <p className="mt-2 text-sm text-muted-foreground">只需 3 步，AI 将为你量身定制学习计划</p>
              </div>
              <Card className="p-6">
                <label className="mb-2 block text-sm font-medium text-foreground">你想学习什么？</label>
                <div className="relative">
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value.slice(0, 300))}
                    placeholder="例如：我想在 4 周内系统掌握 Java 面向对象编程，能够独立开发一个完整的后端项目……"
                    className="h-[120px] w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">{goal.length}/300</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setGoal(`我想系统学习${s}`)}
                      className="flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs text-brand hover:opacity-80"
                    >
                      <Lightbulb className="size-3.5" />
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button className="flex items-center gap-1.5 text-sm text-brand hover:underline">
                    <Rocket className="size-4" />
                    或快速体验 Demo 场景
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    disabled={goal.length < 10}
                    className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    下一步 <ArrowRight className="size-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ) : null}

          {step === 1 ? (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <Card className="space-y-5 p-6">
                <h2 className="text-lg font-semibold text-foreground">完善你的背景信息</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField label="专业" value={major} onChange={setMajor} options={["计算机科学", "软件工程", "信息管理", "其他"]} placeholder="请选择专业" />
                  <SelectField label="年级" value={grade} onChange={setGrade} options={["大一", "大二", "大三", "大四", "研究生", "已工作"]} placeholder="请选择年级" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">已有基础（可选）</label>
                  <textarea
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="例如：已掌握 C 语言基础语法，了解基本的数据结构……"
                    className="h-20 w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">上传资料（可选）</label>
                  <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted-foreground">
                    <FileText className="size-6" />
                    <p className="text-xs">拖拽 PDF 到此处，或点击上传</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button onClick={() => setStep(0)} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                    <ArrowLeft className="size-4" /> 上一步
                  </button>
                  <button
                    onClick={goConfirm}
                    disabled={loading}
                    className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                    {loading ? "AI 正在分析你的学习目标..." : "下一步"}
                    {!loading ? <ArrowRight className="size-4" /> : null}
                  </button>
                </div>
              </Card>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <Card className="p-6">
                <div className="rounded-lg border-l-4 border-brand bg-brand-soft/40 p-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-foreground text-balance">4 周精通 Java 面向对象编程</h2>
                    <button className="flex items-center gap-1 text-sm text-brand hover:underline">
                      <Pencil className="size-3.5" /> 编辑
                    </button>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {[
                      "掌握类与对象的核心概念及内存模型",
                      "理解封装、继承、多态三大特性",
                      "熟练使用接口与抽象类设计程序结构",
                      "掌握 Java 集合框架的常用容器",
                      "完成一个综合实战项目巩固所学",
                    ].map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>预计 4 周</span>
                    <span>已有基础：C 语言</span>
                    <span>目标难度：进阶</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-brand-soft p-4 text-sm leading-relaxed text-foreground">
                  <p className="font-medium text-brand">AI 差距分析</p>
                  <p className="mt-1 text-muted-foreground">
                    你已具备 C 语言基础，对流程控制较为熟悉，但缺乏面向对象的设计思维。建议从类与对象入手，重点突破继承与多态，最后通过实战项目串联知识点。
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button onClick={() => setStep(1)} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                    <ArrowLeft className="size-4" /> 上一步
                  </button>
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                    确认并生成画像 <ArrowRight className="size-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border border-border bg-background pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-brand/40",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}
