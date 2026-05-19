import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée — module "mpm" (Méthode des Potentiels METRA)
 * 8 slides · ≈ 2 min 10
 */

export const mpmLesson = {
  title: 'Construire le graphe MPM et son chemin critique',
  totalDuration: '≈ 2 min 10',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 11,
      title: 'Le défi de la planification',
      narration: "Vous lancez un projet de 10 tâches. Certaines en parallèle, d'autres en séquence. Combien de jours au total ? Quelles tâches surveiller en priorité ? Bernard Roy a développé en 1970 la méthode des Potentiels METRA pour répondre rigoureusement à ces questions.",
    },
    {
      id: 'taches',
      visualStage: 2,
      duration: 16,
      title: 'Le tableau des tâches',
      narration: "Tout commence par recenser les tâches, estimer leurs durées, et identifier les antériorités — quelle tâche doit être terminée avant qu'une autre puisse commencer. 10 tâches au total, durées de 1 à 4 jours, avec des dépendances multiples.",
    },
    {
      id: 'niveaux',
      visualStage: 3,
      duration: 14,
      title: 'Les niveaux topologiques',
      narration: "Les tâches sans antériorité forment le niveau zéro. Celles dont les antécédentes sont au niveau zéro forment le niveau un, et ainsi de suite. Ce classement garantit que les calculs de dates se feront dans le bon ordre.",
    },
    {
      id: 'graphe',
      visualStage: 4,
      duration: 16,
      title: 'Construction du graphe',
      narration: "Chaque tâche devient un nœud du graphe. Les flèches matérialisent les antériorités. On ajoute un nœud Début à gauche et un nœud Fin à droite. Le réseau est désormais lisible — on peut commencer les calculs de dates.",
    },
    {
      id: 'dto',
      visualStage: 5,
      duration: 18,
      title: 'Passe avant — calcul des DTO',
      narration: "On parcourt le graphe de gauche à droite. DTO d'une tâche égale le MAX des DTO précédentes plus leur durée. La tâche ne peut commencer qu'une fois toutes ses antécédentes terminées — d'où le MAX, qui prend la contrainte la plus serrée.",
    },
    {
      id: 'dta',
      visualStage: 6,
      duration: 16,
      title: 'Passe arrière — calcul des DTA',
      narration: "On parcourt cette fois de droite à gauche, depuis la fin du projet. DTA d'une tâche égale le MIN des DTA suivantes moins sa propre durée. La tâche doit être terminée avant la première date au plus tard de ses successeurs — d'où le MIN.",
    },
    {
      id: 'critique',
      visualStage: 7,
      duration: 16,
      title: 'Le chemin critique',
      narration: "Marge = DTA − DTO. Quand la marge est nulle, la tâche est critique — aucune latitude possible. Sept tâches forment le chemin critique de bout en bout : Début, A, C, F, G, I, J, Fin. Tout retard sur ce chemin retarde le projet entier.",
    },
    {
      id: 'pilotage',
      visualStage: 8,
      duration: 13,
      title: 'Pilotage par le chemin critique',
      narration: "Le chef de projet concentre son attention sur les tâches à marge nulle. Pour raccourcir le projet, il faut accélérer une tâche critique — accélérer une non-critique consomme sa marge sans gagner un jour. Le chemin critique est le levier opérationnel central.",
    },
  ],
}

/* ============================================================
   DONNÉES — 10 tâches avec leurs antériorités et durées
   ============================================================ */

const TACHES = [
  { id: 'A', dur: 4, ant: [], dto: 0, dta: 0 },
  { id: 'B', dur: 2, ant: [], dto: 0, dta: 4 },
  { id: 'C', dur: 1, ant: ['A'], dto: 4, dta: 4 },
  { id: 'D', dur: 1, ant: ['A', 'B'], dto: 4, dta: 6 },
  { id: 'E', dur: 2, ant: ['A'], dto: 4, dta: 6 },
  { id: 'F', dur: 2, ant: ['C'], dto: 5, dta: 5 },
  { id: 'G', dur: 2, ant: ['D', 'F'], dto: 7, dta: 7 },
  { id: 'H', dur: 1, ant: ['E'], dto: 6, dta: 8 },
  { id: 'I', dur: 4, ant: ['G', 'H'], dto: 9, dta: 9 },
  { id: 'J', dur: 1, ant: ['I'], dto: 13, dta: 13 },
]

const CRITIQUE = ['A', 'C', 'F', 'G', 'I', 'J']  // tâches à marge nulle
const DUREE_PROJET = 14

