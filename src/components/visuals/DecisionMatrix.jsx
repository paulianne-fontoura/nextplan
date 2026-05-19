import { useState, useMemo } from 'react'
import { VisualContainer } from './index.jsx'

const STRATEGIES = ['Stratégie A', 'Stratégie B', 'Stratégie C']
const ETATS = ['Favorable', 'Neutre', 'Défavorable']
const VALUES = [
  [120, 80, 20],
  [90,  90, 60],
  [70,  75, 65],
]

const CRITERIA = [
  { id: 'maximax', label: 'Maximax', desc: "L'optimiste : choisit la stratégie qui maximise le gain maximum possible.", col: 'Max' },
  { id: 'maximin', label: 'Maximin / Wald', desc: "Le prudent : choisit la stratégie qui maximise le pire des gains.", col: 'Min' },
  { id: 'laplace', label: 'Laplace', desc: "L'équiprobable : moyenne arithmétique des gains, tous les états sont équiprobables.", col: 'Moy.' },
  { id: 'savage',  label: 'Savage / Minimax regret', desc: "Le regret : minimise le regret maximum (matrice des regrets).", col: 'Regret max' },
]

function computeExtra(critId) {
  switch (critId) {
    case 'maximax':
      return VALUES.map(row => Math.max(...row))
    case 'maximin':
      return VALUES.map(row => Math.min(...row))
    case 'laplace':
      return VALUES.map(row => row.reduce((a, b) => a + b, 0) / row.length)
    case 'savage': {
      // Regrets : maxi de chaque colonne − valeur
      const colMax = ETATS.map((_, j) => Math.max(...VALUES.map(r => r[j])))
      const regrets = VALUES.map(row => row.map((v, j) => colMax[j] - v))
      return regrets.map(r => Math.max(...r))
    }
    default: return []
  }
}

function winnerIndex(critId, extras) {
  if (critId === 'savage') return extras.indexOf(Math.min(...extras))
  return extras.indexOf(Math.max(...extras))
}

export default function DecisionMatrix({ color = '#6366F1' }) {
  const [critId, setCritId] = useState('maximax')
  const crit = CRITERIA.find(c => c.id === critId)
  const extras = useMemo(() => computeExtra(critId), [critId])
  const winner = winnerIndex(critId, extras)

  // For Savage, also show regret matrix
  const savageRegrets = useMemo(() => {
    if (critId !== 'savage') return null
    const colMax = ETATS.map((_, j) => Math.max(...VALUES.map(r => r[j])))
    return VALUES.map(row => row.map((v, j) => colMax[j] - v))
  }, [critId])

  return (
    <VisualContainer subtitle="Choisissez un critère de décision : la stratégie gagnante change selon la philosophie adoptée face à l'incertitude.">
      {/* Sélecteur de critères */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CRITERIA.map(c => (
          <button
            key={c.id}
            onClick={() => setCritId(c.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '999px',
              border: `1.5px solid ${critId === c.id ? color : '#D0D0E8'}`,
              background: critId === c.id ? `${color}15` : 'white',
              color: critId === c.id ? color : '#6B6B8A',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div style={{
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid #E8E6F0',
        background: 'white',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8F7FF' }}>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B6B8A', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #E8E6F0' }}>
                Stratégie
              </th>
              {ETATS.map(e => (
                <th key={e} style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#6B6B8A', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #E8E6F0' }}>
                  {e}
                </th>
              ))}
              <th style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #E8E6F0', borderLeft: `2px solid ${color}40` }}>
                {crit.col}
              </th>
            </tr>
          </thead>
          <tbody>
            {STRATEGIES.map((s, i) => {
              const isWinner = i === winner
              return (
                <tr key={s} style={{
                  background: isWinner ? `${color}15` : 'transparent',
                  borderLeft: isWinner ? `3px solid ${color}` : '3px solid transparent',
                  transition: 'all 0.4s ease',
                }}>
                  <td style={{ padding: '14px', fontWeight: isWinner ? 700 : 600, color: isWinner ? color : '#1a1a2e', borderBottom: i < STRATEGIES.length - 1 ? '1px solid #F0EEF8' : 'none' }}>
                    {s}
                    {isWinner && <span style={{ marginLeft: 8, fontSize: '11px', fontWeight: 700, color }}>✓</span>}
                  </td>
                  {VALUES[i].map((v, j) => {
                    const showRegret = critId === 'savage'
                    const reg = savageRegrets?.[i][j]
                    return (
                      <td key={j} style={{
                        padding: '14px', textAlign: 'center',
                        color: isWinner ? color : '#3a3a5a',
                        fontWeight: isWinner ? 700 : 500,
                        fontFamily: 'monospace',
                        borderBottom: i < STRATEGIES.length - 1 ? '1px solid #F0EEF8' : 'none',
                      }}>
                        <div>{v}</div>
                        {showRegret && (
                          <div style={{ fontSize: '10px', color: '#9090b0', marginTop: 2 }}>regret : {reg}</div>
                        )}
                      </td>
                    )
                  })}
                  <td style={{
                    padding: '14px', textAlign: 'center',
                    background: isWinner ? `${color}25` : `${color}08`,
                    borderLeft: `2px solid ${color}40`,
                    color: isWinner ? color : '#1a1a2e',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    borderBottom: i < STRATEGIES.length - 1 ? '1px solid #F0EEF8' : 'none',
                    transition: 'all 0.4s ease',
                  }}>
                    {typeof extras[i] === 'number' ? (extras[i] % 1 === 0 ? extras[i] : extras[i].toFixed(1)) : extras[i]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Explication */}
      <div style={{
        marginTop: '16px',
        padding: '14px 18px',
        borderRadius: '12px',
        background: `${color}10`,
        border: `1px solid ${color}30`,
        fontSize: '13px',
        color: '#1a1a2e',
        lineHeight: 1.55,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color }}>
          Critère {crit.label} → {STRATEGIES[winner]} choisie
          {' '}({crit.col} = {typeof extras[winner] === 'number' ? (extras[winner] % 1 === 0 ? extras[winner] : extras[winner].toFixed(1)) : extras[winner]})
        </div>
        <div style={{ color: '#6B6B8A', fontSize: '12.5px' }}>{crit.desc}</div>
      </div>
    </VisualContainer>
  )
}
