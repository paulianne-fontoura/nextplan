import { useState } from 'react'
import { VisualContainer } from './index.jsx'

// Cascade : Prévu → Δ prix → Δ volume → Δ rendement → Réel
const SCENARIOS = {
  fav: {
    label: 'Écarts favorables',
    bars: [
      { id: 'prevu',  label: 'Coût prévu',     value: 100000, type: 'base' },
      { id: 'prix',   label: 'Δ Prix',         value: -3500,  type: 'fav', desc: 'Différence (prix réel − prix prévu) × quantité réelle. Favorable : matières achetées moins chères.' },
      { id: 'vol',    label: 'Δ Volume',       value: -2200,  type: 'fav', desc: 'Différence (quantité réelle − quantité prévue) × prix prévu. Favorable : moins de quantité consommée.' },
      { id: 'rdt',    label: 'Δ Rendement',    value: -1800,  type: 'fav', desc: 'Écart sur efficacité de la main-d\'œuvre ou des machines. Favorable : meilleure productivité.' },
      { id: 'reel',   label: 'Coût réel',      value: 92500,  type: 'result' },
    ],
  },
  def: {
    label: 'Écarts défavorables',
    bars: [
      { id: 'prevu',  label: 'Coût prévu',     value: 100000, type: 'base' },
      { id: 'prix',   label: 'Δ Prix',         value: 4200,   type: 'def', desc: 'Différence (prix réel − prix prévu) × quantité réelle. Défavorable : hausse des matières premières.' },
      { id: 'vol',    label: 'Δ Volume',       value: 2800,   type: 'def', desc: 'Différence (quantité réelle − quantité prévue) × prix prévu. Défavorable : consommation excessive.' },
      { id: 'rdt',    label: 'Δ Rendement',    value: 1500,   type: 'def', desc: 'Écart sur efficacité. Défavorable : pannes ou baisse de productivité.' },
      { id: 'reel',   label: 'Coût réel',      value: 108500, type: 'result' },
    ],
  },
}

const H = 320
const W = 720
const PAD_T = 30
const PAD_B = 70
const PLOT_H = H - PAD_T - PAD_B

function fmt(n) {
  return n.toLocaleString('fr-FR') + ' €'
}

export default function EcartsVisual({ color = '#6366F1' }) {
  const [scen, setScen] = useState('fav')
  const [hover, setHover] = useState(null)
  const data = SCENARIOS[scen]

  // Compute waterfall positions
  const maxVal = 110000
  const yScale = (v) => PAD_T + (1 - v / maxVal) * PLOT_H
  let running = 0
  const positions = data.bars.map(b => {
    if (b.type === 'base') {
      running = b.value
      return { start: 0, end: b.value }
    }
    if (b.type === 'result') {
      return { start: 0, end: b.value }
    }
    const start = running
    running += b.value
    return { start, end: running }
  })

  const barW = 100
  const gap = 24
  const totalW = data.bars.length * barW + (data.bars.length - 1) * gap
  const startX = (W - totalW) / 2

  return (
    <VisualContainer subtitle="Décomposition d'un coût en cascade : chaque écart explique la différence entre prévu et réel. Cliquez sur le sélecteur pour comparer les scénarios.">
      {/* Sélecteur */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {Object.entries(SCENARIOS).map(([k, s]) => (
          <button
            key={k}
            onClick={() => setScen(k)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: `1.5px solid ${scen === k ? color : '#D0D0E8'}`,
              background: scen === k ? `${color}15` : 'white',
              color: scen === k ? color : '#6B6B8A',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        {/* Axe Y */}
        <line x1={50} y1={PAD_T} x2={50} y2={H - PAD_B} stroke="#999" strokeWidth="1" />
        {[0, 25000, 50000, 75000, 100000].map(v => (
          <g key={v}>
            <line x1={45} y1={yScale(v)} x2={W - 20} y2={yScale(v)} stroke="#E8E6F0" strokeDasharray="3 3" />
            <text x={42} y={yScale(v) + 4} fontSize="10" fill="#6B6B8A" textAnchor="end">{(v / 1000)}k</text>
          </g>
        ))}

        {/* Barres */}
        {data.bars.map((b, i) => {
          const p = positions[i]
          const x = startX + i * (barW + gap)
          const y1 = yScale(Math.max(p.start, p.end))
          const y2 = yScale(Math.min(p.start, p.end))
          const isFav = b.type === 'fav'
          const isDef = b.type === 'def'
          const isBase = b.type === 'base'
          const isResult = b.type === 'result'
          const fillCol = isBase ? color : isResult ? (scen === 'fav' ? '#10B981' : '#EF4444') : isFav ? '#10B981' : '#EF4444'
          const isHover = hover === b.id

          return (
            <g
              key={b.id}
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: b.desc ? 'pointer' : 'default' }}
            >
              <rect
                x={x} y={y1}
                width={barW} height={Math.max(2, y2 - y1)}
                fill={fillCol}
                opacity={isHover ? 1 : 0.85}
                rx="6"
                style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              <text x={x + barW / 2} y={H - PAD_B + 18} fontSize="11" fontWeight="600" fill="#1a1a2e" textAnchor="middle">{b.label}</text>
              <text x={x + barW / 2} y={H - PAD_B + 34} fontSize="10" fill={fillCol} textAnchor="middle" fontWeight="700">
                {(isFav ? '−' : isDef ? '+' : '')}{fmt(Math.abs(b.value))}
              </text>
              {/* Connector line to next */}
              {i < data.bars.length - 1 && !isResult && (
                <line
                  x1={x + barW} y1={yScale(p.end)}
                  x2={x + barW + gap} y2={yScale(p.end)}
                  stroke="#999" strokeDasharray="3 3" strokeWidth="1"
                />
              )}
            </g>
          )
        })}

        {/* Tooltip */}
        {hover && (() => {
          const idx = data.bars.findIndex(b => b.id === hover)
          const b = data.bars[idx]
          if (!b.desc) return null
          const x = startX + idx * (barW + gap)
          const tx = Math.min(W - 270, Math.max(20, x - 80))
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={4} width="260" height="48" rx="8" fill="white" stroke="#E8E6F0" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.12))" />
              <text x={tx + 12} y={20} fontSize="11" fontWeight="700" fill="#1a1a2e">{b.label}</text>
              <foreignObject x={tx + 12} y={24} width="240" height="24">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '10.5px', color: '#6B6B8A', lineHeight: 1.4 }}>
                  {b.desc}
                </div>
              </foreignObject>
            </g>
          )
        })()}
      </svg>

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
        <div style={{
          padding: '10px 18px',
          borderRadius: '10px',
          background: scen === 'fav' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${scen === 'fav' ? '#10B98140' : '#EF444440'}`,
          fontSize: '12px',
          color: '#1a1a2e',
        }}>
          Écart global :{' '}
          <strong style={{ color: scen === 'fav' ? '#10B981' : '#EF4444' }}>
            {scen === 'fav' ? '−' : '+'}{fmt(Math.abs(data.bars[4].value - data.bars[0].value))}
          </strong>
          {' '}({scen === 'fav' ? 'favorable' : 'défavorable'})
        </div>
      </div>
    </VisualContainer>
  )
}
