import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useProgress } from '../context/ProgressContext'
import './QuizBlock.css'

export const MPM_QUIZ = [
  {
    id: 'q1',
    question: "Dans la méthode MPM, que représente la DTO ?",
    answers: [
      { id: 'a', label: 'Date de Transmission Opérationnelle' },
      { id: 'b', label: 'Date au plus Tôt', correct: true },
      { id: 'c', label: 'Durée de la Tâche Optimale' },
      { id: 'd', label: "Direction du Travail d'Ordonnancement" },
    ],
    explanation: "La DTO (Date au plus Tôt) est la date la plus précoce à laquelle une tâche peut commencer, calculée comme le MAX des chemins entrants.",
  },
  {
    id: 'q2',
    question: "Quel est l'avantage principal du GANTT fléché par rapport au GANTT classique ?",
    answers: [
      { id: 'a', label: 'Il est plus rapide à créer' },
      { id: 'b', label: "Il montre les relations d'ordre entre tâches", correct: true },
      { id: 'c', label: 'Il calcule automatiquement les marges' },
      { id: 'd', label: 'Il est compatible avec MPM' },
    ],
    explanation: "Le GANTT fléché ajoute des flèches entre les tâches pour visualiser explicitement les relations d'ordre — une limite majeure du GANTT classique.",
  },
  {
    id: 'q3',
    question: "Une tâche est critique lorsque :",
    answers: [
      { id: 'a', label: 'Sa durée dépasse 5h' },
      { id: 'b', label: "Elle a de nombreux antécédents" },
      { id: 'c', label: 'Sa DTO est égale à sa DTA', correct: true },
      { id: 'd', label: 'Elle est sur le chemin le plus court' },
    ],
    explanation: "Une tâche dont DTO = DTA n'a aucune marge : tout retard sur cette tâche entraîne un retard équivalent sur le projet entier.",
  },
]

/**
 * QuizBlock
 *   - props : questions (default MPM_QUIZ), title, quizId, teaser (1 seule Q + CTA)
 */
