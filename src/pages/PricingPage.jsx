import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PricingCard from '../components/PricingCard'
import './PricingPage.css'

const FAQ_ITEMS = [
  {
    q: "Ce contenu couvre-t-il tout le programme M1 ?",
    a: "Oui. NEXTPLAN couvre les 6 thèmes du cours Planification et Contrôle du Master 1 MSI à Paris 1 Panthéon-Sorbonne : Diagnostic stratégique, Budgets, Contrôle budgétaire, Choix d'investissement, Décision en avenir incertain, Méthode MPM.",
  },
  {
    q: "Quels modules sont accessibles gratuitement ?",
    a: "La formule gratuite donne accès à 3 modules sur 6 : Diagnostic stratégique (PESTEL, Porter, BCG, ADL), Budgets et articulation budgétaire, et Méthode MPM. Vous y trouverez fiches synthétiques, vidéos cours, exercices corrigés et quiz pour chacun.",
  },
  {
    q: "Les exercices sont-ils tirés des vrais TD de Paris 1 ?",
    a: "Les exemples et études de cas s'appuient sur le contenu du cours officiel et reprennent la même méthodologie. Des cas complémentaires ont été ajoutés par l'équipe NEXTPLAN pour densifier la pratique.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Le formulaire de paiement est une simulation pédagogique dans le cadre du projet académique. Dans une version commerciale, l'intégration serait réalisée via un prestataire sécurisé (Stripe ou équivalent) respectant la norme PCI-DSS.",
  },
  {
    q: "Combien de temps ai-je accès au contenu ?",
    a: "Tant que votre abonnement Premium est actif, vous bénéficiez d'un accès illimité à toutes les ressources, mises à jour incluses. Vous pouvez annuler à tout moment depuis votre espace étudiant.",
  },
  {
    q: "Y a-t-il un certificat à la fin ?",
    a: "Oui — un certificat de complétion NEXTPLAN est généré automatiquement dès que vous avez terminé les 6 modules avec un score quiz moyen ≥ 60%.",
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <main className="pricing-page" style={{ position: 'relative', zIndex: 1, isolation: 'isolate', background: '#F8F7FF' }}>
      <section className="pricing-hero">
        <div className="pricing-hero-bg" aria-hidden="true">
          <div className="pricing-glow pricing-glow-1" />
          <div className="pricing-glow pricing-glow-2" />
        </div>
        <div className="container">
          <motion.div
            className="pricing-hero-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="caption text-teal">Tarifs</span>
            <h1>
              <span className="gradient-text">Choisissez</span>
              <br />
              <span className="editorial">votre</span> formule.
            </h1>
            <p className="pricing-hero-sub">
              Une formule gratuite avec 3 modules complets. Une formule Premium pour aller
              au bout des 6 modules et obtenir votre certificat NEXTPLAN.
            </p>

            <div className="pricing-toggle glass-card" role="radiogroup" aria-label="Période de facturation">
              <button
                className={!annual ? 'is-active' : ''}
                onClick={() => setAnnual(false)}
                role="radio"
                aria-checked={!annual}
              >
                Mensuel
              </button>
              <button
                className={annual ? 'is-active' : ''}
                onClick={() => setAnnual(true)}
                role="radio"
                aria-checked={annual}
              >
                Annuel <span className="pricing-toggle-savings">–17%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-cards-grid">
            <PricingCard
              tier="free"
              title="Formule gratuite"
              price="0 €"
              priceNote="Gratuit pour toujours · Sans carte"
              features={[
                { label: 'Module Diagnostic stratégique (PESTEL, Porter, BCG, ADL)', included: true },
                { label: 'Module Budgets et articulation budgétaire', included: true },
                { label: 'Module Méthode MPM (potentiels METRA)', included: true },
                { label: 'Fiches techniques téléchargeables (3 modules)', included: true },
                { label: 'Quiz de positionnement (3 questions par module)', included: true },
                { label: '3 modules avancés (Contrôle, Investissement, Décision)', included: false },
                { label: 'Mentorat individuel en visio', included: false },
                { label: 'Espace Carrières — offres d\'emploi sélectionnées', included: false },
                { label: 'Coaching CV et LinkedIn', included: false },
                { label: 'Certificat de complétion NEXTPLAN', included: false },
              ]}
              ctaLabel="Commencer gratuitement"
              ctaTo="/formations"
            />

            <PricingCard
              tier="premium"
              title="Formule Premium"
              price={annual ? '299 €/an' : '30 €/mois'}
              oldPrice={annual ? '360' : null}
              priceNote={annual ? 'Soit 24,90€/mois · Économisez 61€' : 'Sans engagement · Annulez quand vous voulez'}
              features={[
                { label: 'Tout ce qui est gratuit (3 modules)', included: true },
                { label: 'Module Contrôle budgétaire et analyse des écarts', included: true },
                { label: "Module Choix d'investissement — VAN, TRI, IP, DR", included: true },
                { label: 'Module Décision en avenir incertain — 5 critères', included: true },
                { label: 'Mentorat individuel — 30 min en visio avec un expert', included: true },
                { label: 'Espace Carrières — offres d\'emploi sélectionnées chaque semaine', included: true },
                { label: 'Coaching CV et LinkedIn — modèles, mots-clés, checklist', included: true },
                { label: 'Quiz avancés avec corrections détaillées', included: true },
                { label: 'Certificat de complétion NEXTPLAN', included: true },
              ]}
              ctaLabel={annual ? 'Commencer — 299€/an' : 'Commencer — 30€/mois'}
              ctaTo="/paiement"
              badge="Le plus complet"
              subnote="Paiement sécurisé · Annuler à tout moment"
              highlighted
            />
          </div>
        </div>
      </section>

      <section className="section pricing-faq-section">
        <div className="container">
          <div className="pricing-faq-header">
            <span className="caption text-teal">FAQ</span>
            <h2 className="gradient-text">Questions fréquentes</h2>
          </div>
          <div className="pricing-faq">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                question={item.q}
                answer={item.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function FaqItem({ question, answer, open, onToggle }) {
  return (
    <div className={`faq-item glass-card ${open ? 'is-open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={open}>
        <span>{question}</span>
        <motion.span
          className="faq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="faq-answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
