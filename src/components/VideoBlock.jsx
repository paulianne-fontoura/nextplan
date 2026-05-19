import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import './VideoBlock.css'

/**
 * VideoBlock — embed YouTube responsive avec :
 *   - thumbnail custom + play SVG animé
 *   - simulation de tracker à 80% (déclenche badge "Spectateur" + markVideoWatched)
 *   - Si videoUrl contient "[PLACEHOLDER]" → on affiche un mode demo
 */
export default function VideoBlock({
  videoId,
  title = 'Exercice corrigé',
  subtitle,
  videoUrl,
  duration = '3–4 min',
  poster,
}) {
  const [playing, setPlaying] = useState(false)
  const [watchedTriggered, setWatchedTriggered] = useState(false)
  const timerRef = useRef(null)
  const { unlockBadge, markVideoWatched, watchedVideos } = useProgress()

  const isPlaceholder = !videoUrl || videoUrl.includes('[PLACEHOLDER]')
  const alreadyWatched = watchedVideos.includes(videoId)

  // Simulation : déclenche "Spectateur" après 8s de lecture
  useEffect(() => {
    if (playing && !watchedTriggered && !alreadyWatched) {
      timerRef.current = setTimeout(() => {
        unlockBadge('spectator')
        markVideoWatched(videoId)
        setWatchedTriggered(true)
      }, 8000)
    }
    return () => clearTimeout(timerRef.current)
  }, [playing, watchedTriggered, alreadyWatched, unlockBadge, markVideoWatched, videoId])

  const handlePlay = () => setPlaying(true)

  return (
    <motion.div
      className="video-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {(title || subtitle) && (
        <div className="video-block-header">
          {title && <h3>{title}</h3>}
          {subtitle && <p className="caption">{subtitle}</p>}
          {duration && (
            <span className="video-duration mono">⏱ {duration}</span>
          )}
        </div>
      )}

      <div className="video-frame">
        {!playing && (
          <button
            className="video-thumb"
            onClick={handlePlay}
            style={poster ? { backgroundImage: `url(${poster})` } : undefined}
            aria-label={`Lire la vidéo : ${title}`}
          >
            <div className="video-thumb-overlay" />
            <PlayIcon />
            {isPlaceholder && (
              <div className="video-thumb-watermark">
                <span className="caption">Vidéo de démonstration</span>
                <p>Le contenu vidéo officiel sera intégré au lancement</p>
              </div>
            )}
          </button>
        )}

        {playing && !isPlaceholder && (
          <iframe
            src={`${videoUrl}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}

        {playing && isPlaceholder && (
          <div className="video-placeholder-playing">
            <DemoAnimation />
            <h4>Lecture en cours (démonstration)</h4>
            <p>
              Dans la version finale, cet emplacement contiendra la vidéo
              YouTube intégrée du cours.
            </p>
            {watchedTriggered && (
              <p className="text-success">Badge « Spectateur » débloqué</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function PlayIcon() {
  return (
    <motion.div
      className="video-play"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </motion.div>
  )
}

function DemoAnimation() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="video-demo-svg" aria-hidden="true">
      <motion.circle
        cx="60" cy="60" r="46"
        stroke="var(--color-primary-400)" strokeWidth="3" fill="none"
        animate={{ pathLength: [0, 1, 1], rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ strokeDasharray: 300, strokeDashoffset: 0, originX: '50%', originY: '50%' }}
      />
      <motion.polygon
        points="50,42 50,78 82,60"
        fill="var(--color-primary-600)"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '60px', originY: '60px' }}
      />
    </svg>
  )
}
