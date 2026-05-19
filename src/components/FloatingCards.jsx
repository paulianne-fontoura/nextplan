import './FloatingCards.css'

/**
 * FloatingCards — 5 cartes glassmorphiques aux positions redistribuées.
 *   Aucune card ne se chevauche : 5 zones distinctes (coin haut-gauche,
 *   coin haut-droite, centre, milieu-bas-droite, bas-gauche).
 *   5 icônes visuellement différentes (GANTT / réseau / nœuds-étoile /
 *   stats verticales / check animé).
 */
export default function FloatingCards() {
  return (
    <div className="floating-cards" aria-hidden="true">
      {/* ===== Card 1 — haut-gauche · GANTT (3 barres horizontales) ===== */}
      <div className="float-card float-card-1">
        <span className="float-card-sheen" />
        <div className="float-card-inner">
          <div className="float-icon-bg" style={{ background: 'rgba(107, 95, 228, 0.10)' }}>
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
              <line x1="6" y1="6" x2="6" y2="34" stroke="rgba(107,95,228,0.25)" strokeWidth="1"/>
              <rect x="6"  y="11" width="22" height="4" rx="1.5" fill="#6B5FE4"/>
              <rect x="6"  y="19" width="15" height="4" rx="1.5" fill="#6B5FE4" opacity="0.75"/>
              <rect x="6"  y="27" width="10" height="4" rx="1.5" fill="#6B5FE4" opacity="0.55"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Card 2 — haut-droite · MPM réseau (losange + cercle central) ===== */}
      <div className="float-card float-card-2">
        <span className="float-card-sheen" />
        <div className="float-card-inner">
          <div className="float-icon-bg" style={{ background: 'rgba(78, 205, 196, 0.10)' }}>
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
              {/* Lignes du losange — teal */}
              <line x1="20" y1="8"  x2="32" y2="20" stroke="#4ECDC4" strokeWidth="1.5"/>
              <line x1="32" y1="20" x2="20" y2="32" stroke="#4ECDC4" strokeWidth="1.5"/>
              <line x1="20" y1="32" x2="8"  y2="20" stroke="#4ECDC4" strokeWidth="1.5"/>
              <line x1="8"  y1="20" x2="20" y2="8"  stroke="#4ECDC4" strokeWidth="1.5"/>
              {/* Lignes vers le centre */}
              <line x1="20" y1="8"  x2="20" y2="20" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.55"/>
              <line x1="32" y1="20" x2="20" y2="20" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.55"/>
              <line x1="20" y1="32" x2="20" y2="20" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.55"/>
              <line x1="8"  y1="20" x2="20" y2="20" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.55"/>
              {/* Cercles 8px aux 4 coins */}
              <circle cx="20" cy="8"  r="4" fill="#6B5FE4"/>
              <circle cx="32" cy="20" r="4" fill="#6B5FE4"/>
              <circle cx="20" cy="32" r="4" fill="#6B5FE4"/>
              <circle cx="8"  cy="20" r="4" fill="#6B5FE4"/>
              {/* Cercle central plus grand 12px */}
              <circle cx="20" cy="20" r="6" fill="#FFFFFF" stroke="#6B5FE4" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Card 3 — CENTRE · Nœuds en étoile (la plus grande, 95px) ===== */}
      <div className="float-card float-card-3">
        <span className="float-card-sheen" />
        <div className="float-card-inner">
          <div className="float-icon-bg" style={{ background: 'rgba(107, 95, 228, 0.10)', width: 52, height: 52 }}>
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B5FE4" />
                  <stop offset="100%" stopColor="#4ECDC4" />
                </linearGradient>
              </defs>
              {/* 5 lignes vers le nœud central depuis 5 nœuds périphériques en étoile */}
              <line x1="24" y1="24" x2="24" y2="6"  stroke="url(#star-gradient)" strokeWidth="1.5"/>
              <line x1="24" y1="24" x2="40" y2="16" stroke="url(#star-gradient)" strokeWidth="1.5"/>
              <line x1="24" y1="24" x2="36" y2="38" stroke="url(#star-gradient)" strokeWidth="1.5"/>
              <line x1="24" y1="24" x2="12" y2="38" stroke="url(#star-gradient)" strokeWidth="1.5"/>
              <line x1="24" y1="24" x2="8"  y2="16" stroke="url(#star-gradient)" strokeWidth="1.5"/>
              {/* 5 nœuds périphériques */}
              <circle cx="24" cy="6"  r="3.5" fill="#6B5FE4"/>
              <circle cx="40" cy="16" r="3.5" fill="#4ECDC4"/>
              <circle cx="36" cy="38" r="3.5" fill="#6B5FE4"/>
              <circle cx="12" cy="38" r="3.5" fill="#4ECDC4"/>
              <circle cx="8"  cy="16" r="3.5" fill="#6B5FE4"/>
              {/* Nœud central */}
              <circle cx="24" cy="24" r="5" fill="#FFFFFF" stroke="#6B5FE4" strokeWidth="2"/>
              <circle cx="24" cy="24" r="2" fill="#4ECDC4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Card 4 — bas-droite · STATS verticales gradient ===== */}
      <div className="float-card float-card-4">
        <span className="float-card-sheen" />
        <div className="float-card-inner">
          <div className="float-icon-bg" style={{ background: 'rgba(255, 184, 48, 0.10)' }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="bar-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#6B5FE4" />
                  <stop offset="100%" stopColor="#4ECDC4" />
                </linearGradient>
              </defs>
              <rect x="7"  y="24" width="6" height="12" rx="1.5" fill="url(#bar-gradient)"/>
              <rect x="17" y="16" width="6" height="20" rx="1.5" fill="url(#bar-gradient)"/>
              <rect x="27" y="8"  width="6" height="28" rx="1.5" fill="url(#bar-gradient)"/>
              {/* Axe horizontal subtil */}
              <line x1="4" y1="36" x2="36" y2="36" stroke="rgba(107,95,228,0.25)" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Card 5 — bas-gauche · CHECK animé ===== */}
      <div className="float-card float-card-5">
        <span className="float-card-sheen" />
        <div className="float-card-inner">
          <div className="float-icon-bg" style={{ background: 'rgba(16, 185, 129, 0.10)' }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" fill="rgba(16, 185, 129, 0.10)" stroke="#10B981" strokeWidth="1.5"/>
              <path
                className="float-check-path"
                d="M 13 20 L 18 25 L 27 15"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
