import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée pour le module "diagnostic" (matrice BCG)
 * 8 slides progressives — durée totale ≈ 2 min 15
 */

export const diagnosticLesson = {
  title: 'La matrice BCG, construite pas à pas',
  totalDuration: '≈ 2 min 15',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 11,
      title: '4 activités, 4 destins',
      narration: "Vous êtes le dirigeant. Quatre domaines d'activité, des performances inégales. Sur lesquels miser ? Lesquels abandonner ? La matrice BCG va répondre — et vous allez assister à sa construction réelle, à partir des chiffres bruts.",
    },
    {
      id: 'data',
      visualStage: 2,
      duration: 16,
      title: 'Les données brutes',
      narration: "Tout commence par les chiffres. Pour chaque DAS, vous notez votre chiffre d'affaires, celui du leader du marché, et le CA du marché total sur deux années consécutives. Voilà votre matière première — ces 16 nombres contiennent toute la stratégie.",
    },
    {
      id: 'pdmr',
      visualStage: 3,
      duration: 20,
      title: 'Calcul 1 — Part de marché relative',
      narration: "Premier indicateur : la Part de Marché Relative. Formule simple — votre CA divisé par celui du leader. DAS A : 120 sur 67 égale 1,8 — vous êtes leader. DAS C : 60 sur 150 égale 0,4 — vous êtes loin derrière. Regardez la colonne PDMr se remplir.",
    },
    {
      id: 'growth',
      visualStage: 4,
      duration: 18,
      title: 'Calcul 2 — Taux de croissance',
      narration: "Second indicateur : le taux de croissance du marché. Variation du CA marché divisée par CA marché de l'année précédente. DAS A : marché qui passe de 200 à 236, soit 18 %. DAS D : à peine 2 % — secteur stagnant. C'est cette dynamique qui détermine les besoins en cash.",
    },
    {
      id: 'matrix-empty',
      visualStage: 5,
      duration: 14,
      title: 'La matrice prend forme',
      narration: "Avec ces deux indicateurs en main, on dresse la matrice. Axe horizontal : la PDMr — gauche = leader, droite = challenger. Axe vertical : la croissance — haut = marché dynamique, bas = mature. L'intersection produit quatre quadrants stratégiques distincts.",
    },
    {
      id: 'das-a',
      visualStage: 6,
      duration: 18,
      title: 'DAS A se positionne — Vedette',
      narration: "DAS A : PDMr de 1,8 — on glisse à gauche, vous êtes leader. Croissance de 18 % — en haut, marché dynamique. Position finale : quadrant Vedette. Activité prometteuse qui consomme du cash pour défendre son leadership, mais en génère aussi en croissance.",
    },
    {
      id: 'das-bcd',
      visualStage: 7,
      duration: 22,
      title: 'B, C, D prennent place',
      narration: "DAS B : leader sur marché mature, c'est votre Vache à lait — la pompe à cash du groupe. DAS C : marché dynamique mais position faible, c'est un Dilemme — investir massivement ou se retirer. DAS D : marché stagnant et position faible, Poids mort à céder.",
    },
    {
      id: 'synthesis',
      visualStage: 8,
      duration: 16,
      title: 'Lecture stratégique',
      narration: "Votre portefeuille est équilibré : la Vache à lait B finance le Dilemme C, qui deviendra demain la prochaine Vedette. Le Poids mort D doit être cédé pour libérer du capital. La BCG ne décide pas pour vous — elle structure votre décision en transformant 16 chiffres en 4 stratégies claires.",
    },
  ],
}

/* ============================================================
   DONNÉES DE L'EXEMPLE
   ============================================================ */

const DAS = [
  { id: 'A', ca: 120, caLeader: 67,  caN1: 200, caN: 236, pdmr: 1.8, croi: 18, color: '#10B981', label: 'Vedette' },
  { id: 'B', ca: 220, caLeader: 100, caN1: 480, caN: 500, pdmr: 2.2, croi: 4,  color: '#6366F1', label: 'Vache à lait' },
  { id: 'C', ca: 60,  caLeader: 150, caN1: 130, caN: 150, pdmr: 0.4, croi: 15, color: '#F59E0B', label: 'Dilemme' },
  { id: 'D', ca: 18,  caLeader: 60,  caN1: 102, caN: 104, pdmr: 0.3, croi: 2,  color: '#EF4444', label: 'Poids mort' },
]

