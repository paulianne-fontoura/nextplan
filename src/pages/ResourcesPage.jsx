import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import './ResourcesPage.css'

// Nouvel ordre : Networking · Événements · Actualités · Carrières (Premium)
const TABS = [
  { id: 'networking',  label: 'Networking' },
  { id: 'evenements',  label: 'Événements' },
  { id: 'actualites',  label: 'Actualités' },
  { id: 'carrieres',   label: 'Carrières ✦', premium: true },
]

const EVENTS = [
  { title:'Forum Entreprises Paris 1',      date:'12 octobre 2025',    ville:'Paris', type:'Forum recruteurs',         desc:"60 entreprises présentes, espace dédié contrôle de gestion et finance.", past:false },
  { title:'Conférence FP and A 2026',       date:'8 février 2026',     ville:'Paris', type:'Conférence',               desc:"Évolution du métier de contrôleur de gestion à l'ère de la data et de l'IA.", past:false },
  { title:'Salon Management Sup',           date:'15 mars 2026',       ville:'Paris', type:'Salon étudiant',           desc:"Rencontres avec les grandes écoles de management et MBA spécialisés.", past:false },
  { title:'Journée du Contrôle de Gestion', date:'24 avril 2026',      ville:'Paris', type:'Séminaire',                desc:"Témoignages d'anciens MSI sur leur premier poste en cabinet et entreprise.", past:false },
  { title:'Forum Stages M1 MSI',            date:'15 septembre 2025',  ville:'Paris', type:'Forum interne',            desc:"Edition précédente : 40 offres de stages présentées à la promotion.", past:true },
  { title:'Rencontres Alumni MSI',          date:'20 juin 2025',       ville:'Paris', type:'Networking',               desc:"Soirée annuelle du réseau des anciens — 200 alumni présents.", past:true },
]

const ARTICLES = [
  { title:"L'évolution du contrôle de gestion à l'ère de l'IA",   date:'15 mars 2026',    duree:'6 min', tag:'Tendance',  body:"L'IA générative bouleverse les pratiques du contrôleur de gestion : automatisation des reportings, prédiction des écarts, recommandations d'actions correctives. Ce qui restait du quotidien il y a 5 ans devient progressivement délégué aux outils — laissant au contrôleur un rôle plus stratégique de business partner.", gradient:'linear-gradient(135deg, #6366F1, #8B5CF6)' },
  { title:"BCG vs McKinsey : les différences de culture",          date:'8 mars 2026',     duree:'5 min', tag:'Carrière',  body:"Deux cabinets de prestige, deux philosophies. BCG mise sur l'analyse profonde et la documentation rigoureuse. McKinsey privilégie l'action rapide et l'impact mesurable. Le profil idéal pour chacun diffère — ce que recherche un MBB en sortie de master.", gradient:'linear-gradient(135deg, #0EA5E9, #6366F1)' },
  { title:"Pourquoi la MPM revient dans l'industrie 4.0",          date:'1 mars 2026',     duree:'7 min', tag:'Méthode',   body:"Avec la complexification des projets industriels (transition énergétique, jumeaux numériques), la planification par réseau redevient incontournable. La MPM, méthode des potentiels METRA, offre la flexibilité nécessaire face aux PERT et GANTT trop rigides.", gradient:'linear-gradient(135deg, #EC4899, #FF6B7A)' },
  { title:"Le budget base zéro : retour en grâce en 2025 ?",       date:'22 février 2026', duree:'6 min', tag:'Budgets',   body:"Né dans les années 70 chez Texas Instruments, le BBZ (Zero-Based Budgeting) revient en force chez les grands groupes confrontés à la pression sur les marges. Avantages, limites et conditions de succès.", gradient:'linear-gradient(135deg, #0EA5E9, #4ECDC4)' },
  { title:"Les nouveaux critères d'investissement ESG",            date:'14 février 2026', duree:'8 min', tag:'Finance',   body:"VAN et TRI ne suffisent plus. L'intégration des critères ESG (environnementaux, sociaux, gouvernance) modifie l'arbitrage entre projets concurrents. Comment construire une VAN ESG-adjusted ? Quels écueils éviter ?", gradient:'linear-gradient(135deg, #10B981, #4ECDC4)' },
  { title:"Comment Paris 1 forme les futurs contrôleurs",          date:'5 février 2026',  duree:'5 min', tag:'Formation', body:"Le Master MSI de Paris 1 Panthéon-Sorbonne couvre un programme dense : diagnostic stratégique, budgets, contrôle, investissement, décision, planification. Une formation qui place ses diplômés en cabinets, banques et grands groupes industriels.", gradient:'linear-gradient(135deg, #F59E0B, #FFB830)' },
]

