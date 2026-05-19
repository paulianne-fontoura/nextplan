import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './LockedCard.css'

/**
 * LockedCard — bloc de contenu Premium verrouillé
 * Au hover : message d'unlock, clic redirige vers /pricing
 */
function DefaultLockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

export default function LockedCard({ icon = <DefaultLockIcon />, label = 'Contenu Premium', sublabel }) {
  return (
    <motion.div
      className="locked-card"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <Link to="/pricing" className="locked-card-link">
        <div className="locked-card-icon">{icon}</div>
        <div className="locked-card-body">
          <span className="locked-card-tag">Premium</span>
          <h4>{label}</h4>
          {sublabel && <p className="locked-card-sub">{sublabel}</p>}
        </div>
        <div className="locked-card-lock" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="locked-card-overlay">
          <span>Débloquez avec la formule 30€/mois →</span>
        </div>
      </Link>
    </motion.div>
  )
}
