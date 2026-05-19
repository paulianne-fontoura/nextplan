import { motion, AnimatePresence } from 'framer-motion'

/**
 * Leçon animée — module "investissement" (VAN/TRI/IP/DR)
 * 8 slides · ≈ 2 min 5
 */

export const investissementLesson = {
  title: 'VAN, TRI : la rentabilité chiffrée',
  totalDuration: '≈ 2 min 5',
  slides: [
    {
      id: 'intro',
      visualStage: 1,
      duration: 10,
      title: 'Le défi de l\'investissement',
      narration: "Vous engagez 100 000 € aujourd'hui. Vous attendez 150 000 € de flux sur 4 ans. Bon investissement ? Pour répondre, il faut comparer ce qui n'est pas comparable : une dépense immédiate à des recettes futures. L'actualisation va résoudre ce paradoxe.",
    },
    {
      id: 'temps',
      visualStage: 2,
      duration: 16,
      title: 'Le temps a une valeur',
      narration: "Un euro reçu dans 5 ans vaut moins qu'un euro aujourd'hui. Deux raisons : on pourrait le placer entre-temps, et l'incertitude croît avec l'horizon. C'est le principe d'actualisation : chaque flux futur est divisé par (1+t) puissance n, où t est le coût du capital.",
    },
    {
      id: 'flux',
      visualStage: 3,
      duration: 20,
      title: 'Les flux du projet',
      narration: "Investissement initial : 100 000 €. Puis, sur 4 ans, des flux de trésorerie de 30 000, 35 000, 40 000 et 45 000 €. Soit 150 000 € brut. Mais ces flux futurs valent moins qu'aujourd'hui — actualisons-les au coût du capital de 10 %.",
    },
    {
      id: 'van',
      visualStage: 4,
      duration: 18,
      title: 'Calcul de la VAN',
      narration: "Chaque flux est actualisé. Année 1 : 30 000 sur 1,10 = 27 273 €. Année 2 : 35 000 sur 1,21 = 28 926 €. Et ainsi de suite. La somme des flux actualisés est de 117 030 €. VAN = 117 030 − 100 000 = +17 030 €. Le projet crée de la valeur.",
    },
    {
      id: 'tri',
      visualStage: 5,
      duration: 16,
      title: 'Le Taux de Rentabilité Interne',
      narration: "Le TRI est le taux d'actualisation pour lequel la VAN s'annule. Pour ce projet, il est de 17 %. Comme 17 % est supérieur au coût du capital de 10 %, le projet est rentable. La règle : on accepte si TRI supérieur au coût du capital.",
    },
    {
      id: 'courbe',
      visualStage: 6,
      duration: 18,
      title: 'La courbe VAN',
      narration: "Si l'on trace la VAN en fonction du taux, on obtient une courbe décroissante. À taux faible, VAN élevée. À taux élevé, VAN négative. L'intersection avec l'axe zéro donne le TRI. Tout taux inférieur au TRI rend le projet rentable.",
    },
    {
      id: 'indicateurs',
      visualStage: 7,
      duration: 15,
      title: 'IP et DR — les compléments',
      narration: "L'Indice de Profitabilité de 1,17 mesure la création de valeur par euro investi — 17 cents par euro. Le Délai de Récupération de 2,87 ans indique quand l'investissement est récupéré. Ces deux indicateurs complètent la VAN sur la rentabilité et le risque.",
    },
    {
      id: 'decision',
      visualStage: 8,
      duration: 12,
      title: 'Décision finale',
      narration: "VAN positive, TRI supérieur au coût du capital, IP supérieur à 1, DR raisonnable — tous les indicateurs convergent. Le projet est accepté. C'est cette synthèse argumentée qui distingue un dossier d'investissement professionnel d'un simple calcul.",
    },
  ],
}

/* ============================================================
   DONNÉES
   ============================================================ */

const I0 = 100000
const FLUX = [30000, 35000, 40000, 45000]
const TAUX = 0.10
const FLUX_ACTU = FLUX.map((f, i) => f / Math.pow(1 + TAUX, i + 1))
const SOMME_ACTU = FLUX_ACTU.reduce((s, v) => s + v, 0)
const VAN = SOMME_ACTU - I0  // ≈ 17030
const TRI = 0.169
const IP = 1 + VAN / I0  // ≈ 1.17

