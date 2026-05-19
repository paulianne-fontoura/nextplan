import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoBlock from '../components/VideoBlock'
import QuizBlock from '../components/QuizBlock'
import FichePDF from '../components/FichePDF'
import AnimatedLesson from '../components/AnimatedLesson'
import courses from '../assets/courses.json'
import { useProgress } from '../context/ProgressContext'
import { getModuleIcon } from '../components/icons/ModuleIcons'
import { getCourseVisual } from '../components/visuals/index.jsx'
import { diagnosticLesson, DiagnosticVisual } from '../assets/lessons/diagnostic.jsx'
import { budgetsLesson, BudgetsVisual } from '../assets/lessons/budgets.jsx'
import { ecartsLesson, EcartsVisual } from '../assets/lessons/ecarts.jsx'
import { investissementLesson, InvestissementVisual } from '../assets/lessons/investissement.jsx'
import { incertainLesson, IncertainVisual } from '../assets/lessons/incertain.jsx'
import { mpmLesson, MpmVisual } from '../assets/lessons/mpm.jsx'
import './CourseFullPage.css'

// Registre des leçons animées par module
const ANIMATED_LESSONS = {
  diagnostic:     { lesson: diagnosticLesson,     Visual: DiagnosticVisual },
  budgets:        { lesson: budgetsLesson,        Visual: BudgetsVisual },
  ecarts:         { lesson: ecartsLesson,         Visual: EcartsVisual },
  investissement: { lesson: investissementLesson, Visual: InvestissementVisual },
  incertain:      { lesson: incertainLesson,      Visual: IncertainVisual },
  mpm:            { lesson: mpmLesson,            Visual: MpmVisual },
}

const FULL_SECTIONS_BASE = [
  { id: 'intro',     label: 'Introduction' },
  { id: 'concepts',  label: 'Concepts clés' },
  { id: 'methode',   label: 'Formules' },
  { id: 'schema',    label: 'Schéma interactif' },
  { id: 'exercice',  label: 'Exercice résolu' },
  { id: 'video',     label: 'Vidéo' },
  { id: 'quiz',      label: 'Quiz' },
  { id: 'suite',     label: 'Pour aller plus loin' },
]

function toQuizFormat(quizArray = []) {
  return quizArray.map((q, i) => ({
    id: `q${i + 1}`,
    question: q.question,
    answers: q.options.map((opt, idx) => ({
      id: String.fromCharCode(97 + idx),
      label: opt,
      correct: idx === q.correct,
    })),
    explanation: q.explanation,
  }))
}

