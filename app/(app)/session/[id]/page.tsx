"use client"

import { useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ChevronRight, Copy, Check, ArrowLeft, ArrowRight, MessageCircle, ListTree } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Quiz } from "@/components/session/quiz"
import { cn } from "@/lib/utils"

const markdown = `## 一、继承的基本概念

继承（Inheritance）是面向对象编程的三大特性之一，它允许一个类（**子类**）获取另一个类（**父类**）的属性和方法，从而实现代码复用。

Java 使用 \`extends\` 关键字来声明继承关系：

\`\`\`java
public class Animal {
    protected String name;
    public void eat() {
        System.out.println(name + " is eating");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " is barking");
    }
}
\`\`\`

## 二、方法重写（Override）

当子类对从父类继承来的方法不满意时，可以对其进行**重写**。重写需要满足：

| 规则 | 说明 |
| --- | --- |
| 方法签名 | 方法名与参数列表必须一致 |
| 返回类型 | 可以是协变返回类型 |
| 访问权限 | 不能比父类更严格 |

> 提示：使用 \`@Override\` 注解可以让编译器帮你校验重写是否合法。

## 三、多态（Polymorphism）

多态指同一个引用类型，使用不同的实例时执行不同的操作。其前提是**继承 + 重写 + 向上转型**。

\`\`\`java
Animal a = new Dog(); // 向上转型
a.eat();              // 运行时调用 Dog 的实现
\`\`\`
`

const toc = [
  { id: "1", label: "一、继承的基本概念" },
  { id: "2", label: "二、方法重写" },
  { id: "3", label: "三、多态" },
]

export default function SessionPage() {
  const [active, setActive] = useState("1")

  return (
    <div>
      {/* 面包屑 */}
      <nav className="mb-4 flex items-center gap-1 text-[13px] text-muted-foreground">
        <Link href="/resources" className="hover:text-brand">
          资源中心
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="hover:text-brand">Java 面向对象</span>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">继承与多态</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* 文档区 */}
        <div className="min-w-0">
          <Card className="p-6 md:p-10">
            <h1 className="mb-6 text-[22px] font-bold text-foreground">第 3 章：继承与多态</h1>
            <article className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className="mb-3 mt-7 text-lg font-semibold text-foreground">{children}</h2>,
                  p: ({ children }) => <p className="mb-4 text-[15px] leading-[1.8] text-foreground/85">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5 text-[15px] text-foreground/85">{children}</ul>,
                  blockquote: ({ children }) => (
                    <blockquote className="mb-4 rounded-r-lg border-l-4 border-brand bg-brand-soft px-4 py-2 text-sm text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children }) => {
                    const isBlock = (className ?? "").includes("language-")
                    if (!isBlock) {
                      return <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px] text-rose-600 dark:text-rose-400">{children}</code>
                    }
                    return <CodeBlock>{String(children)}</CodeBlock>
                  },
                  pre: ({ children }) => <>{children}</>,
                  table: ({ children }) => (
                    <div className="mb-4 overflow-hidden rounded-lg border border-border">
                      <table className="w-full text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-brand-soft text-brand">{children}</thead>,
                  th: ({ children }) => <th className="px-3 py-2 text-left font-medium">{children}</th>,
                  td: ({ children }) => <td className="border-t border-border px-3 py-2 text-foreground/85">{children}</td>,
                  tr: ({ children }) => <tr className="odd:bg-secondary/40">{children}</tr>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                <ArrowLeft className="size-4" /> 上一章
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                下一章 <ArrowRight className="size-4" />
              </button>
            </div>
          </Card>

          <Quiz />
        </div>

        {/* 侧边面板 */}
        <div className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <ListTree className="size-4 text-brand" /> 目录
              </div>
              <ul className="space-y-1">
                {toc.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => setActive(t.id)}
                      className={cn(
                        "flex w-full items-center border-l-2 py-1.5 pl-3 text-left text-sm transition",
                        active === t.id ? "border-brand font-medium text-brand" : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <MessageCircle className="size-4 text-brand" /> AI 答疑
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                对本节内容有疑问？点击右下角的 AI 学习助手，它已自动关联「继承与多态」的上下文。
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="group relative mb-4">
      <pre className="overflow-x-auto rounded-lg bg-secondary p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-card px-2 py-1 text-xs text-muted-foreground opacity-0 shadow-sm transition group-hover:opacity-100"
      >
        {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  )
}
