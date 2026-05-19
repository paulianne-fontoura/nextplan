import './FloatingCubes.css'

/**
 * FloatingCubes — 4 cubes 3D CSS pur en transform-style preserve-3d
 * Inspirés de l'image SEO dark : cubes flottants glassmorphiques
 */
export default function FloatingCubes() {
  return (
    <div className="cubes-container" aria-hidden="true">
      <Cube className="cube-1" size={50} />
      <Cube className="cube-2" size={50} />
      <Cube className="cube-3" size={35} />
      <Cube className="cube-4" size={40} />
    </div>
  )
}

function Cube({ className, size }) {
  const half = size / 2
  const style = { width: size, height: size, '--cube-half': `${half}px` }
  return (
    <div className={`cube ${className}`} style={style}>
      <span className="cube-face cube-front" />
      <span className="cube-face cube-back" />
      <span className="cube-face cube-left" />
      <span className="cube-face cube-right" />
      <span className="cube-face cube-top" />
      <span className="cube-face cube-bottom" />
    </div>
  )
}
