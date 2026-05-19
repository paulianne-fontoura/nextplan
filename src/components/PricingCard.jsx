import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CheckIcon from './icons/CheckIcon'
import './PricingCard.css'

/**
 * PricingCard (NEXTPLAN)
 * Props comme avant — version dark + premium border animée
 */
export default function PricingCard({
  tier = 'free',
  title,
  price,
  priceNote,
  features,
  ctaLabel,
  ctaTo,
  badge,
  oldPrice,
  highlighted = false,
  subnote,
}) {
  const isPremium = tier === 'premium'

  return (
    <motion.div
      className={`pricing-card ${highlighted ? 'glass-card premium-border is-highlighted' : 'glass-card'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="pricing-card-header">
        <div className="pricing-card-title-row">
          <h3>{title}</h3>
          {badge && <span className="pricing-card-badge">{badge}</span>}
        </div>
        <div className="pricing-card-price-row">
          {oldPrice && <span className="pricing-card-old mono">{oldPrice}</span>}
          <span className="pricing-card-price mono">{price}</span>
        </div>
        {priceNote && <p className="pricing-card-note">{priceNote}</p>}
      </div>

      <ul className="pricing-card-features">
        {features.map((f, i) => (
          <li key={i} className={f.included ? 'is-included' : 'is-excluded'}>
            <span className="pricing-card-feature-icon" aria-hidden="true">
              {f.included ? <CheckSm /> : <CrossSm />}
            </span>
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className="pricing-card-footer">
        <Link
          to={ctaTo}
          className={`btn ${isPremium ? 'btn-primary' : 'btn-outline'} btn-lg pricing-card-cta`}
        >
          {ctaLabel} →
        </Link>
        {subnote && <p className="pricing-card-subnote">{subnote}</p>}
      </div>
    </motion.div>
  )
}

function CheckSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function CrossSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
