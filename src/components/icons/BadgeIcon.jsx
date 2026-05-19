import './icons.css'

export default function BadgeIcon({ size = 40, ...rest }) {
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
      {/* Étoile 5 branches */}
      <polygon
        points="20,5 24,15 35,15 26,22 29,33 20,27 11,33 14,22 5,15 16,15"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Sparks tournants */}
      <g className="badge-spark">
        <circle cx="20" cy="2" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="38" cy="20" r="1" fill="currentColor" opacity="0.6"/>
        <circle cx="20" cy="38" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="2"  cy="20" r="1" fill="currentColor" opacity="0.6"/>
      </g>
    </svg>
  )
}
