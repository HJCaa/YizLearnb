"use client"

import { Award, BookOpenCheck, Clock, Flame, TrendingUp } from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { StatCard } from "@/components/dashboard/stat-card"
import {
  DistributionChart,
  distributionLegend,
  MasteryTrendChart,
  WeeklyStudyChart,
} from "@/components/dashboard/charts"

const activities = [
  { time: "今天 09:24", title: "完成会话「梯度下降的直觉理解」", tag: "已完成", tone: "success" as const },
  { time: "昨天 21:10", title: "测验「线性回归基础」得分 88", tag: "测验", tone: "brand" as const },
  { time: "昨天 16:42", title: "收藏资源「神经网络可视化指南」", tag: "收藏", tone: "warning" as const },
  { time: "10-12 14:30", title: "开始学习路径「机器学习入门」", tag: "新路径", tone: "brand" as const },
  { time: "10-11 20:05", title: "完成会话「损失函数概览」", tag: "已完成", tone: "success" as const },
]

const achievements = [
  { name: "连续打卡 7 天", desc: "保持每日学习习惯", icon: Flame, unlocked: true },
  { name: "首个路径完成", desc: "完成一条完整学习路径", icon: BookOpenCheck, unlocked: true },
  { name: "测验高手", desc: "测验平均分超过 85", icon: Award, unlocked: true },
  { name: "知识探索者", desc: "掌握 20 个知识点", icon: TrendingUp, unlocked: false },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="学习仪表盘"
        subtitle="掌握你的学习节奏，追踪进度与成长趋势"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Clock} value={18.5} decimals={1} suffix="小时" label="本周学习时长" delta="+12%" deltaPositive />
        <StatCard icon={Flame} value={7} suffix="天" label="连续学习天数" delta="保持中" deltaPositive />
        <StatCard icon={BookOpenCheck} value={24} label="已完成会话" delta="+5" deltaPositive />
        <StatCard icon={TrendingUp} value={74} suffix="分" label="综合掌握度" progress={74} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">本周学习时长</h3>
            <Badge variant="muted">分钟 / 天</Badge>
          </div>
          <WeeklyStudyChart />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">知识点分布</h3>
          </div>
          <DistributionChart />
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            {distributionLegend.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">掌握度趋势</h3>
            <Badge variant="success">近 6 周 +32 分</Badge>
          </div>
          <MasteryTrendChart />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-foreground">成就徽章</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div
                key={a.name}
                className={
                  "flex flex-col items-center rounded-xl border p-3 text-center " +
                  (a.unlocked ? "border-brand/30 bg-brand-soft" : "border-border bg-muted opacity-60")
                }
              >
                <span
                  className={
                    "flex size-10 items-center justify-center rounded-full " +
                    (a.unlocked ? "bg-brand text-brand-foreground" : "bg-muted-foreground/20 text-muted-foreground")
                  }
                >
                  <a.icon className="size-5" />
                </span>
                <p className="mt-2 text-xs font-medium text-foreground">{a.name}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-semibold text-foreground">最近活动</h3>
        <ol className="relative space-y-5 border-l border-border pl-5">
          {activities.map((act, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[26px] top-1 size-3 rounded-full border-2 border-card bg-brand" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">{act.time}</span>
                <Badge variant={act.tone}>{act.tag}</Badge>
              </div>
              <p className="mt-1 text-sm text-foreground">{act.title}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">当前学习路径</h3>
          <span className="text-sm text-muted-foreground">机器学习入门</span>
        </div>
        <ProgressBar value={62} />
        <p className="mt-2 text-sm text-muted-foreground">已完成 8 / 13 个节点，预计还需 5 小时完成</p>
      </Card>
    </div>
  )
}
