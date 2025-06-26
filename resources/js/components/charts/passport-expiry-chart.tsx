"use client"

import { useEffect, useRef } from "react"

export default function PassportExpiryChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data for the chart
    const data = [
      { label: "< 30 Days", value: 24, color: "#EF4444" },
      { label: "30-90 Days", value: 38, color: "#F59E0B" },
      { label: "90-180 Days", value: 52, color: "#10B981" },
      { label: "> 180 Days", value: 134, color: "#3B82F6" },
    ]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / data.length / 2
    const maxValue = Math.max(...data.map((item) => item.value)) * 1.1

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border")
    ctx.stroke()

    // Draw grid lines
    const gridCount = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "12px sans-serif"
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground")

    for (let i = 0; i <= gridCount; i++) {
      const y = canvas.height - padding - (i / gridCount) * chartHeight
      const value = Math.round((i / gridCount) * maxValue)

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border")
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillText(`${value}`, padding - 10, y)
    }

    // Draw bars and labels
    data.forEach((item, i) => {
      const x = padding + (i + 0.5) * (chartWidth / data.length)
      const barHeight = (item.value / maxValue) * chartHeight

      // Draw bar
      ctx.fillStyle = item.color
      ctx.fillRect(x - barWidth / 2, canvas.height - padding - barHeight, barWidth, barHeight)

      // Draw value on top of bar
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground")
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(item.value.toString(), x, canvas.height - padding - barHeight - 5)

      // Draw label
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground")
      ctx.textBaseline = "top"
      ctx.fillText(item.label, x, canvas.height - padding + 10)
    })
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
