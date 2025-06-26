"use client"

import { useEffect, useRef } from "react"

export default function ClientAcquisitionChart() {
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
    const data = [42, 56, 48, 61, 75, 85, 68, 92, 110, 98, 120, 135]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxValue = Math.max(...data) * 1.1

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

    // Draw line chart
    ctx.beginPath()
    months.forEach((month, i) => {
      const x = padding + (i * chartWidth) / (months.length - 1)
      const y = canvas.height - padding - (data[i] / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Month label
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground")
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(month, x, canvas.height - padding + 10)
    })

    ctx.strokeStyle = "#8B5CF6" // Purple
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw points
    months.forEach((month, i) => {
      const x = padding + (i * chartWidth) / (months.length - 1)
      const y = canvas.height - padding - (data[i] / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#8B5CF6" // Purple
      ctx.fill()
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Fill area under the line
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)

    months.forEach((month, i) => {
      const x = padding + (i * chartWidth) / (months.length - 1)
      const y = canvas.height - padding - (data[i] / maxValue) * chartHeight
      ctx.lineTo(x, y)
    })

    ctx.lineTo(padding + chartWidth, canvas.height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // Purple with opacity
    ctx.fill()
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
