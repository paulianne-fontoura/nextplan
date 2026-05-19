import './icons.css'

export default function GanttIcon({ size = 40, ...rest }) {
  return (
    <svg
      className="icon-svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* Lignes verticales (axe temps) */}
      <line x1="6" y1="6" x2="6" y2="34" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeLinecap="round"/>
      <line x1="34" y1="6" x2="34" y2="34" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" strokeLinecap="round"/>
      {/* Barres GANTT animées */}
      <rect className="gantt-bar gantt-bar-1" x="6" y="11" width="18" height="4" rx="1.5" fill="currentColor" opacity="0.95"/>
      <rect className="gantt-bar gantt-bar-2" x="14" y="19" width="20" height="4" rx="1.5" fill="currentColor" opacity="0.75"/>
      <rect className="gantt-bar gantt-bar-3" x="10" y="27" width="14" height="4" rx="1.5" fill="currentColor" opacity="0.55"/>
    </svg>
  )
}
