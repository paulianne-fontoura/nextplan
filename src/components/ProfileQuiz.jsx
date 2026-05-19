import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import courses from '../assets/courses.json'
import { getModuleIcon } from './icons/ModuleIcons'
import './ProfileQuiz.css'

/**
 * ProfileQuiz — 4 questions, 4 profils possibles.
 * Chaque réponse pointe vers un profil (A → STRATEGE, B → CONTROLEUR, etc.).
 * Le profil dominant est calculé à la fin.
 */

const QUESTIONS = [
  {
    id: 'q1',
    title: 'Quel est votre objectif principal ?',
    options: [
      { label: 'Réussir mes examens de M1',                       profil: 'PLANIFICATEUR' },
      { label: 'Préparer une carrière en contrôle de gestion',    profil: 'CONTROLEUR' },
      { label: "Comprendre la stratégie d'entreprise",            profil: 'STRATEGE' },
      { label: 'Maîtriser la gestion de projet',                  profil: 'PLANIFICATEUR' },
    ],
  },
  {
    id: 'q2',
    title: 'Quel domaine vous attire le plus ?',
    options: [
      { label: 'Finance et chiffres',                profil: 'CONTROLEUR' },
      { label: 'Stratégie et marchés',               profil: 'STRATEGE' },
      { label: 'Organisation et planification',      profil: 'PLANIFICATEUR' },
      { label: 'Analyse et décision',                profil: 'DECIDEUR' },
    ],
  },
  {
    id: 'q3',
    title: 'Où en êtes-vous avec ces concepts ?',
    options: [
      { label: 'Débutant complet — première découverte',                   profil: 'STRATEGE' },
      { label: "J'en ai entendu parler en cours mais c'est flou",          profil: 'PLANIFICATEUR' },
      { label: 'Je connais les bases, je veux aller plus loin',            profil: 'DECIDEUR' },
      { label: "J'ai besoin de réviser rapidement avant un examen",        profil: 'CONTROLEUR' },
    ],
  },
  {
    id: 'q4',
    title: 'Quel type d\'apprenant êtes-vous ?',
    options: [
      { label: 'Je lis et mémorise les concepts',                profil: 'STRATEGE' },
      { label: "J'apprends par les exemples et cas pratiques",   profil: 'CONTROLEUR' },
      { label: 'Je comprends mieux avec des schémas et visuels', profil: 'PLANIFICATEUR' },
      { label: 'Je dois pratiquer les exercices pour retenir',   profil: 'DECIDEUR' },
    ],
  },
]

const PROFILES = {
  STRATEGE: {
    name: 'Stratège',
    title: 'Vous avez le profil d\'un stratège.',
    message: "Commencez par analyser les marchés, puis évaluez vos investissements pour transformer la vision en décision rigoureuse.",
    modules: ['diagnostic', 'investissement'],
  },
  CONTROLEUR: {
    name: 'Contrôleur',
    title: 'Votre profil est orienté contrôle.',
    message: "La maîtrise budgétaire sera votre atout principal. Construisez un budget puis analysez les écarts comme un véritable contrôleur de gestion.",
    modules: ['budgets', 'ecarts'],
  },
  DECIDEUR: {
    name: 'Décideur',
    title: "Vous êtes à l'aise avec l'ambiguïté.",
    message: "Les outils de décision en avenir incertain sont faits pour vous. Investissement et critères de Wald, Savage, Hurwicz forment votre boîte à outils.",
    modules: ['incertain', 'investissement'],
  },
  PLANIFICATEUR: {
    name: 'Planificateur',
    title: 'Votre force est l\'organisation.',
    message: "La méthode MPM et la planification budgétaire seront vos outils clés. Découpez, ordonnez, anticipez — c'est votre méthode.",
    modules: ['mpm', 'budgets'],
  },
}

const STORAGE_KEY = 'nextplan-profile'

export default function ProfileQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [profile, setProfile] = useState(null)

  // Charger un profil existant
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p && p.profil) setProfile(p.profil)
      }
    } catch { /* ignore */ }
  }, [])

  const total = QUESTIONS.length
  const progressPct = profile ? 100 : Math.round((step / total) * 100)

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...answers, QUESTIONS[step].options[selected].profil]
    setSelected(null)
    if (step < total - 1) {
      setAnswers(newAnswers)
      setStep(step + 1)
    } else {
      const counts = {}
      newAnswers.forEach((p) => { counts[p] = (counts[p] || 0) + 1 })
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setProfile(winner)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ profil: winner, date: new Date().toISOString() }))
      } catch { /* ignore */ }
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers([])
    setSelected(null)
    setProfile(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }

  const currentQ = QUESTIONS[step]
  const resultProfile = profile ? PROFILES[profile] : null

  return (
    <section className="profile-quiz-section">
      <div className="container">
        <div className="profile-quiz-header">
          <span className="caption accent-text">Profil</span>
          <h2>Quel est votre profil ?</h2>
          <p>4 questions pour identifier votre parcours idéal.</p>
        </div>

        <div className="profile-quiz-card">
          {/* Progress bar */}
          <div className="profile-quiz-progress">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`profile-quiz-step ${i < step || profile ? 'is-done' : ''} ${i === step && !profile ? 'is-current' : ''}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!profile && (
              <motion.div
                key={`question-${step}`}
                className="profile-quiz-question"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="profile-quiz-num numbers">
                  Question {step + 1} sur {total}
                </span>
                <h3>{currentQ.title}</h3>

                <div className="profile-quiz-options">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`profile-quiz-option ${selected === idx ? 'is-selected' : ''}`}
                      onClick={() => setSelected(idx)}
                    >
                      <span className="profile-quiz-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="profile-quiz-label">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="profile-quiz-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={selected === null}
                  >
                    {step < total - 1 ? 'Question suivante' : 'Voir mon profil'}
                    {' '}<span className="course-arrow">→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {profile && resultProfile && (
              <motion.div
                key="result"
                className="profile-quiz-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="caption accent-text">Votre profil</span>
                <h3 className="profile-name">{resultProfile.name}</h3>
                <p className="profile-title">{resultProfile.title}</p>
                <p className="profile-message">{resultProfile.message}</p>

                <div className="profile-modules-grid">
                  {resultProfile.modules.map((modId) => {
                    const c = courses[modId]
                    if (!c) return null
                    const Icon = getModuleIcon(c.id)
                    return (
                      <Link key={modId} to={`/cours/${modId}`} className="profile-module">
                        <div
                          className="profile-module-icon"
                          style={{ background: c.iconBg, color: c.iconColor }}
                        >
                          <Icon size={26} color={c.iconColor} />
                        </div>
                        <div className="profile-module-body">
                          <span className="caption">Module recommandé</span>
                          <h4>{c.title}</h4>
                          <span className="profile-module-tagline">{c.tagline}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                <div className="profile-quiz-result-actions">
                  <Link
                    to={`/cours/${resultProfile.modules[0]}`}
                    className="btn btn-primary btn-lg"
                  >
                    Voir mon premier module recommandé <span className="course-arrow">→</span>
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={handleReset}>
                    Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!profile && (
            <span className="profile-quiz-pct numbers">{progressPct}%</span>
          )}
        </div>
      </div>
    </section>
  )
}
