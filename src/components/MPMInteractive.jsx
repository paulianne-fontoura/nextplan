import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './MPMInteractive.css'

/**
 * MPMInteractive — mini-graphe MPM simplifié (light theme)
 */

const NODES = [
  { id: 'DEBUT', label: 'Début', duree: 0, dto: 0, dta: 0, x: 60,  y: 160, critical: true },
  { id: 'A',     label: 'A',     duree: 4, dto: 0, dta: 0, x: 200, y: 80,  critical: true },
  { id: 'B',     label: 'B',     duree: 2, dto: 0, dta: 2, x: 200, y: 240, critical: false },
  { id: 'C',     label: 'C',     duree: 1, dto: 4, dta: 4, x: 380, y: 80,  critical: true },
  { id: 'D',     label: 'D',     duree: 1, dto: 4, dta: 4, x: 380, y: 240, critical: true },
  { id: 'FIN',   label: 'Fin',   duree: 0, dto: 5, dta: 5, x: 560, y: 160, critical: true },
]

const EDGES = [
  { from: 'DEBUT', to: 'A' },
  { from: 'DEBUT', to: 'B' },
  { from: 'A',     to: 'C' },
  { from: 'A',     to: 'D' },
  { from: 'B',     to: 'D' },
  { from: 'C',     to: 'FIN' },
  { from: 'D',     to: 'FIN' },
]

const COLOR_EDGE        = 'rgba(85, 87, 112, 0.5)'
const COLOR_EDGE_CRIT   = '#6B5FE4'
const COLOR_NODE_BG     = '#FFFFFF'
const COLOR_NODE_STROKE = '#9396B0'
const COLOR_NODE_CRIT   = '#6B5FE4'
const COLOR_TEXT        = '#1A1A2E'
const COLOR_NODE_ACTIVE = '#FFB830'

export default function MPMInteractive() {
  const [selectedId, setSelectedId] = useState(null)
  const [showCritical, setShowCritical] = useState(false)

  const selected = NODES.find((n) => n.id === selectedId)
  const getNode = (id) => NODES.find((n) => n.id === id)

  return (
    <div className="mpm-interactive">
      <div className="mpm-toolbar">
        <span className="caption accent-text">Démo interactive · sans inscription</span>
        <button
          className={`btn btn-sm ${showCritical ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setShowCritical((v) => !v)}
        >
          {showCritical ? 'Chemin critique affiché' : 'Afficher le chemin critique'}
        </button>
      </div>

      <div className="mpm-stage">
        <svg viewBox="0 0 640 320" className="mpm-svg" role="img" aria-label="Graphe MPM interactif">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={COLOR_EDGE}/>
            </marker>
            <marker id="arrow-critical" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={COLOR_EDGE_CRIT}/>
            </marker>
          </defs>

          {EDGES.map((edge, i) => {
            const from = getNode(edge.from)
            const to = getNode(edge.to)
            const isCritical = showCritical && from.critical && to.critical
            return (
              <motion.line
                key={i}
                x1={from.x + 30} y1={from.y}
                x2={to.x - 30}   y2={to.y}
                stroke={isCritical ? COLOR_EDGE_CRIT : COLOR_EDGE}
                strokeWidth={isCritical ? 2.5 : 1.5}
                markerEnd={`url(#${isCritical ? 'arrow-critical' : 'arrow'})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              />
            )
          })}

          {NODES.map((n, i) => {
            const isActive = selectedId === n.id
            const isCritical = showCritical && n.critical
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setSelectedId(n.id)}
                className="mpm-node"
                role="button"
                style={{ outline: 'none' }}
              >
                <circle
                  cx={n.x} cy={n.y} r={28}
                  fill={isCritical ? COLOR_NODE_CRIT : COLOR_NODE_BG}
                  stroke={isActive ? COLOR_NODE_ACTIVE : (isCritical ? COLOR_NODE_CRIT : COLOR_NODE_STROKE)}
                  strokeWidth={isActive ? 3 : 1.8}
                />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="14"
                  fontWeight="700"
                  fill={isCritical ? '#fff' : COLOR_TEXT}
                  pointerEvents="none"
                >
                  {n.label}
                </text>
                {n.id !== 'DEBUT' && n.id !== 'FIN' && (
                  <text
                    x={n.x} y={n.y + 48}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="#555770"
                    pointerEvents="none"
                  >
                    durée : {n.duree}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>

        <AnimatePresence>
          {selected && (
            <motion.aside
              className="mpm-panel"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <button className="mpm-panel-close" onClick={() => setSelectedId(null)} aria-label="Fermer">×</button>
              <span className="caption accent-text">Tâche</span>
              <h4 className="mpm-panel-title">{selected.label}</h4>

              {selected.id === 'DEBUT' || selected.id === 'FIN' ? (
                <p className="mpm-panel-note">
                  Nœud {selected.id === 'DEBUT' ? 'de départ' : "d'arrivée"} du projet.
                  Durée nulle, sert à ancrer le réseau.
                </p>
              ) : (
                <>
                  <div className="mpm-panel-row">
                    <span className="caption">Durée</span>
                    <span className="mono">{selected.duree}</span>
                  </div>
                  <div className="mpm-panel-row">
                    <span className="caption">DTO</span>
                    <span className="mono">{selected.dto}</span>
                  </div>
                  <div className="mpm-panel-row">
                    <span className="caption">DTA</span>
                    <span className="mono">{selected.dta}</span>
                  </div>
                  <div className="mpm-panel-row">
                    <span className="caption">Marge</span>
                    <span className="mono">{selected.dta - selected.dto}</span>
                  </div>
                  <div className={`mpm-panel-tag ${selected.critical ? 'is-critical' : ''}`}>
                    {selected.critical ? 'Tâche critique' : 'Tâche avec marge'}
                  </div>
                </>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <p className="mpm-hint">
        Cliquez sur un nœud pour voir ses informations. Activez le chemin critique
        pour visualiser les tâches sans marge.
      </p>
    </div>
  )
}
