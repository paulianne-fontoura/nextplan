import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée — module "ecarts" (Analyse des écarts)
 * 8 slides · ≈ 1 min 55
 */

export const ecartsLesson = {
  title: 'Décomposer un écart pour piloter',
  totalDuration: '≈ 1 min 55',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 10,
      title: 'Réel ≠ Prévu — pourquoi ?',
      narration: "Vous avez prévu 50 000 € de CA. Vous réalisez 52 800 €. Bonne nouvelle ? Pas si vite. Un écart global cache souvent des effets contradictoires : un volume favorable peut masquer un prix en baisse. Sans décomposition, l'écart est aveugle.",
    },
    {
      id: 'donnees',
      visualStage: 2,
      duration: 14,
      title: 'Le cas — Produit Z',
      narration: "Voici les chiffres. Prévu : 1000 unités à 50 € l'unité, soit 50 000 €. Réel : 1100 unités à 48 € l'unité, soit 52 800 €. L'écart global est de +2800 €, favorable. Mais ce simple chiffre va se révéler trompeur.",
    },
    {
      id: 'global',
      visualStage: 3,
      duration: 14,
      title: 'Calcul de l\'écart global',
      narration: "Écart global = CA réel − CA prévu = 52 800 − 50 000 = +2800 €. Favorable, certes. Mais on a vendu plus d'unités à un prix moindre — deux effets contradictoires se compensent partiellement. Il faut isoler.",
    },
    {
      id: 'volume',
      visualStage: 4,
      duration: 18,
      title: 'Écart sur volume',
      narration: "Pour isoler l'effet quantité, on valorise la différence de volume au prix prévu. (1100 − 1000) × 50 = +5000 € favorable. C'est ce que les 100 unités supplémentaires auraient rapporté au prix budgété. Effet pur du volume.",
    },
    {
      id: 'prix',
      visualStage: 5,
      duration: 18,
      title: 'Écart sur prix',
      narration: "Pour isoler l'effet prix, on valorise la différence de prix sur la quantité réelle. (48 − 50) × 1100 = −2200 € défavorable. Le prix réel de 48 € a érodé la marge sur chaque unité vendue. Effet pur du prix.",
    },
    {
      id: 'verification',
      visualStage: 6,
      duration: 16,
      title: 'Vérification — la cascade',
      narration: "Volume +5000, prix −2200, somme +2800 — exactement l'écart global. La décomposition est cohérente. Vous voyez maintenant que le résultat favorable cache une érosion de marge unitaire qu'il faut analyser.",
    },
    {
      id: 'lecture',
      visualStage: 7,
      duration: 14,
      title: 'Lecture stratégique',
      narration: "Volume + et prix − : c'est une baisse de prix payante en volume mais coûteuse en marge. Faut-il poursuivre ? Cela dépend du caractère ponctuel ou structurel. Une promo ? On revient au prix. Concurrence durable ? Il faut revoir le modèle.",
    },
    {
      id: 'synthese',
      visualStage: 8,
      duration: 11,
      title: 'L\'analyse des écarts en action',
      narration: "La décomposition transforme un constat en plan d'action. Sans elle, on aurait conclu à un bon trimestre. Avec elle, on identifie une dérive tarifaire à corriger. C'est exactement la valeur du contrôleur de gestion.",
    },
  ],
}

/* ============================================================
   DONNÉES
   ============================================================ */

const QP = 1000
const PP = 50
const QR = 1100
const PR = 48
const CA_PREVU = QP * PP   // 50000
const CA_REEL = QR * PR    // 52800
const ECART_GLOBAL = CA_REEL - CA_PREVU      // +2800
const ECART_VOLUME = (QR - QP) * PP          // +5000
const ECART_PRIX = (PR - PP) * QR            // -2200

/* ============================================================
   VISUAL — Routeur
   ============================================================ */

export function EcartsVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage === 2) return <DonneesScene accent={accent} />
  if (stage === 3) return <GlobalScene accent={accent} />
  if (stage === 4) return <VolumeScene accent={accent} />
  if (stage === 5) return <PrixScene accent={accent} />
  if (stage === 6) return <WaterfallScene accent={accent} />
  if (stage === 7) return <QuadrantsScene accent={accent} />
  return <SyntheseScene accent={accent} />
}

/* ============ SCENE 1 — INTRO ============ */

