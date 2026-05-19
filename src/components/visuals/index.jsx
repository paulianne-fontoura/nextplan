import BCGMatrix from './BCGMatrix'
import MPMGraph from './MPMGraph'
import BudgetTree from './BudgetTree'
import EcartsVisual from './EcartsVisual'
import NPVChart from './NPVChart'
import DecisionMatrix from './DecisionMatrix'

export function getCourseVisual(id, color) {
  const map = {
    'diagnostic':     <BCGMatrix color={color} />,
    'mpm':            <MPMGraph color={color} />,
    'budgets':        <BudgetTree color={color} />,
    'ecarts':         <EcartsVisual color={color} />,
    'investissement': <NPVChart color={color} />,
    'incertain':      <DecisionMatrix color={color} />,
  }
  return map[id] || null
}

export function VisualContainer({ children, subtitle }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.75)',
      borderRadius: '20px',
      padding: '28px 32px',
    }}>
      <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a2e', marginBottom: '6px' }}>
        Schéma interactif
      </h2>
      <p style={{ fontSize: '13px', color: '#6B6B8A', marginBottom: '20px' }}>
        {subtitle || 'Survolez les éléments pour explorer le concept.'}
      </p>
      {children}
    </div>
  )
}
