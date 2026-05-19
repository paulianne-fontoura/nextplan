import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useProgress } from '../context/ProgressContext'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    card: '', exp: '', cvv: '',
  })
  const [errors, setErrors] = useState({})
  const { activatePremium } = useProgress()
  const navigate = useNavigate()

  const update = (field) => (e) => {
    let v = e.target.value
    if (field === 'card') v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    if (field === 'exp') {
      v = v.replace(/\D/g, '').slice(0, 4)
      if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`
    }
    if (field === 'cvv') v = v.replace(/\D/g, '').slice(0, 3)
    setForm({ ...form, [field]: v })
    if (errors[field]) setErrors({ ...errors, [field]: null })
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Email invalide'
    if (form.card.replace(/\s/g, '').length !== 16) e.card = '16 chiffres requis'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = 'Format MM/AA'
    if (form.cvv.length !== 3) e.cvv = '3 chiffres'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      activatePremium(`${form.firstName} ${form.lastName}`.trim())
      setLoading(false)
      setDone(true)
      // Confetti dorés
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#7C6FFF', '#00C9B1', '#FFB830', '#FF6B9D'],
        })
      }, 200)
    }, 1500)
  }

  return (
    <main className="checkout-page">
      <div className="checkout-bg" aria-hidden="true">
        <div className="checkout-glow checkout-glow-1" />
        <div className="checkout-glow checkout-glow-2" />
      </div>

      <div className="container checkout-container">
        <div className="checkout-stepper">
          <Step n={1} label="Récapitulatif" active={step >= 1} done={step > 1 || done} />
          <div className="checkout-stepper-line" />
          <Step n={2} label="Paiement" active={step >= 2} done={done} />
        </div>

        <AnimatePresence mode="wait">
          {/* ===== ÉTAPE 1 ===== */}
          {step === 1 && !done && (
            <motion.section
              key="step1"
              className="checkout-step glass-card glow-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="gradient-text">Récapitulatif</h1>
              <p className="checkout-step-sub">Vérifiez votre commande avant le paiement.</p>

              <div className="checkout-summary neuro-inset">
                <div className="checkout-summary-row">
                  <div>
                    <h3>Formule Premium</h3>
                    <p className="caption">Accès illimité · 3 cours + certificat</p>
                  </div>
                  <span className="mono checkout-summary-price gradient-text">30 €</span>
                </div>
                <ul className="checkout-summary-list">
                  <li>6 modules complets du programme M1</li>
                  <li>6 fiches techniques téléchargeables</li>
                  <li>6 exercices corrigés en vidéo</li>
                  <li>Quiz avancés avec corrections</li>
                  <li>Certificat de complétion NEXTPLAN</li>
                </ul>
                <div className="checkout-summary-total">
                  <span>Total mensuel</span>
                  <span className="mono">30,00 €</span>
                </div>
                <p className="caption checkout-summary-note">
                  Sans engagement · Annulable à tout moment
                </p>
              </div>

              <div className="checkout-step-actions">
                <Link to="/pricing" className="btn btn-ghost">← Modifier</Link>
                <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
                  Procéder au paiement →
                </button>
              </div>
            </motion.section>
          )}

          {/* ===== ÉTAPE 2 ===== */}
          {step === 2 && !done && (
            <motion.section
              key="step2"
              className="checkout-step glass-card glow-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="gradient-text">Informations de paiement</h1>
              <p className="checkout-step-sub">
                Ce formulaire est une simulation pédagogique. Aucune transaction réelle.
              </p>

              <form className="checkout-form" onSubmit={onSubmit} noValidate>
                <div className="checkout-form-row">
                  <Field label="Prénom" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
                  <Field label="Nom" value={form.lastName} onChange={update('lastName')} error={errors.lastName} />
                </div>
                <Field label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} />

                <div className="checkout-card-block">
                  <span className="caption text-accent">Informations carte (simulation)</span>
                  <Field label="Numéro de carte" placeholder="1234 5678 9012 3456" value={form.card} onChange={update('card')} error={errors.card} mono />
                  <div className="checkout-form-row">
                    <Field label="Date d'expiration" placeholder="MM/AA" value={form.exp} onChange={update('exp')} error={errors.exp} mono />
                    <Field label="CVV" placeholder="123" value={form.cvv} onChange={update('cvv')} error={errors.cvv} mono />
                  </div>
                </div>

                <div className="checkout-step-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Récapitulatif</button>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner /> Traitement…
                      </>
                    ) : (
                      <>Valider ma commande →</>
                    )}
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {/* ===== SUCCÈS ===== */}
          {done && (
            <motion.section
              key="success"
              className="checkout-success glass-card glow-border"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Orb décoratif retiré */}
              <motion.svg
                width="100" height="100" viewBox="0 0 100 100" fill="none"
                className="checkout-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <circle cx="50" cy="50" r="46" stroke="var(--color-accent-teal)" strokeWidth="3" fill="rgba(0,201,177,0.1)"/>
                <motion.path
                  d="M 32 52 L 45 65 L 70 38"
                  stroke="var(--color-accent-teal)" strokeWidth="5"
                  strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
              </motion.svg>
              <h1 className="animated-gradient-text">Accès activé !</h1>
              <p className="checkout-success-text">
                Bienvenue dans la formule Premium NEXTPLAN. Vous avez maintenant accès à
                l'ensemble des cours, fiches et exercices.
              </p>
              <div className="checkout-step-actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/espace-etudiant')}>
                  Accéder à mon espace →
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function Step({ n, label, active, done }) {
  return (
    <div className={`checkout-step-pill ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}>
      <span className="checkout-step-num mono">
        {done ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : n}
      </span>
      <span>{label}</span>
    </div>
  )
}

function Field({ label, value, onChange, error, type = 'text', placeholder, mono }) {
  return (
    <label className={`checkout-field ${error ? 'has-error' : ''}`}>
      <span className="caption">{label}</span>
      <div className="checkout-field-wrap neuro-inset">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={mono ? 'mono' : ''}
        />
      </div>
      {error && <span className="checkout-field-error">{error}</span>}
    </label>
  )
}

function Spinner() {
  return <span className="checkout-spinner" aria-hidden="true" />
}