function IntroScene({ accent }) {
  return (
    <div style={{ width: '100%', padding: '20px 4px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}
      >
        <div style={{
          padding: '14px 20px', borderRadius: 12,
          background: '#6366F115', border: '2px solid #6366F140',
          minWidth: 140,
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#6366F1', letterSpacing: '0.1em', marginBottom: 4 }}>PRÉVU</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>50 000 €</div>
        </div>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: 32, color: '#9090b0', fontWeight: 800 }}
        >
          ?
        </motion.div>
        <div style={{
          padding: '14px 20px', borderRadius: 12,
          background: '#10B98115', border: '2px solid #10B98140',
          minWidth: 140,
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#10B981', letterSpacing: '0.1em', marginBottom: 4 }}>RÉEL</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>52 800 €</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ fontSize: 16, color: '#1a1a2e', fontWeight: 600, marginBottom: 6 }}
      >
        Écart global : <span style={{ color: accent }}>+2 800 €</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ fontSize: 13, color: '#6B6B8A' }}
      >
        Bonne nouvelle ? <strong>Pas si vite</strong> — il faut décomposer.
      </motion.div>
    </div>
  )
}

/* ============ SCENE 2 — DONNÉES ============ */

function DonneesScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, maxWidth: 620, margin: '0 auto' }}>
        {[
          { lbl: 'PRÉVU', q: QP, p: PP, ca: CA_PREVU, color: '#6366F1' },
          { lbl: 'RÉEL', q: QR, p: PR, ca: CA_REEL, color: '#10B981' },
        ].map((d, i) => (
          <motion.div
            key={d.lbl}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
            style={{
              background: 'white', borderRadius: 14,
              border: `2px solid ${d.color}30`,
              borderTop: `4px solid ${d.color}`,
              padding: '20px 22px',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: d.color, letterSpacing: '0.12em', marginBottom: 14 }}>
              {d.lbl}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Row lbl="Quantité" val={`${d.q.toLocaleString('fr-FR')} unités`} />
              <Row lbl="Prix unitaire" val={`${d.p} €`} />
              <div style={{ borderTop: '1px dashed rgba(26,26,46,0.1)', margin: '6px 0' }} />
              <Row
                lbl="CA"
                val={`${d.ca.toLocaleString('fr-FR')} €`}
                big
                color={d.color}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Row({ lbl, val, big, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 12, color: '#6B6B8A' }}>{lbl}</span>
      <span style={{
        fontSize: big ? 22 : 14, fontWeight: big ? 800 : 600,
        color: color || '#1a1a2e', fontVariantNumeric: 'tabular-nums',
      }}>
        {val}
      </span>
    </div>
  )
}

/* ============ SCENE 3 — GLOBAL ============ */

function GlobalScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 14 }}>
        ÉCART GLOBAL
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>
        {CA_REEL.toLocaleString('fr-FR')} <span style={{ color: '#9090b0' }}>−</span> {CA_PREVU.toLocaleString('fr-FR')}
      </div>
      <div style={{ fontSize: 14, color: '#6B6B8A', marginBottom: 8 }}>=</div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.7, times: [0, 0.55, 1], delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          display: 'inline-flex', alignItems: 'baseline', gap: 8,
          fontSize: 48, fontWeight: 800, color: accent, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
        }}
      >
        + {ECART_GLOBAL.toLocaleString('fr-FR')} €
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ marginTop: 14, fontSize: 13, color: '#10B981', fontWeight: 700 }}
      >
        FAVORABLE
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          marginTop: 20, padding: '12px 18px',
          background: `${accent}10`, borderRadius: 10,
          fontSize: 12, color: '#1a1a2e', maxWidth: 460, margin: '20px auto 0',
          lineHeight: 1.55,
        }}
      >
        Mais ce chiffre seul ne dit rien sur <strong>la cause</strong> du gain. Volume ? Prix ? Mix ?
      </motion.div>
    </div>
  )
}

/* ============ SCENE 4 — VOLUME ============ */

function VolumeScene({ accent }) {
  return (
    <EcartCalculScene
      accent={accent}
      eyebrow="ÉCART SUR VOLUME"
      formula={['Écart volume = (Qr − Qp) × Pp']}
      explanation="On isole l'effet du volume en valorisant au prix prévu — ce qui neutralise l'effet prix."
      vars={[
        { lbl: 'Q réelle', val: QR, color: '#10B981' },
        { lbl: 'Q prévue', val: QP, color: '#6366F1' },
        { lbl: 'P prévu', val: `${PP} €`, color: '#6366F1' },
      ]}
      calculation={`(${QR.toLocaleString('fr-FR')} − ${QP.toLocaleString('fr-FR')}) × ${PP}`}
      result={`+ ${ECART_VOLUME.toLocaleString('fr-FR')} €`}
      resultColor="#10B981"
      verdict="FAVORABLE"
      meaning="On a vendu 100 unités de plus que prévu, qui auraient rapporté 5 000 € au prix budgété."
    />
  )
}