/* ============================================================
   VISUAL — Routeur de scènes
   ============================================================ */

export function DiagnosticVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage <= 4) return <DataScene stage={stage} accent={accent} progress={progress} />
  return <MatrixScene stage={stage} accent={accent} progress={progress} />
}

/* ============================================================
   SCENE 1 — INTRO
   ============================================================ */

function IntroScene({ accent }) {
  return (
    <div style={{ width: '100%', padding: '20px 4px', textAlign: 'center' }}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', margin: '0 0 8px', letterSpacing: '-0.02em' }}
      >
        4 activités. Lesquelles méritent vos capitaux ?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ fontSize: 14, color: '#6B6B8A', margin: '0 0 28px' }}
      >
        La matrice BCG vous donne une lecture stratégique en 4 quadrants.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {DAS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: 'white',
              border: `2px solid ${d.color}40`,
              borderRadius: 14,
              padding: '18px 12px',
              boxShadow: `0 4px 12px ${d.color}20`,
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${d.color}20`, border: `2px solid ${d.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px',
              fontSize: 18, fontWeight: 800, color: d.color,
            }}>
              {d.id}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e' }}>DAS {d.id}</div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
              style={{ fontSize: 28, fontWeight: 800, color: accent, marginTop: 6, lineHeight: 1 }}
            >
              ?
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   SCENE 2-4 — DATA TABLE + FORMULA (HTML pur, plus de sobreposition)
   ============================================================ */

