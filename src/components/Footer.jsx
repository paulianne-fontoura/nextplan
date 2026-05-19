import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import NextPlanLogo from './NextPlanLogo'
import './Footer.css'

export default function Footer() {
  const { badges, level, xpToNextLevel } = useProgress()
  const hasProgress = badges.length > 0

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" aria-label="NEXTPLAN">
            <NextPlanLogo variant="dark" />
          </Link>
          <p className="footer-tagline">
            Planification. Contrôle. Maîtrise.<br />
            Projet pédagogique — Master 1 MSI<br />
            Paris 1 Panthéon-Sorbonne
          </p>
        </div>

        <nav className="footer-nav" aria-label="Liens de pied de page">
          <div className="footer-nav-col">
            <h5 className="caption">Contenu</h5>
            <Link to="/formations">Catalogue</Link>
            <Link to="/pricing">Tarifs</Link>
            <Link to="/ressources">Ressources</Link>
          </div>
          <div className="footer-nav-col">
            <h5 className="caption">Le projet</h5>
            <Link to="/a-propos">À propos</Link>
            <Link to="/espace-etudiant">Mon espace</Link>
          </div>
        </nav>

        {hasProgress && (
          <div className="footer-progress" aria-label="Votre progression">
            <div className="footer-progress-header">
              <span className="caption">Votre niveau</span>
              <span className="footer-progress-level numbers">N{level.num}</span>
            </div>
            <div className="footer-progress-bar">
              <div className="footer-progress-fill" style={{ width: `${xpToNextLevel}%` }} />
            </div>
            <p className="footer-progress-label">{level.label}</p>
          </div>
        )}
      </div>
      <div className="footer-base">
        <span>© 2026 NEXTPLAN. Tous droits réservés (projet pédagogique).</span>
        <span>Méthodes : GANTT · MPM · PERT</span>
      </div>
    </footer>
  )
}
