import './icons.css'

export default function CheckIcon({ size = 40, ...rest }) {
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
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path
        className="check-path"
        d="M 12 20 L 18 26 L 28 14"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  )
}
