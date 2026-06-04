"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, X, Lightbulb, Star, Send } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  text: string
  options: string[]
  answer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "关于 Java 方法重写（Override），下列说法正确的是？",
    options: [
      "重写方法的访问权限可以比父类更严格",
      "重写方法的方法名和参数列表必须与父类一致",
      "静态方法可以被重写",
      "重写方法的返回类型必须完全相同",
    ],
    answer: 1,
    explanation: "方法重写要求方法名、参数列表与父类完全一致，返回类型可协变，访问权限不能更严格，且静态方法不能被重写（只能被隐藏）。",
  },
  {
    id: 2,
    text: "下列哪个关键字用于在子类中调用父类的构造方法？",
    options: ["this", "super", "parent", "base"],
    answer: 1,
    explanation: "super 关键字用于访问父类的成员，super() 用于调用父类构造方法，且必须位于子类构造方法的第一行。",
  },
  {
    id: 3,
    text: "向上转型（Upcasting）的特点是？",
    options: ["需要强制类型转换", "会丢失子类特有的方法访问能力", "可能抛出 ClassCastException", "只能在同一个类中进行"],
    answer: 1,
    explanation: "向上转型是自动的、安全的，但转型后只能访问父类中声明的方法，子类特有的方法需要再次向下转型才能调用。",
  },
]

export function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [stars, setStars] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const answered = Object.keys(answers).length
  const correct = questions.filter((q) => answers[q.id] === q.answer).length

  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">课后练习</h2>
        <span className="text-sm text-muted-foreground">
          {answered}/{questions.length} 题已完成
        </span>
      </div>

      <div className="space-y-6">
        {questions.map((q) => {
          const picked = answers[q.id]
          const done = picked !== undefined
          return (
            <div key={q.id} className="rounded-xl border border-border p-4">
              <p className="mb-3 font-medium text-foreground">
                {q.id}. {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isPicked = picked === i
                  const isAnswer = q.answer === i
                  return (
                    <button
                      key={i}
                      disabled={done}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition",
                        !done && "border-border hover:border-brand hover:bg-brand-soft/40",
                        done && isAnswer && "border-success bg-success-soft/50 text-foreground",
                        done && isPicked && !isAnswer && "border-danger bg-danger-soft text-foreground",
                        done && !isPicked && !isAnswer && "border-border opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                          done && isAnswer && "border-success bg-success text-white",
                          done && isPicked && !isAnswer && "border-danger bg-danger text-white",
                          (!done || (!isAnswer && !isPicked)) && "border-border text-muted-foreground",
                        )}
                      >
                        {done && isAnswer ? <Check className="size-3" /> : done && isPicked ? <X className="size-3" /> : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              <AnimatePresence>
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-start gap-2 rounded-lg bg-brand-soft p-3 text-sm"
                  >
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" />
                    <div>
                      <span className="font-medium text-brand">{picked === q.answer ? "回答正确！" : "解析"}</span>
                      <p className="mt-0.5 leading-relaxed text-muted-foreground">{q.explanation}</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {answered === questions.length ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div className="rounded-xl bg-success-soft px-4 py-3 text-sm font-medium text-success">
            共答对 {correct}/{questions.length} 题！薄弱点：多态应用
          </div>
          <div className="mt-4 space-y-3">
            {["内容难度", "理解程度", "满意度"].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-20 text-sm text-muted-foreground">{label}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setStars((prev) => ({ ...prev, [label]: n }))} aria-label={`${label} ${n} 星`}>
                      <Star className={cn("size-5", (stars[label] ?? 0) >= n ? "fill-amber-400 text-amber-400" : "text-border")} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              className="mt-4 flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              <Send className="size-4" /> 提交反馈
            </button>
          ) : (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-success/40 bg-success-soft/40 px-4 py-3">
              <span className="text-sm font-medium text-success">学习记录已更新！</span>
              <a href="/dashboard" className="text-sm font-medium text-brand hover:underline">
                查看评估报告 →
              </a>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="mt-4">
          <ProgressBar value={(answered / questions.length) * 100} />
        </div>
      )}
    </Card>
  )
}
