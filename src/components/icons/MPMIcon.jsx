import './icons.css'

export default function MPMIcon({ size = 40, ...rest }) {
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
      {/* Connections */}
      <line className="mpm-conn"    x1="10" y1="20" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line className="mpm-conn mpm-conn-2" x1="20" y1="10" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line className="mpm-conn mpm-conn-3" x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line className="mpm-conn mpm-conn-2" x1="20" y1="30" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line className="mpm-conn"    x1="10" y1="20" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Nodes */}
      <circle className="mpm-node"    cx="10" cy="20" r="4.5" fill="currentColor"/>
      <circle className="mpm-node mpm-node-2" cx="20" cy="10" r="4.5" fill="currentColor"/>
      <circle className="mpm-node mpm-node-3" cx="30" cy="20" r="4.5" fill="currentColor"/>
      <circle className="mpm-node"    cx="20" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
