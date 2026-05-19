import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

/**
 * CustomCursor — point central + cercle follower avec lag.
 * S'agrandit au hover sur les éléments cliquables (a, button, [role=button]).
 * Désactivé sur touch / mobile.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    // Détection device pointer fin (souris, pas tactile)
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.body.classList.add('cursor-none')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
    }

    const tick = () => {
      // Lerp pour effet retard du ring
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Détection hover sur éléments interactifs
    const onOver = (e) => {
      const target = e.target
      if (!target || !target.closest) return
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, label')
      setInteractive(!!interactiveEl)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      if (raf) cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-none')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${interactive ? 'is-interactive' : ''}`} aria-hidden="true" />
      <div ref={dotRef}  className={`cursor-dot  ${interactive ? 'is-interactive' : ''}`} aria-hidden="true" />
    </>
  )
}
