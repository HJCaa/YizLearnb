"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const weeklyData = [
  { day: "周一", minutes: 45 },
  { day: "周二", minutes: 62 },
  { day: "周三", minutes: 30 },
  { day: "周四", minutes: 78 },
  { day: "周五", minutes: 55 },
  { day: "周六", minutes: 92 },
  { day: "周日", minutes: 40 },
]

const masteryTrend = [
  { week: "W1", score: 42 },
  { week: "W2", score: 48 },
  { week: "W3", score: 55 },
  { week: "W4", score: 61 },
  { week: "W5", score: 68 },
  { week: "W6", score: 74 },
]

const distribution = [
  { name: "已掌握", value: 12, color: "var(--chart-3)" },
  { name: "学习中", value: 7, color: "var(--chart-1)" },
  { name: "未开始", value: 5, color: "var(--muted-foreground)" },
]

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
}

export function WeeklyStudyChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={weeklyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} formatter={(v) => [`${v} 分钟`, "学习时长"]} />
        <Bar dataKey="minutes" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function MasteryTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={masteryTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="masteryFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} domain={[0, 100]} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 分`, "掌握度"]} />
        <Area type="monotone" dataKey="score" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#masteryFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={56} outerRadius={84} paddingAngle={3} strokeWidth={0}>
          {distribution.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v} 个`, n]} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export const distributionLegend = distribution
