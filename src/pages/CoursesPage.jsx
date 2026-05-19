import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import courses from '../assets/courses.json'
import { getModuleIcon } from '../components/icons/ModuleIcons'
import './CoursesPage.css'

const FILTERS = [
  { id: 'all',     label: 'Tout' },
  { id: 'free',    label: 'Gratuit' },
  { id: 'premium', label: 'Premium' },
]

export default function CoursesPage() {
  const [filter, setFilter] = useState('all')
  const { coursesProgress, isPremium } = useProgress()

  const list = useMemo(() => {
    const arr = Object.values(courses).sort((a, b) => (a.order || 0) - (b.order || 0))
    if (filter === 'all') return arr
    return arr.filter((c) => c.tier === filter)
  }, [filter])

  return (
    <main className="courses-page">
      <section className="courses-hero section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="courses-hero-content"
          >
            <span className="caption accent-text">Catalogue</span>
            <h1>Les 6 modules du programme</h1>
            <p className="courses-hero-sub">
              Diagnostic stratégique, budgets, contrôle, investissement, décision,
              et planification de projet — l'essentiel du pilotage d'entreprise.
            </p>
          </motion.div>

          <div className="courses-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`courses-filter ${filter === f.id ? 'is-active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section courses-grid-section">
        <div className="container">
          <div className="courses-grid">
            {list.map((c, idx) => (
              <CourseGridCard
                key={c.id}
                course={c}
                progress={coursesProgress[c.id] || 0}
                isPremium={isPremium}
                index={idx}
              />
            ))}
          </div>

          {/* Bannière Mentorat Premium — pleine largeur */}
          <MentoratBanner />
        </div>
      </section>
    </main>
  )
}

function MentoratBanner() {
  return (
    <div
      className="courses-mentorat-banner"
      style={{
        marginTop: '64px',
        width: '100%',
        background:
          'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.12) 50%, rgba(236,72,153,0.08) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '24px',
        padding: '48px 64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Décoration fond */}
      <div style={{
        position: 'absolute', right: '-60px', top: '-60px',
        width: '240px', height: '240px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Texte gauche */}
      <div style={{ flex: 1, minWidth: '280px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '999px',
          background: 'rgba(245,158,11,0.10)',
          border: '1px solid rgba(245,158,11,0.30)',
          fontSize: '11px', fontWeight: '700', color: '#F59E0B',
          letterSpacing: '0.08em', marginBottom: '12px',
        }}>
          ✦ PREMIUM
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: '800', color: '#1a1a2e',
          margin: '0 0 12px', lineHeight: '1.2',
        }}>
          Réservez une séance de mentorat
        </h2>
        <p style={{
          fontSize: '15px', color: '#5a5a7a',
          lineHeight: '1.7', margin: 0, maxWidth: '480px',
        }}>
          Échangez en tête-à-tête avec un expert du contrôle de gestion.
          Posez vos questions sur les cours, préparez vos examens ou explorez
          vos orientations de carrière — 30 minutes pour débloquer vos blocages.
        </p>
        <div style={{
          display: 'flex', gap: '24px', marginTop: '20px', flexWrap: 'wrap',
        }}>
          {[
            { label: 'Séances de 30 min',                  icon: 'clock' },
            { label: 'En visioconférence',                 icon: 'video' },
            { label: 'Inclus dans le forfait Premium',     icon: 'check' },
          ].map((feat, i) => (
            <div key={i} style={{
              display: 'flex', gap: '6px', alignItems: 'center',
              fontSize: '13px', color: '#5a5a7a',
            }}>
              <FeatIcon name={feat.icon} />
              {feat.label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA droite */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        alignItems: 'center', flexShrink: 0,
        position: 'relative', zIndex: 1,
      }}>
        <button
          onClick={() => { window.location.hash = '/pricing' }}
          style={{
            padding: '16px 36px',
            borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: 'white', fontSize: '16px', fontWeight: '700',
            boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.3)'
          }}
        >
          Réserver une séance →
        </button>
        <p style={{ fontSize: '12px', color: '#8080a0', margin: 0, textAlign: 'center' }}>
          Disponible avec le forfait Premium · 30€/mois
        </p>
      </div>
    </div>
  )
}

function FeatIcon({ name }) {
  const common = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: '#6366F1', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'clock') return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
  if (name === 'video') return (
    <svg {...common}>
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  )
  return (
    <svg {...common}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function CourseGridCard({ course, progress, isPremium, index }) {
  const [hover, setHover] = useState(false)
  const isLocked = course.tier === 'premium' && !isPremium
  const Icon = getModuleIcon(course.id)

  const iconBoxStyle = {
    background: course.iconBg,
    color: course.iconColor,
    boxShadow: hover
      ? `0 0 0 6px ${course.iconBg}, 0 0 20px 4px ${course.iconGlow || course.iconColor}, 0 4px 16px rgba(0,0,0,0.08)`
      : 'none',
    transform: hover ? 'scale(1.12) rotate(3deg)' : 'none',
    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
  }

  return (
    <motion.article
      className={`course-grid-card course-${course.id} ${isLocked ? 'is-locked' : ''} ${course.tier === 'premium' ? 'is-premium' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="course-grid-top">
        <div className="course-grid-icon icon-wrapper" style={iconBoxStyle}>
          <Icon size={28} color={course.iconColor} />
        </div>
        <span className={`course-tag tag-${course.tier === 'free' ? 'free' : 'premium'}`}>
          {course.tier === 'free' ? 'Gratuit' : 'Premium'}
        </span>
      </div>

      <span className="course-grid-order numbers">Module {course.order}</span>
      <h3>{course.title}</h3>
      <p className="course-grid-tagline">{course.tagline}</p>

      <ul className="course-grid-bullets">
        {(course.keyPoints || []).slice(0, 3).map((kp, i) => (
          <li key={i}>{kp}</li>
        ))}
      </ul>

      {progress > 0 && (
        <div className="course-grid-progress">
          <div className="course-grid-progress-bar">
            <div className="course-grid-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="caption mono">{progress}% complété</span>
        </div>
      )}

      <div className="course-grid-cta">
        <Link
          to={isLocked ? '/pricing' : `/cours/${course.id}`}
          className={`btn ${isLocked ? 'btn-outline' : 'btn-primary'} btn-sm`}
        >
          {isLocked ? 'Débloquer Premium' : (progress > 0 ? 'Continuer' : 'Commencer')}
          <span className="course-arrow">→</span>
        </Link>
      </div>
    </motion.article>
  )
}
