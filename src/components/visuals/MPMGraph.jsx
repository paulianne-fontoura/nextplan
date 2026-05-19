import { useState, useEffect } from 'react'
import { VisualContainer } from './index.jsx'

const TASKS = [
  { id: 'Début', dto: 0,  dta: 0,  dur: 0, x: 60,  y: 240 },
  { id: 'A',     dto: 0,  dta: 0,  dur: 4, x: 180, y: 130 },
  { id: 'B',     dto: 0,  dta: 4,  dur: 2, x: 180, y: 340 },
  { id: 'C',     dto: 4,  dta: 4,  dur: 1, x: 300, y: 80  },
  { id: 'D',     dto: 4,  dta: 6,  dur: 1, x: 300, y: 220 },
  { id: 'E',     dto: 4,  dta: 6,  dur: 2, x: 300, y: 360 },
  { id: 'F',     dto: 5,  dta: 5,  dur: 2, x: 420, y: 80  },
  { id: 'G',     dto: 7,  dta: 7,  dur: 2, x: 540, y: 150 },
  { id: 'H',     dto: 6,  dta: 8,  dur: 1, x: 540, y: 350 },
  { id: 'I',     dto: 9,  dta: 9,  dur: 4, x: 660, y: 240 },
  { id: 'J',     dto: 13, dta: 13, dur: 1, x: 780, y: 240 },
  { id: 'Fin',   dto: 14, dta: 14, dur: 0, x: 880, y: 240 },
]

const LINKS = [
  { from: 'Début', to: 'A' }, { from: 'Début', to: 'B' },
  { from: 'A', to: 'C' }, { from: 'A', to: 'D' }, { from: 'A', to: 'E' },
  { from: 'B', to: 'D' },
  { from: 'C', to: 'F' }, { from: 'F', to: 'G' },
  { from: 'D', to: 'G' }, { from: 'E', to: 'H' },
  { from: 'G', to: 'I' }, { from: 'H', to: 'I' },
  { from: 'I', to: 'J' }, { from: 'J', to: 'Fin' },
]

const CRITICAL = ['Début', 'A', 'C', 'F', 'G', 'I', 'J', 'Fin']
const NODE_W = 72
const NODE_H = 52

function findTask(id) { return TASKS.find(t => t.id === id) }

export default function MPMGraph({ color = '#6366F1' }) {
  const [hover, setHover] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <VisualContainer subtitle="Le chemin critique (en couleur) détermine la durée minimale du projet. Survolez les tâches pour voir leurs marges.">
      <svg viewBox="0 0 960 460" width="100%" style={{ display: 'block' }}>
        <defs>
          <marker id="arrow-critical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
          <marker id="arrow-normal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C4C4D8" />
          </marker>
        </defs>

        {/* Liens */}
        {LINKS.map((l, i) => {
          const a = findTask(l.from); const b = findTask(l.to)
          if (!a || !b) return null
          const isCrit = CRITICAL.includes(l.from) && CRITICAL.includes(l.to)
          const x1 = a.x + NODE_W / 2
          const y1 = a.y
          const x2 = b.x - NODE_W / 2 - 4
          const y2 = b.y
          const len = Math.hypot(x2 - x1, y2 - y1)
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isCrit ? color : '#C4C4D8'}
              strokeWidth={isCrit ? 2.5 : 1.5}
              markerEnd={`url(#${isCrit ? 'arrow-critical' : 'arrow-normal'})`}
              strokeDasharray={len}
              strokeDashoffset={mounted ? 0 : len}
              style={{ transition: `stroke-dashoffset 1s ease ${i * 60}ms` }}
            />
          )
        })}

        {/* Nœuds */}
        {TASKS.map((t, i) => {
          const isCrit = CRITICAL.includes(t.id)
          const isHover = hover === t.id
          return (
            <g
              key={t.id}
              style={{
                transform: `translate(${t.x - NODE_W / 2}px, ${t.y - NODE_H / 2}px) scale(${isHover ? 1.05 : 1})`,
                transformOrigin: `${t.x}px ${t.y}px`,
                transition: 'transform 0.25s ease, filter 0.25s ease',
                filter: isHover && isCrit ? `drop-shadow(0 0 12px ${color}66)` : isHover ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHover(t.id)}
              onMouseLeave={() => setHover(null)}
            >
              <rect
                width={NODE_W} height={NODE_H} rx="9"
                fill={isCrit ? `${color}1F` : 'white'}
                stroke={isCrit ? color : '#D0D0E8'}
                strokeWidth={isCrit ? 2 : 1.5}
              />
              <text x={NODE_W / 2} y={20} fontSize="14" fontWeight="800" fill={isCrit ? color : '#1a1a2e'} textAnchor="middle">
                {t.id}
              </text>
              <text x={6} y={36} fontSize="10" fill="#6B6B8A">DTO {t.dto}</text>
              <text x={NODE_W - 6} y={36} fontSize="10" fill="#6B6B8A" textAnchor="end">{t.dur}h</text>
              <text x={6} y={48} fontSize="10" fill="#6B6B8A">DTA {t.dta}</text>
            </g>
          )
        })}

        {/* Tooltip */}
        {hover && (() => {
          const t = findTask(hover)
          const marge = t.dta - t.dto
          const isCrit = CRITICAL.includes(t.id)
          const tx = Math.min(780, Math.max(20, t.x - 100))
          const ty = t.y - NODE_H / 2 - 70
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width="200" height="60" rx="8" fill="white" stroke="#E8E6F0" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.12))" />
              <text x={tx + 12} y={ty + 18} fontSize="12" fontWeight="700" fill={isCrit ? color : '#1a1a2e'}>
                {t.id === 'Début' || t.id === 'Fin' ? `Évènement ${t.id}` : `Tâche ${t.id}`}
              </text>
              <text x={tx + 12} y={ty + 34} fontSize="11" fill="#6B6B8A">Durée {t.dur}h · DTO {t.dto} · DTA {t.dta}</text>
              <text x={tx + 12} y={ty + 50} fontSize="11" fontWeight="600" fill={marge === 0 ? color : '#6B6B8A'}>
                {marge === 0 ? 'CRITIQUE — aucune marge' : `Marge libre : ${marge}h`}
              </text>
            </g>
          )
        })()}
      </svg>

      {/* Légende */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '12px', color: '#6B6B8A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '12px', borderRadius: '3px', background: `${color}1F`, border: `2px solid ${color}` }} />
          <span>Tâche critique (marge = 0)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '12px', borderRadius: '3px', background: 'white', border: '1.5px solid #D0D0E8' }} />
          <span>Tâche non critique</span>
        </div>
      </div>
    </VisualContainer>
  )
}
