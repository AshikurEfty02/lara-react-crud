"use client"

import { useEffect, useRef } from "react"

export default function RevenueChart() {
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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const incomeData = [4500, 5200, 4800, 5800, 6000, 5500, 7000, 6800, 7500, 8200, 7800, 8500]
    const expenseData = [3200, 3500, 3300, 3800, 4000, 3900, 4200, 4100, 4500, 4800, 4600, 5000]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / months.length / 3
    const maxValue = Math.max(...incomeData, ...expenseData) * 1.1

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

      ctx.fillText(`$${value}`, padding - 10, y)
    }

    // Draw bars and month labels
    months.forEach((month, i) => {
      const x = padding + (i + 0.5) * (chartWidth / months.length)

      // Income bar
      const incomeHeight = (incomeData[i] / maxValue) * chartHeight
      ctx.fillStyle = "#8B5CF6" // Purple
      ctx.fillRect(x - barWidth - 2, canvas.height - padding - incomeHeight, barWidth, incomeHeight)

      // Expense bar
      const expenseHeight = (expenseData[i] / maxValue) * chartHeight
      ctx.fillStyle = "#EF4444" // Red
      ctx.fillRect(x + 2, canvas.height - padding - expenseHeight, barWidth, expenseHeight)

      // Month label
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground")
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(month, x, canvas.height - padding + 10)
    })

    // Draw legend
    const legendX = canvas.width - padding - 150
    const legendY = padding + 20

    // Income legend
    ctx.fillStyle = "#8B5CF6"
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground")
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Income", legendX + 25, legendY + 7.5)

    // Expense legend
    ctx.fillStyle = "#EF4444"
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground")
    ctx.fillText("Expense", legendX + 25, legendY + 32.5)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
