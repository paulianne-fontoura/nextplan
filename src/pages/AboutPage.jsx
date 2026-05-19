import { motion } from 'framer-motion'
import './AboutPage.css'

// Icônes représentatives du rôle de chaque membre
const IconCompass = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)
const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const IconBook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const IconSparkle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
    <path d="M19 3l.7 2.1L22 6l-2.3.9L19 9l-.7-2.1L16 6l2.3-.9z" />
  </svg>
)

const TEAM = [
  {
    name: 'Paulianne Fontoura',
    role: 'Data Analysis et Gestion de Projet',
    color: 'var(--color-accent)',
    bg: 'linear-gradient(135deg, #6B5FE4, #8B83F0)',
    description: "Pilote la vision stratégique et orchestre chaque décision de projet.",
    Icon: IconCompass,
  },
  {
    name: 'Dorra Chakour',
    role: 'Cybersécurité et IA',
    color: 'var(--color-teal)',
    bg: 'linear-gradient(135deg, #4ECDC4, #3DBFB6)',
    description: "Construit l'infrastructure technique avec précision et sécurité.",
    Icon: IconShield,
  },
  {
    name: 'Théophile Rabut',
    role: 'Contenu et Pédagogie',
    color: 'var(--color-coral)',
    bg: 'linear-gradient(135deg, #FF6B7A, #FF8C9D)',
    description: "Transforme des méthodes complexes en apprentissages clairs et engageants.",
    Icon: IconBook,
  },
  {
    name: 'Daryna Kosianchuk',
    role: 'Recherche et Innovation',
    color: 'var(--color-warning)',
    bg: 'linear-gradient(135deg, #FFB830, #FFA500)',
    description: "Explore les frontières de la planification pour anticiper les besoins de demain.",
    Icon: IconSparkle,
  },
]

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* ============ HERO ============ */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="caption accent-text">Notre histoire</span>
            <h1>
              Créé par des étudiants,
              <br />
              <em className="italic-soft">pour</em> des étudiants M1 MSI.
            </h1>
            <p className="about-hero-sub">
              <strong>NEXTPLAN</strong> est né d'un projet académique du Master 1
              Systèmes d'Information et de Connaissances de Paris 1 Panthéon-Sorbonne.
              Notre objectif : rendre accessible et engageant le programme complet
              de Planification et Contrôle — du diagnostic stratégique à la décision
              en avenir incertain, en passant par les budgets, l'analyse d'écarts,
              le choix d'investissement et la méthode MPM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ ÉQUIPE ============ */}
      <section className="section about-team-section">
        <div className="container">
          <div className="about-section-header">
            <span className="caption accent-text">L'équipe</span>
            <h2>Quatre étudiants. Une mission.</h2>
            <p>Chacun apporte sa spécialité à NEXTPLAN.</p>
          </div>

          <div className="about-team-grid">
            {TEAM.map((m, idx) => (
              <motion.article
                key={m.name}
                className="about-team-card glass-card is-interactive glow-border"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                style={{ '--member-color': m.color }}
              >
                <div className="about-team-card-inner">
                  <div className="about-team-avatar" style={{ background: m.bg }}>
                    <m.Icon />
                  </div>

                  <h3 className="about-team-name">{m.name}</h3>

                  <span
                    className="about-team-role"
                    style={{
                      color: m.color,
                      borderColor: m.color,
                      background: `color-mix(in srgb, ${m.color} 12%, transparent)`,
                    }}
                  >
                    {m.role}
                  </span>

                  <p className="about-team-desc">{m.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CITATION ============ */}
      <section className="section about-quote-section">
        <div className="container">
          <motion.blockquote
            className="about-quote glass-card glow-border"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-quote-mark">"</span>
            <p>
              La planification ne consiste pas à prédire l'avenir,
              mais à se donner les moyens d'y faire face avec <em className="italic-soft">méthode</em>.
            </p>
            <cite>— Bernard ROY, créateur de la méthode MPM</cite>
          </motion.blockquote>
        </div>
      </section>
    </main>
  )
}
