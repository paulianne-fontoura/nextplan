# Déploiement NEXTPLAN

## 🌐 URL du site
**https://paulianne-fontoura.github.io/nextplan/**

## 📂 Repository
https://github.com/paulianne-fontoura/nextplan

---

## 🔄 Mettre à jour le site

Une fois vos modifications terminées localement, ouvrez un terminal dans le dossier du projet et lancez ces 3 commandes :

```bash
git add .
git commit -m "Description courte de ce que vous avez changé"
npm run deploy
```

Le site sera mis à jour automatiquement en 1 à 2 minutes.

**Important** : si le terminal ne reconnaît pas `npm`, ajoutez d'abord :
```
$env:PATH = "C:\Program Files\nodejs;C:\Program Files\GitHub CLI;" + $env:PATH
```
(à coller une fois par session de terminal)

---

## 🛠 Architecture technique

- **Framework** : React 18 + Vite 5
- **Router** : HashRouter (compatible GitHub Pages)
- **Animations** : Framer Motion
- **Déploiement** : `gh-pages` package
- **Base path** : `/nextplan/` (configuré dans `vite.config.js`)

---

## ✅ Vérifications après déploiement

Si quelque chose ne fonctionne pas après `npm run deploy`, vérifiez :

1. **Le build local fonctionne** :
   ```
   npm run build
   ```

2. **Le site est accessible** :
   ```
   curl -s -o /dev/null -w "%{http_code}" https://paulianne-fontoura.github.io/nextplan/
   ```
   Doit retourner `200`.

3. **GitHub Pages est actif** : aller sur
   https://github.com/paulianne-fontoura/nextplan/settings/pages
   - Source : `Deploy from a branch`
   - Branch : `gh-pages` / `/ (root)`

---

## 🆘 Problèmes fréquents

### Le site affiche un écran blanc
- Vider le cache du navigateur (Ctrl+Shift+R)
- Vérifier la console (F12) — souvent un chemin d'asset incorrect

### Une page retourne 404
- Vérifier que `HashRouter` est utilisé dans `src/App.jsx`
- Les URLs doivent être de la forme `#/cours/diagnostic` (avec dièse)

### `npm run deploy` échoue
- Vérifier que vous êtes connectée à GitHub : `gh auth status`
- Si nécessaire : `gh auth login`

### Conflit de branche
Si Git refuse de pousser (`error: failed to push some refs`) :
```
git pull origin main --rebase
git push
```

---

## 📝 Modifier le contenu sans toucher au code

La plupart du contenu pédagogique est dans `src/assets/courses.json`. Pour modifier :
- Un titre de cours, une description, une formule, un exemple → éditer ce fichier
- Le contenu des leçons animées → `src/assets/lessons/*.jsx`
- Le texte des pages (accueil, à propos, tarifs) → `src/pages/*.jsx`

Après chaque modification : `git add . && git commit -m "..." && npm run deploy`

---

## 🎬 Ajouter une vidéo YouTube pour un module

Quand une vidéo est prête :
1. Uploader la vidéo sur YouTube (visibilité « unlisted » recommandée)
2. Récupérer l'ID de la vidéo (la partie après `v=` dans l'URL)
3. Dans `src/assets/courses.json`, trouver le module concerné
4. Remplacer `"videoUrl": "https://www.youtube.com/embed/[PLACEHOLDER]"` par
   `"videoUrl": "https://www.youtube.com/embed/VOTRE_ID_ICI"`
5. `git add . && git commit -m "Ajout vidéo module XXX" && npm run deploy`

Le panneau « Vidéo à enregistrer » disparaîtra automatiquement.
