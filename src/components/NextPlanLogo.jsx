import { motion } from 'framer-motion'
import './NextPlanLogo.css'

/**
 * NextPlanLogo — logo composé : icône réseau (3 nœuds connectés) + wordmark
 *
 * Props :
 *   - variant : 'hero' (grand, avec sous-titre) | 'navbar' (compact) | 'dark' (sur fond sombre)
 *   - animate : booléen — déclenche l'animation d'entrée Framer Motion
 *   - size    : 'sm' | 'md' | 'lg'
 */
export default function NextPlanLogo({ variant = 'navbar', animate = false, size }) {
  const sizeClass = size ? `nl-size-${size}` : ''
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
      }
    : {}

  return (
    <Wrapper className={`nl nl-${variant} ${sizeClass}`} {...motionProps}>
      <div className="nl-icon" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
          {/* Connexions */}
          <line x1="10" y1="14" x2="30" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="10" y1="14" x2="20" y2="30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="30" y1="14" x2="20" y2="30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          {/* Nœuds */}
          <circle cx="10" cy="14" r="3.6" fill="currentColor" />
          <circle cx="30" cy="14" r="3.6" fill="currentColor" />
          <circle cx="20" cy="30" r="3.6" fill="currentColor" />
        </svg>
      </div>

      <div className="nl-text">
        <div className="nl-wordmark">
          <span className="nl-nex">NEXT</span><span className="nl-flow">PLAN</span>
        </div>
        {variant === 'hero' && (
          <div className="nl-sub">Planification et Contrôle</div>
        )}
      </div>
    </Wrapper>
  )
}
