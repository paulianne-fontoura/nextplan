import { motion } from 'framer-motion'
import { useProgress, BADGES } from '../context/ProgressContext'
import './BadgeCard.css'

export default function BadgeCard({ badgeId, onClick }) {
  const { badges } = useProgress()
  const badge = BADGES[badgeId]
  if (!badge) return null
  const unlocked = badges.includes(badgeId)

  return (
    <motion.button
      type="button"
      className={`badge-card ${unlocked ? 'is-unlocked' : 'is-locked'}`}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      aria-label={`Badge ${badge.label}${unlocked ? ' débloqué' : ' verrouillé'}`}
    >
      <div className="badge-card-icon">
        {unlocked ? badge.icon : <LockIcon />}
      </div>
      <div className="badge-card-info">
        <h4 className="badge-card-label">{badge.label}</h4>
        <p className="badge-card-desc">{badge.description}</p>
        <span className="badge-card-xp mono">+{badge.xp} XP</span>
      </div>
      {unlocked && <div className="badge-card-shine" />}
    </motion.button>
  )
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
