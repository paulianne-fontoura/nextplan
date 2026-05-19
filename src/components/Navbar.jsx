import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import NextPlanLogo from './NextPlanLogo'
import './Navbar.css'

const NAV_ITEMS = [
  { to: '/',           label: 'Accueil', exact: true },
  { to: '/formations', label: 'Formations' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/pricing',    label: 'Tarifs' },
  { to: '/a-propos',   label: 'À propos' },
]

export default function Navbar() {
  const { badges, level, isPremium } = useProgress()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container navbar-inner">
        {/* LOGO */}
        <Link to="/" aria-label="NEXTPLAN - Accueil">
          <NextPlanLogo variant="navbar" />
        </Link>

        {/* Navigation */}
        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav-open' : ''}`} aria-label="Navigation principale">
          {NAV_ITEMS.map((item, idx) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.05, duration: 0.3 }}
            >
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Actions à droite */}
        <div className="navbar-actions">
          {badges.length > 0 && (
            <motion.div
              className="navbar-xp"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
              title={`Niveau ${level.num} — ${level.label}`}
            >
              <span className="navbar-xp-dot" />
              <span className="navbar-xp-level numbers">N{level.num}</span>
              <span className="navbar-xp-count numbers">{badges.length}</span>
            </motion.div>
          )}

          {isPremium ? (
            <Link to="/espace-etudiant" className="btn btn-ghost btn-sm">
              Mon espace
            </Link>
          ) : (
            <Link to="/pricing" className="btn btn-primary btn-sm">
              Premium
            </Link>
          )}

          <button
            className="navbar-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
