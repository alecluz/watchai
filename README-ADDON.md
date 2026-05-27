# WatchAI — Addon : Splash + Lang Switcher + Background

## Ce que ça fait
- **Fond animé** : orbes lumineux + grille subtile, sans toucher au CSS existant
- **Splash screen** d'entrée avec animation lettre par lettre + barre de progression + bouton « Commencer »
- **Switcher FR / EN** intégré dans la topbar
- **100% non-destructif** : aucune modification de ton `index.html`

---

## Installation — 2 lignes à ajouter dans `index.html`

Ouvre ton `index.html` et ajoute ces 2 lignes **juste avant `</head>`** :

```html
  <link rel="stylesheet" href="splash.css"/>
  <script src="splash.js" defer></script>
</head>
```

C'est tout. Les 2 fichiers doivent être dans le même dossier que `index.html`.

---

## Structure de ton projet sur Vercel/GitHub

```
/
├── index.html        ← ton fichier existant (+ 2 lignes ajoutées)
├── splash.css        ← nouveau
├── splash.js         ← nouveau
├── package.json
└── api/
    └── scrape.js
```

---

## Personnaliser

### Changer la durée avant que le bouton apparaisse
Dans `splash.js`, ligne ~120 :
```js
setTimeout(() => { ... }, 2300); // ← changer 2300 en ms
```

### Ajouter des traductions
Les textes FR/EN sont dans l'objet `i18n` en haut de `splash.js`.

### Changer les couleurs du fond
Dans `splash.css`, section `body::before`, modifie les `rgba()`.

---

## Compatibilité
- Chrome, Firefox, Safari, Edge ✓
- Mobile responsive ✓
- Pas de dépendances externes ✓
