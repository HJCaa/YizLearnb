"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

const data = [
  { axis: "认知", value: 70 },
  { axis: "偏好", value: 85 },
  { axis: "行为", value: 78 },
]

export function MiniRadar({ size = 120 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
          <Radar dataKey="value" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
