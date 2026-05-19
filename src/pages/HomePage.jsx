import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'

import NextPlanLogo from '../components/NextPlanLogo'
import ParticleNetwork from '../components/ParticleNetwork'
import FloatingCards from '../components/FloatingCards'
import BentoGrid from '../components/BentoGrid'
import LearningPath from '../components/LearningPath'
import ProfileQuiz from '../components/ProfileQuiz'
import Testimonials from '../components/Testimonials'

import { getModuleIcon } from '../components/icons/ModuleIcons'
import courses from '../assets/courses.json'

import './HomePage.css'

export default function HomePage() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120])
  const visualsY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 100])
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.6], [0.9, 0])

  return (
    <main className="home">
      {/* ============ HERO ============ */}
      <section
        className="hero"
        ref={heroRef}
        style={{ overflow: 'hidden', position: 'relative', zIndex: 0 }}
      >
        <motion.div className="hero-particles-wrap" style={{ opacity: particlesOpacity }}>
          <ParticleNetwork particleCount={75} linkDistance={130} mouseRadius={220} />
        </motion.div>

        <motion.div className="container hero-inner" style={{ scale: heroScale, opacity: heroOpacity }}>
          <motion.div className="hero-content" style={{ y: contentY }}>
            <NextPlanLogo variant="hero" animate />

            <motion.span
              className="hero-eyebrow"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="hero-eyebrow-dot" />
              M1 MSI · Paris 1 Panthéon-Sorbonne
            </motion.span>

            <motion.h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: '800',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
                color: '#1a1a2e',
                marginBottom: '0px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Planification.<br />
              Contrôle.<br />
              <span style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Décision.
              </span>
            </motion.h1>

            {/* Phrase d'impact — séparée visuellement */}
            <motion.p
              style={{
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                fontWeight: '300',
                letterSpacing: '-0.01em',
                color: '#1a1a2e',
                opacity: 0.5,
                marginTop: '8px',
                marginBottom: '28px',
                fontStyle: 'italic',
                lineHeight: '1.2',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              Le pilotage commence ici.
            </motion.p>

            {/* Sous-titre explicatif séparé */}
            <motion.p
              style={{
                fontSize: '16px',
                color: '#5a5a7a',
                lineHeight: '1.7',
                marginBottom: '32px',
                maxWidth: '480px',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Maîtrisez les outils essentiels du contrôle de gestion,
              du diagnostic stratégique à la décision en avenir incertain.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Link to="/formations" className="btn btn-primary btn-lg">
                Commencer gratuitement
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/pricing" className="btn btn-ghost btn-lg">
                Voir les formules
              </Link>
            </motion.div>

            <motion.div
              className="hero-social-proof"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="hero-avatars">
                {[
                  { i: 'PF', g: 'linear-gradient(135deg,#6B5FE4,#8B83F0)' },
                  { i: 'DC', g: 'linear-gradient(135deg,#4ECDC4,#3DBFB6)' },
                  { i: 'TR', g: 'linear-gradient(135deg,#FF6B7A,#FF8C9D)' },
                  { i: 'DK', g: 'linear-gradient(135deg,#FFB830,#FFA500)' },
                ].map((a, i) => (
                  <div key={i} className="hero-avatar" style={{ background: a.g }}>
                    {a.i}
                  </div>
                ))}
              </div>
              <span>
                <strong className="numbers">1 247</strong> étudiants formés ce semestre
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visuals"
            style={{ y: visualsY }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-visuals-stage">
              <FloatingCards />
            </div>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ============ STATS ============ */}
      <section className="section home-stats">
        <div className="container">
          <RevealBlock>
            <div className="home-stats-grid">
              <StatCard label="Modules"             value="6"     index={0} icon="layers" accent="#6B5FE4" />
              <StatCard label="Exercices corrigés"  value="24+"   index={1} icon="check"  accent="#4ECDC4" />
              <StatCard label="Étudiants formés"    value="1 247" delta="+12%" index={2} icon="users" accent="#FF6B7A" />
              <StatCard label="Score moyen quiz"    value="82%"   delta="+4%"  index={3} icon="star"  accent="#FFB830" />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============ 6 MODULES ============ */}
      <section className="section home-methods">
        <div className="container">
          <RevealBlock>
            <div className="home-section-header">
              <span className="caption accent-text">Le programme</span>
              <h2>
                6 modules.
                <br />
                Une <em className="italic-soft">méthode</em> de pilotage complète.
              </h2>
              <p>
                Du diagnostic stratégique à la décision en avenir incertain,
                en passant par les budgets, l'analyse d'écarts, le choix d'investissement et la MPM.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="home-modules-grid">
              {Object.values(courses)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((c) => (
                  <ModuleCard key={c.id} course={c} />
                ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============ BENTO ============ */}
      <section className="section home-bento">
        <div className="container">
          <RevealBlock>
            <div className="home-section-header">
              <span className="caption accent-text">Plateforme</span>
              <h2>Une expérience pensée pour réussir.</h2>
              <p>Tout pour apprendre, valider, progresser — sans friction.</p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <BentoGrid />
          </RevealBlock>
        </div>
      </section>

      {/* ============ NOUVELLES SECTIONS ============ */}
      <LearningPath />
      <ProfileQuiz />
      <Testimonials />
    </main>
  )
}

// =====================================
function RevealBlock({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const STAT_ICONS = {
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  check: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

function MiniSparkline({ accent }) {
  return (
    <svg className="home-stat-spark" viewBox="0 0 80 24" preserveAspectRatio="none">
      <path
        d="M 0 18 L 12 14 L 24 16 L 36 8 L 48 12 L 60 6 L 72 4 L 80 2"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="2" r="2.5" fill={accent} />
    </svg>
  )
}

function StatCard({ label, value, delta, index = 0, icon, accent = '#6B5FE4' }) {
  return (
    <motion.div
      className="home-stat-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="home-stat-header">
        <div className="home-stat-icon" style={{ color: accent, background: `${accent}1A` }}>
          {STAT_ICONS[icon]}
        </div>
        <MiniSparkline accent={accent} />
      </div>
      <span className="home-stat-label">{label}</span>
      <div className="home-stat-row">
        <span className="home-stat-value numbers">{value}</span>
        {delta && <span className="home-stat-delta">{delta}</span>}
      </div>
    </motion.div>
  )
}

function ModuleCard({ course }) {
  const [hover, setHover] = useState(false)
  const Icon = getModuleIcon(course.id)
  const { isPremium } = useProgress()
  const isLocked = course.tier === 'premium' && !isPremium
  const targetPath = isLocked ? '/pricing' : `/cours/${course.id}`

  return (
    <motion.article
      className="home-module-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={targetPath} className="home-module-link">
        <div className="home-module-top">
          <div
            className="home-module-icon icon-wrapper"
            style={{
              background: course.iconBg,
              color: course.iconColor,
              boxShadow: hover
                ? `0 0 0 6px ${course.iconBg}, 0 0 20px 4px ${course.iconGlow}, 0 4px 16px rgba(0,0,0,0.08)`
                : 'none',
              transform: hover ? 'scale(1.12) rotate(3deg)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
            }}
          >
            <Icon size={26} color={course.iconColor} />
          </div>
          <span className={`home-module-tag ${course.tier === 'premium' ? 'tag-premium' : 'tag-free'}`}>
            {course.tier === 'premium' ? 'Premium' : 'Gratuit'}
          </span>
        </div>
        <span className="home-module-order numbers" style={{ color: course.iconColor }}>
          Module {course.order}
        </span>
        <h3 className="home-module-title">{course.title}</h3>
        <p className="home-module-tagline">{course.tagline}</p>
        <span className="home-module-cta">
          {isLocked ? 'Débloquer Premium' : 'Découvrir'} <span className="course-arrow">→</span>
        </span>
      </Link>
    </motion.article>
  )
}

function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.7, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="hero-scroll-label">Scroll</span>
          <svg className="hero-scroll-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
