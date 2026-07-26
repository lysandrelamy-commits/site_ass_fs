# Site Formul'UT

Site vitrine de Formul'UT, écurie Formula Student de l'UTC Compiègne. HTML/CSS/JS statique, sans dépendance de build (pas de npm, pas de framework) — chaque page peut être ouverte directement dans un navigateur.

## Structure

```
formul-ut/
├── index.html              # Page d'accueil
├── pages/
│   ├── voiture.html        # FS01 / FE01 — fiches techniques
│   ├── equipe.html         # Bureau, pôles techniques, recrutement
│   ├── resultats.html      # Palmarès compétition + transparence budgétaire
│   ├── sponsors.html       # Niveaux de partenariat + contact direct
│   ├── actualites.html     # Actualités filtrables + timeline
│   └── contact.html        # Formulaire + coordonnées
├── assets/                 # PDF, images, médias (voir assets/README.md)
├── css/shared.css          # Source du CSS commun (voir note ci-dessous)
└── js/shared.js            # Source du JS commun (voir note ci-dessous)
```

### Note sur `css/` et `js/`

Chaque fichier HTML embarque son propre CSS et JS en `<style>`/`<script>` inline — **aucune page ne charge `css/shared.css` ni `js/shared.js` directement**. Ces deux fichiers sont la source de référence : si tu modifies le design ou le comportement commun (nav, footer, boutons...), édite-les puis reporte le changement dans le `<style>`/`<script>` de chaque page HTML. Ce choix évite tout problème de chemin relatif à l'ouverture locale des fichiers (double-clic, `file://`).

## À faire avant mise en ligne

- [ ] Remplacer tous les cadres photo (`📷` / `📐`, bordure pointillée) par de vraies images — chaque cadre indique le type de plan attendu
- [ ] Déposer `dossier-sponsoring.pdf` et `kit-media.zip` dans `assets/`
- [ ] Remplacer les noms du bureau (`equipe.html`) par les vrais membres
- [ ] Vérifier/ajuster les chiffres du palmarès et du budget (`resultats.html`)
- [ ] Mettre le vrai lien Calendly et numéro de téléphone (`sponsors.html`, `contact.html`)
- [ ] Brancher le formulaire de contact à un service d'envoi (Formspree, Netlify Forms, ou backend maison) — actuellement il affiche juste un message de succès sans rien envoyer
- [ ] Mettre à jour les liens réseaux sociaux (LinkedIn, Instagram) dans les footers

## Développement local

Aucune installation nécessaire. Ouvrir `index.html` dans un navigateur, ou servir le dossier avec :

```bash
python3 -m http.server 8000
```

puis ouvrir `http://localhost:8000`.

## Déploiement

Site 100% statique : compatible avec GitHub Pages, Netlify, Vercel ou tout hébergement mutualisé classique. Pour GitHub Pages, activer Pages sur la branche `main` (dossier racine).
