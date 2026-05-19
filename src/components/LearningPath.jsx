import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import courses from '../assets/courses.json'
import { useProgress } from '../context/ProgressContext'
import './LearningPath.css'

// Titres = débouché métier + phrase résultat (outcome)
const OUTCOMES = {
  diagnostic: {
    title: 'Analyser un marché',
    outcome: 'Lire un environnement concurrentiel et positionner une organisation',
  },
  budgets: {
    title: 'Construire un budget',
    outcome: 'Traduire une stratégie en plan financier opérationnel cohérent',
  },
  ecarts: {
    title: 'Piloter la performance',
    outcome: 'Identifier les écarts, en trouver les causes et corriger le tir',
  },
  investissement: {
    title: 'Évaluer un investissement',
    outcome: "Calculer la rentabilité d'un projet et défendre une décision financière",
  },
  incertain: {
    title: 'Décider sous incertitude',
    outcome: 'Choisir une stratégie optimale même sans données certaines',
  },
  mpm: {
    title: 'Planifier un projet',
    outcome: 'Organiser des tâches en réseau et identifier le chemin critique',
  },
}

export default function LearningPath() {
  const ordered = Object.values(courses).sort((a, b) => (a.order || 0) - (b.order || 0))
  const navigate = useNavigate()
  const { isPremium } = useProgress()
  const sectionRef = useRef(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setDrawn(true)
        })
      },
      { threshold: 0.25 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const handleClick = (course) => {
    navigate(`/cours/${course.id}`)
  }

  return (
    <section className="learning-path-section" ref={sectionRef}>
      <div className="container">
        <div className="learning-path-header">
          <span className="caption accent-text">Parcours</span>
          <h2>Votre parcours de maîtrise</h2>
          <p>6 étapes pour progresser du diagnostic à la décision.</p>
        </div>

        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
          {/* Ligne SVG en fond — ne touche pas aux cards */}
          <svg
            className="learning-path-line-overlay"
            style={{
              position: 'absolute',
              top: '20px',
              left: '8%',
              right: '8%',
              width: '84%',
              height: '60px',
              zIndex: 0,
              overflow: 'visible',
              pointerEvents: 'none',
            }}
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#6366F1" />
                <stop offset="20%"  stopColor="#0EA5E9" />
                <stop offset="40%"  stopColor="#10B981" />
                <stop offset="60%"  stopColor="#F59E0B" />
                <stop offset="80%"  stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              className={`learning-path-stroke ${drawn ? 'is-drawn' : ''}`}
              d="M 0 30 C 100 5, 200 55, 333 30 S 533 5, 667 30 S 867 55, 1000 30"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.4"
            />
          </svg>

          {/* Étapes — grille horizontale au-dessus de la ligne */}
          <div className="learning-path-nodes-grid">
            {ordered.map((c, i) => {
              const tierLabel = c.tier === 'premium' ? 'Premium' : 'Gratuit'
              const tierBg    = c.tier === 'premium' ? 'rgba(245,158,11,0.10)' : 'rgba(16,185,129,0.10)'
              const tierColor = c.tier === 'premium' ? '#F59E0B' : '#10B981'

              return (
                <motion.div
                  key={c.id}
                  className="learning-step"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleClick(c)}
                >
                  {/* Nœud numéroté */}
                  <div
                    className="learning-step-node"
                    style={{
                      background: `${c.iconColor}15`,
                      border: `2px solid ${c.iconColor}40`,
                      color: c.iconColor,
                      boxShadow: `0 0 0 4px white, 0 0 0 6px ${c.iconColor}20`,
                    }}
                  >
                    {String(c.order).padStart(2, '0')}
                  </div>

                  {/* Texte sous le nœud — jamais recouvert */}
                  <div className="learning-step-title">{OUTCOMES[c.id]?.title}</div>
                  <div className="learning-step-outcome">{OUTCOMES[c.id]?.outcome}</div>
                  <span
                    className="learning-step-badge"
                    style={{ background: tierBg, color: tierColor }}
                  >
                    {tierLabel}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="learning-path-footer">
          <Link to="/formations" className="btn btn-ghost">
            Explorer les 6 modules <span className="course-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
