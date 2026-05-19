import { useState, useEffect } from 'react'
import { VisualContainer } from './index.jsx'

const DAS = [
  { id: 'A', pdmr: 0.22, taux: 10, ca: 24,  color: '#EF4444' },
  { id: 'B', pdmr: 0.92, taux: 18, ca: 35,  color: '#F59E0B' },
  { id: 'C', pdmr: 1.39, taux: 14, ca: 260, color: '#10B981' },
  { id: 'D', pdmr: 0.50, taux: 3,  ca: 83,  color: '#6366F1' },
  { id: 'E', pdmr: 0.86, taux: 18, ca: 18,  color: '#F59E0B' },
  { id: 'F', pdmr: 1.41, taux: 16, ca: 635, color: '#10B981' },
  { id: 'G', pdmr: 1.09, taux: 9,  ca: 93,  color: '#8B5CF6' },
]

const W = 800
const H = 500
const PAD_L = 70
const PAD_R = 40
const PAD_T = 30
const PAD_B = 60
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B

// X axis: log10(pdmr) from log10(3)=0.477 (left) to log10(0.1)=-1 (right) — inverted
const X_MIN = -1
const X_MAX = 0.5
const xScale = (pdmr) => {
  const v = Math.log10(Math.max(0.1, pdmr))
  return PAD_L + (1 - (v - X_MIN) / (X_MAX - X_MIN)) * PLOT_W
}
// Y axis: 0 (bottom) to 20 (top)
const yScale = (taux) => PAD_T + (1 - taux / 20) * PLOT_H
// Radius based on CA (max 635 → 50px, min 12px)
const rScale = (ca) => Math.max(12, Math.sqrt(ca / 635) * 50)

const X_MID = xScale(1)
const Y_MID = yScale(12)

export default function BCGMatrix({ color = '#6366F1' }) {
  const [hover, setHover] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <VisualContainer subtitle="Survolez chaque DAS pour explorer sa position stratégique. La taille du cercle reflète son chiffre d'affaires.">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        {/* Quadrants colorés très pâles */}
        <rect x={PAD_L}  y={PAD_T} width={X_MID - PAD_L} height={Y_MID - PAD_T} fill="rgba(16,185,129,0.08)" />
        <rect x={X_MID}  y={PAD_T} width={W - PAD_R - X_MID} height={Y_MID - PAD_T} fill="rgba(245,158,11,0.08)" />
        <rect x={PAD_L}  y={Y_MID} width={X_MID - PAD_L} height={H - PAD_B - Y_MID} fill="rgba(99,102,241,0.08)" />
        <rect x={X_MID}  y={Y_MID} width={W - PAD_R - X_MID} height={H - PAD_B - Y_MID} fill="rgba(239,68,68,0.08)" />

        {/* Labels des quadrants */}
        <text x={PAD_L + 16} y={PAD_T + 24} fontSize="13" fontWeight="600" fill="rgba(16,185,129,0.6)">Vedettes</text>
        <text x={X_MID + 16} y={PAD_T + 24} fontSize="13" fontWeight="600" fill="rgba(245,158,11,0.7)">Dilemmes</text>
        <text x={PAD_L + 16} y={H - PAD_B - 10} fontSize="13" fontWeight="600" fill="rgba(99,102,241,0.6)">Vaches à lait</text>
        <text x={X_MID + 16} y={H - PAD_B - 10} fontSize="13" fontWeight="600" fill="rgba(239,68,68,0.6)">Poids morts</text>

        {/* Lignes médianes pointillées */}
        <line x1={X_MID} y1={PAD_T} x2={X_MID} y2={H - PAD_B} stroke="#999" strokeDasharray="4 4" strokeWidth="1" />
        <line x1={PAD_L} y1={Y_MID} x2={W - PAD_R} y2={Y_MID} stroke="#999" strokeDasharray="4 4" strokeWidth="1" />

        {/* Axes */}
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#333" strokeWidth="1.5" />

        {/* Graduations X */}
        {[3, 2, 1, 0.5, 0.2].map(v => (
          <g key={v}>
            <line x1={xScale(v)} y1={H - PAD_B} x2={xScale(v)} y2={H - PAD_B + 5} stroke="#333" />
            <text x={xScale(v)} y={H - PAD_B + 18} fontSize="11" fill="#6B6B8A" textAnchor="middle">{v}x</text>
          </g>
        ))}
        {/* Graduations Y */}
        {[0, 5, 10, 12, 15, 20].map(v => (
          <g key={v}>
            <line x1={PAD_L - 5} y1={yScale(v)} x2={PAD_L} y2={yScale(v)} stroke="#333" />
            <text x={PAD_L - 10} y={yScale(v) + 4} fontSize="11" fill="#6B6B8A" textAnchor="end">{v}%</text>
          </g>
        ))}

        {/* Labels axes */}
        <text x={W / 2} y={H - 15} fontSize="12" fontWeight="600" fill="#1a1a2e" textAnchor="middle">
          ← Part de marché relative (PDMr)
        </text>
        <text x={20} y={H / 2} fontSize="12" fontWeight="600" fill="#1a1a2e" textAnchor="middle" transform={`rotate(-90, 20, ${H / 2})`}>
          Taux de croissance %
        </text>

        {/* DAS bubbles */}
        {DAS.map((d, i) => {
          const cx = xScale(d.pdmr)
          const cy = yScale(d.taux)
          const r = rScale(d.ca)
          const isHover = hover === d.id
          const scale = mounted ? (isHover ? 1.15 : 1) : 0
          return (
            <g
              key={d.id}
              style={{
                transform: `translate(${cx}px, ${cy}px) scale(${scale})`,
                transformOrigin: '0 0',
                transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms, opacity 0.4s`,
                cursor: 'pointer',
                opacity: mounted ? 1 : 0,
              }}
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
            >
              <circle r={r} fill={d.color} opacity={isHover ? 1 : 0.7} stroke="white" strokeWidth={isHover ? 3 : 2} />
              <text x={0} y={5} fontSize="13" fontWeight="700" fill="white" textAnchor="middle">{d.id}</text>
            </g>
          )
        })}

        {/* Tooltip */}
        {hover && (() => {
          const d = DAS.find(x => x.id === hover)
          const cx = xScale(d.pdmr)
          const cy = yScale(d.taux)
          const r = rScale(d.ca)
          const tx = Math.min(W - PAD_R - 180, Math.max(PAD_L, cx - 90))
          const ty = cy - r - 65
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width="180" height="56" rx="8" fill="white" stroke="#E8E6F0" strokeWidth="1" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.12))" />
              <text x={tx + 12} y={ty + 18} fontSize="12" fontWeight="700" fill="#1a1a2e">DAS {d.id}</text>
              <text x={tx + 12} y={ty + 34} fontSize="11" fill="#6B6B8A">PDMr : {d.pdmr}x</text>
              <text x={tx + 12} y={ty + 48} fontSize="11" fill="#6B6B8A">Croissance : {d.taux}% · CA : {d.ca}</text>
            </g>
          )
        })()}
      </svg>
    </VisualContainer>
  )
}