export default function CourseFullPage() {
  const { id } = useParams()
  const course = courses[id]
  const { isPremium, updateProgress, coursesProgress } = useProgress()
  const [activeSection, setActiveSection] = useState('intro')
  const [expandedStep, setExpandedStep] = useState(0)

  // Leçon animée disponible pour ce module ? (remplace le schéma statique)
  const animLesson = ANIMATED_LESSONS[id]
  const FULL_SECTIONS = FULL_SECTIONS_BASE

  useEffect(() => {
    if (course && (course.tier === 'free' || isPremium)) {
      const current = coursesProgress[id] || 0
      if (current < 25) updateProgress(id, 25)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const handler = () => {
      const offset = 180
      let current = 'intro'
      for (const s of FULL_SECTIONS) {
        const el = document.getElementById(`section-${s.id}`)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = s.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!course) return <Navigate to="/formations" replace />
  // Garde : module premium → redirection vers /pricing pour les non-payeurs
  if (course.tier === 'premium' && !isPremium) return <Navigate to="/pricing" replace />

  const Icon = getModuleIcon(course.id)
  const quizFormatted = toQuizFormat(course.quiz)
  const orderedAll = Object.values(courses).sort((a, b) => (a.order || 0) - (b.order || 0))
  const currentIndex = orderedAll.findIndex((c) => c.id === id)
  const nextCourse = orderedAll[currentIndex + 1]
  const prevCourse = orderedAll[currentIndex - 1]
  const progress = coursesProgress[id] || 0
  const color = course.iconColor

  const handleNavClick = (sId) => (e) => {
    e.preventDefault()
    const el = document.getElementById(`section-${sId}`)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })
      setActiveSection(sId)
    }
  }

  const introParas = (course.content?.intro || '').split('\n\n').filter(Boolean)

  return (
    <main className="coursef-page">
      {/* TOP STRIP */}
      <div className="coursef-topstrip" style={{ borderTopColor: color }}>
        <div className="coursef-topstrip-inner">
          <Link to={`/cours/${id}`} className="coursef-back">
            <span>←</span> Aperçu du cours
          </Link>
          <div className="coursef-top-meta">
            <div className="coursef-top-icon" style={{ background: course.iconBg, color }}>
              <Icon size={20} color={color} />
            </div>
            <div className="coursef-top-title">
              <strong>{course.title}</strong>
              <span>Module {course.order} · {course.duration}</span>
            </div>
          </div>
          <div className="coursef-top-progress">
            <span className="coursef-top-progress-lbl">Progression</span>
            <div className="coursef-top-progress-bar">
              <div
                className="coursef-top-progress-fill"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${color}AA)` }}
              />
            </div>
            <span className="coursef-top-progress-num" style={{ color }}>{progress}%</span>
          </div>
        </div>
      </div>

      <div className="coursef-layout">
        {/* SIDEBAR */}
        <aside className="coursef-sidebar">
          <div className="coursef-sidebar-inner">
            <div className="coursef-sidebar-head">
              <span className="coursef-sidebar-eyebrow" style={{ color }}>Navigation</span>
              <h3>Sections du cours</h3>
            </div>
            <nav className="coursef-sidebar-nav">
              {FULL_SECTIONS.map((s, i) => {
                const isActive = activeSection === s.id
                return (
                  <a
                    key={s.id}
                    href={`#section-${s.id}`}
                    onClick={handleNavClick(s.id)}
                    className={`coursef-sidebar-link ${isActive ? 'is-active' : ''}`}
                    style={isActive ? { background: `${color}15`, color, borderColor: `${color}40` } : undefined}
                  >
                    <span
                      className="coursef-sidebar-icon"
                      style={isActive ? { background: color, color: 'white' } : { background: 'rgba(26,26,46,0.05)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="coursef-sidebar-label">{s.label}</span>
                  </a>
                )
              })}
            </nav>
            <div className="coursef-sidebar-progress">
              <div className="coursef-sidebar-progress-head">
                <span className="coursef-sidebar-progress-lbl">Progression module</span>
                <span className="coursef-sidebar-progress-pct" style={{ color }}>{progress}%</span>
              </div>
              <div className="coursef-sidebar-progress-bar">
                <div className="coursef-sidebar-progress-fill"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${color}AA)` }} />
              </div>
            </div>
            <div className="coursef-sidebar-pdf">
              <FichePDF course={course} />
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="coursef-content">
          {/* SECTION 1 — INTRODUCTION */}
          <section id="section-intro" className="coursef-section coursef-section--alt">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>01 · Introduction</span>
              <h2>Vue d'ensemble du module</h2>
            </div>
            <div className="coursef-intro-full">
              {introParas.map((p, i) => (
                <HighlightedParagraph key={i} text={p} color={color} highlights={course.keyPoints || []} />
              ))}
              <div className="coursef-tagline" style={{ borderLeftColor: color }}>
                <span style={{ color }}>«</span> {course.tagline} <span style={{ color }}>»</span>
              </div>
              <div className="coursef-objectives" style={{ background: `${color}08`, borderColor: `${color}25` }}>
                <h4 style={{ color }}>À l'issue de ce module</h4>
                <ul>
                  {(course.keyPoints || []).map((kp, i) => (
                    <li key={i}>
                      <span className="coursef-objectives-bullet" style={{ background: color }} />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 2 — CONCEPTS CLÉS (multi-paragraph + highlight) */}
          <section id="section-concepts" className="coursef-section">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>02 · Les fondamentaux</span>
              <h2>Concepts clés à maîtriser</h2>
              <p className="coursef-section-sub">
                Chaque concept ci-dessous correspond à un pilier du chapitre. Lisez-les dans l'ordre :
                ils s'éclairent mutuellement. Les concepts ne s'utilisent jamais isolément en pratique —
                c'est leur articulation qui produit la lecture stratégique complète.
              </p>
            </div>
            <div className="coursef-concepts-list">
              {(course.content?.sections || []).map((s, i) => {
                const paras = (s.body || '').split('\n\n').filter(Boolean)
                return (
                  <motion.article
                    key={i}
                    className="coursef-concept-full"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="coursef-concept-head">
                      <div className="coursef-concept-num" style={{ background: color, color: 'white' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 style={{ color: '#1a1a2e' }}>{s.title}</h3>
                    </div>
                    <div className="coursef-concept-body-full">
                      {paras.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    {s.highlight && (
                      <div className="coursef-concept-highlight" style={{ background: `${color}10`, borderLeftColor: color }}>
                        <span className="coursef-highlight-tag" style={{ color }}>À RETENIR</span>
                        <p>{s.highlight}</p>
                      </div>
                    )}
                  </motion.article>
                )
              })}
            </div>
          </section>

          {/* SECTION 3 — FORMULES enrichies */}
          {course.content?.formulas?.length > 0 && (
            <section id="section-methode" className="coursef-section coursef-section--alt">
              <div className="coursef-section-head">
                <span className="coursef-eyebrow" style={{ color }}>03 · Outillage</span>
                <h2>Formules essentielles</h2>
                <p className="coursef-section-sub">
                  Chaque formule est présentée avec son contexte d'usage et un exemple chiffré.
                  L'objectif n'est pas la mémorisation par cœur : c'est de savoir <strong>quand</strong> appliquer
                  chaque formule, et de pouvoir vérifier la cohérence d'un calcul par un ordre de grandeur.
                </p>
              </div>
              <div className="coursef-formulas-rich">
                {course.content.formulas.map((f, i) => {
                  // Rétrocompatibilité : si f est une chaîne, on l'affiche simplement
                  if (typeof f === 'string') {
                    return (
                      <div key={i} className="coursef-formula-card" style={{ borderLeft: `4px solid ${color}` }}>
                        <div className="coursef-formula-num" style={{ background: `${color}15`, color }}>F{i + 1}</div>
                        <code className="coursef-formula-expr">{f}</code>
                      </div>
                    )
                  }
                  return (
                    <motion.div
                      key={i}
                      className="coursef-formula-card"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      style={{ borderLeft: `4px solid ${color}` }}
                    >
                      <div className="coursef-formula-head">
                        <div className="coursef-formula-num" style={{ background: `${color}15`, color }}>F{i + 1}</div>
                        <div className="coursef-formula-meta">
                          <span className="coursef-formula-label">{f.label}</span>
                          <code className="coursef-formula-expr">{f.expr}</code>
                        </div>
                      </div>
                      {f.when && (
                        <div className="coursef-formula-row">
                          <span className="coursef-formula-row-lbl" style={{ color }}>Quand l'utiliser</span>
                          <span className="coursef-formula-row-val">{f.when}</span>
                        </div>
                      )}
                      {f.example && (
                        <div className="coursef-formula-row coursef-formula-example">
                          <span className="coursef-formula-row-lbl" style={{ color }}>Exemple chiffré</span>
                          <span className="coursef-formula-row-val">{f.example}</span>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </section>
          )}

          {/* SECTION 4 — SCHÉMA INTERACTIF
              Si une leçon animée existe pour ce module → on remplace le schéma statique
              par le player de leçon (qui montre la construction pas à pas) */}
          {(animLesson || getCourseVisual(course.id, color)) && (
            <section id="section-schema" className="coursef-section">
              <div className="coursef-section-head">
                <span className="coursef-eyebrow" style={{ color }}>04 · Visualiser</span>
                <h2>Schéma interactif</h2>
                <p className="coursef-section-sub">
                  {animLesson ? (
                    <>
                      Visualisez la <strong>construction complète</strong> de la méthode —
                      des données brutes au positionnement final — en suivant la narration
                      étape par étape. Pause, retour en arrière, vitesse réglable.
                    </>
                  ) : (
                    <>
                      Les concepts deviennent intuitifs dès lors qu'on les manipule.
                      <strong> Survolez chaque élément</strong> pour révéler ses propriétés et l'interprétation
                      à en faire en situation d'analyse.
                    </>
                  )}
                </p>
              </div>
              <div className="coursef-schema-full">
                {animLesson ? (
                  <AnimatedLesson
                    lesson={animLesson.lesson}
                    Visual={animLesson.Visual}
                    accent={color}
                  />
                ) : (
                  getCourseVisual(course.id, color)
                )}
              </div>
            </section>
          )}

          {/* SECTION 5 — EXERCICE RÉSOLU PAS À PAS (visuel textuel) */}
          <section id="section-exercice" className="coursef-section coursef-section--alt">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>05 · Cas pratique résolu</span>
              <h2>{course.content?.exampleTitle || 'Exercice corrigé'}</h2>
              <p className="coursef-section-sub">
                Voici la résolution complète d'un cas type, présentée étape par étape.
                Chaque étape explicite le raisonnement, le calcul, le résultat et la lecture
                stratégique à en tirer. Lisez d'abord l'énoncé, essayez par vous-même, puis
                comparez votre démarche avec la résolution proposée.
              </p>
            </div>

            {/* Énoncé + données */}
            <div className="coursef-exercice-frame" style={{ borderColor: `${color}30` }}>
              <div className="coursef-exercice-tag" style={{ background: `${color}15`, color }}>ÉNONCÉ</div>
              <p className="coursef-exercice-statement-text">
                À partir des données ci-dessous, appliquez la méthode du module pour produire
                un diagnostic complet. Identifiez les éléments clés, calculez les indicateurs
                nécessaires, et formulez une recommandation justifiée.
              </p>
              {course.content?.exampleData && <ExampleDataTable data={course.content.exampleData} color={color} />}
            </div>

            {/* Résolution pas à pas */}
            {course.content?.exerciseSteps?.length > 0 && (
              <div className="coursef-steps-resolution">
                <div className="coursef-steps-head">
                  <h3 style={{ color }}>Résolution étape par étape</h3>
                  <p>{course.content.exerciseSteps.length} étapes · cliquez sur une étape pour la développer ou la replier.</p>
                </div>
                <ol className="coursef-steps-list">
                  {course.content.exerciseSteps.map((step, i) => (
                    <ExerciseStep
                      key={i}
                      step={step}
                      index={i}
                      total={course.content.exerciseSteps.length}
                      color={color}
                      isExpanded={expandedStep === i || expandedStep === 'all'}
                      onToggle={() => setExpandedStep(expandedStep === i ? -1 : i)}
                    />
                  ))}
                </ol>
                <div className="coursef-steps-controls">
                  <button
                    type="button"
                    className="coursef-steps-toggle-all"
                    style={{ color, borderColor: `${color}50` }}
                    onClick={() => setExpandedStep(expandedStep === 'all' ? -1 : 'all')}
                  >
                    {expandedStep === 'all' ? 'Replier toutes les étapes' : 'Développer toutes les étapes'}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 6 — VIDÉO (slot à remplir au tournage) */}
          <section id="section-video" className="coursef-section">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>06 · Vidéo (complément)</span>
              <h2>Mini-vidéo de synthèse</h2>
              <p className="coursef-section-sub">
                Une courte vidéo de 2 à 3 minutes viendra ici en complément du schéma interactif.
                L'essentiel de l'apprentissage reste dans les sections précédentes — la vidéo
                est un bonus de révision pour les apprenants qui préfèrent l'écoute.
              </p>
            </div>

            <VideoBlock
              videoId={`${id}-video`}
              title={`${course.title} — Mini-vidéo`}
              subtitle="Synthèse de 2-3 min en complément du schéma interactif"
              videoUrl={course.videoUrl}
              duration="≈ 2-3 min"
            />

            {/* Slot indiquant clairement où ajouter l'URL une fois la vidéo enregistrée */}
            {(!course.videoUrl || course.videoUrl.includes('[PLACEHOLDER]')) && (
              <div
                style={{
                  marginTop: 16,
                  padding: '14px 18px',
                  background: `${color}08`,
                  border: `1.5px dashed ${color}40`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${color}15`, color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>
                    Vidéo à enregistrer — URL YouTube à insérer
                  </div>
                  <div style={{ fontSize: 11, color: '#6B6B8A', lineHeight: 1.5 }}>
                    Quand la vidéo sera prête, remplacer le placeholder dans{' '}
                    <code style={{
                      background: 'rgba(26,26,46,0.06)',
                      padding: '1px 6px',
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 10.5,
                      color: '#1a1a2e',
                    }}>
                      src/assets/courses.json → "{id}".videoUrl
                    </code>
                    {' '}par l'URL d'intégration YouTube (format <code style={{
                      background: 'rgba(26,26,46,0.06)',
                      padding: '1px 5px',
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 10.5,
                    }}>https://www.youtube.com/embed/VIDEO_ID</code>).
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 7 — QUIZ */}
          <section id="section-quiz" className="coursef-section coursef-section--alt">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>07 · Évaluation</span>
              <h2>Quiz du module — Vérifiez vos acquis</h2>
              <p className="coursef-section-sub">
                {course.quiz?.length || 0} questions corrigées pour mesurer votre compréhension.
                Chaque réponse incorrecte déclenche une explication détaillée. Visez ≥ <strong>80 %</strong> pour
                débloquer le badge du module et faire progresser votre niveau global sur NEXTPLAN.
              </p>
            </div>
            <QuizBlock quizId={`${id}-quiz`} questions={quizFormatted} />
          </section>

          {/* SECTION 8 — POUR ALLER PLUS LOIN */}
          <section id="section-suite" className="coursef-section">
            <div className="coursef-section-head">
              <span className="coursef-eyebrow" style={{ color }}>08 · Continuer</span>
              <h2>Pour aller plus loin</h2>
              <p className="coursef-section-sub">
                Ce module s'inscrit dans une progression cohérente du programme de
                Planification et Contrôle. Les modules adjacents prolongent les notions vues ici.
              </p>
            </div>
            <div className="coursef-suite-grid">
              {prevCourse && (
                <Link to={`/cours/${prevCourse.id}`} className="coursef-suite-card">
                  <span className="coursef-suite-dir">← Module précédent</span>
                  <strong>{prevCourse.title}</strong>
                  <p>{prevCourse.tagline}</p>
                </Link>
              )}
              {nextCourse && (
                <Link
                  to={`/cours/${nextCourse.id}`}
                  className="coursef-suite-card coursef-suite-card--next"
                  style={{ background: `${color}08`, borderColor: `${color}30` }}
                >
                  <span className="coursef-suite-dir" style={{ color }}>Module suivant →</span>
                  <strong>{nextCourse.title}</strong>
                  <p>{nextCourse.tagline}</p>
                </Link>
              )}
            </div>

            <div className="coursef-resources">
              <h4 style={{ color }}>Ressources recommandées</h4>
              <ul className="coursef-resources-list">
                <li>
                  <ResourceIcon name="book" color={color} />
                  <div>
                    <strong>Bouquin S.</strong> — <em>Comptabilité de gestion et contrôle</em> (Dunod, 2023). Ouvrage de référence couvrant l'ensemble du programme.
                  </div>
                </li>
                <li>
                  <ResourceIcon name="bookOpen" color={color} />
                  <div>
                    <strong>Berland N.</strong> — <em>Le contrôle de gestion</em> (PUF, Que sais-je ?). Synthèse condensée, parfaite en révision.
                  </div>
                </li>
                <li>
                  <ResourceIcon name="globe" color={color} />
                  <div>
                    <strong>Bibliothèque Cujas — Paris 1</strong>. Accès en ligne aux revues spécialisées (Comptabilité Contrôle Audit, Revue Française de Gestion) avec code étudiant.
                  </div>
                </li>
                <li>
                  <ResourceIcon name="film" color={color} />
                  <div>
                    <strong>Annales corrigées de partiels</strong>. Disponibles dans votre Espace étudiant — exercices supplémentaires avec barème commenté.
                  </div>
                </li>
              </ul>
            </div>

            <div className="coursef-nav-bottom">
              <Link to="/formations" className="coursef-nav-back">← Retour au catalogue</Link>
              <Link to={`/cours/${id}`} className="coursef-nav-preview" style={{ color }}>
                Revoir l'aperçu du cours
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

