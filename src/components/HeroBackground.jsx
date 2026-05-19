import { useEffect } from 'react'
import './HeroBackground.css'

/**
 * HeroBackground — fond interactif 3 layers
 *   1. Aurora gradients (3 orbes animées en CSS)
 *   2. Spotlight souris (custom property dynamique)
 *   3. Grid perspective (subtil, en bas du hero)
 *
 * Usage : <HeroBackground><contenu hero ici /></HeroBackground>
 */
export default function HeroBackground({ children }) {
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px')
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="hero-bg">
      {/* Layer 1 — Aurora orbes */}
      <div className="orbe orbe-1" />
      <div className="orbe orbe-2" />
      <div className="orbe orbe-3" />

      {/* Layer 2 — Souris spotlight */}
      <div className="mouse-spotlight" aria-hidden="true" />

      {/* Layer 3 — Grid perspective */}
      <div className="grid-perspective" aria-hidden="true">
        <div className="grid-perspective-inner" />
      </div>

      {/* Vignette dégradée vers le bas pour transition */}
      <div className="hero-bg-fade" aria-hidden="true" />

      {children}
    </div>
  )
}
