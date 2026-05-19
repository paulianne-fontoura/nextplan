import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

/**
 * ProgressContext — state global de gamification
 * Persisté dans localStorage sous la clé "msi-progress"
 *
 * State :
 *   - badges       : string[]  liste des IDs de badges débloqués
 *   - coursesProgress : { gantt:0..100, mpm:0..100, pert:0..100 }
 *   - xpPoints     : number    total XP
 *   - isPremium    : boolean   simulé via /paiement
 *   - studentName  : string    saisi au checkout
 *   - quizScores   : { [quizId]: number }  scores des quiz
 *   - lastActivity : ISO date
 *   - streakDays   : number
 *   - watchedVideos: string[]  ids des vidéos vues à 80%
 *   - toastQueue   : [{id, label, icon}]  pour BadgeToast
 */

// Catalogue des 7 badges
export const BADGES = {
  'first-visit':     { id: 'first-visit',     icon: '🏅', label: 'Première visite',  description: 'Bienvenue sur NEXTPLAN !', tier: 'free', xp: 10 },
  'curious':         { id: 'curious',         icon: '📖', label: 'Curieux',          description: 'Vous avez consulté une fiche technique.', tier: 'free', xp: 25 },
  'spectator':       { id: 'spectator',       icon: '🎬', label: 'Spectateur',       description: 'Première vidéo regardée à plus de 80%.', tier: 'free', xp: 30 },
  'tester':          { id: 'tester',          icon: '🧠', label: 'Testeur',          description: 'Vous avez complété un quiz.', tier: 'free', xp: 40 },
  'expert-mpm':      { id: 'expert-mpm',      icon: '⭐', label: 'Expert MPM',        description: 'Score quiz MPM supérieur à 80%.', tier: 'free', xp: 80 },
  'subscriber':      { id: 'subscriber',      icon: '🚀', label: 'Abonné',           description: 'Passage à la formule Premium.', tier: 'premium', xp: 100 },
  'master-planner':  { id: 'master-planner',  icon: '🏆', label: 'Maître Planificateur', description: 'Toutes les ressources Premium consultées.', tier: 'premium', xp: 200 },
}

const STORAGE_KEY = 'msi-progress'

const DEFAULT_STATE = {
  badges: [],
  coursesProgress: { gantt: 0, mpm: 0, pert: 0 },
  xpPoints: 0,
  isPremium: false,
  studentName: '',
  quizScores: {},
  lastActivity: null,
  streakDays: 0,
  watchedVideos: [],
}

// Calcul du niveau en fonction des XP
function computeLevel(xp) {
  if (xp >= 400) return { num: 3, label: 'Expert MPM' }
  if (xp >= 150) return { num: 2, label: 'Planificateur Confirmé' }
  return { num: 1, label: 'Apprenti Planificateur' }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return DEFAULT_STATE
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* localStorage indisponible : on ignore */
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)
  const [toastQueue, setToastQueue] = useState([])

  // Persistance auto
  useEffect(() => {
    saveState(state)
  }, [state])

  // Badge "first-visit" au tout premier chargement
  useEffect(() => {
    if (state.badges.length === 0) {
      unlockBadge('first-visit')
    }
    // Mise à jour streak
    updateStreak()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unlockBadge = useCallback((badgeId) => {
    const badge = BADGES[badgeId]
    if (!badge) return
    setState((prev) => {
      if (prev.badges.includes(badgeId)) return prev
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
        xpPoints: prev.xpPoints + badge.xp,
      }
    })
    setToastQueue((q) => [...q, { id: `${badgeId}-${Date.now()}`, badge }])
  }, [])

  const dismissToast = useCallback((toastId) => {
    setToastQueue((q) => q.filter((t) => t.id !== toastId))
  }, [])

  const updateProgress = useCallback((courseId, percent) => {
    setState((prev) => {
      const current = prev.coursesProgress[courseId] || 0
      const next = Math.max(current, Math.min(100, percent))
      return {
        ...prev,
        coursesProgress: { ...prev.coursesProgress, [courseId]: next },
        lastActivity: new Date().toISOString(),
      }
    })
  }, [])

  const addXP = useCallback((amount) => {
    setState((prev) => ({ ...prev, xpPoints: prev.xpPoints + amount }))
  }, [])

  const activatePremium = useCallback((name = '') => {
    setState((prev) => ({
      ...prev,
      isPremium: true,
      studentName: name || prev.studentName,
    }))
    unlockBadge('subscriber')
  }, [unlockBadge])

  const setStudentName = useCallback((name) => {
    setState((prev) => ({ ...prev, studentName: name }))
  }, [])

  const setQuizScore = useCallback((quizId, score) => {
    setState((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score },
    }))
  }, [])

  const markVideoWatched = useCallback((videoId) => {
    setState((prev) => {
      if (prev.watchedVideos.includes(videoId)) return prev
      return { ...prev, watchedVideos: [...prev.watchedVideos, videoId] }
    })
  }, [])

  const updateStreak = useCallback(() => {
    setState((prev) => {
      const today = new Date().toDateString()
      const last = prev.lastActivity ? new Date(prev.lastActivity).toDateString() : null
      if (last === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newStreak = last === yesterday ? prev.streakDays + 1 : 1
      return {
        ...prev,
        streakDays: newStreak,
        lastActivity: new Date().toISOString(),
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const level = useMemo(() => computeLevel(state.xpPoints), [state.xpPoints])

  // Pourcentage vers le prochain niveau
  const xpToNextLevel = useMemo(() => {
    if (state.xpPoints >= 400) return 100
    if (state.xpPoints >= 150) return Math.round(((state.xpPoints - 150) / 250) * 100)
    return Math.round((state.xpPoints / 150) * 100)
  }, [state.xpPoints])

  const value = useMemo(() => ({
    ...state,
    level,
    xpToNextLevel,
    toastQueue,
    unlockBadge,
    dismissToast,
    updateProgress,
    addXP,
    activatePremium,
    setStudentName,
    setQuizScore,
    markVideoWatched,
    resetProgress,
  }), [
    state, level, xpToNextLevel, toastQueue,
    unlockBadge, dismissToast, updateProgress, addXP,
    activatePremium, setStudentName, setQuizScore, markVideoWatched, resetProgress,
  ])

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress doit être utilisé à l\'intérieur d\'un <ProgressProvider>')
  }
  return ctx
}
