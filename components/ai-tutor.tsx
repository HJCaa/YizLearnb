"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X, Trash2, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = { id: number; role: "ai" | "user"; text: string; streaming?: boolean }

const quickQuestions = ["方法重写的规则是什么？", "super 关键字怎么用？", "多态有哪些应用场景？", "抽象类和接口的区别？"]

function useContextTag(pathname: string): string | null {
  if (pathname.startsWith("/path")) return "继承与多态 — 当前 Session 知识点"
  if (pathname.startsWith("/session")) return "继承与多态 — 方法重写"
  if (pathname.startsWith("/dashboard")) return "薄弱点：多态应用、接口设计"
  if (pathname.startsWith("/resources")) return "Java 面向对象 — 资源生成"
  return null
}

export function AiTutor() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [contextDismissed, setContextDismissed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "ai", text: "你好，我是弈知 AI 学习助手。关于本节内容有任何疑问都可以问我～" },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const contextTag = useContextTag(pathname)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  // 隐藏在登录/引导页
  if (pathname.startsWith("/login") || pathname.startsWith("/onboarding")) return null

  const send = (text: string) => {
    const value = text.trim()
    if (!value) return
    const userMsg: Message = { id: Date.now(), role: "user", text: value }
    const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: "正在思考……（接入 SSE 后此处为流式回答）", streaming: true }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    setInput("")
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id
            ? { ...m, streaming: false, text: "方法重写要求方法名、参数列表一致，返回类型兼容，访问权限不能更严格。可用 @Override 注解校验。" }
            : m,
        ),
      )
    }, 1400)
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[88px] right-6 z-50 flex h-[520px] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* 标题栏 */}
            <div className="flex h-12 items-center justify-between gradient-brand px-4">
              <div className="flex items-center gap-2 text-white">
                <Bot className="size-[18px]" />
                <span className="text-sm font-semibold">AI 学习助手</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{ id: 1, role: "ai", text: "对话已清空，有什么可以帮你？" }])}
                  className="flex size-7 items-center justify-center rounded-md text-white/90 hover:bg-white/15"
                  aria-label="清空对话"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex size-7 items-center justify-center rounded-md text-white/90 hover:bg-white/15"
                  aria-label="关闭"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* 上下文标签 */}
            {contextTag && !contextDismissed ? (
              <div className="flex items-center justify-between bg-brand-soft px-3 py-1.5 text-xs text-brand">
                <span className="truncate">当前关联：{contextTag}</span>
                <button onClick={() => setContextDismissed(true)} className="ml-2 shrink-0 hover:underline">
                  解除
                </button>
              </div>
            ) : null}

            {/* 对话区 */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex items-start gap-2", m.role === "user" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full",
                      m.role === "ai" ? "bg-secondary text-muted-foreground" : "gradient-brand text-white",
                    )}
                  >
                    {m.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[78%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "ai"
                        ? "rounded-tl-sm bg-secondary text-foreground"
                        : "rounded-tr-sm bg-brand text-white",
                    )}
                  >
                    {m.text}
                    {m.streaming ? <span className="cursor-blink ml-0.5 font-medium text-brand">▍</span> : null}
                  </div>
                </div>
              ))}
            </div>

            {/* 快捷问题 */}
            <div className="flex gap-2 overflow-x-auto border-t border-border bg-muted/40 px-3 py-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full bg-brand-soft px-3 py-1 text-xs text-brand hover:opacity-80"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* 输入区 */}
            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="输入你的问题..."
                className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg text-white transition",
                  input.trim() ? "gradient-brand" : "bg-secondary text-muted-foreground",
                )}
                aria-label="发送"
              >
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fab-breathing fixed bottom-6 right-6 z-50 flex size-[52px] items-center justify-center rounded-full gradient-brand text-white"
        aria-label="打开 AI 学习助手"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </>
  )
}
