"use client"

import { useState } from "react"
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Status = "已发布" | "草稿" | "审核中" | "已下架"

const statusTone: Record<Status, "success" | "muted" | "warning" | "danger"> = {
  已发布: "success",
  草稿: "muted",
  审核中: "warning",
  已下架: "danger",
}

const courses: {
  id: string
  title: string
  category: string
  level: string
  sessions: number
  students: number
  updated: string
  status: Status
}[] = [
  { id: "C-1024", title: "机器学习入门", category: "人工智能", level: "入门", sessions: 13, students: 1820, updated: "10-12", status: "已发布" },
  { id: "C-1025", title: "深度学习与神经网络", category: "人工智能", level: "进阶", sessions: 18, students: 940, updated: "10-10", status: "已发布" },
  { id: "C-1026", title: "数据结构与算法精讲", category: "计算机基础", level: "中级", sessions: 24, students: 2310, updated: "10-08", status: "已发布" },
  { id: "C-1027", title: "大语言模型应用开发", category: "人工智能", level: "进阶", sessions: 9, students: 0, updated: "10-13", status: "草稿" },
  { id: "C-1028", title: "概率论与统计学基础", category: "数学", level: "入门", sessions: 16, students: 670, updated: "10-05", status: "审核中" },
  { id: "C-1029", title: "前端工程化实战", category: "软件工程", level: "中级", sessions: 20, students: 430, updated: "09-28", status: "已下架" },
]

const tabs = ["全部", "已发布", "草稿", "审核中", "已下架"] as const

export default function AdminCoursesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("全部")
  const filtered = tab === "全部" ? courses : courses.filter((c) => c.status === tab)

  const stats = [
    { label: "课程总数", value: courses.length },
    { label: "已发布", value: courses.filter((c) => c.status === "已发布").length },
    { label: "学员总数", value: "6.1k" },
    { label: "待审核", value: courses.filter((c) => c.status === "审核中").length },
  ]

  return (
    <div className="space-y-6">
      <PageTitle
        title="课程管理"
        subtitle="创建、编辑与发布平台课程内容"
        action={
          <Button className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
            <Plus className="size-4" />
            新建课程
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors " +
                  (tab === t ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-accent")
                }
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="搜索课程..."
                className="h-9 w-48 rounded-lg border border-input bg-background pl-8 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <Button variant="outline" size="icon" className="size-9 bg-transparent">
              <Filter className="size-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">课程</th>
                <th className="px-4 py-3 font-medium">分类</th>
                <th className="px-4 py-3 font-medium">难度</th>
                <th className="px-4 py-3 font-medium">会话数</th>
                <th className="px-4 py-3 font-medium">学员数</th>
                <th className="px-4 py-3 font-medium">更新</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-accent/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.id}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant="muted">{c.level}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.sessions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.updated}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusTone[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border p-4 text-sm text-muted-foreground">
          <span>共 {filtered.length} 门课程</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="bg-transparent" disabled>
              上一页
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              下一页
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
