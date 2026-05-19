import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './StatCounter.css'

/**
 * StatCounter — counter animé déclenché au scroll par IntersectionObserver
 *
 * Props :
 *   - target   : nombre cible
 *   - label    : libellé sous le chiffre
 *   - suffix   : suffixe optionnel ("+", "%", " étudiants")
 *   - prefix   : préfixe optionnel ("€")
 *   - avatars  : booléen — affiche des mini-avatars colorés (initiales)
 *   - subBar   : { progress: 0..100, label: 'objectif ...' }
 *   - duration : durée de l'animation en ms (default 1500)
 */
export default function StatCounter({
  target,
  label,
  suffix = '',
  prefix = '',
  avatars = false,
  subBar = null,
  duration = 1500,
}) {
  const [value, setValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (hasAnimated) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateValue()
          }
        })
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated])

  const animateValue = () => {
    const start = performance.now()
    const step = (t) => {
      const progress = Math.min(1, (t - start) / duration)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <motion.div
      ref={ref}
      className="stat-counter"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <span className="stat-counter-num mono">
        {prefix}{value.toLocaleString('fr-FR')}{suffix}
      </span>
      <span className="stat-counter-label">{label}</span>

      {avatars && (
        <div className="stat-counter-avatars" aria-hidden="true">
          {AVATAR_INITIALS.map((init, i) => (
            <div
              key={i}
              className="stat-avatar"
              style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
            >
              {init}
            </div>
          ))}
          <div className="stat-avatar stat-avatar-extra mono">+1k</div>
        </div>
      )}

      {subBar && (
        <div className="stat-counter-sub">
          <div className="stat-counter-bar">
            <motion.div
              className="stat-counter-bar-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${subBar.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="stat-counter-sub-label">{subBar.label}</span>
        </div>
      )}
    </motion.div>
  )
}

const AVATAR_INITIALS = ['LM', 'TR', 'AP', 'SF']
const AVATAR_COLORS = [
  'var(--color-primary-400)',
  'var(--color-accent-400)',
  'var(--color-success-500)',
  'var(--color-primary-600)',
]
