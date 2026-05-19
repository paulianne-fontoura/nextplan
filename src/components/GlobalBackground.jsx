/**
 * GlobalBackground — fond fluide neutre + nappes de lumière diffuse
 *
 * Position fixed, derrière tout le contenu (z-index: -1).
 * 5 blobs colorés très délavés (presque blancs) + 3 nappes de lumière blanche.
 * Effet : lumière naturelle qui traverse du verre dépoli, pas de couleur franche.
 */
export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: '#F5F5FA',
        pointerEvents: 'none',
      }}
    >
      {/* =================================================
         BLOBS COLORÉS — très délavés, quasi-neutres
         ================================================= */}

      {/* Blob 1 — haut gauche · bleu-lavande quasi blanc */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-5%',
        width: '55vw', height: '55vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(210, 220, 255, 0.35) 0%, transparent 65%)',
        filter: 'blur(60px)',
        animation: 'blobFloat1 18s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* Blob 2 — haut droit · blanc rosé */}
      <div style={{
        position: 'absolute',
        top: '-5%', right: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 240, 245, 0.45) 0%, transparent 65%)',
        filter: 'blur(70px)',
        animation: 'blobFloat2 22s ease-in-out infinite alternate-reverse',
        willChange: 'transform',
      }} />

      {/* Blob 3 — centre · lavande fantôme */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '30%',
        width: '45vw', height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220, 215, 255, 0.25) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: 'blobFloat3 26s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* Blob 4 — bas gauche · menthe quasi blanc */}
      <div style={{
        position: 'absolute',
        bottom: '-10%', left: '10%',
        width: '40vw', height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(210, 240, 235, 0.30) 0%, transparent 65%)',
        filter: 'blur(65px)',
        animation: 'blobFloat4 20s ease-in-out infinite alternate-reverse',
        willChange: 'transform',
      }} />

      {/* Blob 5 — bas droit · violet réduit à presque rien */}
      <div style={{
        position: 'absolute',
        bottom: '-5%', right: '5%',
        width: '42vw', height: '42vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230, 225, 255, 0.20) 0%, transparent 65%)',
        filter: 'blur(75px)',
        animation: 'blobFloat1 24s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* =================================================
         NAPPES DE LUMIÈRE BLANCHE DIFFUSE
         ================================================= */}

      {/* Lumière 1 — traversée diagonale haut-gauche vers centre */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '5%',
        width: '70vw', height: '40vw',
        borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
        background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.10) 40%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'blobFloat3 30s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* Lumière 2 — centre-droit */}
      <div style={{
        position: 'absolute',
        top: '25%', right: '0%',
        width: '50vw', height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'blobFloat2 28s ease-in-out infinite alternate-reverse',
        willChange: 'transform',
      }} />

      {/* Lumière 3 — bas centre */}
      <div style={{
        position: 'absolute',
        bottom: '0%', left: '20%',
        width: '60vw', height: '35vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.40) 0%, transparent 65%)',
        filter: 'blur(55px)',
        animation: 'blobFloat4 32s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />
    </div>
  )
}
