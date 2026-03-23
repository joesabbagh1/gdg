## Guide de contenu

Objectif: rendre les mises a jour simples, sans toucher au code.

### Ajouter ou modifier un evenement

1. Ouvrir `content/events.json`
2. Ajouter un bloc dans le tableau avec le format suivant:

```json
{
  "slug": "nom-unique",
  "title": "Titre de l'evenement",
  "location": "Lieu",
  "date": "12 Mar",
  "description": "Description courte et claire"
}
```

Regles:
- `slug` doit etre unique et en minuscules, sans espaces.
- `title` et `description` sont affiches sur la page.
- `date` est libre (ex: "12 Mar", "Avril 2026").

### Ajouter un type de contenu plus tard

Le modele actuel isole le contenu dans `content/`:
- Ajouter un fichier JSON (ex: `content/blog.json`)
- Ajouter un type dans `types/`
- Ajouter une fonction de lecture dans `lib/data/`
- Ajouter une page dans `app/`

Ce schema permet d'ouvrir plus tard vers une base de donnees ou un CMS sans casser l'UI.