export default function ResourcesPage() {
  const [tab, setTab] = useState('networking')
  const [openArticle, setOpenArticle] = useState(null)
  const { isPremium } = useProgress()

  return (
    <main className="resources-page">
      <section className="resources-hero section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="resources-hero-content"
          >
            <span className="caption accent-text">Ressources</span>
            <h1>Au-delà des cours.</h1>
            <p>
              Networking, événements à venir, actualités du secteur et opportunités carrière —
              tout ce qui complète votre formation NEXTPLAN.
            </p>
          </motion.div>

          <div className="resources-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`resources-tab ${tab === t.id ? 'is-active' : ''} ${t.premium ? 'is-premium' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {tab === 'networking' && <NetworkingTab />}
              {tab === 'evenements' && <EventsTab />}
              {tab === 'actualites' && <ArticlesTab onOpen={setOpenArticle} />}
              {tab === 'carrieres'  && <CarrieresPremiumTab isPremium={isPremium} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}

// =====================================
function NetworkingTab() {
  const ASSOS = [
    'Bureau des Étudiants Finance Paris 1',
    'Cercle des Étudiants en Gestion (CEG)',
    'Finance Club Sorbonne',
    'Junior Enterprise Paris 1',
    'Club Audit et Contrôle M1 MSI',
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="resources-networking-grid">

      {/* Colonne Associations */}
      <div style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: '20px',
        padding: '28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'rgba(99,102,241,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
            Associations étudiantes
          </h3>
        </div>
        {ASSOS.map((item, j) => (
          <div key={j} style={{
            display: 'flex', gap: '10px', alignItems: 'center',
            padding: '10px 0',
            borderBottom: j < ASSOS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#6366F1', flexShrink: 0,
            }} />
            <span style={{ fontSize: '14px', color: '#4a4a6a' }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Colonne Alumni */}
      <div style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#10B981" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
            Réseau Alumni Paris 1
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: '#5a5a7a', lineHeight: '1.7', flex: 1 }}>
          Rejoignez le réseau des anciens étudiants du Master MSI.
          Échangez avec des professionnels en poste dans le contrôle de gestion,
          la finance et le conseil. Accédez à des opportunités et des conseils de carrière exclusifs.
        </p>
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['340 membres actifs', 'Paris · Lyon · Bordeaux', 'Slack + LinkedIn'].map((tag, k) => (
              <span key={k} style={{
                fontSize: '12px', fontWeight: '500',
                padding: '4px 10px', borderRadius: '999px',
                background: 'rgba(16,185,129,0.08)',
                color: '#10B981',
                border: '1px solid rgba(16,185,129,0.2)',
              }}>{tag}</span>
            ))}
          </div>
          <button
            onClick={() => window.open('https://www.linkedin.com/school/université-paris-1-panthéon-sorbonne/', '_blank', 'noopener,noreferrer')}
            style={{
              width: '100%', padding: '12px',
              borderRadius: '12px', cursor: 'pointer',
              border: '1.5px solid rgba(16,185,129,0.4)',
              background: 'transparent', color: '#10B981',
              fontSize: '14px', fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
          >
            Rejoindre le réseau →
          </button>

          {/* Lien associations Paris 1 */}
          <a
            href="https://www.univ-paris1.fr/vie-etudiante/associations/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#6366F1', fontSize: '13px', fontWeight: '600',
              textDecoration: 'none', display: 'block', marginTop: '16px', textAlign: 'center',
            }}
          >
            Voir toutes les associations Paris 1 →
          </a>
        </div>
      </div>
    </div>
  )
}

function EventsTab() {
  return (
    <div className="resources-tab-content">
      <div className="resources-section-header">
        <h2>Événements à ne pas manquer</h2>
        <p>Forums, conférences, séminaires — l'agenda pour 2025-2026.</p>
      </div>

      <div className="resources-grid-events">
        {EVENTS.map((e, i) => (
          <motion.article
            key={i}
            className={`event-card ${e.past ? 'is-past' : 'is-upcoming'}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <div className="event-top">
              <span className={`event-status ${e.past ? 'is-past' : 'is-upcoming'}`}>
                {e.past ? 'Passé' : 'À venir'}
              </span>
              <span className="event-type">{e.type}</span>
            </div>
            <h3>{e.title}</h3>
            <p className="event-meta">{e.date} · {e.ville}</p>
            <p className="event-desc">{e.desc}</p>
            {!e.past && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => window.open('https://www.univ-paris1.fr/evenements/', '_blank', 'noopener,noreferrer')}
              >
                S'inscrire <span className="course-arrow">→</span>
              </button>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  )
}

function ArticlesTab({ onOpen }) {
  return (
    <div className="resources-tab-content">
      <div className="resources-section-header">
        <h2>L'essentiel du secteur</h2>
        <p>6 articles pour comprendre les mutations du contrôle de gestion et de la finance d'entreprise.</p>
      </div>

      <div className="resources-grid-articles">
        {ARTICLES.map((a, i) => (
          <motion.article
            key={i}
            className="article-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            onClick={() => onOpen(a)}
          >
            <div className="article-image" style={{ background: a.gradient }}>
              <span className="article-tag">{a.tag}</span>
            </div>
            <div className="article-body">
              <h4>{a.title}</h4>
              <p className="article-meta">{a.date} · {a.duree} de lecture</p>
              <span className="article-link">Lire l'article <span className="course-arrow">→</span></span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

// =====================================
// CARRIÈRES PREMIUM — 2 modules côte à côte
// =====================================
function CarrieresPremiumTab({ isPremium }) {
  // Si non-abonné, tous les CTA redirigent vers /pricing
  const goToJobs = () =>
    isPremium
      ? window.open('https://www.linkedin.com/jobs/', '_blank', 'noopener,noreferrer')
      : (window.location.hash = '/pricing')
  const goToJobsAll = () =>
    isPremium
      ? window.open('https://www.linkedin.com/jobs/search/?keywords=contr%C3%B4leur+de+gestion&location=Paris', '_blank', 'noopener,noreferrer')
      : (window.location.hash = '/pricing')
  const goToCoaching = () =>
    isPremium
      ? window.open('https://www.linkedin.com/learning/', '_blank', 'noopener,noreferrer')
      : (window.location.hash = '/pricing')

  const JOBS = [
    { title: 'Contrôleur de gestion junior',  company: 'Société Générale', type: 'CDI',         salary: '38-44k€' },
    { title: 'Analyste financier',            company: "L'Oréal",          type: 'CDI',         salary: '40-48k€' },
    { title: 'Consultant junior Finance',     company: 'Deloitte',         type: 'CDI',         salary: '42-50k€' },
    { title: 'Alternant contrôle de gestion', company: 'LVMH',             type: 'Alternance',  salary: '1 200€/mois' },
  ]

  const TIPS = [
    'Modèle de CV contrôleur de gestion (format PDF)',
    'Mots-clés LinkedIn par secteur (banque, conseil, industrie)',
    'Checklist profil LinkedIn en 12 points',
    'Exemples de résumés LinkedIn qui fonctionnent',
  ]

  return (
    <div>
      {/* Badge premium */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '6px 16px', borderRadius: '999px',
        background: 'linear-gradient(135deg, rgba(245,158,11,0.10), rgba(236,72,153,0.10))',
        border: '1px solid rgba(245,158,11,0.30)',
        fontSize: '12px', fontWeight: '700', color: '#F59E0B',
        marginBottom: '32px', letterSpacing: '0.06em',
      }}>
        ✦ CONTENU PREMIUM — inclus dans le forfait 30€/mois
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="resources-networking-grid">

        {/* MODULE 1 — Offres d'emploi */}
        <div style={{
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderTop: '3px solid #6366F1',
          borderRadius: '20px', padding: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(99,102,241,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
                Offres d'emploi
              </h3>
              <p style={{ fontSize: '12px', color: '#8080a0', margin: '2px 0 0' }}>
                Sélection mise à jour chaque semaine
              </p>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#5a5a7a', marginBottom: '20px', lineHeight: '1.6' }}>
            Accédez à des offres ciblées en contrôle de gestion, audit et finance,
            pré-sélectionnées pour les profils M1 MSI Paris 1.
          </p>
          {JOBS.map((job, i) => (
            <div
              key={i}
              onClick={goToJobs}
              style={{
                padding: '12px 0',
                borderBottom: i < JOBS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e' }}>{job.title}</div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '3px' }}>
                <span style={{ fontSize: '12px', color: '#6366F1' }}>{job.company}</span>
                <span style={{ fontSize: '12px', color: '#8080a0' }}>{job.type}</span>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>{job.salary}</span>
              </div>
            </div>
          ))}
          <button
            onClick={goToJobsAll}
            style={{
              marginTop: '20px', width: '100%', padding: '12px',
              borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              color: 'white', fontSize: '14px', fontWeight: '600',
            }}
          >
            {isPremium ? 'Voir toutes les offres →' : 'Débloquer Premium — 30€/mois →'}
          </button>
        </div>

        {/* MODULE 2 — Coaching CV et LinkedIn */}
        <div style={{
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderTop: '3px solid #10B981',
          borderRadius: '20px', padding: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(16,185,129,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#10B981" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
                Coaching CV et LinkedIn
              </h3>
              <p style={{ fontSize: '12px', color: '#8080a0', margin: '2px 0 0' }}>
                Conseils personnalisés pour votre profil
              </p>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#5a5a7a', marginBottom: '20px', lineHeight: '1.6' }}>
            Optimisez votre CV et votre présence LinkedIn pour le secteur du contrôle
            de gestion. Mots-clés, structure, personal branding — tout ce qu'il faut
            pour vous démarquer.
          </p>
          {TIPS.map((label, i) => (
            <div
              key={i}
              onClick={goToCoaching}
              style={{
                display: 'flex', gap: '10px', padding: '10px 0',
                borderBottom: i < TIPS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                fontSize: '13px', color: '#4a4a6a', lineHeight: '1.5',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: '#10B981', fontWeight: '700', flexShrink: 0 }}>→</span>
              {label}
            </div>
          ))}
          <button
            onClick={goToCoaching}
            style={{
              marginTop: '20px', width: '100%', padding: '12px',
              borderRadius: '12px', border: '1.5px solid rgba(16,185,129,0.4)',
              cursor: 'pointer', background: 'transparent',
              color: '#10B981', fontSize: '14px', fontWeight: '600',
            }}
          >
            {isPremium ? 'Accéder aux ressources →' : 'Débloquer Premium — 30€/mois →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ArticleModal({ article, onClose }) {
  return (
    <motion.div
      className="article-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="article-modal"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="article-modal-close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="article-modal-image" style={{ background: article.gradient }}>
          <span className="article-tag">{article.tag}</span>
        </div>
        <div className="article-modal-body">
          <h2>{article.title}</h2>
          <p className="article-meta">{article.date} · {article.duree} de lecture</p>
          <p className="article-content">{article.body}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
