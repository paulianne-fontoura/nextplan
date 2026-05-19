import { useState, useEffect } from 'react'
import { VisualContainer } from './index.jsx'

const NODES = [
  { id: 'root',  label: 'Budget maître',         level: 0, x: 60,  y: 200, w: 130, h: 56, desc: 'Document de synthèse qui consolide tous les budgets opérationnels et financiers de l\'entreprise.' },
  { id: 'ventes', label: 'Budget des ventes',    level: 1, x: 270, y: 70,  w: 150, h: 48, desc: 'Prévision du chiffre d\'affaires selon volume × prix. Pilote tous les autres budgets en amont.' },
  { id: 'prod',   label: 'Budget de production', level: 1, x: 270, y: 175, w: 150, h: 48, desc: 'Quantités à produire pour répondre aux ventes prévues, ajustées des stocks.' },
  { id: 'invest', label: 'Budget des invest.',   level: 1, x: 270, y: 280, w: 150, h: 48, desc: 'Acquisitions d\'immobilisations sur l\'horizon budgétaire (machines, équipements, R&D).' },
  { id: 'treso',  label: 'Budget de trésorerie', level: 1, x: 270, y: 360, w: 150, h: 48, desc: 'Synthèse finale : encaissements − décaissements. Indique les besoins de financement.' },
  { id: 'vol',    label: 'Volume',               level: 2, x: 500, y: 40,  w: 110, h: 36, desc: 'Quantités de produits prévues à la vente.' },
  { id: 'prix',   label: 'Prix unitaire',        level: 2, x: 500, y: 90,  w: 110, h: 36, desc: 'Prix de vente prévu par unité.' },
  { id: 'mat',    label: 'Matières 1ères',       level: 2, x: 500, y: 145, w: 110, h: 36, desc: 'Consommation de matières × coût unitaire.' },
  { id: 'mo',     label: 'Main d\'œuvre',        level: 2, x: 500, y: 190, w: 110, h: 36, desc: 'Heures × taux horaire de la main-d\'œuvre directe.' },
  { id: 'ind',    label: 'Charges indirectes',   level: 2, x: 500, y: 235, w: 110, h: 36, desc: 'Charges fixes et variables imputées via taux de répartition.' },
]

const LINKS = [
  ['root', 'ventes'], ['root', 'prod'], ['root', 'invest'], ['root', 'treso'],
  ['ventes', 'vol'], ['ventes', 'prix'],
  ['prod', 'mat'], ['prod', 'mo'], ['prod', 'ind'],
]

function findNode(id) { return NODES.find(n => n.id === id) }
function bezier(a, b) {
  const x1 = a.x + a.w
  const y1 = a.y + a.h / 2
  const x2 = b.x
  const y2 = b.y + b.h / 2
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
}

export default function BudgetTree({ color = '#6366F1' }) {
  const [hover, setHover] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <VisualContainer subtitle="Lecture de gauche à droite : le budget maître se décompose en budgets opérationnels, eux-mêmes alimentés par des prévisions détaillées.">
      <svg viewBox="0 0 900 420" width="100%" style={{ display: 'block' }}>
        {/* Liens */}
        {LINKS.map(([from, to], i) => {
          const a = findNode(from); const b = findNode(to)
          if (!a || !b) return null
          return (
            <path
              key={i}
              d={bezier(a, b)}
              stroke={`${color}80`}
              strokeWidth="1.8"
              fill="none"
              opacity={mounted ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${(a.level * 200) + 100}ms` }}
            />
          )
        })}

        {/* Nœuds */}
        {NODES.map((n, i) => {
          const isHover = hover === n.id
          const isRoot = n.level === 0
          const isMid = n.level === 1
          const fill = isRoot ? color : isMid ? `${color}26` : 'white'
          const stroke = isRoot ? color : isMid ? `${color}80` : '#D0D0E8'
          const txt = isRoot ? 'white' : isMid ? '#1a1a2e' : '#5a5a7a'

          return (
            <g
              key={n.id}
              style={{
                transform: `translate(${n.x}px, ${n.y}px) scale(${mounted ? 1 : 0})`,
                transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px`,
                transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${n.level * 150}ms`,
                cursor: 'pointer',
                filter: isHover ? `drop-shadow(0 6px 16px ${color}55)` : 'none',
              }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
            >
              <rect
                width={n.w} height={n.h} rx="10"
                fill={fill}
                stroke={stroke}
                strokeWidth={isHover ? 2 : 1.5}
                style={{ transition: 'stroke-width 0.2s' }}
              />
              <text
                x={n.w / 2} y={n.h / 2 + 4}
                fontSize={isRoot ? '14' : isMid ? '12' : '11'}
                fontWeight={isRoot ? 800 : isMid ? 700 : 600}
                fill={txt}
                textAnchor="middle"
              >
                {n.label}
              </text>
            </g>
          )
        })}

        {/* Tooltip */}
        {hover && (() => {
          const n = findNode(hover)
          const tx = Math.min(680, n.x + n.w / 2 - 110)
          const ty = n.y > 200 ? n.y - 60 : n.y + n.h + 12
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width="220" height="50" rx="8" fill="white" stroke="#E8E6F0" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.12))" />
              <text x={tx + 12} y={ty + 18} fontSize="12" fontWeight="700" fill="#1a1a2e">{n.label}</text>
              <foreignObject x={tx + 12} y={ty + 22} width="200" height="26">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '10.5px', color: '#6B6B8A', lineHeight: 1.35 }}>
                  {n.desc}
                </div>
              </foreignObject>
            </g>
          )
        })()}
      </svg>
    </VisualContainer>
  )
}
