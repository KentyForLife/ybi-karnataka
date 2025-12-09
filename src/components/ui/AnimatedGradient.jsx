import React, { useEffect, useRef } from 'react'

// Animated gradient background component inspired by React Bits
export default function AnimatedGradientBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId
    let time = 0

    const animate = () => {
      time += 0.01
      
      // Create animated gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Animate color stops
      const offset1 = Math.sin(time) * 0.2 + 0.3
      const offset2 = Math.sin(time + 2) * 0.2 + 0.6
      
      gradient.addColorStop(0, `hsl(${15 + Math.sin(time) * 10}, 100%, ${55 + Math.sin(time) * 5}%)`)
      gradient.addColorStop(offset1, `hsl(${35 + Math.sin(time) * 15}, 100%, ${60 + Math.cos(time) * 5}%)`)
      gradient.addColorStop(offset2, `hsl(${55 + Math.sin(time) * 10}, 85%, ${65 + Math.sin(time) * 5}%)`)
      gradient.addColorStop(1, `hsl(${20 + Math.cos(time) * 10}, 95%, ${50 + Math.cos(time) * 5}%)`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