/* ============ SCENE 5 — PRIX ============ */

function PrixScene({ accent }) {
  return (
    <EcartCalculScene
      accent={accent}
      eyebrow="ÉCART SUR PRIX"
      formula={['Écart prix = (Pr − Pp) × Qr']}
      explanation="On isole l'effet du prix en valorisant sur la quantité réelle — ce qui isole l'impact tarifaire pur."
      vars={[
        { lbl: 'P réel', val: `${PR} €`, color: '#EF4444' },
        { lbl: 'P prévu', val: `${PP} €`, color: '#6366F1' },
        { lbl: 'Q réelle', val: QR, color: '#10B981' },
      ]}
      calculation={`(${PR} − ${PP}) × ${QR.toLocaleString('fr-FR')}`}
      result={`${ECART_PRIX.toLocaleString('fr-FR')} €`}
      resultColor="#EF4444"
      verdict="DÉFAVORABLE"
      meaning="Le prix réel inférieur de 2 € a érodé la marge sur chaque unité vendue."
    />
  )
}

function EcartCalculScene({ accent, eyebrow, formula, explanation, vars, calculation, result, resultColor, verdict, meaning }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, alignItems: 'stretch' }}>
        {/* Variables */}
        <div style={{
          background: 'white', borderRadius: 14, padding: '20px 22px',
          border: '1px solid rgba(26,26,46,0.08)',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em' }}>
            VARIABLES
          </div>
          {vars.map((v, i) => (
            <motion.div
              key={v.lbl}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8,
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
          <div style={{ fontSize: 11, color: '#6B6B8A', lineHeight: 1.55, marginTop: 4, fontStyle: 'italic' }}>
            {explanation}
          </div>
        </div>

        {/* Calcul */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1, scale: 1,
            boxShadow: [`0 0 0 6px ${resultColor}40`, `0 0 0 0 ${resultColor}00`, `0 8px 24px ${accent}20`],
          }}
          transition={{ duration: 0.6, boxShadow: { duration: 0.9, delay: 0.5 } }}
          style={{
            background: 'white', borderRadius: 14, padding: '20px 22px',
            border: `1.5px solid ${accent}30`, position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: resultColor }} />

          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 14 }}>
            {eyebrow}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', textAlign: 'center', marginBottom: 14 }}>
            {formula[0]}
          </div>

          <div style={{ borderTop: `1px dashed ${accent}40`, margin: '10px 0' }} />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', textAlign: 'center', marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}
          >
            {calculation}
          </motion.div>

          <div style={{ fontSize: 14, color: '#6B6B8A', textAlign: 'center', marginBottom: 2 }}>=</div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.9, duration: 0.7, times: [0, 0.55, 1], ease: [0.34, 1.56, 0.64, 1] }}
            style={{ fontSize: 32, fontWeight: 800, color: resultColor, textAlign: 'center', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
          >
            {result}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{ marginTop: 10, fontSize: 11, fontWeight: 800, color: resultColor, textAlign: 'center', letterSpacing: '0.12em' }}
          >
            {verdict}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            style={{ marginTop: 8, fontSize: 11, color: '#6B6B8A', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}
          >
            {meaning}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ============ SCENE 6 — WATERFALL ============ */

function WaterfallScene({ accent }) {
  const items = [
    { lbl: 'CA prévu', val: CA_PREVU, type: 'base', color: '#6366F1' },
    { lbl: 'Δ Volume', val: ECART_VOLUME, type: 'gain', color: '#10B981' },
    { lbl: 'Δ Prix', val: ECART_PRIX, type: 'loss', color: '#EF4444' },
    { lbl: 'CA réel', val: CA_REEL, type: 'result', color: '#10B981' },
  ]
  const maxVal = 60000
  const barH = 200
  const yScale = (v) => (v / maxVal) * barH

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 14, textAlign: 'center' }}>
        CASCADE DE DÉCOMPOSITION
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
        alignItems: 'end', maxWidth: 620, margin: '0 auto', height: barH + 80,
      }}>
        {items.map((it, i) => {
          const isResult = it.type === 'result'
          const isBase = it.type === 'base'
          const isGain = it.type === 'gain'
          const cumulPrev = items.slice(0, i).reduce((s, x) => x.type === 'base' ? x.val : x.type === 'result' ? 0 : s + x.val, isBase ? 0 : CA_PREVU)
          const barTop = isResult ? 0 : (isBase ? 0 : (isGain ? cumulPrev : cumulPrev + it.val))
          const barHeight = Math.abs(it.val)

          return (
            <motion.div
              key={it.lbl}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: it.color, marginBottom: 6, fontVariantNumeric: 'tabular-nums' }}>
                {isGain || isResult || isBase ? '' : (it.val < 0 ? '−' : '+')}
                {isResult || isBase ? it.val.toLocaleString('fr-FR') : Math.abs(it.val).toLocaleString('fr-FR')}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: yScale(isResult || isBase ? it.val : Math.abs(it.val)) }}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
                style={{
                  width: '70%',
                  background: it.color,
                  opacity: isResult || isBase ? 0.9 : 0.75,
                  borderRadius: '8px 8px 0 0',
                }}
              />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', textAlign: 'center', marginTop: 8 }}>
                {it.lbl}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          maxWidth: 520, margin: '20px auto 0', padding: '14px 18px',
          background: `${accent}10`, borderRadius: 10, textAlign: 'center',
          fontSize: 12, color: '#1a1a2e',
        }}
      >
        Volume <strong style={{ color: '#10B981' }}>+5 000</strong> + Prix <strong style={{ color: '#EF4444' }}>−2 200</strong> = <strong style={{ color: accent }}>+2 800</strong> · Décomposition cohérente ✓
      </motion.div>
    </div>
  )
}