function vanAt(rate) {
  return FLUX.reduce((s, f, i) => s + f / Math.pow(1 + rate, i + 1), 0) - I0
}

/* ============================================================
   VISUAL — Routeur
   ============================================================ */

export function InvestissementVisual({ stage, accent, progress = 0 }) {
  if (stage === 1) return <IntroScene accent={accent} />
  if (stage === 2) return <TempsScene accent={accent} />
  if (stage === 3) return <FluxScene accent={accent} />
  if (stage === 4) return <VanScene accent={accent} progress={progress} />
  if (stage === 5) return <TriScene accent={accent} />
  if (stage === 6) return <CourbeScene accent={accent} />
  if (stage === 7) return <IndicateursScene accent={accent} />
  return <DecisionScene accent={accent} />
}

/* ============ 1 — INTRO ============ */

function IntroScene({ accent }) {
  return (
    <div style={{ width: '100%', padding: '20px 4px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, flexWrap: 'wrap', marginBottom: 24 }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#EF4444', letterSpacing: '0.12em', marginBottom: 4 }}>AUJOURD'HUI</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>
            − {I0.toLocaleString('fr-FR')} €
          </div>
        </div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: 32, color: accent, fontWeight: 800 }}
        >
          →
        </motion.div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#10B981', letterSpacing: '0.12em', marginBottom: 4 }}>SUR 4 ANS</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>
            + 150 000 €
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}
      >
        Bon investissement <span style={{ color: accent }}>?</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ fontSize: 13, color: '#6B6B8A', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}
      >
        Comparer une dépense immédiate à des recettes futures exige <strong>d'actualiser</strong>.
      </motion.div>
    </div>
  )
}

/* ============ 2 — TEMPS ============ */

function TempsScene({ accent }) {
  const years = [0, 1, 2, 3, 4]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 12 }}>
        1 € AU FIL DU TEMPS (taux 10 %)
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 600, margin: '0 auto', height: 200 }}>
        {years.map((y, i) => {
          const val = 1 / Math.pow(1.10, y)
          const h = val * 180
          return (
            <motion.div
              key={y}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: h }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.5 }}
              style={{ width: 70, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: accent, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
                {val.toFixed(2)} €
              </div>
              <div style={{
                width: 50,
                height: h, borderRadius: '8px 8px 0 0',
                background: `linear-gradient(180deg, ${accent} 0%, ${accent}80 100%)`,
              }} />
              <div style={{ fontSize: 12, color: '#6B6B8A', marginTop: 6, fontWeight: 600 }}>
                Année {y}
              </div>
            </motion.div>
          )
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          maxWidth: 520, margin: '20px auto 0', padding: '12px 18px',
          background: `${accent}10`, borderRadius: 10, textAlign: 'center',
          fontSize: 12, color: '#1a1a2e',
        }}
      >
        Formule d'actualisation : <strong>F<sub>n</sub> ÷ (1 + t)<sup>n</sup></strong>
      </motion.div>
    </div>
  )
}

/* ============ 3 — FLUX ============ */

function FluxScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 14 }}>
        ÉCHÉANCIER DU PROJET
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 640, margin: '0 auto', position: 'relative', padding: '20px 0' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: 2,
          background: 'rgba(26,26,46,0.1)', transform: 'translateY(-50%)',
        }} />

        {/* I0 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: '#6B6B8A', marginBottom: 6 }}>An 0</div>
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            background: '#EF4444', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums',
            boxShadow: '0 6px 18px rgba(239,68,68,0.35)',
          }}>
            −100k
          </div>
          <div style={{ fontSize: 10, color: '#6B6B8A', marginTop: 6 }}>I₀</div>
        </motion.div>

        {FLUX.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: '#6B6B8A', marginBottom: 6 }}>An {i + 1}</div>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: '#10B981', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, fontVariantNumeric: 'tabular-nums',
            }}>
              +{(f / 1000).toFixed(0)}k
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          display: 'flex', justifyContent: 'space-around', maxWidth: 540, margin: '20px auto 0',
          fontSize: 13, fontWeight: 700, gap: 16,
        }}
      >
        <div style={{ textAlign: 'center', padding: '10px 18px', background: 'rgba(239,68,68,0.08)', borderRadius: 8 }}>
          <div style={{ fontSize: 10, color: '#EF4444', fontWeight: 800, letterSpacing: '0.08em', marginBottom: 2 }}>SORTIE</div>
          <div style={{ color: '#1a1a2e' }}>−100 000 €</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px 18px', background: 'rgba(16,185,129,0.08)', borderRadius: 8 }}>
          <div style={{ fontSize: 10, color: '#10B981', fontWeight: 800, letterSpacing: '0.08em', marginBottom: 2 }}>ENTRÉES</div>
          <div style={{ color: '#1a1a2e' }}>+150 000 €</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px 18px', background: `${accent}15`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, color: accent, fontWeight: 800, letterSpacing: '0.08em', marginBottom: 2 }}>TAUX</div>
          <div style={{ color: '#1a1a2e' }}>10 %</div>
        </div>
      </motion.div>
    </div>
  )
}

/* ============ 4 — VAN CALCUL ============ */

function VanScene({ accent, progress }) {
  const activeIdx = Math.min(3, Math.floor(progress / 25))
  const cumul = FLUX_ACTU.slice(0, activeIdx + 1).reduce((s, v) => s + v, 0)

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '8px 12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {/* Table flux actualisés */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 10 }}>
            FLUX ACTUALISÉS
          </div>
          <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(26,26,46,0.08)', fontFeatureSettings: '"tnum"' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr 1fr', background: `${accent}10` }}>
              {['An', 'Flux', '÷ (1+t)ⁿ', 'Actualisé'].map(h => (
                <div key={h} style={{ padding: '10px 6px', fontSize: 9, fontWeight: 800, color: accent, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {FLUX.map((f, i) => {
              const active = i === activeIdx
              const visible = i <= activeIdx
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '50px 1fr 1fr 1fr',
                    background: active ? `${accent}18` : (i % 2 ? 'rgba(0,0,0,0.02)' : 'white'),
                    borderTop: '1px solid rgba(0,0,0,0.04)',
                    transition: 'background 0.3s',
                  }}
                >
                  <div style={{ padding: '12px 6px', textAlign: 'center', fontWeight: 800, color: accent }}>{i + 1}</div>
                  <div style={{ padding: '12px 6px', textAlign: 'center', color: '#1a1a2e', fontWeight: 600 }}>
                    {f.toLocaleString('fr-FR')}
                  </div>
                  <div style={{ padding: '12px 6px', textAlign: 'center', fontSize: 11, color: '#6B6B8A' }}>
                    {Math.pow(1.10, i + 1).toFixed(3)}
                  </div>
                  <div style={{ padding: '12px 6px', textAlign: 'center', fontWeight: 800, color: visible ? accent : '#C4C4D8' }}>
                    <AnimatePresence mode="wait" initial={false}>
                      {visible ? (
                        <motion.span
                          key="v"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                          style={{ display: 'inline-block' }}
                        >
                          {Math.round(FLUX_ACTU[i]).toLocaleString('fr-FR')}
                        </motion.span>
                      ) : (
                        <motion.span key="d">—</motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {FLUX.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= activeIdx ? accent : 'rgba(26,26,46,0.10)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>

        {/* Carte VAN cumulée */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1, scale: 1,
            boxShadow: [`0 0 0 6px ${accent}40`, `0 0 0 0 ${accent}00`, `0 8px 24px ${accent}20`],
          }}
          transition={{ duration: 0.55, boxShadow: { duration: 0.9 } }}
          style={{
            background: 'white', borderRadius: 14, padding: '22px 24px',
            border: `1.5px solid ${accent}30`, position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: accent }} />

          <div style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 12 }}>
            Σ FLUX ACTUALISÉS
          </div>
          <motion.div
            key={`sum-${activeIdx}`}
            initial={{ scale: 0.6 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 0.2 }}
            style={{ fontSize: 30, fontWeight: 800, color: accent, fontVariantNumeric: 'tabular-nums' }}
          >
            {Math.round(cumul).toLocaleString('fr-FR')} €
          </motion.div>

          {activeIdx === 3 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ fontSize: 12, color: '#6B6B8A', marginTop: 16, marginBottom: 4 }}
              >
                − I₀ = − 100 000 €
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                transition={{ delay: 1.2, duration: 0.7, times: [0, 0.55, 1] }}
                style={{
                  marginTop: 8, padding: '10px 20px',
                  background: '#10B981', color: 'white', borderRadius: 10,
                  fontSize: 24, fontWeight: 800, fontVariantNumeric: 'tabular-nums',
                  boxShadow: '0 8px 20px rgba(16,185,129,0.35)',
                }}
              >
                VAN = +{Math.round(VAN).toLocaleString('fr-FR')} €
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ============ 5 — TRI ============ */

function TriScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '20px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 8 }}>
        TAUX DE RENTABILITÉ INTERNE
      </div>
      <div style={{ fontSize: 14, color: '#6B6B8A', marginBottom: 24, maxWidth: 540, margin: '0 auto 24px' }}>
        Le taux d'actualisation pour lequel <strong>VAN = 0</strong>.
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1, scale: 1,
          boxShadow: [`0 0 0 8px ${accent}40`, `0 0 0 0 ${accent}00`, `0 12px 28px ${accent}30`],
        }}
        transition={{ duration: 0.6, boxShadow: { duration: 1, delay: 0.3 } }}
        style={{
          display: 'inline-block', padding: '24px 36px',
          background: 'white', borderRadius: 16,
          border: `2px solid ${accent}30`, position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: accent }} />
        <div style={{ fontSize: 14, color: '#6B6B8A', marginBottom: 8 }}>Notre projet</div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.7, times: [0, 0.55, 1], delay: 0.4 }}
          style={{ fontSize: 56, fontWeight: 800, color: accent, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}
        >
          TRI = 17 %
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          marginTop: 24, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap',
        }}
      >
        <div style={{
          padding: '10px 20px', background: 'rgba(16,185,129,0.12)',
          border: '1.5px solid rgba(16,185,129,0.35)', borderRadius: 10,
          fontSize: 13, color: '#10B981', fontWeight: 700,
        }}>
          ✓ TRI 17 % &gt; Coût du capital 10 %
        </div>
        <div style={{
          padding: '10px 20px', background: 'rgba(16,185,129,0.12)',
          border: '1.5px solid rgba(16,185,129,0.35)', borderRadius: 10,
          fontSize: 13, color: '#10B981', fontWeight: 700,
        }}>
          ✓ Projet rentable
        </div>
      </motion.div>
    </div>
  )
}

