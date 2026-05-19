import { useEffect, useRef } from 'react'
import './ParticleNetwork.css'

/**
 * ParticleNetwork — canvas HTML5 interactif
 *
 * Comportement :
 *   - particules violet uniquement (pas de bascule teal)
 *   - répulsion DOUCE du curseur dans un rayon large (220px)
 *   - connexions visibles entre particules proches
 *   - connexions souris->particules visibles dans la zone d'influence
 *   - curseur lui-même : disque + ring subtil
 */
export default function ParticleNetwork({
  particleCount = 75,
  linkDistance = 130,
  mouseRadius = 220,
  color = '107, 95, 228',
}) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      sizeRef.current = { w: rect.width, h: rect.height, dpr }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const initParticles = () => {
      const { w, h } = sizeRef.current
      const arr = []
      for (let i = 0; i < particleCount; i++) {
        const isBig = Math.random() < 0.18
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          hx: 0, hy: 0,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: isBig ? 2.6 + Math.random() * 1.6 : 1.4 + Math.random() * 1.2,
          big: isBig,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.0012 + Math.random() * 0.002,
        })
      }
      arr.forEach((p) => { p.hx = p.x; p.hy = p.y })
      particlesRef.current = arr
    }
    initParticles()

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }
    const onLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    wrap.addEventListener('touchmove', (e) => {
      const t = e.touches[0]
      if (t) onMove(t)
    }, { passive: true })
    wrap.addEventListener('touchend', onLeave)

    const tick = () => {
      const { w, h } = sizeRef.current
      const particles = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active

      ctx.clearRect(0, 0, w, h)

      // ----- UPDATE -----
      for (const p of particles) {
        p.driftPhase += p.driftSpeed
        p.vx += Math.cos(p.driftPhase) * 0.0010
        p.vy += Math.sin(p.driftPhase) * 0.0010

        // Rappel doux vers la position home
        p.vx += (p.hx - p.x) * 0.0006
        p.vy += (p.hy - p.y) * 0.0006

        // Répulsion douce du curseur
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 0.4
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.vx *= 0.95
        p.vy *= 0.95

        const maxV = 1.4
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > maxV) {
          p.vx = (p.vx / speed) * maxV
          p.vy = (p.vy / speed) * maxV
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // ----- CONNEXIONS entre particules -----
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDistance) {
            const opacity = (1 - dist / linkDistance) * 0.40
            ctx.strokeStyle = `rgba(${color}, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // ----- CONNEXIONS souris -> particules dans le rayon -----
      if (mouseActive) {
        for (const p of particles) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.hypot(dx, dy)
          if (dist < mouseRadius) {
            const ratio = 1 - dist / mouseRadius
            const opacity = ratio * 0.70
            ctx.strokeStyle = `rgba(${color}, ${opacity})`
            ctx.lineWidth = 0.6 + ratio * 0.8
            ctx.beginPath()
            ctx.moveTo(mx, my)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }
      }

      // ----- PARTICULES -----
      for (const p of particles) {
        if (p.big) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5)
          grad.addColorStop(0, `rgba(${color}, 0.35)`)
          grad.addColorStop(1, `rgba(${color}, 0)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = p.big ? `rgba(${color}, 0.85)` : `rgba(${color}, 0.65)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // ----- CURSEUR (discret) -----
      if (mouseActive) {
        // Halo très subtil
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 30)
        halo.addColorStop(0, `rgba(${color}, 0.18)`)
        halo.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(mx, my, 30, 0, Math.PI * 2)
        ctx.fill()

        // Disque central petit
        ctx.fillStyle = `rgba(${color}, 0.85)`
        ctx.beginPath()
        ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(tick)
    }
    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [particleCount, linkDistance, mouseRadius, color])

  return (
    <div className="particle-network" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
