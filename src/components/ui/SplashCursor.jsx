import React, { useEffect, useRef } from 'react'

// Splash cursor effect inspired by React Bits
export default function SplashCursor() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId

    const particles = particlesRef.current

    const createParticle = (x, y) => {
      const size = Math.random() * 3 + 1
      const speedX = (Math.random() - 0.5) * 8
      const speedY = (Math.random() - 0.5) * 8
      const color = `hsl(${Math.random() * 30 + 15}, 100%, ${Math.random() * 30 + 50}%)`
      
      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
        life: 1,
        decay: Math.random() * 0.02 + 0.01
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        
        p.x += p.speedX
        p.y += p.speedY
        p.life -= p.decay
        p.size *= 0.98

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
