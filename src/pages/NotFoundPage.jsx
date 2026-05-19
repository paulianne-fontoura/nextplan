import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <main
      className="section"
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
      <div
        className="container"
        style={{ textAlign: 'center', maxWidth: 560 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="numbers"
            style={{
              fontSize: '6rem',
              display: 'inline-block',
              lineHeight: 1,
              fontWeight: 800,
              color: 'var(--color-accent)',
              letterSpacing: '-0.04em',
            }}
          >
            404
          </span>
          <h1 style={{ marginBottom: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
            Page introuvable
          </h1>
          <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/" className="btn btn-primary">← Retour à l'accueil</Link>
        </motion.div>
      </div>
    </main>
  )
}