export default function QuizBlock({
  questions = MPM_QUIZ,
  title = 'Testez vos connaissances',
  quizId = 'mpm-full',
  teaser = false,
  teaserCta,
}) {
  const qs = teaser ? questions.slice(0, 1) : questions
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const finishedRef = useRef(false)
  const { unlockBadge, setQuizScore } = useProgress()

  const q = qs[current]
  const totalQuestions = qs.length

  const onSelect = (ansId) => {
    if (revealed) return
    setSelected(ansId)
  }

  const onValidate = () => {
    if (!selected) return
    const isCorrect = q.answers.find((a) => a.id === selected)?.correct
    if (isCorrect) {
      setScore((s) => s + 1)
    } else {
      setShakeKey((k) => k + 1)
    }
    setRevealed(true)
  }

  const onNext = () => {
    if (current < qs.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      // Quiz terminé
      setFinished(true)
    }
  }

  // Effet à la fin du quiz
  useEffect(() => {
    if (finished && !finishedRef.current) {
      finishedRef.current = true
      const percent = Math.round((score / totalQuestions) * 100)
      setQuizScore(quizId, percent)
      unlockBadge('tester')
      if (!teaser && percent >= 80) {
        unlockBadge('expert-mpm')
        // Confetti
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3F44C9', '#FFB830', '#18A558'],
          })
        }, 200)
      }
    }
  }, [finished, score, totalQuestions, quizId, setQuizScore, unlockBadge, teaser])

  if (finished) {
    return <QuizResult score={score} total={totalQuestions} teaser={teaser} teaserCta={teaserCta} onRestart={() => {
      setCurrent(0); setSelected(null); setRevealed(false); setScore(0); setFinished(false); finishedRef.current = false
    }} />
  }

  return (
    <motion.div
      className="quiz-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <header className="quiz-block-header">
        <span className="caption">Quiz · {teaser ? 'Aperçu' : 'Méthode MPM'}</span>
        <h3>{title}</h3>
        {!teaser && (
          <div className="quiz-progress">
            <span className="mono">Q{current + 1} / {totalQuestions}</span>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((current + (revealed ? 1 : 0)) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <motion.div
        key={`${q.id}-${shakeKey}`}
        className="quiz-question-wrap"
        animate={revealed && !q.answers.find(a => a.id === selected)?.correct ? { x: [-5, 5, -5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <p className="quiz-question">{q.question}</p>
        <div className="quiz-answers" role="radiogroup">
          {q.answers.map((a) => {
            const isSelected = selected === a.id
            const isCorrect = a.correct
            let stateClass = ''
            if (revealed) {
              if (isCorrect) stateClass = 'quiz-answer-correct'
              else if (isSelected) stateClass = 'quiz-answer-wrong'
              else stateClass = 'quiz-answer-disabled'
            } else if (isSelected) {
              stateClass = 'quiz-answer-selected'
            }
            return (
              <motion.button
                key={a.id}
                className={`quiz-answer ${stateClass}`}
                onClick={() => onSelect(a.id)}
                disabled={revealed}
                whileTap={!revealed ? { scale: 0.98 } : {}}
                animate={isSelected && !revealed ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.2 }}
                role="radio"
                aria-checked={isSelected}
              >
                <span className="quiz-answer-letter mono">{a.id.toUpperCase()}</span>
                <span className="quiz-answer-label">{a.label}</span>
                {revealed && isCorrect && <CheckIcon />}
                {revealed && isSelected && !isCorrect && <CrossIcon />}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              className="quiz-explanation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="caption">Explication</span>
              <p>{q.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="quiz-actions">
          {!revealed ? (
            <button
              className="btn btn-primary"
              onClick={onValidate}
              disabled={!selected}
            >
              Valider →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onNext}>
              {current < qs.length - 1 ? 'Question suivante →' : 'Voir mon score'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// =========================
//   Composant résultat
// =========================
function QuizResult({ score, total, teaser, teaserCta, onRestart }) {
  const percent = Math.round((score / total) * 100)
  const expert = percent >= 80
  const passed = percent >= 60
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 1500
    const step = (t) => {
      const progress = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * percent))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [percent])

  return (
    <motion.div
      className="quiz-result"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className="caption">{teaser ? 'Aperçu terminé' : 'Quiz terminé'}</span>
      <div className={`quiz-result-score ${expert ? 'is-expert' : passed ? 'is-passed' : 'is-failed'}`}>
        <span className="mono quiz-result-score-num">{animatedScore}%</span>
        <span className="quiz-result-score-label">
          {score} / {total} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}
        </span>
      </div>

      <div className="quiz-result-message">
        {expert && (
          <>
            <h3>Excellent — vous êtes un Expert MPM</h3>
            <p>Vous maîtrisez les fondamentaux de la planification. Badge "Expert MPM" débloqué.</p>
          </>
        )}
        {!expert && passed && (
          <>
            <h3>Bravo, c'est validé.</h3>
            <p>Continuez avec les cours complets pour maîtriser les 3 méthodes.</p>
          </>
        )}
        {!passed && (
          <>
            <h3>Revoyez les bases</h3>
            <p>La fiche technique MPM vous aidera à consolider les concepts clés.</p>
          </>
        )}
      </div>

      <div className="quiz-result-actions">
        {teaser && teaserCta && teaserCta}
        {!teaser && (
          <>
            <button className="btn btn-ghost" onClick={onRestart}>Refaire le quiz</button>
            {!passed && (
              <a href="#/formations" className="btn btn-outline">Revoir les cours ↑</a>
            )}
            {passed && (
              <a href="#/pricing" className="btn btn-primary">Accéder aux cours complets →</a>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

function CheckIcon() {
  return (
    <motion.svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="quiz-answer-status"
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  )
}

function CrossIcon() {
  return (
    <motion.svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="quiz-answer-status"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </motion.svg>
  )
}
