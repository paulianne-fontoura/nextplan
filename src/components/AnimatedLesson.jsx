import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AnimatedLesson.css'

/**
 * AnimatedLesson — player de leçon animée style Khan Academy / Brilliant
 *
 * Props :
 *   - lesson : { title, slides: [{ id, duration, title, narration, visualStage }] }
 *   - Visual : composant React qui reçoit { stage, accent, progress } et rend le SVG/visuel
 *   - accent : couleur du module (course.iconColor)
 *
 * Aucun fichier vidéo — tout est code JS + SVG.
 */
export default function AnimatedLesson({ lesson, Visual, accent = '#6366F1' }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [hasStarted, setHasStarted] = useState(false)

  const slide = lesson.slides[currentSlide]
  const totalSec = lesson.slides.reduce((s, sl) => s + sl.duration, 0)
  const elapsedSec = lesson.slides
    .slice(0, currentSlide)
    .reduce((s, sl) => s + sl.duration, 0) + (slide.duration * progress / 100)

  useEffect(() => {
    if (!isPlaying) return
    const intervalMs = 50
    const duration = slide.duration * 1000 / speed
    const increment = (intervalMs / duration) * 100

    const timer = setInterval(() => {
      setProgress(p => {
        if (p + increment >= 100) {
          if (currentSlide < lesson.slides.length - 1) {
            setCurrentSlide(c => c + 1)
            return 0
          } else {
            setIsPlaying(false)
            return 100
          }
        }
        return p + increment
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [isPlaying, currentSlide, slide.duration, speed, lesson.slides.length])

  const handlePlayPause = useCallback(() => {
    if (currentSlide === lesson.slides.length - 1 && progress >= 100) {
      setCurrentSlide(0)
      setProgress(0)
      setIsPlaying(true)
      setHasStarted(true)
      return
    }
    setIsPlaying(p => !p)
    setHasStarted(true)
  }, [currentSlide, progress, lesson.slides.length])

  const goToSlide = useCallback((idx) => {
    setCurrentSlide(Math.max(0, Math.min(lesson.slides.length - 1, idx)))
    setProgress(0)
  }, [lesson.slides.length])

  const containerRef = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      const focused = document.activeElement
      const isInside = containerRef.current?.contains(focused) || focused === document.body
      if (!isInside) return
      if (e.key === ' ' && focused?.tagName !== 'BUTTON') {
        e.preventDefault()
        handlePlayPause()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToSlide(currentSlide + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToSlide(currentSlide - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handlePlayPause, goToSlide, currentSlide])

  const fmtTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const isFinished = currentSlide === lesson.slides.length - 1 && progress >= 100

  return (
    <div className="al-container" ref={containerRef} tabIndex={-1}>
      {/* HEADER */}
      <div className="al-header">
        <div>
          <span className="al-eyebrow" style={{ color: accent }}>
            Leçon animée · {lesson.totalDuration || `${Math.round(totalSec)}s`}
          </span>
          <h3 className="al-lesson-title">{lesson.title}</h3>
        </div>
        <div className="al-slide-counter">
          <span className="al-counter-current" style={{ color: accent }}>
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="al-counter-sep">/</span>
          <span className="al-counter-total">{String(lesson.slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* STAGE */}
      <div className="al-stage" style={{ background: `linear-gradient(180deg, ${accent}06 0%, transparent 100%)` }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`stage-${currentSlide}`}
            className="al-stage-inner"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <Visual stage={slide.visualStage} accent={accent} progress={progress} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NARRATION */}
      <div className="al-narration" style={{ borderLeftColor: accent }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`narr-${currentSlide}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <span className="al-narration-tag" style={{ color: accent }}>
              {slide.title}
            </span>
            <p className="al-narration-text">{slide.narration}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      <div className="al-controls">
        <button
          className="al-btn al-btn-nav"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          aria-label="Diapositive précédente"
          title="Précédente (←)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="19 20 9 12 19 4 19 20"/>
            <line x1="5" y1="19" x2="5" y2="5"/>
          </svg>
        </button>

        <button
          className="al-btn al-btn-play"
          onClick={handlePlayPause}
          style={{ background: accent }}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
          title={isPlaying ? 'Pause (espace)' : (isFinished ? 'Rejouer' : 'Lecture (espace)')}
        >
          {isFinished ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          ) : isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="5" width="4" height="14" rx="1"/>
              <rect x="14" y="5" width="4" height="14" rx="1"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button
          className="al-btn al-btn-nav"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === lesson.slides.length - 1}
          aria-label="Diapositive suivante"
          title="Suivante (→)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 4 15 12 5 20 5 4"/>
            <line x1="19" y1="5" x2="19" y2="19"/>
          </svg>
        </button>

        {/* Segments progress bar */}
        <div className="al-progress-bar">
          {lesson.slides.map((sl, i) => {
            const isCurrent = i === currentSlide
            const isDone = i < currentSlide
            const fillPct = isDone ? 100 : isCurrent ? progress : 0
            return (
              <button
                key={i}
                className="al-progress-seg"
                style={{ flex: sl.duration }}
                onClick={() => goToSlide(i)}
                aria-label={`Aller à la diapositive ${i + 1}`}
              >
                <div className="al-progress-track">
                  <motion.div
                    className="al-progress-fill"
                    style={{ background: accent }}
                    animate={{ width: `${fillPct}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="al-time" style={{ color: accent }}>
          {fmtTime(elapsedSec)} <span className="al-time-sep">/</span> {fmtTime(totalSec)}
        </div>

        <button
          className="al-btn al-btn-speed"
          onClick={() => {
            const speeds = [1, 1.25, 1.5, 0.75]
            const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length]
            setSpeed(next)
          }}
          title="Vitesse de lecture"
          aria-label="Vitesse de lecture"
        >
          {speed}×
        </button>
      </div>

      {!hasStarted && (
        <div className="al-hint" style={{ background: `${accent}10`, color: accent, borderColor: `${accent}30` }}>
          ↑ Appuyez sur lecture pour démarrer · Espace, ← et → pour naviguer
        </div>
      )}
    </div>
  )
}