function DataScene({ stage, accent, progress }) {
  const activeIdx = stage >= 3 ? Math.min(3, Math.floor(progress / 25)) : -1
  const showPdmr = stage >= 3
  const showCroi = stage >= 4

  const computeRowState = (idx) => {
    if (stage === 2) return 'visible'
    const stops = [0, 25, 50, 75, 100]
    if (progress < stops[idx]) return 'pending'
    if (progress >= stops[idx + 1]) return 'done'
    return 'active'
  }

  // Grid columns : largeurs explicites pour éviter sobreposition
  let cols = '44px minmax(70px, 1fr) minmax(70px, 1fr) minmax(90px, 1.1fr) minmax(80px, 1fr)'
  if (showPdmr) cols += ' minmax(70px, 1fr)'
  if (showCroi) cols += ' minmax(82px, 1fr)'

  const headerStyle = {
    fontSize: 10, fontWeight: 800, color: accent,
    textAlign: 'center', padding: '10px 6px',
    background: `${accent}10`, letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderBottom: `1.5px solid ${accent}25`,
  }

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: showCroi ? 'minmax(0, 1.55fr) minmax(0, 1fr)' : 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '24px',
        alignItems: 'flex-start',
      }}>

        {/* ===== TABLE DES DONNÉES ===== */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10 }}>
            DONNÉES DU PORTEFEUILLE
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: cols,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(26,26,46,0.08)',
            background: 'white',
            fontFeatureSettings: '"tnum"',
          }}>
            {/* HEADER */}
            <div style={headerStyle}>DAS</div>
            <div style={headerStyle}>CA</div>
            <div style={headerStyle}>Leader</div>
            <div style={headerStyle}>Marché N-1</div>
            <div style={headerStyle}>Marché N</div>
            {showPdmr && <div style={{ ...headerStyle, background: `${accent}20` }}>PDMr</div>}
            {showCroi && <div style={{ ...headerStyle, background: `${accent}20` }}>Croi.</div>}

            {/* DATA ROWS */}
            {DAS.map((d, i) => {
              const state = computeRowState(i)
              const isActive = state === 'active'
              const showValue = state === 'visible' || state === 'active' || state === 'done'
              const showComputed = (state === 'active' || state === 'done') && (showPdmr || showCroi)

              const cellBase = {
                padding: '14px 6px',
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 500,
                color: '#1a1a2e',
                background: isActive ? `${accent}18` : (i % 2 ? 'rgba(26,26,46,0.02)' : 'white'),
                borderTop: '1px solid rgba(26,26,46,0.04)',
                position: 'relative',
                transition: 'background 0.35s ease',
                fontVariantNumeric: 'tabular-nums',
              }

              return (
                <Fragment key={d.id}>
                  {/* DAS badge */}
                  <div style={{ ...cellBase, padding: '12px 4px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: 8,
                      background: d.color, color: 'white',
                      fontSize: 12, fontWeight: 800,
                      boxShadow: isActive ? `0 0 0 3px ${d.color}40` : 'none',
                      transition: 'box-shadow 0.35s ease',
                    }}>
                      {d.id}
                    </div>
                  </div>

                  <div style={cellBase}>{d.ca}</div>
                  <div style={cellBase}>{d.caLeader}</div>
                  <div style={cellBase}>{d.caN1}</div>
                  <div style={cellBase}>{d.caN}</div>

                  {showPdmr && (
                    <div style={{
                      ...cellBase,
                      background: isActive ? `${accent}25` : `${accent}06`,
                      fontWeight: 800,
                    }}>
                      <AnimatePresence mode="wait" initial={false}>
                        {showComputed ? (
                          <motion.span
                            key="v"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                            transition={{ duration: 0.55, times: [0, 0.6, 1], ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ color: accent, display: 'inline-block', fontSize: 15 }}
                          >
                            {d.pdmr}
                          </motion.span>
                        ) : (
                          <motion.span key="d" style={{ color: '#C4C4D8' }}>—</motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {showCroi && (
                    <div style={{
                      ...cellBase,
                      background: isActive ? `${accent}25` : `${accent}06`,
                      fontWeight: 800,
                    }}>
                      <AnimatePresence mode="wait" initial={false}>
                        {showComputed ? (
                          <motion.span
                            key="v"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                            transition={{ duration: 0.55, times: [0, 0.6, 1], ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ color: accent, display: 'inline-block', fontSize: 15 }}
                          >
                            {d.croi}%
                          </motion.span>
                        ) : (
                          <motion.span key="d" style={{ color: '#C4C4D8' }}>—</motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

          {/* Indicateur de progression au-dessous de la table en stage 3-4 */}
          {(stage === 3 || stage === 4) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 11, color: '#6B6B8A' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {DAS.map((d, i) => (
                  <div
                    key={d.id}
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i <= activeIdx ? d.color : 'rgba(26,26,46,0.10)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              <span>Calcul en cours · {activeIdx + 1}/4</span>
            </div>
          )}
        </div>

        {/* ===== FORMULE CARD (très dynamique) ===== */}
        {(showPdmr || showCroi) && activeIdx >= 0 && (
          <FormulaCard
            key={`formula-${stage}-${activeIdx}`}
            stage={stage}
            accent={accent}
            d={DAS[activeIdx]}
          />
        )}

        {/* Slide 2 : affichage simple en lieu de la formule */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{
              background: 'white',
              border: `1.5px solid ${accent}30`,
              borderRadius: 14,
              padding: '24px 22px',
              boxShadow: `0 4px 20px ${accent}10`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 14 }}>
              POINT DE DÉPART
            </div>
            <div style={{ fontSize: 56, fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: '-0.03em' }}>
              16
            </div>
            <div style={{ fontSize: 13, color: '#6B6B8A', marginTop: 8, lineHeight: 1.6 }}>
              chiffres bruts qui vont devenir <br/>
              <strong style={{ color: '#1a1a2e' }}>4 décisions stratégiques</strong>
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {DAS.map(d => (
                <div key={d.id} style={{
                  width: 32, height: 4, borderRadius: 2, background: d.color,
                }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function FormulaCard({ stage, accent, d }) {
  const isPdmr = stage === 3
  const result = isPdmr ? d.pdmr : `${d.croi}%`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        boxShadow: [
          `0 0 0 6px ${d.color}40`,
          `0 0 0 0 ${d.color}00`,
          `0 8px 24px ${accent}20`,
        ],
      }}
      transition={{
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
        boxShadow: { duration: 0.9, times: [0, 0.5, 1] },
      }}
      style={{
        background: 'white',
        border: `1.5px solid ${accent}30`,
        borderRadius: 14,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bandeau coloré du DAS courant en haut */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 4, background: d.color,
          transformOrigin: 'left',
        }}
      />

      <div style={{
        fontSize: 11, fontWeight: 800, color: accent,
        letterSpacing: '0.12em', textAlign: 'center', marginBottom: 14,
      }}>
        {isPdmr ? 'FORMULE PDMr' : 'TAUX DE CROISSANCE'}
      </div>

      {/* Formule générique */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        {isPdmr ? (
          <>
            <div style={{ fontSize: 12, color: '#6B6B8A', marginBottom: 4 }}>PDMr =</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>CA entreprise</div>
            <div style={{ borderTop: '1.5px solid #1a1a2e', margin: '5px auto', width: '60%' }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>CA leader</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>CAₙ − CAₙ₋₁</div>
            <div style={{ borderTop: '1.5px solid #1a1a2e', margin: '5px auto', width: '60%' }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>CAₙ₋₁</div>
          </>
        )}
      </div>

      {/* Séparateur */}
      <div style={{ borderTop: `1px dashed ${accent}40`, margin: '14px 0' }} />

      {/* Application au DAS courant */}
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: d.color, color: 'white',
            padding: '5px 14px', borderRadius: 999,
            fontSize: 12, fontWeight: 800, marginBottom: 14,
            boxShadow: `0 4px 12px ${d.color}50`,
          }}
        >
          DAS {d.id} · {d.label}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            fontSize: 22, fontWeight: 700, color: '#1a1a2e',
            marginBottom: 10, fontVariantNumeric: 'tabular-nums',
          }}
        >
          {isPdmr ? (
            <>{d.ca} <span style={{ color: '#9090b0' }}>÷</span> {d.caLeader}</>
          ) : (
            <>({d.caN} − {d.caN1}) <span style={{ color: '#9090b0' }}>÷</span> {d.caN1}</>
          )}
        </motion.div>

        <div style={{ fontSize: 16, color: '#6B6B8A', marginBottom: 2 }}>=</div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: 1 }}
          transition={{
            duration: 0.7,
            times: [0, 0.55, 1],
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            fontSize: 44, fontWeight: 800, color: d.color,
            lineHeight: 1, letterSpacing: '-0.02em',
          }}
        >
          {result}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ============================================================
   SCENE 5-8 — MATRIX (SVG)
   ============================================================ */

const MW = 760
const MH = 380
const M_PAD_L = 70
const M_PAD_R = 200
const M_PAD_T = 30
const M_PAD_B = 60
const PLOT_W = MW - M_PAD_L - M_PAD_R
const PLOT_H = MH - M_PAD_T - M_PAD_B

const X_MIN = -1
const X_MAX = 0.5
const xScale = (pdmr) => {
  const v = Math.log10(Math.max(0.1, pdmr))
  return M_PAD_L + (1 - (v - X_MIN) / (X_MAX - X_MIN)) * PLOT_W
}
const yScale = (taux) => M_PAD_T + (1 - taux / 20) * PLOT_H
const rScale = (ca) => Math.max(14, Math.sqrt(ca / 635) * 36)

const X_MID = xScale(1)
const Y_MID = yScale(12)

function MatrixScene({ stage, accent, progress }) {
  let visibleCount = 0
  if (stage === 6) visibleCount = 1
  if (stage === 7) {
    if (progress < 33) visibleCount = 2
    else if (progress < 66) visibleCount = 3
    else visibleCount = 4
  }
  if (stage === 8) visibleCount = 4

  const visibleDAS = DAS.slice(0, visibleCount)
  const showArrows = stage === 8

  return (
    <svg viewBox={`0 0 ${MW} ${MH}`} width="100%" style={{ maxWidth: '780px', display: 'block' }}>
      <defs>
        <marker id="diag-cash-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a2e" />
        </marker>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <rect x={M_PAD_L} y={M_PAD_T} width={X_MID - M_PAD_L} height={Y_MID - M_PAD_T} fill="rgba(16,185,129,0.10)" />
        <rect x={X_MID} y={M_PAD_T} width={MW - M_PAD_R - X_MID} height={Y_MID - M_PAD_T} fill="rgba(245,158,11,0.10)" />
        <rect x={M_PAD_L} y={Y_MID} width={X_MID - M_PAD_L} height={MH - M_PAD_B - Y_MID} fill="rgba(99,102,241,0.10)" />
        <rect x={X_MID} y={Y_MID} width={MW - M_PAD_R - X_MID} height={MH - M_PAD_B - Y_MID} fill="rgba(239,68,68,0.10)" />

        <text x={M_PAD_L + 14} y={M_PAD_T + 22} fontSize="12" fontWeight="700" fill="rgba(16,185,129,0.85)">Vedettes</text>
        <text x={X_MID + 14} y={M_PAD_T + 22} fontSize="12" fontWeight="700" fill="rgba(245,158,11,0.85)">Dilemmes</text>
        <text x={M_PAD_L + 14} y={MH - M_PAD_B - 12} fontSize="12" fontWeight="700" fill="rgba(99,102,241,0.85)">Vaches à lait</text>
        <text x={X_MID + 14} y={MH - M_PAD_B - 12} fontSize="12" fontWeight="700" fill="rgba(239,68,68,0.85)">Poids morts</text>
      </motion.g>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <line x1={M_PAD_L} y1={MH - M_PAD_B} x2={MW - M_PAD_R} y2={MH - M_PAD_B} stroke="#333" strokeWidth="1.5" />
        <line x1={M_PAD_L} y1={M_PAD_T} x2={M_PAD_L} y2={MH - M_PAD_B} stroke="#333" strokeWidth="1.5" />
        <line x1={X_MID} y1={M_PAD_T} x2={X_MID} y2={MH - M_PAD_B} stroke="#999" strokeDasharray="4 4" strokeWidth="1" />
        <line x1={M_PAD_L} y1={Y_MID} x2={MW - M_PAD_R} y2={Y_MID} stroke="#999" strokeDasharray="4 4" strokeWidth="1" />

        {[2, 1, 0.5].map(v => (
          <text key={v} x={xScale(v)} y={MH - M_PAD_B + 16} fontSize="10" fill="#6B6B8A" textAnchor="middle">{v}x</text>
        ))}
        {[0, 10, 20].map(v => (
          <text key={v} x={M_PAD_L - 8} y={yScale(v) + 4} fontSize="10" fill="#6B6B8A" textAnchor="end">{v}%</text>
        ))}
        <text x={(M_PAD_L + MW - M_PAD_R) / 2} y={MH - 14} fontSize="11" fontWeight="600" fill="#1a1a2e" textAnchor="middle">
          ← Part de marché relative
        </text>
        <text x={20} y={MH / 2} fontSize="11" fontWeight="600" fill="#1a1a2e" textAnchor="middle" transform={`rotate(-90, 20, ${MH / 2})`}>
          Croissance du marché
        </text>
      </motion.g>

      {visibleDAS.map((d, i) => {
        const cx = xScale(d.pdmr)
        const cy = yScale(d.croi)
        const r = rScale(d.ca)
        const isLatest = i === visibleDAS.length - 1
        const isPulsing = isLatest && stage !== 8

        return (
          <motion.g
            key={d.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {isPulsing && (
              <motion.circle
                cx={cx} cy={cy} r={r + 6} fill="none" stroke={d.color} strokeWidth="2.5"
                animate={{ r: [r, r + 16, r], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
            <circle cx={cx} cy={cy} r={r} fill={d.color} opacity={isLatest && stage !== 8 ? 0.95 : 0.78} stroke="white" strokeWidth="2.5" />
            <text x={cx} y={cy + 5} fontSize="14" fontWeight="800" fill="white" textAnchor="middle">{d.id}</text>
            {/* Label "Vedette"/"Vache à lait"/etc affiché uniquement pour le cercle qui vient d'arriver
                (stages 6-7), pour éviter la répétition avec le label de quadrant au stage 8 final */}
            {isLatest && stage !== 8 && (
              <text x={cx} y={cy + r + 16} fontSize="10" fontWeight="700" fill={d.color} textAnchor="middle">
                {d.label}
              </text>
            )}
          </motion.g>
        )
      })}

      {(stage === 6 || stage === 7) && visibleDAS.length > 0 && (() => {
        const d = visibleDAS[visibleDAS.length - 1]
        const px = MW - M_PAD_R + 8
        const py = 80
        return (
          <motion.g key={`anno-${d.id}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <rect x={px} y={py} width="180" height="170" rx="12" fill="white" stroke={`${d.color}40`} strokeWidth="1.5" />
            <rect x={px} y={py} width="180" height="4" rx="2" fill={d.color} />
            <text x={px + 14} y={py + 28} fontSize="13" fontWeight="800" fill={d.color}>
              DAS {d.id} — {d.label}
            </text>

            <text x={px + 14} y={py + 56} fontSize="10" fontWeight="700" fill="#6B6B8A" style={{ letterSpacing: '0.06em' }}>
              PDMr
            </text>
            <text x={px + 14} y={py + 76} fontSize="20" fontWeight="800" fill="#1a1a2e">
              {d.pdmr}x
            </text>
            <text x={px + 14} y={py + 92} fontSize="10" fill="#6B6B8A">
              {d.pdmr >= 1 ? 'Leader →' : 'Challenger →'} <tspan fontWeight="600">{d.pdmr >= 1 ? 'gauche' : 'droite'}</tspan>
            </text>

            <text x={px + 14} y={py + 116} fontSize="10" fontWeight="700" fill="#6B6B8A" style={{ letterSpacing: '0.06em' }}>
              CROISSANCE
            </text>
            <text x={px + 14} y={py + 136} fontSize="20" fontWeight="800" fill="#1a1a2e">
              {d.croi}%
            </text>
            <text x={px + 14} y={py + 152} fontSize="10" fill="#6B6B8A">
              {d.croi >= 12 ? 'Dynamique →' : 'Mature →'} <tspan fontWeight="600">{d.croi >= 12 ? 'haut' : 'bas'}</tspan>
            </text>
          </motion.g>
        )
      })()}

      {showArrows && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.path
            d={`M ${xScale(DAS[1].pdmr)} ${yScale(DAS[1].croi) - rScale(DAS[1].ca)}
                Q ${(xScale(DAS[1].pdmr) + xScale(DAS[2].pdmr)) / 2 + 30} ${(yScale(DAS[1].croi) + yScale(DAS[2].croi)) / 2}
                ${xScale(DAS[2].pdmr) + rScale(DAS[2].ca) + 4} ${yScale(DAS[2].croi)}`}
            stroke="#1a1a2e" strokeWidth="2" strokeDasharray="6 4" fill="none"
            markerEnd="url(#diag-cash-arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          <text
            x={(xScale(DAS[1].pdmr) + xScale(DAS[2].pdmr)) / 2 + 50}
            y={(yScale(DAS[1].croi) + yScale(DAS[2].croi)) / 2 - 6}
            fontSize="11" fontWeight="700" fill="#1a1a2e"
          >
            cash
          </text>

          <rect x={MW - M_PAD_R + 8} y={70} width="180" height="200" rx="12" fill="white" stroke={`${accent}40`} strokeWidth="1.5" />
          <rect x={MW - M_PAD_R + 8} y={70} width="180" height="4" rx="2" fill={accent} />
          <text x={MW - M_PAD_R + 22} y={96} fontSize="12" fontWeight="800" fill={accent} style={{ letterSpacing: '0.08em' }}>
            DÉCISION
          </text>
          {[
            { d: DAS[0], action: 'Défendre' },
            { d: DAS[1], action: 'Traire' },
            { d: DAS[2], action: 'Investir ou sortir' },
            { d: DAS[3], action: 'Céder' },
          ].map((r, i) => (
            <g key={r.d.id} transform={`translate(0, ${112 + i * 36})`}>
              <circle cx={MW - M_PAD_R + 30} cy={0} r="9" fill={r.d.color} />
              <text x={MW - M_PAD_R + 30} y={4} fontSize="10" fontWeight="800" fill="white" textAnchor="middle">{r.d.id}</text>
              <text x={MW - M_PAD_R + 48} y={-2} fontSize="11" fontWeight="700" fill="#1a1a2e">{r.d.label}</text>
              <text x={MW - M_PAD_R + 48} y={11} fontSize="10" fill="#6B6B8A">{r.action}</text>
            </g>
          ))}
        </motion.g>
      )}
    </svg>
  )
}