/* ============================================================
   ExerciseStep — une étape de résolution déroulable
   ============================================================ */
function ExerciseStep({ step, index, total, color, isExpanded, onToggle }) {
  return (
    <motion.li
      className={`coursef-step-card ${isExpanded ? 'is-expanded' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={isExpanded ? { borderLeftColor: color, background: `${color}05` } : undefined}
    >
      <button type="button" className="coursef-step-header" onClick={onToggle}>
        <span className="coursef-step-badge" style={{ background: color, color: 'white' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="coursef-step-title">{step.title}</span>
        <span className="coursef-step-chev" style={{ color }}>
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      {isExpanded && (
        <motion.div
          className="coursef-step-body"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {step.intro && (
            <div className="coursef-step-row">
              <span className="coursef-step-row-lbl" style={{ color }}>Contexte</span>
              <p>{step.intro}</p>
            </div>
          )}
          {step.calc && (
            <div className="coursef-step-row coursef-step-calc">
              <span className="coursef-step-row-lbl" style={{ color }}>Calcul</span>
              <code>{step.calc}</code>
            </div>
          )}
          {step.result && (
            <div className="coursef-step-row coursef-step-result">
              <span className="coursef-step-row-lbl" style={{ color }}>Résultat</span>
              <p>{step.result}</p>
            </div>
          )}
          {step.tip && (
            <div className="coursef-step-row coursef-step-tip" style={{ background: `${color}10`, borderColor: `${color}30` }}>
              <span className="coursef-step-row-lbl" style={{ color }}>Lecture stratégique</span>
              <p>{step.tip}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.li>
  )
}

/* Highlights key terms */
function HighlightedParagraph({ text, color, highlights = [] }) {
  const terms = useMemo(() => {
    return highlights
      .map(kp => kp.split(/[\s:.,—()]+/).filter(w => w.length > 4 && w[0] === w[0].toUpperCase())[0])
      .filter(Boolean)
      .slice(0, 5)
  }, [highlights])

  if (!terms.length) return <p className="coursef-intro-p">{text}</p>

  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi')
  const parts = text.split(regex)
  return (
    <p className="coursef-intro-p">
      {parts.map((p, i) => {
        const isMatch = terms.some(t => t.toLowerCase() === p.toLowerCase())
        return isMatch ? (
          <span key={i} className="coursef-highlight" style={{ background: `${color}18`, color }}>{p}</span>
        ) : (
          <span key={i}>{p}</span>
        )
      })}
    </p>
  )
}

function ExampleDataTable({ data, color }) {
  if (!data) return null
  if (data.das && Array.isArray(data.das)) {
    const keys = Object.keys(data.das[0])
    return (
      <div className="coursef-data-table">
        <table>
          <thead><tr>{keys.map(k => <th key={k} style={{ color }}>{k.toUpperCase()}</th>)}</tr></thead>
          <tbody>{data.das.map((row, i) => <tr key={i}>{keys.map(k => <td key={k}>{row[k]}</td>)}</tr>)}</tbody>
        </table>
      </div>
    )
  }
  const entries = Object.entries(data).filter(([k, v]) => typeof v !== 'object')
  if (!entries.length) return null
  return (
    <div className="coursef-data-table">
      <table>
        <thead><tr><th style={{ color }}>Donnée</th><th style={{ color }}>Valeur</th></tr></thead>
        <tbody>{entries.map(([k, v]) => <tr key={k}><td><strong>{k}</strong></td><td>{String(v)}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

function ResourceIcon({ name, color }) {
  const common = {
    width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  const icons = {
    book: (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    bookOpen: (
      <svg {...common}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    film: (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
  }
  return <span className="coursef-resource-icon">{icons[name]}</span>
}
