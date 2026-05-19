import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée — module "budgets" (Articulation budgétaire)
 * 8 slides · ≈ 2 min 5
 */

export const budgetsLesson = {
  title: 'Le système budgétaire en cascade',
  totalDuration: '≈ 2 min 5',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 11,
      title: 'Les 4 rôles du budget',
      narration: "Le budget n'est pas qu'une prévision chiffrée — c'est un outil de management complet qui remplit quatre fonctions distinctes. Prévoir l'année, coordonner les équipes, motiver les responsables, contrôler les résultats. Chacune de ces fonctions structure la manière dont le budget se construit.",
    },
    {
      id: 'ventes',
      visualStage: 2,
      duration: 16,
      title: 'Budget des ventes — le point de départ',
      narration: "Tout commence par les ventes. C'est le budget pivot, dit limitatif, qui contraint tous les autres. Voici la prévision trimestrielle : 1200 unités au T1 à 25 € l'unité, jusqu'à 2000 au T4. CA total de 162 500 € — voilà la base sur laquelle tout le système va se construire.",
    },
    {
      id: 'production',
      visualStage: 3,
      duration: 18,
      title: 'Budget de production',
      narration: "Du budget des ventes, on déduit la production. La formule garantit que la demande sera couverte tout en atteignant le stock final voulu. Ventes 6500 plus stock final 250 moins stock initial 200 — il faut produire 6550 unités sur l'année.",
    },
    {
      id: 'achats',
      visualStage: 4,
      duration: 16,
      title: 'Budget des achats matières',
      narration: "À partir de la production, on calcule les besoins en matières. Avec 2 kg de matière par unité, soit 13 100 kg à consommer, et un ajustement de stock — il faut acheter 13 200 kg. À 4 € le kg, cela représente 52 800 € sur l'année.",
    },
    {
      id: 'articulation',
      visualStage: 5,
      duration: 16,
      title: 'Le système articulé',
      narration: "Tous les budgets s'enchaînent dans une logique précise. Ventes alimente production, qui alimente achats et main d'œuvre. Les budgets de frais généraux et d'investissement complètent. Tous convergent vers le budget de trésorerie et le budget général — c'est la chaîne complète du système budgétaire.",
    },
    {
      id: 'tresorerie',
      visualStage: 6,
      duration: 18,
      title: 'Budget de trésorerie',
      narration: "Pivot financier du système, le budget de trésorerie consolide encaissements et décaissements mois par mois. Une vente de janvier payée à 60 jours arrive en trésorerie en mars. Un achat de janvier payé à 30 jours sort en février. Ces décalages sont cruciaux.",
    },
    {
      id: 'decalages',
      visualStage: 7,
      duration: 14,
      title: 'Les décalages temporels',
      narration: "Le résultat comptable peut être positif quand la trésorerie est négative — une entreprise rentable peut faire faillite si elle manque de cash au mauvais moment. Le budget de trésorerie est donc l'outil le plus surveillé par le DAF en période de tension.",
    },
    {
      id: 'synthese',
      visualStage: 8,
      duration: 12,
      title: 'Le budget maître',
      narration: "Tous les budgets fonctionnels convergent vers le budget maître, qui produit le compte de résultat et le bilan prévisionnels. Le système ainsi construit transforme la stratégie qualitative en engagements opérationnels chiffrés, datés, et contrôlables.",
    },
  ],
}

/* ============================================================
   DONNÉES
   ============================================================ */

const VENTES = [
  { t: 'T1', qty: 1200, ca: 30000 },
  { t: 'T2', qty: 1500, ca: 37500 },
  { t: 'T3', qty: 1800, ca: 45000 },
  { t: 'T4', qty: 2000, ca: 50000 },
]
const PRIX = 25
const TOTAL_QTY = 6500
const TOTAL_CA = 162500
const STOCK_INIT = 200
const STOCK_FIN = 250
const PRODUCTION = 6550
const MATIERE_PAR_UNITE = 2
const CONSO_MAT = 13100
const STOCK_MAT_INIT = 500
const STOCK_MAT_FIN = 600
const ACHATS_MAT = 13200
const PRIX_MAT = 4

