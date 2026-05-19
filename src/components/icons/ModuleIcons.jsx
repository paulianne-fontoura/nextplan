/**
 * ModuleIcons — 6 icônes SVG distinctes, une par module.
 * Acceptent une prop `color` qui définit directement le stroke/fill.
 * Si absente, hériteront via currentColor (color du parent).
 */

export function DiagnosticIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <rect x="3" y="3" width="8" height="8" rx="1"/>
      <rect x="13" y="3" width="8" height="8" rx="1" fill={c} fillOpacity="0.25"/>
      <rect x="3" y="13" width="8" height="8" rx="1" fill={c} fillOpacity="0.15"/>
      <rect x="13" y="13" width="8" height="8" rx="1"/>
    </svg>
  )
}

export function BudgetsIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <line x1="3" y1="21" x2="21" y2="21"/>
      <rect x="5" y="13" width="3" height="8" rx="0.5" fill={c} fillOpacity="0.3"/>
      <rect x="10.5" y="8" width="3" height="13" rx="0.5" fill={c} fillOpacity="0.6"/>
      <rect x="16" y="4" width="3" height="17" rx="0.5" fill={c} fillOpacity="0.9"/>
    </svg>
  )
}

export function EcartsIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <path d="M3 12h6"/>
      <path d="M15 12h6"/>
      <path d="M9 6l-3 6 3 6"/>
      <path d="M15 6l3 6 -3 6"/>
      <circle cx="12" cy="12" r="2.2" fill={c}/>
    </svg>
  )
}

export function InvestissementIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <polyline points="3,17 9,11 13,15 21,5"/>
      <polyline points="14,5 21,5 21,12"/>
      <circle cx="9" cy="11" r="1.5" fill={c}/>
      <circle cx="13" cy="15" r="1.5" fill={c}/>
    </svg>
  )
}

export function IncertainIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="8" cy="8" r="1.3" fill={c}/>
      <circle cx="16" cy="8" r="1.3" fill={c}/>
      <circle cx="8" cy="16" r="1.3" fill={c}/>
      <circle cx="16" cy="16" r="1.3" fill={c}/>
      <circle cx="12" cy="12" r="1.3" fill={c}/>
    </svg>
  )
}

export function MPMIcon({ size = 28, color }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
      <line x1="6" y1="12" x2="11" y2="6"/>
      <line x1="11" y1="6" x2="18" y2="12"/>
      <line x1="6" y1="12" x2="18" y2="12"/>
      <line x1="11" y1="18" x2="18" y2="12"/>
      <line x1="6" y1="12" x2="11" y2="18"/>
      <circle cx="6" cy="12" r="2.4" fill={c}/>
      <circle cx="11" cy="6" r="2.4" fill={c}/>
      <circle cx="18" cy="12" r="2.4" fill={c}/>
      <circle cx="11" cy="18" r="2" fill="none" stroke={c}/>
    </svg>
  )
}

export function getModuleIcon(id) {
  switch (id) {
    case 'diagnostic':    return DiagnosticIcon
    case 'budgets':       return BudgetsIcon
    case 'ecarts':        return EcartsIcon
    case 'investissement':return InvestissementIcon
    case 'incertain':     return IncertainIcon
    case 'mpm':           return MPMIcon
    default:              return DiagnosticIcon
  }
}
