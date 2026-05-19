import { useState, useMemo } from 'react'
import { VisualContainer } from './index.jsx'

// Projet exemple : I0 = 50 000, flux annuels [15000, 18000, 22000, 20000]
const I0 = 50000
const FLOWS = [15000, 18000, 22000, 20000]

function vanAt(rate) {
  const r = rate / 100
  let v = -I0
  FLOWS.forEach((f, i) => { v += f / Math.pow(1 + r, i + 1) })
  return v
}

// Solve TRI by bisection
function computeTRI() {
  let lo = 0, hi = 100
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (vanAt(mid) > 0) lo = mid; else hi = mid
  }
  return (lo + hi) / 2
}

const W = 760
const H = 360
const PAD_L = 70
const PAD_R = 30
const PAD_T = 30
const PAD_B = 70
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B

const TRI = computeTRI()
const VAN_MAX = vanAt(0)
const VAN_MIN = vanAt(30)

const xScale = (rate) => PAD_L + (rate / 30) * PLOT_W
const yScale = (van) => PAD_T + (1 - (van - VAN_MIN) / (VAN_MAX - VAN_MIN)) * PLOT_H

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR') + ' €'
}

export default function NPVChart({ color = '#6366F1' }) {
  const [rate, setRate] = useState(10)
  const van = useMemo(() => vanAt(rate), [rate])
  const isPositive = van >= 0

  // Build curve path
  const path = useMemo(() => {
    let d = ''
    for (let r = 0; r <= 30; r += 0.5) {
      const x = xScale(r); const y = yScale(vanAt(r))
      d += (r === 0 ? 'M' : ' L') + x.toFixed(1) + ',' + y.toFixed(1)
    }
    return d
  }, [])

  // Build positive/negative fill paths
  const posPath = useMemo(() => {
    let d = `M${xScale(0)},${yScale(0)}`
    for (let r = 0; r <= TRI; r += 0.5) {
      d += ` L${xScale(r).toFixed(1)},${yScale(vanAt(r)).toFixed(1)}`
    }
    d += ` L${xScale(TRI)},${yScale(0)} Z`
    return d
  }, [])
  const negPath = useMemo(() => {
    let d = `M${xScale(TRI)},${yScale(0)}`
    for (let r = TRI; r <= 30; r += 0.5) {
      d += ` L${xScale(r).toFixed(1)},${yScale(vanAt(r)).toFixed(1)}`
    }
    d += ` L${xScale(30)},${yScale(0)} Z`
    return d
  }, [])

  const cursorX = xScale(rate)
  const cursorY = yScale(van)

  // Indice de profitabilité (à 10%)
  const ip = (vanAt(10) + I0) / I0
  // Délai de récupération simple
  let cum = 0; let payback = 0
  for (let i = 0; i < FLOWS.length; i++) {
    cum += FLOWS[i]
    if (cum >= I0 && payback === 0) {
      payback = i + 1 - (cum - I0) / FLOWS[i]
    }
  }

  return (
    <VisualContainer subtitle="Faites glisser le taux d'actualisation. La VAN diminue à mesure que le taux augmente. Le TRI est le taux qui annule la VAN.">
      {/* Slider */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a2e' }}>Taux d'actualisation</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: color, fontFamily: 'monospace' }}>{rate.toFixed(1)} %</span>
        </div>
        <input
          type="range" min="0" max="30" step="0.5"
          value={rate}
          onChange={e => setRate(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: color }}
        />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        {/* Zones colorées */}
        <path d={posPath} fill={`${color}1A`} />
        <path d={negPath} fill="rgba(239,68,68,0.10)" />

        {/* Axes */}
        <line x1={PAD_L} y1={yScale(0)} x2={W - PAD_R} y2={yScale(0)} stroke="#999" strokeDasharray="4 4" strokeWidth="1" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />

        {/* Graduations X */}
        {[0, 5, 10, 15, 20, 25, 30].map(v => (
          <g key={v}>
            <line x1={xScale(v)} y1={H - PAD_B} x2={xScale(v)} y2={H - PAD_B + 5} stroke="#333" />
            <text x={xScale(v)} y={H - PAD_B + 18} fontSize="10" fill="#6B6B8A" textAnchor="middle">{v}%</text>
          </g>
        ))}
        {/* Graduations Y */}
        {[-15000, 0, 15000, 30000].map(v => {
          if (v < VAN_MIN || v > VAN_MAX) return null
          return (
            <g key={v}>
              <line x1={PAD_L - 5} y1={yScale(v)} x2={PAD_L} y2={yScale(v)} stroke="#333" />
              <text x={PAD_L - 10} y={yScale(v) + 4} fontSize="10" fill="#6B6B8A" textAnchor="end">{(v / 1000).toFixed(0)}k</text>
            </g>
          )
        })}

        {/* Courbe VAN */}
        <path d={path} stroke={color} strokeWidth="2.5" fill="none" />

        {/* Point TRI */}
        <circle cx={xScale(TRI)} cy={yScale(0)} r="8" fill={color} opacity="0.3">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={xScale(TRI)} cy={yScale(0)} r="6" fill={color} stroke="white" strokeWidth="2" />
        <text x={xScale(TRI)} y={yScale(0) - 14} fontSize="12" fontWeight="700" fill={color} textAnchor="middle">
          TRI = {TRI.toFixed(1)}%
        </text>

        {/* Curseur slider */}
        <line x1={cursorX} y1={PAD_T} x2={cursorX} y2={H - PAD_B} stroke="#1a1a2e" strokeDasharray="2 3" strokeWidth="1" opacity="0.5" />
        <circle cx={cursorX} cy={cursorY} r="7" fill={isPositive ? '#10B981' : '#EF4444'} stroke="white" strokeWidth="2.5" />

        {/* Labels axes */}
        <text x={W / 2} y={H - 28} fontSize="11" fontWeight="600" fill="#1a1a2e" textAnchor="middle">Taux d'actualisation</text>
        <text x={20} y={H / 2} fontSize="11" fontWeight="600" fill="#1a1a2e" textAnchor="middle" transform={`rotate(-90, 20, ${H / 2})`}>
          VAN (€)
        </text>
      </svg>

      {/* Résultat */}
      <div style={{
        marginTop: '14px',
        padding: '14px 18px',
        borderRadius: '12px',
        background: isPositive ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.10)',
        border: `1px solid ${isPositive ? 'rgba(16,185,129,0.30)' : 'rgba(239,68,68,0.30)'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#6B6B8A', marginBottom: '2px' }}>VAN à {rate.toFixed(1)}%</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: isPositive ? '#10B981' : '#EF4444', fontFamily: 'monospace' }}>
            {isPositive ? '+' : ''}{fmt(van)}
          </div>
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: isPositive ? '#10B981' : '#EF4444' }}>
          {isPositive ? '✓ Projet RENTABLE — investir' : '✗ Projet NON RENTABLE — refuser'}
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
        <div style={{ padding: '8px 12px', borderRadius: '8px', background: `${color}10`, border: `1px solid ${color}30`, fontSize: '11px', color: '#1a1a2e' }}>
          <strong style={{ color }}>IP</strong> = {ip.toFixed(2)} (à 10%)
        </div>
        <div style={{ padding: '8px 12px', borderRadius: '8px', background: `${color}10`, border: `1px solid ${color}30`, fontSize: '11px', color: '#1a1a2e' }}>
          <strong style={{ color }}>DRC</strong> ≈ {payback.toFixed(2)} ans
        </div>
        <div style={{ padding: '8px 12px', borderRadius: '8px', background: `${color}10`, border: `1px solid ${color}30`, fontSize: '11px', color: '#1a1a2e' }}>
          <strong style={{ color }}>I₀</strong> = {fmt(I0)}
        </div>
      </div>
    </VisualContainer>
  )
}
