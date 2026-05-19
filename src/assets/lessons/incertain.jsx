import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée — module "incertain" (Décision en avenir incertain)
 * 8 slides · ≈ 2 min 15
 */

export const incertainLesson = {
  title: 'Décider face à l\'inconnu : 5 critères',
  totalDuration: '≈ 2 min 15',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 12,
      title: 'Risque vs incertitude',
      narration: "Frank Knight, en 1921, opère la distinction fondamentale. Risque : on connaît les probabilités. Incertitude radicale : on ne les connaît même pas. Quand vous lancez un produit sans données historiques, vous êtes en incertitude — l'espérance mathématique ne sert plus.",
    },
    {
      id: 'matrice',
      visualStage: 2,
      duration: 14,
      title: 'La matrice de gains',
      narration: "Trois stratégies possibles : A1, A2, A3. Trois états de la nature : E1, E2, E3 — favorable, neutre, défavorable. Pour chaque combinaison, un gain en euros. Voilà votre matériau de décision. Cinq critères vont chacun en tirer une conclusion différente.",
    },
    {
      id: 'wald',
      visualStage: 3,
      duration: 18,
      title: 'Critère de Wald — le pessimiste',
      narration: "Pour chaque stratégie, on identifie le pire résultat. A1 min = 40, A2 min = 30, A3 min = 50. Puis on retient la stratégie dont ce pire est le moins mauvais — c'est A3 avec 50. Critère du décideur prudent qui veut garantir un seuil minimal, quoi qu'il arrive.",
    },
    {
      id: 'maximax',
      visualStage: 4,
      duration: 16,
      title: 'Critère Maximax — l\'optimiste',
      narration: "Symétriquement, pour chaque stratégie on identifie le meilleur résultat possible. A1 max = 80, A2 max = 90, A3 max = 70. On retient le plus grand — A2 avec 90. Critère du décideur entreprenant qui parie que la nature jouera en sa faveur.",
    },
    {
      id: 'laplace',
      visualStage: 5,
      duration: 16,
      title: 'Critère de Laplace',
      narration: "En l'absence d'information sur les probabilités, on suppose équiprobabilité — un tiers pour chaque état. Moyenne arithmétique : A1 et A3 ex æquo à 60, A2 à 56,7. On choisit A1 ou A3 — souvent A3 si on est averse au risque car sa variance est plus faible.",
    },
    {
      id: 'savage',
      visualStage: 6,
      duration: 20,
      title: 'Critère de Savage — minimax regret',
      narration: "Plus subtil : on calcule pour chaque case le regret — l'écart au meilleur de la colonne. On obtient la matrice des regrets. Puis on retient la stratégie dont le regret maximum est le plus faible — c'est A1 avec un regret max de 30. On minimise la déception maximale.",
    },
    {
      id: 'hurwicz',
      visualStage: 7,
      duration: 18,
      title: 'Critère de Hurwicz — le compromis',
      narration: "Hurwicz introduit un paramètre alpha entre 0 et 1. H(A) = alpha fois max plus (1 moins alpha) fois min. Avec alpha de 0,6 — optimisme modéré — H(A2) = 66, la plus élevée. À alpha de 0,4, c'est A3 qui gagne. Test de robustesse essentiel.",
    },
    {
      id: 'synthese',
      visualStage: 8,
      duration: 11,
      title: 'Chaque critère, une attitude',
      narration: "Wald choisit A3, Maximax choisit A2, Laplace A1 ou A3, Savage A1, Hurwicz dépend d'alpha. Aucune réponse universelle. Le choix du critère est lui-même un acte de management qui traduit une politique de risque — pessimiste, optimiste, ou compromis.",
    },
  ],
}

/* ============================================================
   DONNÉES
   ============================================================ */

const STRATS = ['A1', 'A2', 'A3']
const ETATS = ['E1 (favorable)', 'E2 (neutre)', 'E3 (défavorable)']
const GAINS = [
  [40, 60, 80],
  [30, 90, 50],
  [70, 50, 60],
]

const COL_MAX = [0, 1, 2].map(j => Math.max(...GAINS.map(r => r[j])))
const REGRETS = GAINS.map(row => row.map((v, j) => COL_MAX[j] - v))

const ROW_MIN = GAINS.map(r => Math.min(...r))
const ROW_MAX = GAINS.map(r => Math.max(...r))
const ROW_MEAN = GAINS.map(r => r.reduce((a, b) => a + b, 0) / r.length)
const ROW_REGRET_MAX = REGRETS.map(r => Math.max(...r))

