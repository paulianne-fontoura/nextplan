import './BlobBackground.css'

/**
 * BlobBackground — uniquement noise SVG fin
 * Toutes les bulles/sphères/orbes ont été retirées.
 * Le dégradé de fond est géré globalement via --gradient-page sur body.
 */
export default function BlobBackground() {
  return (
    <div className="blob-bg" aria-hidden="true">
      <svg
        className="blob-noise"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="nextplan-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.6 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#nextplan-noise)" opacity="1" />
      </svg>
    </div>
  )
}
