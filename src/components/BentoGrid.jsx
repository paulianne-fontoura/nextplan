import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './BentoGrid.css'

/**
 * BentoGrid — 4 cards égales en grille 2×2.
 * Blobs colorés localisés DERRIÈRE chaque card pour donner au backdrop-filter
 * de la matière à flouter → effet verre VISIBLE.
 */

const FEATURES = [
  {
    eyebrow: 'Méthode',
    title: 'Apprenez à votre rythme.',
    desc: 'Vidéos courtes, fiches synthétiques, exercices corrigés. Progression suivie, badges débloqués.',
    ctaLabel: 'Voir les formations',
    ctaTo: '/formations',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    eyebrow: 'Équipe',
    title: '4 spécialistes M1 MSI.',
    desc: '« Construit par des étudiants, pour des étudiants. » Une équipe complémentaire à votre service.',
    ctaLabel: "Rencontrer l'équipe",
    ctaTo: '/a-propos',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    avatars: true,
  },
  {
    eyebrow: 'Pratique',
    title: '7+ exercices corrigés.',
    desc: 'Exemples concrets, corrections détaillées en vidéo. Maîtrisez les bonnes pratiques pas à pas.',
    ctaLabel: 'Voir les exercices',
    ctaTo: '/formations',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    eyebrow: 'Formules',
    title: 'Gratuit ou Premium.',
    desc: 'Démarrez gratuitement avec la MPM. Premium à 30€/mois pour tout débloquer et obtenir votre certificat.',
    ctaLabel: 'Comparer les formules',
    ctaTo: '/pricing',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
        <line x1="12" y1="6" x2="12" y2="18"/>
      </svg>
    ),
  },
]

const AVATARS = [
  { i: 'PF', g: 'linear-gradient(135deg,#6B5FE4,#8B83F0)' },
  { i: 'DC', g: 'linear-gradient(135deg,#4ECDC4,#3DBFB6)' },
  { i: 'TR', g: 'linear-gradient(135deg,#FF6B7A,#FF8C9D)' },
  { i: 'DK', g: 'linear-gradient(135deg,#FFB830,#FFA500)' },
]

export default function BentoGrid() {
  return (
    <div className="bento-wrap">
      {/* Grid des cards — le GlobalBackground fournit les couleurs derrière */}
      <div className="bento-grid">
        {FEATURES.map((f, i) => (
          <motion.article
            key={i}
            className="bento-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-wrap">{f.icon}</div>
              <span className="bento-eyebrow">{f.eyebrow}</span>
            </div>

            <h3 className="bento-card-title">{f.title}</h3>
            <p className="bento-card-desc">{f.desc}</p>

            {f.avatars && (
              <div className="bento-team-avatars">
                {AVATARS.map((a, idx) => (
                  <div key={idx} className="bento-team-av" style={{ background: a.g }}>{a.i}</div>
                ))}
              </div>
            )}

            <Link to={f.ctaTo} className="bento-card-link">
              {f.ctaLabel} <span className="bento-cta-arrow">→</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