const TRESORERIE = [
  { mois: 'Janv.', enc: 0, dec: 8000, solde: 7000 },
  { mois: 'Févr.', enc: 0, dec: 12000, solde: -5000 },
  { mois: 'Mars', enc: 30000, dec: 11000, solde: 14000 },
]

const FONCTIONS = [
  { label: 'Prévoir', desc: 'Anticiper les besoins de l\'année', color: '#0EA5E9' },
  { label: 'Coordonner', desc: 'Synchroniser les fonctions', color: '#06B6D4' },
  { label: 'Motiver', desc: 'Fixer des objectifs personnels', color: '#10B981' },
  { label: 'Contrôler', desc: 'Référence pour les écarts', color: '#3B82F6' },
]

/* ============================================================
   VISUAL — Routeur
   ============================================================ */

export function BudgetsVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage === 2) return <VentesScene accent={accent} progress={progress} />
  if (stage === 3) return <ProductionScene accent={accent} progress={progress} />
  if (stage === 4) return <AchatsScene accent={accent} progress={progress} />
  if (stage === 5) return <ArticulationScene accent={accent} />
  if (stage === 6) return <TresorerieScene accent={accent} progress={progress} />
  if (stage === 7) return <DecalagesScene accent={accent} />
  return <SyntheseScene accent={accent} />
}

/* ============ SCENE 1 — INTRO (4 fonctions) ============ */