// Positions dans le graphe (calculées pour un viewBox 760x300)
const NODE_POS = {
  Debut: { x: 60, y: 150 },
  A: { x: 170, y: 80 },
  B: { x: 170, y: 220 },
  C: { x: 270, y: 50 },
  D: { x: 270, y: 145 },
  E: { x: 270, y: 240 },
  F: { x: 370, y: 50 },
  H: { x: 370, y: 240 },
  G: { x: 460, y: 100 },
  I: { x: 550, y: 150 },
  J: { x: 640, y: 150 },
  Fin: { x: 720, y: 150 },
}

const LINKS = [
  ['Debut', 'A'], ['Debut', 'B'],
  ['A', 'C'], ['A', 'D'], ['A', 'E'],
  ['B', 'D'],
  ['C', 'F'], ['D', 'G'], ['E', 'H'],
  ['F', 'G'], ['G', 'I'], ['H', 'I'],
  ['I', 'J'], ['J', 'Fin'],
]

/* ============================================================
   VISUAL — Routeur
   ============================================================ */

export function MpmVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage === 2) return <TachesScene accent={accent} progress={progress} />
  if (stage === 3) return <NiveauxScene accent={accent} />
  if (stage === 4) return <GrapheScene accent={accent} mode="empty" />
  if (stage === 5) return <GrapheScene accent={accent} mode="dto" progress={progress} />
  if (stage === 6) return <GrapheScene accent={accent} mode="dta" />
  if (stage === 7) return <GrapheScene accent={accent} mode="critical" />
  return <GrapheScene accent={accent} mode="pilotage" />
}

/* ============ 1 — INTRO ============ */

function IntroScene({ accent }) {
  return (
    <div style={{ width: '100%', padding: '20px 4px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', marginBottom: 8, letterSpacing: '-0.02em' }}
      >
        10 tâches. Combien de jours ?
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 13, color: '#6B6B8A', marginBottom: 24 }}
      >
        Et lesquelles surveiller en priorité ?
      </motion.div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {TACHES.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              padding: '10px 14px', borderRadius: 10,
              background: 'white',
              border: `2px solid ${accent}30`,
              fontSize: 14, fontWeight: 800, color: accent,
              boxShadow: `0 2px 8px ${accent}20`,
              minWidth: 50, textAlign: 'center',
            }}
          >
            {t.id}
            <div style={{ fontSize: 10, fontWeight: 600, color: '#6B6B8A', marginTop: 2 }}>
              {t.dur}j
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: 24, padding: '12px 18px', maxWidth: 460,
          margin: '24px auto 0', background: `${accent}10`,
          borderRadius: 10, fontSize: 12, color: '#1a1a2e',
        }}
      >
        Bernard <strong>ROY</strong>, 1970 · Méthode des Potentiels <strong>METRA</strong>
      </motion.div>
    </div>
  )
}

/* ============ 2 — TABLEAU TÂCHES ============ */

