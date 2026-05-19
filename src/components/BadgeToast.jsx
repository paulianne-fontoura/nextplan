import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import './BadgeToast.css'

const TOAST_DURATION = 4000

export default function BadgeToast() {
  const { toastQueue, dismissToast } = useProgress()

  return (
    <div className="badge-toast-stack" aria-live="polite" aria-atomic="true">
      <AnimatePresence initial={false}>
        {toastQueue.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const { badge } = toast

  return (
    <motion.div
      className="badge-toast"
      initial={{ opacity: 0, x: 60, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      layout
      role="status"
      onClick={() => onDismiss(toast.id)}
    >
      <div className="badge-toast-icon" aria-hidden="true">
        {badge.icon}
      </div>
      <div className="badge-toast-content">
        <div className="badge-toast-label-row">
          <span className="caption">Badge débloqué</span>
          <span className="badge-toast-xp">+{badge.xp} XP</span>
        </div>
        <h4 className="badge-toast-name">{badge.label}</h4>
        <p className="badge-toast-desc">{badge.description}</p>
      </div>
      <motion.div
        className="badge-toast-progress"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: TOAST_DURATION / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}
