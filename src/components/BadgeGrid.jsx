import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BADGES, useProgress } from '../context/ProgressContext'
import BadgeCard from './BadgeCard'
import './BadgeGrid.css'

export default function BadgeGrid() {
  const { badges } = useProgress()
  const [modalBadgeId, setModalBadgeId] = useState(null)

  const handleClick = (id) => {
    setModalBadgeId(id)
  }

  const modalBadge = modalBadgeId ? BADGES[modalBadgeId] : null
  const isUnlocked = modalBadgeId ? badges.includes(modalBadgeId) : false

  return (
    <>
      <div className="badge-grid">
        {Object.values(BADGES).map((badge) => (
          <BadgeCard
            key={badge.id}
            badgeId={badge.id}
            onClick={() => handleClick(badge.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {modalBadge && (
          <motion.div
            className="badge-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalBadgeId(null)}
          >
            <motion.div
              className="badge-modal"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="badge-modal-close" onClick={() => setModalBadgeId(null)}>×</button>
              <div className="badge-modal-icon">
                {isUnlocked ? modalBadge.icon : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                )}
              </div>
              <span className="caption">
                {isUnlocked ? 'Badge débloqué' : 'Badge verrouillé'}
              </span>
              <h3>{modalBadge.label}</h3>
              <p>{modalBadge.description}</p>
              <div className="badge-modal-xp mono">+{modalBadge.xp} XP</div>
              {!isUnlocked && modalBadge.tier === 'premium' && (
                <a href="#/pricing" className="btn btn-primary mt-md">
                  Disponible avec la formule Premium →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