/* ============ 6 — COURBE VAN ============ */

function CourbeScene({ accent }) {
  const W = 600
  const H = 280
  const PAD_L = 50
  const PAD_R = 30
  const PAD_T = 20
  const PAD_B = 40
  const PLOT_W = W - PAD_L - PAD_R
  const PLOT_H = H - PAD_T - PAD_B

  const vanMax = vanAt(0)
  const vanMin = vanAt(0.30)

  const xScale = (r) => PAD_L + (r / 0.30) * PLOT_W
  const yScale = (v) => PAD_T + (1 - (v - vanMin) / (vanMax - vanMin)) * PLOT_H

  let path = ''
  for (let r = 0; r <= 0.30; r += 0.005) {
    const x = xScale(r)
    const y = yScale(vanAt(r))
    path += (r === 0 ? 'M' : ' L') + x.toFixed(1) + ',' + y.toFixed(1)
  }

  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '12px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 8 }}>
        COURBE VAN(t)
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 660, display: 'block', margin: '0 auto' }}>
        <motion.line
          x1={PAD_L} y1={yScale(0)} x2={W - PAD_R} y2={yScale(0)}
          stroke="#999" strokeDasharray="4 4" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
        />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />

        {[0, 0.10, 0.20, 0.30].map(r => (
          <g key={r}>
            <line x1={xScale(r)} y1={H - PAD_B} x2={xScale(r)} y2={H - PAD_B + 5} stroke="#333" />
            <text x={xScale(r)} y={H - PAD_B + 18} fontSize="10" fill="#6B6B8A" textAnchor="middle">{(r * 100).toFixed(0)}%</text>
          </g>
        ))}
        {[20000, 0, -10000].map(v => (
          <g key={v}>
            <text x={PAD_L - 8} y={yScale(v) + 4} fontSize="10" fill="#6B6B8A" textAnchor="end">{(v / 1000).toFixed(0)}k</text>
          </g>
        ))}

        {/* Curve */}
        <motion.path
          d={path} stroke={accent} strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* TRI intersection point */}
        <motion.g
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <circle cx={xScale(TRI)} cy={yScale(0)} r="10" fill={accent} opacity="0.3">
            <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={xScale(TRI)} cy={yScale(0)} r="7" fill={accent} stroke="white" strokeWidth="2.5" />
          <text x={xScale(TRI)} y={yScale(0) - 16} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">
            TRI = 17%
          </text>
        </motion.g>

        {/* Cost of capital line */}
        <motion.line
          x1={xScale(0.10)} y1={PAD_T} x2={xScale(0.10)} y2={H - PAD_B}
          stroke="#6B6B8A" strokeDasharray="3 3" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        />
        <motion.text
          x={xScale(0.10)} y={PAD_T - 4} fontSize="10" fill="#6B6B8A" textAnchor="middle"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        >
          Coût capital 10%
        </motion.text>
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        style={{
          maxWidth: 540, margin: '8px auto 0', padding: '10px 16px',
          background: `${accent}10`, borderRadius: 8, textAlign: 'center',
          fontSize: 12, color: '#1a1a2e',
        }}
      >
        Zone <strong style={{ color: accent }}>verte</strong> (t &lt; 17 %) : VAN positive, projet rentable.
      </motion.div>
    </div>
  )
}

