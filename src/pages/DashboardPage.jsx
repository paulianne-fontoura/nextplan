import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import BadgeGrid from '../components/BadgeGrid'
import BadgeIcon from '../components/icons/BadgeIcon'
import CheckIcon from '../components/icons/CheckIcon'
import GanttIcon from '../components/icons/GanttIcon'
import MPMIcon from '../components/icons/MPMIcon'
import PERTIcon from '../components/icons/PERTIcon'
import courses from '../assets/courses.json'
import './DashboardPage.css'

const COURSE_ICONS = { gantt: GanttIcon, mpm: MPMIcon, pert: PERTIcon }

export default function DashboardPage() {
  const {
    studentName, badges, coursesProgress, xpPoints, level, xpToNextLevel,
    streakDays, quizScores, isPremium, unlockBadge, watchedVideos,
  } = useProgress()

  const displayName = studentName || 'Étudiant MSI'
  const initials = getInitials(displayName)
  const avatarBg = stringToGradient(displayName)

  const avgQuiz = useMemo(() => {
    const scores = Object.values(quizScores)
    if (!scores.length) return 0
    return Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
  }, [quizScores])

  const totalProgress = useMemo(() => {
    const vals = Object.values(coursesProgress)
    return Math.round(vals.reduce((s, v) => s + v, 0) / 3)
  }, [coursesProgress])

  const allDone = totalProgress >= 90

  const handleCertificate = () => {
    unlockBadge('master-planner')
    const blob = new Blob([
      `NEXTPLAN — CERTIFICAT DE COMPLÉTION\n\nDécerné à : ${displayName}\nDate : ${new Date().toLocaleDateString('fr-FR')}\nScore moyen : ${avgQuiz}%\n\nProgramme Planification et Contrôle — 6 modules :\n  1. Diagnostic stratégique\n  2. Budgets et articulation budgétaire\n  3. Contrôle budgétaire et écarts\n  4. Critères de choix d'investissement\n  5. Décision en avenir incertain\n  6. Méthode MPM\n\nM1 MSI · Paris 1 Panthéon-Sorbonne\n`,
    ], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificat-nextplan-${displayName.replace(/\s/g, '-').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-bg" aria-hidden="true">
        <div className="dashboard-glow dashboard-glow-1" />
        <div className="dashboard-glow dashboard-glow-2" />
      </div>

      <div className="container dashboard-layout">
        {/* === COLONNE GAUCHE : sidebar + ressources Premium === */}
        <div className="dashboard-left-column">
        {/* === SIDEBAR === */}
        <aside className="dashboard-sidebar glass-card glow-border">
          <div className="dashboard-avatar" style={{ background: avatarBg }}>
            {initials}
          </div>
          <h3 className="dashboard-student-name">{displayName}</h3>
          {isPremium ? (
            <span className="dashboard-tier is-premium">Premium</span>
          ) : (
            <span className="dashboard-tier">Formule gratuite</span>
          )}

          <div className="dashboard-level neuro-inset">
            <div className="dashboard-level-header">
              <span className="caption">Niveau {level.num}</span>
              <span className="mono text-teal">{xpPoints} XP</span>
            </div>
            <h4>{level.label}</h4>
            <div className="dashboard-xp-bar">
              <motion.div
                className="dashboard-xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpToNextLevel}%` }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
            <p className="caption">{xpToNextLevel}% vers le niveau suivant</p>
          </div>

          {streakDays > 0 && (
            <div className="dashboard-streak">
              <span className="dashboard-streak-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <polyline points="9 16 11 18 15 14"/>
                </svg>
              </span>
              <div>
                <span className="mono">{streakDays}</span>
                <span> jour{streakDays > 1 ? 's' : ''} consécutif{streakDays > 1 ? 's' : ''}</span>
              </div>
            </div>
          )}

          {!isPremium && (
            <Link to="/pricing" className="btn btn-primary dashboard-sidebar-cta">
              Passer Premium →
            </Link>
          )}

          {/* Bouton Déconnexion — tout en bas de la sidebar */}
          <button
            onClick={() => {
              if (window.confirm('Se déconnecter ? Vos badges, progression et nom seront effacés de ce poste.')) {
                localStorage.clear()
                window.location.hash = '/'
                window.location.reload()
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              background: 'rgba(239,68,68,0.08)',
              border: '1.5px solid rgba(239,68,68,0.30)',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#EF4444',
              cursor: 'pointer',
              marginTop: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.30)'
            }}
            title="Efface vos données locales (badges, progression, nom) — utile sur un poste partagé"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Se déconnecter
          </button>
        </aside>

        {/* === Mes badges — sous le profil, relatif au profil spécifique === */}
        <section className="dashboard-sidebar-badges">
          <span className="caption text-teal" style={{ display: 'block', marginBottom: '2px' }}>
            Récompenses
          </span>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
            Mes badges
          </h3>
          <BadgeGrid />
        </section>
        </div>

        {/* === MAIN === */}
        <div className="dashboard-main">
          {/* Stats */}
          <section className="dashboard-section">
            <span className="caption text-teal">Vue d'ensemble</span>
            <h2 className="gradient-text">Mes statistiques</h2>
            <div className="dashboard-stats-grid">
              <StatCard label="Badges débloqués" value={badges.length} suffix={`/7`} icon={<BadgeIcon size={28} />} accent="amber" />
              <StatCard label="Score quiz moyen" value={avgQuiz} suffix="%" icon={<CheckIcon size={28} />} accent="teal" />
              <StatCard label="Vidéos regardées" value={watchedVideos.length} icon={<VideoIconSvg />} accent="rose" />
              <StatCard label="Streak" value={streakDays} suffix={` j`} icon={<FlameIconSvg />} accent="amber" />
            </div>
          </section>

          {/* Mes cours */}
          <section className="dashboard-section">
            <span className="caption text-teal">Apprentissage</span>
            <h2 className="gradient-text">Mes cours</h2>
            <div className="dashboard-courses">
              {Object.values(courses).map((c, i) => (
                <CourseProgressCard
                  key={c.id}
                  course={c}
                  progress={coursesProgress[c.id] || 0}
                  isPremium={isPremium}
                  index={i}
                />
              ))}
            </div>
          </section>


          {/* Ressources Premium — sous les cours */}
          {isPremium && (
            <section className="dashboard-section">
              <span className="caption text-teal">Ressources Premium</span>
              <h2 className="gradient-text">Mes services exclusifs</h2>
              <div className="dashboard-premium-grid">
                <PremiumResourceCard
                  accent="#6366F1"
                  iconBg="rgba(99,102,241,0.10)"
                  title="Mentorat individuel"
                  description="Séance de 30 min en visio avec un expert."
                  ctaLabel="Réserver une séance"
                  onAction={() => window.open('https://calendly.com/', '_blank', 'noopener,noreferrer')}
                  icon={(
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  )}
                />
                <PremiumResourceCard
                  accent="#0EA5E9"
                  iconBg="rgba(14,165,233,0.10)"
                  title="Offres d'emploi"
                  description="Sélection ciblée pour M1 MSI."
                  ctaLabel="Voir les offres"
                  onAction={() => window.open('https://www.linkedin.com/jobs/search/?keywords=contr%C3%B4leur+de+gestion&location=Paris', '_blank', 'noopener,noreferrer')}
                  icon={(
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  )}
                />
                <PremiumResourceCard
                  accent="#10B981"
                  iconBg="rgba(16,185,129,0.10)"
                  title="Coaching CV et LinkedIn"
                  description="Modèles, mots-clés, checklist, exemples."
                  ctaLabel="Accéder aux ressources"
                  onAction={() => window.open('https://www.linkedin.com/learning/', '_blank', 'noopener,noreferrer')}
                  icon={(
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  )}
                />
              </div>
            </section>
          )}

          {/* Certificat */}
          {allDone && (
            <section className="dashboard-section">
              <span className="caption text-teal">Récompense ultime</span>
              <h2 className="gradient-text">Votre certificat est prêt</h2>
              <motion.div
                className="dashboard-cert glass-card premium-border"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="dashboard-cert-stamp">
                  <BadgeIcon size={56} style={{ color: 'var(--color-accent-amber)' }} />
                </div>
                <div className="dashboard-cert-content">
                  <h3>Certificat NEXTPLAN</h3>
                  <p>Décerné à <strong>{displayName}</strong> · {new Date().toLocaleDateString('fr-FR')}</p>
                  <p className="caption">Méthodes : GANTT · MPM · PERT — Score moyen : {avgQuiz}%</p>
                </div>
                <button className="btn btn-primary" onClick={handleCertificate}>
                  Télécharger
                </button>
              </motion.div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

// =========================
//   StatCard
// =========================
function StatCard({ label, value, suffix = '', icon, accent = 'aurora' }) {
  return (
    <motion.div
      className={`dashboard-stat glass-card is-interactive glow-border accent-${accent}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span className="dashboard-stat-icon">{icon}</span>
      <span className="mono dashboard-stat-value gradient-text">{value}{suffix}</span>
      <span className="dashboard-stat-label caption">{label}</span>
    </motion.div>
  )
}

// =========================
//   CourseProgressCard
// =========================
function CourseProgressCard({ course, progress, isPremium, index }) {
  const isLocked = course.tier === 'premium' && !isPremium
  const Icon = COURSE_ICONS[course.id] || MPMIcon
  return (
    <motion.div
      className={`dashboard-course glass-card course-${course.id}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="dashboard-course-icon" style={{ background: course.iconBg, color: course.iconColor }}>
        <Icon size={28} color={course.iconColor} />
      </div>
      <div className="dashboard-course-body">
        <div className="dashboard-course-row">
          <h4>{course.title}</h4>
          <span className="mono">{progress}%</span>
        </div>
        <div className="dashboard-course-bar">
          <div className="dashboard-course-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="dashboard-course-foot">
          <span className="caption">{course.duration}</span>
          {isLocked ? (
            <Link to="/pricing" className="dashboard-course-link is-locked">Premium</Link>
          ) : (
            <Link to={`/cours/${course.id}`} className="dashboard-course-link">
              {progress > 0 ? 'Continuer →' : 'Commencer →'}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// =====================================
//   Utilitaires
// =====================================
function getInitials(name) {
  return name.split(' ').map((s) => s[0] || '').join('').slice(0, 2).toUpperCase() || 'ME'
}

const GRADIENT_AVATARS = [
  'linear-gradient(135deg,#7C6FFF,#5B4FE8)',
  'linear-gradient(135deg,#00C9B1,#7C6FFF)',
  'linear-gradient(135deg,#FF6B9D,#5B4FE8)',
  'linear-gradient(135deg,#FFB830,#FF6B9D)',
]
function stringToGradient(str) {
  const idx = str.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % GRADIENT_AVATARS.length
  return GRADIENT_AVATARS[idx]
}

function VideoIconSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}
function FlameIconSvg() {
  // Calendrier avec coche — représente les "jours consécutifs validés"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="9 16 11 18 15 14" />
    </svg>
  )
}

function PremiumResourceCard({ accent, iconBg, title, description, ctaLabel, onAction, icon }) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.70)',
        borderTop: `3px solid ${accent}`,
        borderRadius: '18px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '11px',
          background: iconBg,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a2e', margin: 0, lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: '13px', color: '#5a5a7a', lineHeight: 1.5, margin: 0, flex: 1 }}>
        {description}
      </p>
      <button
        onClick={onAction}
        style={{
          marginTop: '6px',
          width: '100%',
          padding: '10px 14px',
          borderRadius: '9px',
          border: 'none',
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
          color: 'white',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = `0 6px 16px ${accent}40`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {ctaLabel} →
      </button>
    </div>
  )
}