/* ============ SCENE 7 — LECTURE QUADRANTS ============ */

function QuadrantsScene({ accent }) {
  const quadrants = [
    { vol: '+', pri: '+', label: 'Idéal', desc: 'Volume gagné + marge préservée', color: '#10B981', current: false },
    { vol: '+', pri: '−', label: 'Notre cas', desc: 'Volume au prix d\'une baisse tarifaire', color: '#F59E0B', current: true },
    { vol: '−', pri: '+', label: 'Premium', desc: 'Montée en gamme, érosion du volume', color: '#6366F1', current: false },
    { vol: '−', pri: '−', label: 'Crise', desc: 'Perte de marché et de marge', color: '#EF4444', current: false },
  ]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 16, textAlign: 'center' }}>
        4 SITUATIONS POSSIBLES
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 580, margin: '0 auto' }}>
        {quadrants.map((q, i) => (
          <motion.div
            key={q.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1, scale: q.current ? [1, 1.05, 1] : 1,
            }}
            transition={{
              delay: i * 0.12, duration: 0.4,
              scale: q.current ? { duration: 1.6, repeat: Infinity, repeatType: 'reverse' } : {},
            }}
            style={{
              background: q.current ? `${q.color}18` : 'white',
              border: `${q.current ? '2.5px' : '1px'} solid ${q.color}${q.current ? '60' : '20'}`,
              borderRadius: 12,
              padding: '14px 16px',
              boxShadow: q.current ? `0 8px 20px ${q.color}30` : '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{
                padding: '3px 10px', borderRadius: 999, background: q.color,
                color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
              }}>
                Vol {q.vol} / Prix {q.pri}
              </div>
              {q.current && <span style={{ fontSize: 10, fontWeight: 800, color: q.color }}>← Notre cas</span>}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e', marginBottom: 2 }}>{q.label}</div>
            <div style={{ fontSize: 11, color: '#6B6B8A', lineHeight: 1.4 }}>{q.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============ SCENE 8 — SYNTHESE ============ */

function SyntheseScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '20px 16px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', marginBottom: 8, letterSpacing: '-0.02em' }}
      >
        Du constat au plan d'action
      </motion.div>
      <div style={{ fontSize: 13, color: '#6B6B8A', marginBottom: 30, maxWidth: 520, margin: '0 auto 30px' }}>
        L'analyse des écarts a transformé un chiffre opaque en diagnostic structuré.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 640, margin: '0 auto' }}>
        {[
          { num: '01', label: 'Constater', desc: 'Écart global +2 800 €', color: '#9090b0' },
          { num: '02', label: 'Décomposer', desc: 'Volume +5 000 · Prix −2 200', color: accent },
          { num: '03', label: 'Agir', desc: 'Analyser cause de la baisse prix', color: '#10B981' },
        ].map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            style={{
              background: 'white', borderRadius: 12, padding: '18px 16px',
              borderTop: `3px solid ${s.color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontVariantNumeric: 'tabular-nums' }}>{s.num}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: '#6B6B8A', marginTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
