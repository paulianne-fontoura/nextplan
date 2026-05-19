import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import courses from '../assets/courses.json'
import { useProgress } from '../context/ProgressContext'
import { getModuleIcon } from '../components/icons/ModuleIcons'
import { getCourseVisual } from '../components/visuals/index.jsx'
import './CoursePreviewPage.css'

/**
 * CoursePage — landing page immersive pour /cours/:id
 * Inspirée de Coursera / MasterClass — un seul écran pour décider
 */
export default function CoursePage() {
  const { id } = useParams()
  const course = courses[id]
  const { isPremium } = useProgress()

  if (!course) return <Navigate to="/formations" replace />

  // Garde : module premium → redirection systématique vers /pricing pour les non-payeurs
  if (course.tier === 'premium' && !isPremium) return <Navigate to="/pricing" replace />

  const isLocked = false // plus jamais "locked" : si on arrive ici, soit free, soit isPremium=true
  const Icon = getModuleIcon(course.id)

  const orderedAll = Object.values(courses).sort((a, b) => (a.order || 0) - (b.order || 0))
  const premiumCourses = orderedAll.filter((c) => c.tier === 'premium')
  const sectionsCount = course.content?.sections?.length || 0
  const formulasCount = course.content?.formulas?.length || 0
  const quizCount = course.quiz?.length || 0

  // Estimation de niveau basée sur le tier + ordre
  const level = course.tier === 'free' ? 'Débutant accessible' : 'Avancé · niveau M1'

  return (
    <main className="coursep-page">
      {/* ============ HERO LANDING ============ */}
      <section
        className="coursep-hero"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${course.iconColor}18 0%, transparent 50%), radial-gradient(circle at 90% 80%, ${course.iconColor}10 0%, transparent 60%)`,
        }}
      >
        <div className="coursep-hero-grid">
          {/* Colonne gauche : identité du cours */}
          <motion.div
            className="coursep-hero-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/formations" className="coursep-back">
              <span>←</span> Tous les cours
            </Link>

            <div className="coursep-hero-meta">
              <span
                className="coursep-tier"
                style={{
                  background: isLocked ? 'rgba(255,184,48,0.15)' : `${course.iconColor}15`,
                  color: isLocked ? '#F59E0B' : course.iconColor,
                  border: `1px solid ${isLocked ? 'rgba(255,184,48,0.35)' : course.iconColor + '40'}`,
                }}
              >
                {course.tier === 'free' ? '● GRATUIT' : '★ PREMIUM'}
              </span>
              <span className="coursep-meta-dot">·</span>
              <span className="coursep-meta-txt">Module {course.order} / 6</span>
              <span className="coursep-meta-dot">·</span>
              <span className="coursep-meta-txt">{course.duration}</span>
            </div>

            <h1 className="coursep-hero-title">{course.title}</h1>
            <p className="coursep-hero-tagline" style={{ color: course.iconColor }}>
              {course.tagline}
            </p>
            <p className="coursep-hero-desc">{course.description}</p>

            {/* Stats */}
            <div className="coursep-hero-stats">
              <div className="coursep-stat">
                <div className="coursep-stat-num" style={{ color: course.iconColor }}>
                  {sectionsCount}
                </div>
                <div className="coursep-stat-lbl">Concepts clés</div>
              </div>
              <div className="coursep-stat">
                <div className="coursep-stat-num" style={{ color: course.iconColor }}>
                  {formulasCount}
                </div>
                <div className="coursep-stat-lbl">Formules</div>
              </div>
              <div className="coursep-stat">
                <div className="coursep-stat-num" style={{ color: course.iconColor }}>
                  {quizCount}
                </div>
                <div className="coursep-stat-lbl">Questions quiz</div>
              </div>
              <div className="coursep-stat">
                <div className="coursep-stat-num" style={{ color: course.iconColor }}>
                  1
                </div>
                <div className="coursep-stat-lbl">Schéma interactif</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="coursep-cta-row">
              {isLocked ? (
                <Link
                  to="/pricing"
                  className="coursep-btn-primary"
                  style={{ background: `linear-gradient(135deg, ${course.iconColor}, ${course.iconColor}DD)` }}
                >
                  Débloquer ce module — 30 €/mois →
                </Link>
              ) : (
                <Link
                  to={`/cours/${course.id}/complet`}
                  className="coursep-btn-primary"
                  style={{ background: `linear-gradient(135deg, ${course.iconColor}, ${course.iconColor}DD)` }}
                >
                  Commencer le cours →
                </Link>
              )}
              <Link to="/formations" className="coursep-btn-secondary">
                Voir d'autres modules
              </Link>
            </div>

            {/* Social proof */}
            <div className="coursep-proof">
              <div className="coursep-proof-logo" style={{ background: `${course.iconColor}10`, color: course.iconColor }}>
                P1
              </div>
              <div className="coursep-proof-text">
                <strong>Cours académique reconnu</strong>
                <span>Master 1 Système d'Information · Paris 1 Panthéon-Sorbonne</span>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : grosse icône colorée + carte */}
          <motion.div
            className="coursep-hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="coursep-icon-frame"
              style={{
                background: `linear-gradient(135deg, ${course.iconColor}20, ${course.iconColor}05)`,
                border: `1px solid ${course.iconColor}30`,
              }}
            >
              <div
                className="coursep-icon-big"
                style={{
                  background: course.iconBg,
                  color: course.iconColor,
                  boxShadow: `0 24px 48px -12px ${course.iconGlow || course.iconColor + '40'}`,
                }}
              >
                <Icon size={72} color={course.iconColor} />
              </div>
              <div className="coursep-icon-floor">
                <span className="coursep-icon-floor-lbl">Niveau</span>
                <span className="coursep-icon-floor-val" style={{ color: course.iconColor }}>
                  {level}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ BÉNÉFICES — PROMESSES ============ */}
      <section className="coursep-promises">
        <div className="coursep-section-head">
          <span className="coursep-eyebrow" style={{ color: course.iconColor }}>
            Ce que vous saurez faire
          </span>
          <h2>Après ce module, vous serez capable de :</h2>
        </div>
        <div className="coursep-promises-grid">
          {(course.keyPoints || []).map((kp, i) => (
            <motion.div
              key={i}
              className="coursep-promise"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ borderTop: `3px solid ${course.iconColor}` }}
            >
              <div
                className="coursep-promise-num"
                style={{ background: `${course.iconColor}15`, color: course.iconColor }}
              >
                0{i + 1}
              </div>
              <p className="coursep-promise-text">{kp}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ APERÇU DU CONTENU + VISUEL ============ */}
      <section
        className="coursep-content-preview"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${course.iconColor}06 100%)`,
        }}
      >
        <div className="coursep-content-grid">
          <motion.div
            className="coursep-content-left"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="coursep-eyebrow" style={{ color: course.iconColor }}>
              Aperçu du contenu
            </span>
            <h2>Au programme</h2>
            <p className="coursep-content-intro">{course.content?.intro?.slice(0, 280)}…</p>

            <ul className="coursep-toc">
              {(course.content?.sections || []).map((s, i) => (
                <li key={i}>
                  <span className="coursep-toc-num" style={{ color: course.iconColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="coursep-toc-title">{s.title}</span>
                </li>
              ))}
              {course.content?.exampleTitle && (
                <li>
                  <span className="coursep-toc-num" style={{ color: course.iconColor }}>
                    ✦
                  </span>
                  <span className="coursep-toc-title">{course.content.exampleTitle}</span>
                </li>
              )}
              <li>
                <span className="coursep-toc-num" style={{ color: course.iconColor }}>
                  ?
                </span>
                <span className="coursep-toc-title">Quiz · {quizCount} questions corrigées</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="coursep-content-right"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="coursep-visual-frame">
              <div className="coursep-visual-scale">
                {getCourseVisual(course.id, course.iconColor)}
              </div>
              <div className="coursep-visual-overlay">
                <p>Explorez le schéma complet dans le cours.</p>
                {!isLocked && (
                  <Link
                    to={`/cours/${course.id}/complet`}
                    className="coursep-visual-link"
                    style={{ color: course.iconColor }}
                  >
                    Accéder au cours →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SI PREMIUM : MODULES INCLUS ============ */}
      {isLocked && (
        <section className="coursep-premium-bundle">
          <div className="coursep-section-head">
            <span className="coursep-eyebrow" style={{ color: course.iconColor }}>
              Forfait Premium
            </span>
            <h2>3 modules avancés à 30 €/mois</h2>
            <p className="coursep-bundle-sub">
              Débloquer ce module donne accès aux <strong>2 autres modules Premium</strong> du programme.
            </p>
          </div>
          <div className="coursep-bundle-grid">
            {premiumCourses.map((c) => {
              const PIcon = getModuleIcon(c.id)
              const isThis = c.id === course.id
              return (
                <div
                  key={c.id}
                  className="coursep-bundle-card"
                  style={{
                    borderColor: isThis ? c.iconColor : 'rgba(255,255,255,0.6)',
                    background: isThis ? `${c.iconColor}08` : 'rgba(255,255,255,0.55)',
                  }}
                >
                  <div className="coursep-bundle-icon" style={{ background: c.iconBg, color: c.iconColor }}>
                    <PIcon size={28} color={c.iconColor} />
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.tagline}</p>
                  {isThis && (
                    <span className="coursep-bundle-this" style={{ color: c.iconColor }}>
                      Vous êtes ici
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="coursep-bundle-cta">
            <Link
              to="/pricing"
              className="coursep-btn-primary"
              style={{ background: `linear-gradient(135deg, ${course.iconColor}, ${course.iconColor}DD)` }}
            >
              Débloquer les 3 modules — 30 €/mois →
            </Link>
            <span className="coursep-bundle-note">Sans engagement · Annulable à tout moment</span>
          </div>
        </section>
      )}

      {/* ============ FINAL CTA ============ */}
      {!isLocked && (
        <section className="coursep-final">
          <motion.div
            className="coursep-final-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `linear-gradient(135deg, ${course.iconColor}, ${course.iconColor}CC)`,
            }}
          >
            <h2>Prêt à démarrer ?</h2>
            <p>Le cours complet contient les vidéos, l'exercice corrigé, le schéma interactif et un quiz noté.</p>
            <Link to={`/cours/${course.id}/complet`} className="coursep-final-btn">
              Commencer maintenant →
            </Link>
          </motion.div>
        </section>
      )}
    </main>
  )
}