/* ============ 7 — INDICATEURS ============ */

function IndicateursScene({ accent }) {
  const indicateurs = [
    { lbl: 'VAN', val: `+${Math.round(VAN).toLocaleString('fr-FR')} €`, sub: 'Création de valeur', color: '#10B981', verdict: '✓' },
    { lbl: 'TRI', val: '17 %', sub: 'Rentabilité intrinsèque', color: accent, verdict: '✓' },
    { lbl: 'IP', val: IP.toFixed(2), sub: 'Valeur par € investi', color: '#0EA5E9', verdict: '✓' },
    { lbl: 'DR', val: '2,87 ans', sub: 'Délai de récupération', color: '#8B5CF6', verdict: '✓' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '20px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.12em', marginBottom: 16, textAlign: 'center' }}>
        TABLEAU DE BORD COMPLET
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, maxWidth: 720, margin: '0 auto' }}>
        {indicateurs.map((ind, i) => (
          <motion.div
            key={ind.lbl}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: 'white', borderRadius: 12, padding: '18px 14px',
              borderTop: `4px solid ${ind.color}`, textAlign: 'center',
              boxShadow: `0 4px 12px ${ind.color}20`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: ind.color, letterSpacing: '0.12em', marginBottom: 6 }}>
              {ind.lbl}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1, marginBottom: 4 }}>
              {ind.val}
            </div>
            <div style={{ fontSize: 10, color: '#6B6B8A', lineHeight: 1.4, marginBottom: 8 }}>{ind.sub}</div>
            <div style={{ fontSize: 14, color: '#10B981', fontWeight: 800 }}>{ind.verdict}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============ 8 — DÉCISION ============ */

function DecisionScene({ accent }) {
  return (
    <div style={{ width: '100%', maxWidth: '780px', padding: '20px 16px', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.7, times: [0, 0.55, 1], ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '18px 32px', borderRadius: 16,
          background: '#10B981', color: 'white',
          boxShadow: '0 12px 32px rgba(16,185,129,0.45)',
          marginBottom: 24,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>
          PROJET ACCEPTÉ
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ fontSize: 14, color: '#1a1a2e', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}
      >
        Création de valeur de <strong style={{ color: accent }}>17 030 €</strong>,
        rentabilité de <strong style={{ color: accent }}>17 %</strong> bien au-dessus du coût du capital,
        récupération en <strong style={{ color: accent }}>2,87 ans</strong>.
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          marginTop: 22, padding: '14px 22px',
          background: `${accent}10`, borderRadius: 10,
          fontSize: 12, color: '#6B6B8A', fontStyle: 'italic',
          maxWidth: 480, margin: '22px auto 0', lineHeight: 1.6,
        }}
      >
        En examen, formuler explicitement la décision avec les 4 indicateurs convergents = points garantis.
      </motion.div>
    </div>
  )
}
