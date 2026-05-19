import { useEffect, useRef } from 'react'
import './MouseSpotlight.css'

/**
 * MouseSpotlight — cercle lumineux qui suit la souris
 * Utilise une CSS custom property pour éviter les re-renders React
 */
export default function MouseSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = null
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      // lerp pour effet "léger retard"
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={ref} className="mouse-spotlight" aria-hidden="true" />
}
