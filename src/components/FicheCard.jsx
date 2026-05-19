import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import FichePDF from './FichePDF'
import './FicheCard.css'

/**
 * FicheCard — fiche technique académique rendue à partir de courseData (JSON)
 * Props :
 *   - method : id du module (pour le nom du téléchargement)
 *   - courseData : objet complet du module depuis courses.json (intro, sections, formulas, etc.)
 */
export default function FicheCard({ method = 'mpm', courseData = null }) {
  const { unlockBadge } = useProgress()

  const handleDownloadClick = () => {
    unlockBadge('curious')
  }

  // Si on a un courseData → fiche dynamique
  if (courseData) {
    return <FicheDynamic course={courseData} onDownloadClick={handleDownloadClick} />
  }

  // Fallback minimal
  return <FicheDynamic course={{
    id: method,
    title: method,
    content: { intro: 'Fiche en cours de chargement.', sections: [], formulas: [] }
  }} onDownloadClick={handleDownloadClick} />
}

function FicheDynamic({ course, onDownloadClick }) {
  const { title, tagline, keyPoints = [], content = {} } = course
  const { intro, sections = [], formulas = [] } = content

  return (
    <motion.article
      className="fiche-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <header className="fiche-card-header">
        <span className="caption">Fiche de synthèse</span>
        <h2>{title}</h2>
        {tagline && <p style={{ marginTop: 6, color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>{tagline}</p>}
      </header>

      {intro && (
        <section className="fiche-block">
          <h3 className="fiche-block-title">Introduction</h3>
          <p>{intro}</p>
        </section>
      )}

      {keyPoints.length > 0 && (
        <section className="fiche-block">
          <h3 className="fiche-block-title">Points clés à maîtriser</h3>
          <ul className="fiche-bullets">
            {keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
          </ul>
        </section>
      )}

      {sections.map((s, i) => (
        <section key={i} className="fiche-block">
          <h3 className="fiche-block-title">{s.title}</h3>
          <p>{s.body}</p>
        </section>
      ))}

      {formulas.length > 0 && (
        <section className="fiche-block">
          <h3 className="fiche-block-title">Formules essentielles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {formulas.map((f, i) => (
              <div key={i} className="fiche-formula">{f}</div>
            ))}
          </div>
        </section>
      )}

      <footer className="fiche-card-footer">
        <span onClick={onDownloadClick} style={{ display: 'inline-block' }}>
          <FichePDF course={course} />
        </span>
        <span className="fiche-footer-note">Format PDF stylisé · A4</span>
      </footer>
    </motion.article>
  )
}
