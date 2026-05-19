import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    initials: 'CL',
    color: 'linear-gradient(135deg,#6366F1,#8B83F0)',
    rating: 5,
    quote: "La matrice BCG m'a enfin semblé claire après l'exercice interactif sur NEXTPLAN. Voir un DAS passer de Dilemme à Star selon les choix stratégiques, c'est ce qui m'a fait comprendre la logique du portefeuille.",
    name: 'Camille L.',
    role: 'M1 MSI Paris 1',
  },
  {
    initials: 'TR',
    color: 'linear-gradient(135deg,#0EA5E9,#4ECDC4)',
    rating: 5,
    quote: "Le quiz de la méthode MPM m'a aidé à identifier mes lacunes avant l'examen. J'ai appris à distinguer marge totale et marge libre, ce que je confondais systématiquement en TD.",
    name: 'Thomas R.',
    role: 'M1 MSI Paris 1',
  },
  {
    initials: 'AM',
    color: 'linear-gradient(135deg,#EC4899,#FF6B7A)',
    rating: 4,
    quote: "Le module sur les critères de décision en avenir incertain est excellent. Wald, Savage, Hurwicz expliqués avec des exemples chiffrés — j'ai compris la différence entre les approches en moins d'une heure.",
    name: 'Aïcha M.',
    role: 'M1 MSI Paris 1',
  },
  {
    initials: 'JD',
    color: 'linear-gradient(135deg,#F59E0B,#FFB830)',
    rating: 5,
    quote: "L'analyse d'écarts m'a toujours paru abstraite jusqu'à ce que je suive le module Premium. La décomposition volume-prix-mix est devenue mécanique pour moi, ce qui m'a sauvé en partiel.",
    name: 'Julien D.',
    role: 'M1 MSI Paris 1',
  },
  {
    initials: 'SO',
    color: 'linear-gradient(135deg,#10B981,#4ECDC4)',
    rating: 5,
    quote: "Construire un budget de trésorerie pas à pas, avec les décalages clients-fournisseurs, c'est ce qui m'a réconcilié avec le contrôle de gestion. Les exemples sont vraiment proches de ceux des TD de Paris 1.",
    name: 'Sofiane O.',
    role: 'M1 MSI Paris 1',
  },
  {
    initials: 'EB',
    color: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
    rating: 4,
    quote: "Sur la VAN et le TRI, j'ai enfin compris pourquoi la VAN reste théoriquement supérieure même quand le TRI est plus intuitif. Le cas d'application sur 4 ans avec les flux est très bien construit.",
    name: 'Élise B.',
    role: 'M1 MSI Paris 1',
  },
]

function Star({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <span className="caption accent-text">Témoignages</span>
          <h2>Ce qu'en disent les étudiants</h2>
          <p>Des retours concrets de la promotion M1 MSI Paris 1.</p>
        </div>

        {/* Desktop grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div className="testimonial-stars" aria-label={`Note ${t.rating} sur 5`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} filled={idx < t.rating} />
                  ))}
                </div>
              </div>
              <blockquote className="testimonial-quote">
                {t.quote}
              </blockquote>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          ref={trackRef}
        >
          <div className="testimonials-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div className="testimonial-stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} filled={idx < t.rating} />
                    ))}
                  </div>
                </div>
                <blockquote className="testimonial-quote">{t.quote}</blockquote>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="testimonials-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonials-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