function TachesScene({ accent, progress }) {
  const activeIdx = Math.min(TACHES.length - 1, Math.floor(progress / 12))
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10, textAlign: 'center' }}>
        DÉCOMPOSITION DU PROJET
      </div>
      <div style={{
        background: 'white', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(26,26,46,0.08)',
        maxWidth: 540, margin: '0 auto',
        fontFeatureSettings: '"tnum"',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '70px 90px 1fr', background: `${accent}10` }}>
          {['Tâche', 'Durée (j)', 'Antériorités'].map(h => (
            <div key={h} style={{ padding: '10px 8px', fontSize: 10, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
        {TACHES.map((t, i) => {
          const active = i === activeIdx
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i <= activeIdx ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid', gridTemplateColumns: '70px 90px 1fr',
                background: active ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                borderTop: '1px solid rgba(0,0,0,0.04)',
                borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ padding: '10px 8px', textAlign: 'center' }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 6,
                  background: accent, color: 'white', fontSize: 12, fontWeight: 800,
                }}>
                  {t.id}
                </span>
              </div>
              <div style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 700, color: '#1a1a2e' }}>{t.dur}</div>
              <div style={{ padding: '10px 8px', textAlign: 'center', fontSize: 13, color: t.ant.length ? '#1a1a2e' : '#9090b0', fontStyle: t.ant.length ? 'normal' : 'italic' }}>
                {t.ant.length ? t.ant.join(', ') : 'aucune (début)'}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ============ 3 — NIVEAUX TOPOLOGIQUES ============ */

function NiveauxScene({ accent }) {
  const niveaux = [
    { n: 0, tasks: ['A', 'B'] },
    { n: 1, tasks: ['C', 'D', 'E'] },
    { n: 2, tasks: ['F', 'H'] },
    { n: 3, tasks: ['G'] },
    { n: 4, tasks: ['I'] },
    { n: 5, tasks: ['J'] },
  ]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '14px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10, textAlign: 'center' }}>
        MATRICE DE NIVEAUX TOPOLOGIQUES
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 580, margin: '0 auto' }}>
        {niveaux.map((n, i) => (
          <motion.div
            key={n.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18, duration: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '10px 14px', borderRadius: 10,
              background: 'white', border: '1px solid rgba(26,26,46,0.08)',
            }}
          >
            <div style={{
              width: 44, height: 36, borderRadius: 8,
              background: `${accent}15`, color: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800,
            }}>
              N{n.n}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {n.tasks.map((tid, ti) => (
                <motion.div
                  key={tid}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.18 + ti * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    width: 38, height: 30, borderRadius: 7,
                    background: CRITIQUE.includes(tid) ? accent : '#9090b0',
                    color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800,
                  }}
                >
                  {tid}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          maxWidth: 520, margin: '14px auto 0', padding: '10px 16px',
          background: `${accent}10`, borderRadius: 8, textAlign: 'center',
          fontSize: 12, color: '#1a1a2e',
        }}
      >
        Ce classement garantit que les calculs DTO/DTA se feront dans le bon ordre.
      </motion.div>
    </div>
  )
}

/* ============ 4-8 — GRAPHE MPM (différents modes) ============ */

function GrapheScene({ accent, mode, progress = 0 }) {
  // Sub-progress dans la passe DTO : visualisation progressive
  const taskOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'G', 'I', 'J']
  const dtoIdx = mode === 'dto' ? Math.min(taskOrder.length, Math.floor(progress / 10)) : 999
  const isCriticalMode = mode === 'critical' || mode === 'pilotage'
  const showDTO = mode === 'dto' || mode === 'dta' || mode === 'critical' || mode === 'pilotage'
  const showDTA = mode === 'dta' || mode === 'critical' || mode === 'pilotage'
  const showCritical = mode === 'critical' || mode === 'pilotage'

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 8px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 8, textAlign: 'center' }}>
        {mode === 'empty' && 'GRAPHE MPM'}
        {mode === 'dto' && 'PASSE AVANT — DATES AU PLUS TÔT'}
        {mode === 'dta' && 'PASSE ARRIÈRE — DATES AU PLUS TARD'}
        {mode === 'critical' && 'CHEMIN CRITIQUE'}
        {mode === 'pilotage' && 'PILOTAGE PAR LE CHEMIN CRITIQUE'}
      </div>

      <svg viewBox="0 0 800 300" width="100%" style={{ maxWidth: 800, display: 'block', margin: '0 auto' }}>
        <defs>
          <marker id="mpm-arrow-grey" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C4C4D8" />
          </marker>
          <marker id="mpm-arrow-critical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>

        {/* Liens */}
        {LINKS.map(([from, to], i) => {
          const a = NODE_POS[from]; const b = NODE_POS[to]
          const isCritLink = showCritical && (
            (from === 'Debut' && to === 'A') ||
            (CRITIQUE.includes(from) && CRITIQUE.includes(to)) ||
            (from === 'J' && to === 'Fin')
          )
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x + 24} y1={a.y} x2={b.x - 26} y2={b.y}
              stroke={isCritLink ? accent : '#C4C4D8'}
              strokeWidth={isCritLink ? 2.5 : 1.5}
              markerEnd={`url(#mpm-arrow-${isCritLink ? 'critical' : 'grey'})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.5 }}
            />
          )
        })}

        {/* Nœuds Début / Fin */}
        {['Debut', 'Fin'].map((id, i) => {
          const pos = NODE_POS[id]
          return (
            <motion.g
              key={id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              <circle cx={pos.x} cy={pos.y} r="22" fill={showCritical ? accent : '#9090b0'} stroke="white" strokeWidth="2" />
              <text x={pos.x} y={pos.y + 4} fontSize="10" fontWeight="800" fill="white" textAnchor="middle">
                {id === 'Debut' ? 'Début' : 'Fin'}
              </text>
            </motion.g>
          )
        })}

        {/* Nœuds tâches */}
        {TACHES.map((t, i) => {
          const pos = NODE_POS[t.id]
          const isCrit = CRITIQUE.includes(t.id)
          const orderIdx = taskOrder.indexOf(t.id)
          const dtoVisible = mode !== 'empty' && (mode === 'dto' ? orderIdx <= dtoIdx - 1 : true)

          return (
            <motion.g
              key={t.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              <rect
                x={pos.x - 26} y={pos.y - 22} width="52" height="44" rx="9"
                fill={showCritical && isCrit ? `${accent}15` : 'white'}
                stroke={showCritical && isCrit ? accent : '#D0D0E8'}
                strokeWidth={showCritical && isCrit ? 2.5 : 1.5}
              />
              <text x={pos.x} y={pos.y - 6} fontSize="13" fontWeight="800"
                fill={showCritical && isCrit ? accent : '#1a1a2e'} textAnchor="middle">
                {t.id}
              </text>
              <text x={pos.x} y={pos.y + 6} fontSize="9" fill="#6B6B8A" textAnchor="middle">
                {t.dur}j
              </text>

              {/* DTO */}
              <AnimatePresence>
                {showDTO && dtoVisible && (
                  <motion.g
                    key="dto"
                    initial={{ opacity: 0, scale: 0, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <text x={pos.x - 20} y={pos.y + 18} fontSize="9" fontWeight="800" fill="#10B981" textAnchor="middle">
                      {t.dto}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* DTA */}
              <AnimatePresence>
                {showDTA && (
                  <motion.g
                    key="dta"
                    initial={{ opacity: 0, scale: 0, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <text x={pos.x + 20} y={pos.y + 18} fontSize="9" fontWeight="800" fill="#EF4444" textAnchor="middle">
                      {t.dta}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          )
        })}

        {/* Légende DTO/DTA pour stage 5-7 */}
        {(mode === 'dto' || mode === 'dta' || mode === 'critical') && (
          <g transform="translate(20, 270)">
            <circle cx="6" cy="6" r="4" fill="#10B981" />
            <text x="16" y="10" fontSize="10" fill="#6B6B8A">DTO (au plus tôt)</text>
            <circle cx="130" cy="6" r="4" fill="#EF4444" />
            <text x="140" y="10" fontSize="10" fill="#6B6B8A">DTA (au plus tard)</text>
            {showCritical && (
              <>
                <rect x="256" y="2" width="14" height="8" rx="2" fill={accent} />
                <text x="276" y="10" fontSize="10" fill="#6B6B8A">Chemin critique</text>
              </>
            )}
          </g>
        )}

        {/* Annotation chemin critique pour stage 7-8 */}
        {(mode === 'critical' || mode === 'pilotage') && (
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <rect x="560" y="220" width="220" height="70" rx="10" fill="white" stroke={accent} strokeWidth="1.5" />
            <rect x="560" y="220" width="220" height="4" rx="2" fill={accent} />
            <text x="572" y="244" fontSize="10" fontWeight="800" fill={accent} style={{ letterSpacing: '0.08em' }}>
              DURÉE TOTALE
            </text>
            <text x="572" y="270" fontSize="22" fontWeight="800" fill="#1a1a2e">
              {DUREE_PROJET} jours
            </text>
            <text x="700" y="270" fontSize="10" fill="#6B6B8A">via 7 tâches critiques</text>
          </motion.g>
        )}
      </svg>

      {/* Hint pédagogique stage 5-6 */}
      {mode === 'dto' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            maxWidth: 540, margin: '8px auto 0', padding: '10px 16px',
            background: '#10B98115', borderRadius: 8,
            fontSize: 12, color: '#1a1a2e', textAlign: 'center',
          }}
        >
          DTO(j) = MAX&#123; DTO(i) + durée(i) &#125; pour <strong>i précédant j</strong>
        </motion.div>
      )}
      {mode === 'dta' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            maxWidth: 540, margin: '8px auto 0', padding: '10px 16px',
            background: '#EF444415', borderRadius: 8,
            fontSize: 12, color: '#1a1a2e', textAlign: 'center',
          }}
        >
          DTA(i) = MIN&#123; DTA(j) − durée(i) &#125; pour <strong>j succédant à i</strong>
        </motion.div>
      )}
      {mode === 'critical' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            maxWidth: 580, margin: '8px auto 0', padding: '10px 16px',
            background: `${accent}10`, borderRadius: 8,
            fontSize: 12, color: '#1a1a2e', textAlign: 'center',
          }}
        >
          <strong>Marge = DTA − DTO</strong> · Marge nulle = tâche critique. Chemin : Début → A → C → F → G → I → J → Fin
        </motion.div>
      )}
      {mode === 'pilotage' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            maxWidth: 560, margin: '8px auto 0', padding: '12px 18px',
            background: `${accent}10`, borderRadius: 10,
            fontSize: 12, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.55,
          }}
        >
          <strong>Pour raccourcir le projet</strong>, n'agir que sur les tâches critiques (en couleur). <br/>
          B, D, E, H ont une marge → tampon pour absorber les aléas.
        </motion.div>
      )}
    </div>
  )
}
