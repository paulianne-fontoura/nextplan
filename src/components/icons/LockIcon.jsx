import './icons.css'

export default function LockIcon({ size = 40, ...rest }) {
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
      {/* Arc supérieur (animé) */}
      <path
        className="lock-arc"
        d="M 13 19 V 13 a 7 7 0 0 1 14 0 V 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Corps du cadenas */}
      <rect x="9" y="19" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
      {/* Trou de serrure */}
      <circle cx="20" cy="25" r="1.6" fill="currentColor"/>
      <rect x="19.2" y="25" width="1.6" height="4" fill="currentColor"/>
    </svg>
  )
}