const COLORS = ['#8B5CF6', '#A78BFA', '#7C3AED']  // for A1, A2, A3

/* ============================================================
   VISUAL — Routeur
   ============================================================ */

export function IncertainVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage === 2) return <MatrixScene accent={accent} highlight={null} />
  if (stage === 3) return <CritereScene accent={accent} type="wald" />
  if (stage === 4) return <CritereScene accent={accent} type="maximax" />
  if (stage === 5) return <CritereScene accent={accent} type="laplace" />
  if (stage === 6) return <SavageScene accent={accent} />
  if (stage === 7) return <HurwiczScene accent={accent} />
  return <SyntheseScene accent={accent} />
}

/* ============ 1 — INTRO ============ */

function IntroScene({ accent }) {
  const RisqueIcon = (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="4" width="4" height="17" rx="1" />
    </svg>
  )
  const IncertitudeIcon = (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )

  const items = [
    { lbl: 'RISQUE', desc: "On connaît les probabilités. On utilise l'espérance mathématique.", icon: RisqueIcon, color: '#10B981' },
    { lbl: 'INCERTITUDE', desc: "Les probabilités sont inconnues. Les critères de décision diffèrent.", icon: IncertitudeIcon, color: accent },
  ]

  return (
    <div style={{ width: '100%', padding: '20px 4px' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#1a1a2e', marginBottom: 30, letterSpacing: '-0.02em' }}
      >
        Risque <span style={{ color: accent }}>≠</span> Incertitude
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {items.map((it, i) => (
          <motion.div
            key={it.lbl}
            initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }}
            style={{
              background: 'white', borderRadius: 14, padding: '22px',
              border: `2px solid ${it.color}30`, borderTop: `4px solid ${it.color}`,
              textAlign: 'center',
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 14,
              background: `${it.color}15`, margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {it.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: it.color, letterSpacing: '0.12em', marginBottom: 8 }}>
              {it.lbl}
            </div>
            <div style={{ fontSize: 12.5, color: '#1a1a2e', lineHeight: 1.55 }}>{it.desc}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ textAlign: 'center', marginTop: 22, fontSize: 12, color: '#6B6B8A', fontStyle: 'italic' }}
      >
        Frank Knight, 1921 — <em>Risk, Uncertainty and Profit</em>
      </motion.div>
    </div>
  )
}

/* ============ 2-5 — Matrix scene with criterion highlight ============ */

function MatrixTable({ accent, highlight = null, showExtra = null, extraValues = null, extraLabel = null, winner = -1, animateExtra = false }) {
  return (
    <div style={{
      background: 'white', borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(26,26,46,0.08)',
      fontFeatureSettings: '"tnum"',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: showExtra ? '70px repeat(3, 1fr) 90px' : '70px repeat(3, 1fr)', background: `${accent}10` }}>
        <div style={{ padding: '12px 8px', fontSize: 10, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Stratégie
        </div>
        {ETATS.map(e => (
          <div key={e} style={{ padding: '12px 8px', fontSize: 10, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {e}
          </div>
        ))}
        {showExtra && (
          <div style={{
            padding: '12px 8px', fontSize: 10, fontWeight: 800,
            color: 'white', background: accent,
            textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            {extraLabel}
          </div>
        )}
      </div>

      {STRATS.map((s, i) => {
        const isWinner = i === winner
        return (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: showExtra ? '70px repeat(3, 1fr) 90px' : '70px repeat(3, 1fr)',
              background: isWinner ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
              borderTop: '1px solid rgba(0,0,0,0.04)',
              borderLeft: isWinner ? `3px solid ${accent}` : '3px solid transparent',
              transition: 'all 0.4s',
            }}
          >
            <div style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 800, color: isWinner ? accent : COLORS[i] }}>
              {s}
              {isWinner && <span style={{ marginLeft: 6, color: accent }}>✓</span>}
            </div>
            {GAINS[i].map((g, j) => {
              const isHighlighted = highlight && (
                (highlight === 'min' && g === ROW_MIN[i]) ||
                (highlight === 'max' && g === ROW_MAX[i])
              )
              return (
                <div
                  key={j}
                  style={{
                    padding: '16px 8px', textAlign: 'center',
                    fontSize: 16, fontWeight: isHighlighted ? 800 : 600,
                    color: isHighlighted ? accent : '#1a1a2e',
                    background: isHighlighted ? `${accent}15` : 'transparent',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'all 0.3s',
                  }}
                >
                  {g}
                </div>
              )
            })}
            {showExtra && (
              <div style={{
                padding: '16px 8px', textAlign: 'center',
                background: isWinner ? `${accent}25` : `${accent}08`,
                fontWeight: 800, fontSize: 16,
                color: isWinner ? accent : '#1a1a2e',
                fontVariantNumeric: 'tabular-nums',
                transition: 'all 0.4s',
              }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={String(extraValues[i])}
                    initial={animateExtra ? { scale: 0, opacity: 0 } : false}
                    animate={animateExtra ? { scale: [0, 1.3, 1], opacity: 1 } : { opacity: 1 }}
                    transition={animateExtra ? { duration: 0.5, times: [0, 0.55, 1], delay: 0.3 + i * 0.1 } : { duration: 0.3 }}
                    style={{ display: 'inline-block' }}
                  >
                    {typeof extraValues[i] === 'number' && extraValues[i] % 1 !== 0 ? extraValues[i].toFixed(1) : extraValues[i]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

function MatrixScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10, textAlign: 'center' }}>
        MATRICE DES GAINS
      </div>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <MatrixTable accent={accent} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          maxWidth: 540, margin: '18px auto 0', padding: '12px 18px',
          background: `${accent}10`, borderRadius: 10, textAlign: 'center',
          fontSize: 12, color: '#1a1a2e', lineHeight: 1.55,
        }}
      >
        Cinq critères vont chacun analyser ces 9 chiffres et conclure différemment.
      </motion.div>
    </div>
  )
}

function CritereScene({ accent, type }) {
  const config = {
    wald: {
      title: 'CRITÈRE DE WALD (MAXIMIN)',
      sub: 'Pour chaque stratégie, on identifie le pire — on retient celle dont le pire est le moins mauvais.',
      highlight: 'min',
      extra: ROW_MIN,
      extraLabel: 'MIN',
      winner: ROW_MIN.indexOf(Math.max(...ROW_MIN)),
      verdict: `A3 retenu (min = ${Math.max(...ROW_MIN)})`,
      verdictColor: '#8B5CF6',
    },
    maximax: {
      title: 'CRITÈRE MAXIMAX (OPTIMISTE)',
      sub: 'On retient la stratégie au meilleur résultat absolu — le pari optimiste.',
      highlight: 'max',
      extra: ROW_MAX,
      extraLabel: 'MAX',
      winner: ROW_MAX.indexOf(Math.max(...ROW_MAX)),
      verdict: `A2 retenu (max = ${Math.max(...ROW_MAX)})`,
      verdictColor: '#10B981',
    },
    laplace: {
      title: 'CRITÈRE DE LAPLACE',
      sub: 'En l\'absence d\'info sur les probabilités, on suppose équiprobabilité et on choisit la moyenne la plus élevée.',
      highlight: null,
      extra: ROW_MEAN,
      extraLabel: 'MOY.',
      winner: ROW_MEAN.indexOf(Math.max(...ROW_MEAN)),
      verdict: `A1 ou A3 ex æquo (moy = 60)`,
      verdictColor: '#0EA5E9',
    },
  }[type]

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 8, textAlign: 'center' }}>
        {config.title}
      </div>
      <div style={{ fontSize: 12, color: '#6B6B8A', textAlign: 'center', marginBottom: 14, maxWidth: 540, margin: '0 auto 14px', lineHeight: 1.55 }}>
        {config.sub}
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <MatrixTable
          accent={accent}
          highlight={config.highlight}
          showExtra
          extraValues={config.extra}
          extraLabel={config.extraLabel}
          winner={config.winner}
          animateExtra
        />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
        transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          display: 'block', margin: '20px auto 0',
          maxWidth: 360, padding: '12px 20px', textAlign: 'center',
          background: config.verdictColor, color: 'white',
          borderRadius: 10, fontSize: 14, fontWeight: 800,
          boxShadow: `0 8px 20px ${config.verdictColor}50`,
          letterSpacing: '-0.01em',
        }}
      >
        ✓ {config.verdict}
      </motion.div>
    </div>
  )
}

/* ============ 6 — SAVAGE (matrice regrets) ============ */

function SavageScene({ accent }) {
  const winner = ROW_REGRET_MAX.indexOf(Math.min(...ROW_REGRET_MAX))
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 8, textAlign: 'center' }}>
        CRITÈRE DE SAVAGE — MINIMAX REGRET
      </div>
      <div style={{ fontSize: 12, color: '#6B6B8A', textAlign: 'center', marginBottom: 14, maxWidth: 540, margin: '0 auto 14px', lineHeight: 1.55 }}>
        Regret = meilleur de la colonne − valeur. On choisit la stratégie dont le regret max est le plus faible.
      </div>

      <div style={{
        maxWidth: 700, margin: '0 auto',
        background: 'white', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(26,26,46,0.08)',
        fontFeatureSettings: '"tnum"',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(3, 1fr) 90px', background: `${accent}10` }}>
          {['Stratégie', ...ETATS, 'REGRET MAX'].map((h, i) => (
            <div key={h} style={{
              padding: '12px 6px', fontSize: 10, fontWeight: 800,
              color: i === 4 ? 'white' : accent,
              background: i === 4 ? accent : 'transparent',
              textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {h}
            </div>
          ))}
        </div>

        {STRATS.map((s, i) => {
          const isWinner = i === winner
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              style={{
                display: 'grid', gridTemplateColumns: '70px repeat(3, 1fr) 90px',
                background: isWinner ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                borderTop: '1px solid rgba(0,0,0,0.04)',
                borderLeft: isWinner ? `3px solid ${accent}` : '3px solid transparent',
                transition: 'all 0.4s',
              }}
            >
              <div style={{ padding: '16px 6px', textAlign: 'center', fontWeight: 800, color: isWinner ? accent : COLORS[i] }}>
                {s}{isWinner && <span style={{ marginLeft: 4 }}>✓</span>}
              </div>
              {REGRETS[i].map((r, j) => {
                const isMax = r === Math.max(...REGRETS[i])
                return (
                  <div key={j} style={{
                    padding: '12px 6px', textAlign: 'center',
                    fontSize: 13, color: '#1a1a2e',
                    background: isMax ? `${accent}15` : 'transparent',
                  }}>
                    <div style={{ fontSize: 11, color: '#6B6B8A' }}>
                      {COL_MAX[j]} − {GAINS[i][j]}
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                      style={{ fontSize: 16, fontWeight: isMax ? 800 : 600, color: isMax ? accent : '#1a1a2e', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}
                    >
                      = {r}
                    </motion.div>
                  </div>
                )
              })}
              <div style={{
                padding: '16px 6px', textAlign: 'center',
                background: isWinner ? `${accent}25` : `${accent}08`,
                fontWeight: 800, fontSize: 18,
                color: isWinner ? accent : '#1a1a2e',
                fontVariantNumeric: 'tabular-nums',
              }}>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.55, 1], delay: 0.6 + i * 0.1 }}
                  style={{ display: 'inline-block' }}
                >
                  {ROW_REGRET_MAX[i]}
                </motion.span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
        transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 1.4 }}
        style={{
          display: 'block', margin: '18px auto 0',
          maxWidth: 320, padding: '12px 20px', textAlign: 'center',
          background: accent, color: 'white', borderRadius: 10,
          fontSize: 14, fontWeight: 800,
          boxShadow: `0 8px 20px ${accent}50`,
        }}
      >
        ✓ A1 retenu (regret max = 30)
      </motion.div>
    </div>
  )
}

/* ============ 7 — HURWICZ ============ */

function HurwiczScene({ accent }) {
  const alpha = 0.6
  const hurwiczValues = GAINS.map((row, i) => alpha * ROW_MAX[i] + (1 - alpha) * ROW_MIN[i])
  const winner = hurwiczValues.indexOf(Math.max(...hurwiczValues))

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 8, textAlign: 'center' }}>
        CRITÈRE DE HURWICZ — α = 0,6 (optimisme modéré)
      </div>
      <div style={{ fontSize: 12, color: '#6B6B8A', textAlign: 'center', marginBottom: 14, maxWidth: 580, margin: '0 auto 14px' }}>
        H(A) = α × max(A) + (1 − α) × min(A) — compromis paramétré entre optimisme et pessimisme.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18, maxWidth: 720, margin: '0 auto', alignItems: 'flex-start' }}>
        {/* Table avec calcul */}
        <div style={{
          background: 'white', borderRadius: 12, overflow: 'hidden',
          border: '1px solid rgba(26,26,46,0.08)',
          fontFeatureSettings: '"tnum"',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px 1fr 60px', background: `${accent}10` }}>
            {['Strat.', 'min', 'max', 'H = 0,6·max + 0,4·min', 'H(A)'].map((h, i) => (
              <div key={h} style={{
                padding: '12px 6px', fontSize: 9, fontWeight: 800,
                color: i === 4 ? 'white' : accent,
                background: i === 4 ? accent : 'transparent',
                textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {h}
              </div>
            ))}
          </div>
          {STRATS.map((s, i) => {
            const isWinner = i === winner
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  display: 'grid', gridTemplateColumns: '50px 50px 50px 1fr 60px',
                  background: isWinner ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                  borderTop: '1px solid rgba(0,0,0,0.04)',
                  borderLeft: isWinner ? `3px solid ${accent}` : '3px solid transparent',
                }}
              >
                <div style={{ padding: '14px 6px', textAlign: 'center', fontWeight: 800, color: isWinner ? accent : COLORS[i] }}>
                  {s}
                </div>
                <div style={{ padding: '14px 6px', textAlign: 'center', fontWeight: 600, color: '#1a1a2e' }}>{ROW_MIN[i]}</div>
                <div style={{ padding: '14px 6px', textAlign: 'center', fontWeight: 600, color: '#1a1a2e' }}>{ROW_MAX[i]}</div>
                <div style={{ padding: '14px 6px', textAlign: 'center', fontSize: 11, color: '#6B6B8A', fontVariantNumeric: 'tabular-nums' }}>
                  0,6×{ROW_MAX[i]} + 0,4×{ROW_MIN[i]}
                </div>
                <div style={{
                  padding: '14px 6px', textAlign: 'center',
                  background: isWinner ? `${accent}25` : `${accent}08`,
                  fontWeight: 800, fontSize: 17,
                  color: isWinner ? accent : '#1a1a2e',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    style={{ display: 'inline-block' }}
                  >
                    {hurwiczValues[i]}
                  </motion.span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sensibilité à alpha */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            background: `${accent}08`, border: `1.5px solid ${accent}30`,
            borderRadius: 12, padding: '16px',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: '0.1em', marginBottom: 10 }}>
            TEST DE ROBUSTESSE
          </div>
          <div style={{ fontSize: 11, color: '#6B6B8A', marginBottom: 12, lineHeight: 1.5 }}>
            La décision change selon α :
          </div>
          {[
            { a: 0, lbl: 'α = 0 (Wald)', winner: 'A3' },
            { a: 0.4, lbl: 'α = 0,4', winner: 'A3' },
            { a: 0.6, lbl: 'α = 0,6', winner: 'A2' },
            { a: 1, lbl: 'α = 1 (Maximax)', winner: 'A2' },
          ].map((s, i) => (
            <div key={s.a} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '6px 10px', borderRadius: 6,
              background: s.a === 0.6 ? `${accent}20` : 'transparent',
              marginBottom: 3, fontSize: 11,
              border: s.a === 0.6 ? `1px solid ${accent}40` : '1px solid transparent',
            }}>
              <span style={{ color: '#1a1a2e', fontWeight: s.a === 0.6 ? 700 : 500 }}>{s.lbl}</span>
              <span style={{ fontWeight: 800, color: s.a === 0.6 ? accent : '#1a1a2e' }}>→ {s.winner}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ============ 8 — SYNTHESE ============ */

function SyntheseScene({ accent }) {
  const results = [
    { crit: 'Wald', winner: 'A3', mood: 'Pessimiste', color: '#6366F1' },
    { crit: 'Maximax', winner: 'A2', mood: 'Optimiste', color: '#10B981' },
    { crit: 'Laplace', winner: 'A1 ou A3', mood: 'Équiprobable', color: '#0EA5E9' },
    { crit: 'Savage', winner: 'A1', mood: 'Anti-regret', color: '#EC4899' },
    { crit: 'Hurwicz 0,6', winner: 'A2', mood: 'Compromis', color: accent },
  ]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '20px 16px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: 6, letterSpacing: '-0.02em' }}>
        Aucune réponse universelle
      </div>
      <div style={{ fontSize: 13, color: '#6B6B8A', textAlign: 'center', marginBottom: 22, maxWidth: 540, margin: '0 auto 22px' }}>
        Chaque critère reflète une politique de risque. Le choix du critère est lui-même un acte de management.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, maxWidth: 720, margin: '0 auto' }}>
        {results.map((r, i) => (
          <motion.div
            key={r.crit}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: 'white', borderRadius: 10, padding: '14px 8px',
              textAlign: 'center', borderTop: `3px solid ${r.color}`,
              boxShadow: `0 2px 8px ${r.color}20`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: r.color, letterSpacing: '0.08em', marginBottom: 6 }}>
              {r.crit.toUpperCase()}
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
              {r.winner}
            </div>
            <div style={{ fontSize: 10, color: '#6B6B8A' }}>{r.mood}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
