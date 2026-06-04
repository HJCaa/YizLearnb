"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { cn } from "@/lib/utils"

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])
  return value
}

export function StatCard({
  icon: Icon,
  value,
  suffix,
  decimals = 0,
  label,
  delta,
  deltaPositive,
  progress,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  suffix?: string
  decimals?: number
  label: string
  delta?: string
  deltaPositive?: boolean
  progress?: number
}) {
  const animated = useCountUp(value)
  return (
    <Card className="border-l-4 border-brand p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
          <Icon className="size-5" />
        </span>
        {delta ? (
          <span className={cn("text-xs font-medium", deltaPositive ? "text-success" : "text-muted-foreground")}>{delta}</span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{animated.toFixed(decimals)}</span>
        {suffix ? <span className="text-sm text-muted-foreground">{suffix}</span> : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      {progress !== undefined ? (
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
      ) : null}
    </Card>
  )
}
