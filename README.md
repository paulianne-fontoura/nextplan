# NEXTPLAN

**Planification. Contrôle. Décision.**
Maîtrisez les outils essentiels du pilotage d'entreprise.

Plateforme e-learning gamifiée — 6 modules du programme M1 MSI Planification & Contrôle.
Projet pédagogique Master 1 MSI · Paris 1 Panthéon-Sorbonne.

## Programme couvert (6 modules)

**Gratuits :**
1. **Diagnostic stratégique & contrôle** — PESTEL, Porter, BCG, ADL, cycle de vie produit
2. **Budgets & articulation budgétaire** — ventes, production, achats, trésorerie, budget maître
6. **Méthode MPM** — potentiels METRA, DTO/DTA, chemin critique

**Premium :**
3. **Contrôle budgétaire & analyse des écarts** — décomposition par volume, prix, mix, rendement
4. **Critères de choix d'investissement** — VAN, TRI, IP, délai de récupération
5. **Décision en avenir incertain** — Wald, Maximax, Savage, Laplace, Hurwicz

## Équipe

- **Paulianne Fontoura** — Data Analyst & Cheffe de Projet
- **Dorra Chakour** — Développeuse · Cybersécurité & IA
- **Théophile Rabut** — Contenu & Pédagogie
- **Daryna Kosianchuk** — Recherche & Innovation

## Stack

- Vite + React (JSX)
- React Router v6 (HashRouter pour GitHub Pages)
- Framer Motion
- canvas-confetti
- CSS Variables + design tokens

## Installation

```bash
npm install
npm run dev
```

L'app sera disponible sur `http://localhost:5173/nextplan/`.

## Déploiement GitHub Pages

```bash
# Repo GitHub : "nextplan" (correspond à base: '/nextplan/' dans vite.config.js)
git init
git add .
git commit -m "Initial commit — NEXTPLAN"
git branch -M main
git remote add origin https://github.com/<TON-USER>/nextplan.git
git push -u origin main
npm run deploy
```

Puis Settings → Pages → Branch: `gh-pages`.
URL finale : `https://<TON-USER>.github.io/nextplan/`

## Structure

```
src/
├── components/        composants UI
│   └── icons/         SVG icons
├── pages/             8 pages (Home, Free, Courses, Course, Pricing, Checkout, Dashboard, About)
├── context/           ProgressContext (gamification + localStorage)
├── assets/            courses.json (6 modules complets avec quiz)
└── styles/            design-tokens.css + reset.css
public/
├── 404.html           redirection HashRouter
├── .nojekyll
└── favicon.svg
```

## Gamification

7 badges, niveaux d'XP, progression persistée en localStorage.
Réinitialiser : `localStorage.removeItem('msi-progress')` dans la console.
