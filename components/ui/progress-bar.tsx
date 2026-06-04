"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ProgressBar({
  value,
  className,
  barClassName,
  gradient = true,
}: {
  value: number
  className?: string
  barClassName?: string
  gradient?: boolean
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={cn("h-full rounded-full", gradient ? "gradient-brand" : "bg-brand", barClassName)}
      />
    </div>
  )
}