function IntroScene({ accent }) {
  return (
    <div style={{ width: '100%', padding: '20px 4px' }}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', margin: '0 0 8px', textAlign: 'center', letterSpacing: '-0.02em' }}
      >
        Un outil, quatre fonctions.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 13, color: '#6B6B8A', textAlign: 'center', marginBottom: 24 }}
      >
        Le budget n'est pas qu'un tableau de chiffres.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {FONCTIONS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.85, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: 'white',
              border: `2px solid ${f.color}40`,
              borderRadius: 14,
              padding: '18px 20px',
              boxShadow: `0 4px 14px ${f.color}25`,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: f.color,
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, marginBottom: 10,
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: 12, color: '#6B6B8A', lineHeight: 1.5 }}>{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============ SCENE 2 — VENTES TABLE ============ */

function VentesScene({ accent, progress }) {
  const activeIdx = Math.min(3, Math.floor(progress / 25))
  const cumul = VENTES.slice(0, activeIdx + 1).reduce((s, v) => s + v.ca, 0)

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10 }}>
            BUDGET DES VENTES
          </div>
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(26,26,46,0.08)', background: 'white',
            fontFeatureSettings: '"tnum"',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr', background: `${accent}10` }}>
              {['Trim.', 'Quantité', 'Prix', 'CA'].map(h => (
                <div key={h} style={{ padding: '10px 8px', fontSize: 10, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {VENTES.map((v, i) => {
              const active = i === activeIdx
              return (
                <motion.div
                  key={v.t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr',
                    background: active ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                    borderTop: '1px solid rgba(0,0,0,0.04)',
                    transition: 'background 0.3s',
                  }}
                >
                  <div style={{ padding: '14px 8px', textAlign: 'center', fontWeight: 800, color: accent }}>{v.t}</div>
                  <div style={{ padding: '14px 8px', textAlign: 'center', fontWeight: 600, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>{v.qty.toLocaleString('fr-FR')}</div>
                  <div style={{ padding: '14px 8px', textAlign: 'center', color: '#6B6B8A', fontVariantNumeric: 'tabular-nums' }}>{PRIX} €</div>
                  <div style={{ padding: '14px 8px', textAlign: 'center', fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>{v.ca.toLocaleString('fr-FR')} €</div>
                </motion.div>
              )
            })}
          </div>

          <div style={{ marginTop: 12, fontSize: 11, color: '#6B6B8A', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {VENTES.map((v, i) => (
                <div key={v.t} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: i <= activeIdx ? accent : 'rgba(26,26,46,0.10)',
                }} />
              ))}
            </div>
            <span>Trimestre {activeIdx + 1}/4 · CA cumulé {cumul.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        <motion.div
          key={`total-${activeIdx}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1, scale: 1,
            boxShadow: [`0 0 0 6px ${accent}40`, `0 0 0 0 ${accent}00`, `0 8px 24px ${accent}20`],
          }}
          transition={{ duration: 0.6, boxShadow: { duration: 0.9 } }}
          style={{
            background: 'white',
            border: `1.5px solid ${accent}30`,
            borderRadius: 14,
            padding: '24px 22px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 14 }}>
            CHIFFRE D'AFFAIRES TOTAL
          </div>
          <motion.div
            key={`v-${activeIdx}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 0.2 }}
            style={{ fontSize: 42, fontWeight: 800, color: accent, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
          >
            {cumul.toLocaleString('fr-FR')} €
          </motion.div>
          <div style={{ fontSize: 11, color: '#6B6B8A', marginTop: 8 }}>
            Cumul après {activeIdx + 1} trimestre{activeIdx > 0 ? 's' : ''}
          </div>
          {activeIdx === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: 14, padding: '10px 12px',
                background: `${accent}10`, borderRadius: 8,
                fontSize: 11, color: '#1a1a2e', fontWeight: 600,
              }}
            >
              {TOTAL_QTY.toLocaleString('fr-FR')} unités vendues × {PRIX} €
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ============ SCENE 3 — PRODUCTION (formula) ============ */

function ProductionScene({ accent, progress }) {
  return (
    <FormulaScene
      accent={accent}
      eyebrow="BUDGET DE PRODUCTION"
      formula={['Production = Ventes', 'Stock final souhaité', 'Stock initial']}
      formulaSymbols={['+', '−']}
      application={{
        vars: [
          { lbl: 'Ventes prévues', val: TOTAL_QTY, color: '#0EA5E9' },
          { lbl: 'Stock final voulu', val: STOCK_FIN, color: '#10B981' },
          { lbl: 'Stock initial', val: STOCK_INIT, color: '#F59E0B' },
        ],
        calculation: `${TOTAL_QTY} + ${STOCK_FIN} − ${STOCK_INIT}`,
        result: `${PRODUCTION} unités`,
      }}
      progress={progress}
    />
  )
}

/* ============ SCENE 4 — ACHATS MATIÈRES ============ */

function AchatsScene({ accent, progress }) {
  return (
    <FormulaScene
      accent={accent}
      eyebrow="BUDGET DES ACHATS"
      formula={['Achats = Conso. prévue', 'Stock final', 'Stock initial']}
      formulaSymbols={['+', '−']}
      application={{
        vars: [
          { lbl: `Conso matière (${MATIERE_PAR_UNITE} kg/u)`, val: `${CONSO_MAT.toLocaleString('fr-FR')} kg`, color: '#0EA5E9' },
          { lbl: 'Stock final matière', val: `${STOCK_MAT_FIN} kg`, color: '#10B981' },
          { lbl: 'Stock initial matière', val: `${STOCK_MAT_INIT} kg`, color: '#F59E0B' },
        ],
        calculation: `${CONSO_MAT.toLocaleString('fr-FR')} + ${STOCK_MAT_FIN} − ${STOCK_MAT_INIT}`,
        result: `${ACHATS_MAT.toLocaleString('fr-FR')} kg`,
        subResult: `→ ${(ACHATS_MAT * PRIX_MAT).toLocaleString('fr-FR')} € à ${PRIX_MAT} €/kg`,
      }}
      progress={progress}
    />
  )
}

/* Helper: scène formule réutilisée pour stages 3 et 4 */
function FormulaScene({ accent, eyebrow, formula, formulaSymbols, application, progress }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
        {/* Carte variables */}
        <div style={{
          background: 'white', borderRadius: 14, padding: '22px 24px',
          border: '1px solid rgba(26,26,46,0.08)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em' }}>
            VARIABLES
          </div>
          {application.vars.map((v, i) => (
            <motion.div
              key={v.lbl}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                background: `${v.color}08`, border: `1px solid ${v.color}25`,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 4, background: v.color }} />
              <div style={{ flex: 1, fontSize: 12, color: '#1a1a2e', fontWeight: 500 }}>{v.lbl}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: v.color, fontVariantNumeric: 'tabular-nums' }}>
                {typeof v.val === 'number' ? v.val.toLocaleString('fr-FR') : v.val}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carte calcul */}
        <motion.div
          key="calc"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1, scale: 1,
            boxShadow: [`0 0 0 6px ${accent}40`, `0 0 0 0 ${accent}00`, `0 8px 24px ${accent}20`],
          }}
          transition={{ duration: 0.6, boxShadow: { duration: 1, delay: 0.4 } }}
          style={{
            background: 'white', borderRadius: 14, padding: '22px 24px',
            border: `1.5px solid ${accent}30`,
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 4, background: accent,
          }} />
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 16 }}>
            {eyebrow}
          </div>

          {/* Formule */}
          <div style={{ fontSize: 13, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.8, marginBottom: 18 }}>
            <strong>{formula[0]}</strong>
            <br/>
            <span style={{ color: '#6B6B8A', fontSize: 16 }}>{formulaSymbols[0]} </span>
            <strong>{formula[1]}</strong>
            <br/>
            <span style={{ color: '#6B6B8A', fontSize: 16 }}>{formulaSymbols[1]} </span>
            <strong>{formula[2]}</strong>
          </div>

          <div style={{ borderTop: `1px dashed ${accent}40`, margin: '10px 0' }} />

          {/* Calcul */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', textAlign: 'center', marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}
          >
            {application.calculation}
          </motion.div>

          <div style={{ fontSize: 14, color: '#6B6B8A', textAlign: 'center', marginBottom: 4 }}>=</div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.85, duration: 0.7, times: [0, 0.55, 1], ease: [0.34, 1.56, 0.64, 1] }}
            style={{ fontSize: 32, fontWeight: 800, color: accent, textAlign: 'center', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
          >
            {application.result}
          </motion.div>

          {application.subResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{ fontSize: 12, color: '#6B6B8A', textAlign: 'center', marginTop: 10, fontWeight: 600 }}
            >
              {application.subResult}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ============ SCENE 5 — ARTICULATION DIAGRAM ============ */

function ArticulationScene({ accent }) {
  const items = [
    { id: 'ventes', label: 'Budget des ventes', x: 50, y: 50, w: 150, h: 50, color: '#0EA5E9', pivot: true },
    { id: 'prod',   label: 'Budget production', x: 280, y: 50, w: 150, h: 50, color: '#06B6D4' },
    { id: 'achats', label: 'Achats matières', x: 510, y: 20, w: 140, h: 44, color: '#10B981' },
    { id: 'mod',    label: 'Main d\'œuvre', x: 510, y: 75, w: 140, h: 44, color: '#10B981' },
    { id: 'invest', label: 'Investissements', x: 280, y: 140, w: 150, h: 44, color: '#8B5CF6' },
    { id: 'fg',     label: 'Frais généraux', x: 50, y: 140, w: 150, h: 44, color: '#8B5CF6' },
    { id: 'treso',  label: 'Trésorerie', x: 280, y: 220, w: 150, h: 50, color: '#EC4899', pivot: true },
    { id: 'maitre', label: 'Budget maître', x: 510, y: 220, w: 150, h: 50, color: '#F59E0B', pivot: true },
  ]
  const links = [
    ['ventes', 'prod'],
    ['prod', 'achats'],
    ['prod', 'mod'],
    ['ventes', 'treso'],
    ['achats', 'treso'],
    ['mod', 'treso'],
    ['invest', 'treso'],
    ['fg', 'treso'],
    ['treso', 'maitre'],
  ]

  return (
    <div style={{ width: '100%', maxWidth: '780px' }}>
      <svg viewBox="0 0 700 300" width="100%">
        <defs>
          <marker id="bud-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9090b0" />
          </marker>
        </defs>

        {/* Liens */}
        {links.map(([from, to], i) => {
          const a = items.find(x => x.id === from)
          const b = items.find(x => x.id === to)
          const x1 = a.x + a.w
          const y1 = a.y + a.h / 2
          const x2 = b.x
          const y2 = b.y + b.h / 2
          const mx = (x1 + x2) / 2
          return (
            <motion.path
              key={`${from}-${to}`}
              d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              stroke="#9090b0" strokeWidth="1.5" fill="none"
              markerEnd="url(#bud-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
            />
          )
        })}

        {/* Nœuds */}
        {items.map((it, i) => (
          <motion.g
            key={it.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${it.x + it.w / 2}px ${it.y + it.h / 2}px` }}
          >
            <rect
              x={it.x} y={it.y} width={it.w} height={it.h} rx="9"
              fill={it.pivot ? it.color : `${it.color}15`}
              stroke={it.color}
              strokeWidth={it.pivot ? '0' : '1.5'}
            />
            <text
              x={it.x + it.w / 2} y={it.y + it.h / 2 + 4}
              fontSize="11" fontWeight="700"
              fill={it.pivot ? 'white' : '#1a1a2e'}
              textAnchor="middle"
            >
              {it.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

/* ============ SCENE 6 — TRÉSORERIE ============ */

function TresorerieScene({ accent, progress }) {
  const activeIdx = Math.min(2, Math.floor(progress / 33))
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10, textAlign: 'center' }}>
        BUDGET DE TRÉSORERIE — 3 PREMIERS MOIS
      </div>
      <div style={{
        background: 'white', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(26,26,46,0.08)',
        maxWidth: 660, margin: '0 auto',
        fontFeatureSettings: '"tnum"',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1fr', background: `${accent}10` }}>
          {['Mois', 'Encaissements', 'Décaissements', 'Solde'].map(h => (
            <div key={h} style={{ padding: '12px 8px', fontSize: 10, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
        {TRESORERIE.map((t, i) => {
          const active = i === activeIdx
          const negativ = t.solde < 0
          return (
            <motion.div
              key={t.mois}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1fr',
                background: active ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                borderTop: '1px solid rgba(0,0,0,0.04)',
                transition: 'background 0.3s',
              }}
            >
              <div style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 800, color: accent }}>{t.mois}</div>
              <div style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 600, color: '#10B981', fontVariantNumeric: 'tabular-nums' }}>
                + {t.enc.toLocaleString('fr-FR')} €
              </div>
              <div style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 600, color: '#EF4444', fontVariantNumeric: 'tabular-nums' }}>
                − {t.dec.toLocaleString('fr-FR')} €
              </div>
              <div style={{
                padding: '16px 8px', textAlign: 'center', fontWeight: 800,
                color: negativ ? '#EF4444' : '#1a1a2e',
                fontVariantNumeric: 'tabular-nums',
                fontSize: 15,
              }}>
                {negativ ? '' : '+'}{t.solde.toLocaleString('fr-FR')} €
                {negativ && <span style={{ fontSize: 9, display: 'block', fontWeight: 700, marginTop: 2 }}>BESOIN DE FINANCEMENT</span>}
              </div>
            </motion.div>
          )
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: 16, padding: '12px 18px',
          background: `${accent}10`, borderRadius: 10,
          maxWidth: 540, margin: '16px auto 0',
          fontSize: 12, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.6,
        }}
      >
        <strong>Février est en déficit</strong> — il faut anticiper un découvert ou décaler des décaissements.
      </motion.div>
    </div>
  )
}

/* ============ SCENE 7 — DÉCALAGES TIMING ============ */

function DecalagesScene({ accent }) {
  const months = ['Janv.', 'Févr.', 'Mars']
  const events = [
    { type: 'vente', month: 0, label: 'Vente du mois', color: '#0EA5E9' },
    { type: 'achat', month: 0, label: 'Achat fournisseur', color: '#F59E0B' },
    { type: 'paiAchat', month: 1, label: 'Paiement achat (30j)', color: '#F59E0B' },
    { type: 'encVente', month: 2, label: 'Encaissement vente (60j)', color: '#0EA5E9' },
  ]

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px' }}>
      <div style={{ fontSize: 12, color: '#6B6B8A', textAlign: 'center', marginBottom: 18 }}>
        Une vente faite en janvier est encaissée seulement en mars. <br/>
        Un achat de janvier est payé en février.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 620, margin: '0 auto' }}>
        {months.map((m, mi) => (
          <div key={m} style={{
            background: 'white',
            border: '1px solid rgba(26,26,46,0.08)',
            borderRadius: 12,
            padding: '14px 12px',
            minHeight: 200,
            position: 'relative',
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: accent, textAlign: 'center', marginBottom: 12, letterSpacing: '0.08em' }}>
              {m.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {events.filter(e => e.month === mi).map((e, ei) => (
                <motion.div
                  key={`${m}-${e.type}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + mi * 0.4 + ei * 0.15, duration: 0.4 }}
                  style={{
                    padding: '8px 10px',
                    background: `${e.color}15`,
                    border: `1px solid ${e.color}40`,
                    borderRadius: 8,
                    fontSize: 11,
                    color: '#1a1a2e',
                    fontWeight: 600,
                  }}
                >
                  {e.label}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          maxWidth: 600, margin: '20px auto 0', padding: '14px 18px',
          background: `${accent}10`, borderRadius: 10,
          fontSize: 12, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.55,
        }}
      >
        Le budget de trésorerie matérialise ces <strong>décalages</strong> mois par mois. <br/>
        Sans cette vision, une entreprise rentable peut manquer de cash.
      </motion.div>
    </div>
  )
}

/* ============ SCENE 8 — SYNTHESE ============ */

function SyntheseScene({ accent }) {
  const summary = [
    { lbl: 'Ventes annuelles', val: `${TOTAL_CA.toLocaleString('fr-FR')} €`, color: '#0EA5E9' },
    { lbl: 'Production', val: `${PRODUCTION.toLocaleString('fr-FR')} u`, color: '#06B6D4' },
    { lbl: 'Achats matières', val: `${(ACHATS_MAT * PRIX_MAT).toLocaleString('fr-FR')} €`, color: '#10B981' },
    { lbl: 'Marge brute estimée', val: `~ ${((TOTAL_CA - ACHATS_MAT * PRIX_MAT) / 1000).toFixed(0)} k€`, color: '#F59E0B' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '16px' }}>
      <div style={{
        textAlign: 'center', fontSize: 13, color: '#6B6B8A',
        marginBottom: 24, maxWidth: 560, margin: '0 auto 24px',
      }}>
        Le budget maître consolide tous les sous-budgets en compte de résultat <br/>et bilan prévisionnels — la stratégie devient chiffres.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 580, margin: '0 auto' }}>
        {summary.map((s, i) => (
          <motion.div
            key={s.lbl}
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: 'white',
              border: `1.5px solid ${s.color}30`,
              borderRadius: 12,
              padding: '18px 20px',
              borderLeft: `4px solid ${s.color}`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: s.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              {s.lbl}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
              {s.val}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
