import { useState } from 'react'
import './ModuleIcon.css'

// SVG dédiés par module (rendus via currentColor)
const ICON_SVGS = {
  diagnostic: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  ),
  budgets: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="5" y="13" width="3" height="7" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="9" width="3" height="11" rx="0.5" fill="currentColor" />
      <rect x="16" y="5" width="3" height="15" rx="0.5" fill="currentColor" />
    </svg>
  ),
  ecarts: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 16 8 11 13 14 21 5" />
      <polyline points="15 5 21 5 21 11" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  ),
  investissement: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5c0 1.2 1.2 1.9 3 2.5s3 1.3 3 2.5c0 1.4-1.3 2.5-3 2.5s-3-1.1-3-2.5" />
    </svg>
  ),
  incertain: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" />
      <circle cx="16" cy="8" r="1.4" fill="currentColor" />
      <circle cx="8" cy="16" r="1.4" fill="currentColor" />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  mpm: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="5"  r="2.5" fill="currentColor" />
      <circle cx="19" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="19" r="2.5" fill="currentColor" />
      <line x1="7" y1="11" x2="10" y2="7" />
      <line x1="14" y1="7"  x2="17" y2="11" />
      <line x1="17" y1="13" x2="14" y2="17" />
      <line x1="10" y1="17" x2="7"  y2="13" />
    </svg>
  ),
}

/**
 * ModuleIcon — icône colorée par défaut avec animation + glow au hover.
 *
 * Props :
 *   - id           : id du module (diagnostic, budgets, ecarts, investissement, incertain, mpm)
 *   - iconColor    : couleur principale (depuis courses.json)
 *   - iconBg       : couleur de fond translucide (depuis courses.json)
 *   - iconGlow     : couleur du halo au hover (optionnel)
 *   - size         : "sm" | "md" | "lg" (default md = 56px)
 *   - interactive  : booléen — active le hover effect (default true)
 */
export default function ModuleIcon({
  id,
  iconColor = '#6B5FE4',
  iconBg = 'rgba(107,95,228,0.12)',
  iconGlow,
  size = 'md',
  interactive = true,
  className = '',
}) {
  const [hovered, setHovered] = useState(false)
  const svg = ICON_SVGS[id] || ICON_SVGS.mpm

  const glow = iconGlow || iconColor
  const hoverStyle = hovered && interactive
    ? {
        boxShadow: `
          0 0 0 6px ${withAlpha(iconBg, 0.5)},
          0 0 20px 4px ${withAlpha(glow, 0.30)},
          0 4px 16px rgba(0, 0, 0, 0.08)
        `,
      }
    : {}

  return (
    <div
      className={`module-icon module-icon-${size} ${interactive ? 'is-interactive' : ''} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: iconBg,
        color: iconColor,
        border: `1px solid ${withAlpha(iconColor, 0.20)}`,
        ...hoverStyle,
      }}
    >
      <div className="module-icon-svg-wrap">
        {svg}
      </div>
    </div>
  )
}

// Helper : passe une couleur "#RRGGBB" ou "rgba(...)" en y appliquant une opacité finale
function withAlpha(color, alpha) {
  if (!color) return `rgba(107,95,228,${alpha})`
  if (color.startsWith('rgba(')) {
    // remplace l'alpha existante
    return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, `rgba($1,$2,$3,${alpha})`)
  }
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }
  return color
}
