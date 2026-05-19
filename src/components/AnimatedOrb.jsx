import './AnimatedOrb.css'

/**
 * AnimatedOrb — sphère lumineuse avec gradient radial et pulse animation
 *
 * Props :
 *   - size : taille en px (default 200)
 *   - variant : 'aurora' | 'teal' | 'rose' (couleur dominante)
 *   - className : classes additionnelles (ex. positionnement)
 */
export default function AnimatedOrb({ size = 200, variant = 'aurora', className = '' }) {
  const style = { width: size, height: size }
  return (
    <div className={`orb-wrap ${className}`} aria-hidden="true">
      <div className={`orb orb-${variant}`} style={style}>
        <span className="orb-shine" />
        <span className="orb-ring" />
      </div>
    </div>
  )
}
