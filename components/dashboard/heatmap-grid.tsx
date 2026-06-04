"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Bloom 认知层次（由低到高）× 知识点
const bloomLevels = ["记忆", "理解", "应用", "分析", "评价", "创造"]
const knowledgePoints = ["类与对象", "继承", "多态", "接口与抽象类", "集合框架", "异常处理"]

// 每个知识点在 6 个 Bloom 层次上的掌握分数（0-100，-1 表示未覆盖）
// 行 = 知识点，列 = Bloom 层次
const matrix: number[][] = [
  [95, 90, 85, 78, 70, 60], // 类与对象
  [88, 82, 75, 66, 55, 40], // 继承
  [80, 70, 58, 45, 30, 18], // 多态
  [72, 60, 48, 35, 22, -1], // 接口与抽象类
  [65, 50, 38, 25, -1, -1], // 集合框架
  [55, 42, 28, -1, -1, -1], // 异常处理
]

function cellStyle(score: number): { className: string; label: string } {
  if (score < 0) return { className: "bg-secondary text-transparent", label: "未覆盖" }
  if (score >= 70) return { className: "bg-brand text-white", label: "已掌握" }
  if (score >= 40) return { className: "bg-brand/45 text-white", label: "了解" }
  return { className: "bg-brand/20 text-brand", label: "薄弱" }
}

export function HeatmapGrid() {
  const [hover, setHover] = useState<{ kp: string; level: string; score: number } | null>(null)

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* 列标题：Bloom 层次 */}
        <div className="flex pl-[104px]">
          {bloomLevels.map((lv) => (
            <div key={lv} className="w-12 shrink-0 pb-2 text-center text-[11px] text-muted-foreground">
              {lv}
            </div>
          ))}
        </div>

        {knowledgePoints.map((kp, r) => (
          <div key={kp} className="mb-1 flex items-center">
            <div className="w-[100px] shrink-0 pr-1 text-right text-xs text-foreground">{kp}</div>
            {matrix[r].map((score, c) => {
              const meta = cellStyle(score)
              const active = hover?.kp === kp && hover.level === bloomLevels[c]
              return (
                <button
                  key={c}
                  onMouseEnter={() => setHover({ kp, level: bloomLevels[c], score })}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    "mx-0.5 flex size-11 shrink-0 items-center justify-center rounded-md text-[11px] font-medium transition",
                    meta.className,
                    active && "ring-2 ring-offset-1 ring-brand ring-offset-card",
                  )}
                  aria-label={`${kp} · ${bloomLevels[c]}：${score < 0 ? "未覆盖" : score + "分"}`}
                >
                  {score < 0 ? "" : score}
                </button>
              )
            })}
          </div>
        ))}

        {/* 图例 + 悬停详情 */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-3 rounded bg-brand" /> 已掌握
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-3 rounded bg-brand/45" /> 了解
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-3 rounded bg-brand/20" /> 薄弱
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-3 rounded bg-secondary" /> 未覆盖
          </div>
          {hover ? (
            <span className="ml-auto text-xs text-foreground">
              {hover.kp} · {hover.level}：
              {hover.score < 0 ? "未覆盖" : `${hover.score} 分（${cellStyle(hover.score).label}）`}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
