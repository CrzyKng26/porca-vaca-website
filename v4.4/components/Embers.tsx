'use client'

import React, { useEffect, useRef } from 'react'

export default function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // Resize handler
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Particle system
    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      life: number
      maxLife: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = canvas!.height + Math.random() * 100
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 2 - 1
        this.speedY = -(Math.random() * 1 + 0.5)
        this.maxLife = Math.random() * 100 + 50
        this.life = this.maxLife
        
        // Amber/Fire colors
        const colors = ['#C97D3E', '#8B1E1E', '#F2E8D5']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= 1

        // Reset if dead or off-screen
        if (this.life <= 0 || this.y < 0) {
          this.x = Math.random() * canvas!.width
          this.y = canvas!.height + Math.random() * 10
          this.life = this.maxLife
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.life / this.maxLife
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        
        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        
        ctx.fill()
        ctx.restore()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }
    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
      style={{ filter: 'blur(0.5px)' }}
    />
  )
}
