import './icons.css'

export default function PERTIcon({ size = 40, ...rest }) {
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
      {/* Paths animés (flow probabiliste) */}
      <path
        className="pert-path"
        d="M 8 20 Q 14 8, 20 14 Q 26 20, 32 12"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      <path
        className="pert-path"
        d="M 8 20 Q 14 32, 20 26 Q 26 20, 32 28"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
        style={{ animationDelay: '0.4s' }}
      />
      <path
        className="pert-path"
        d="M 8 20 L 32 20"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
        style={{ animationDelay: '0.8s' }}
      />
      {/* Nodes */}
      <circle cx="8"  cy="20" r="3.5" fill="currentColor"/>
      <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="20" r="3.5" fill="currentColor"/>
      <circle cx="32" cy="12" r="2"   fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="28" r="2"   fill="currentColor" opacity="0.5"/>
    </svg>
  )
}
