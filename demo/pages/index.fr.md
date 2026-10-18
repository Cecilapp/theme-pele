---
title: Accueil
---
# Pele pour Cecil

Ce site est la démo du [thème composant _Pele_](https://github.com/Cecilapp/theme-pele) pour [Cecil](https://cecil.app) : les blocs de code Mermaid des pages sont rendus en SVG par [Pele](https://pele.run), un moteur de rendu Mermaid léger et rapide.

Changez le thème de couleurs dans l'en-tête : les diagrammes le suivent, sans être redessinés.

## Organigramme

```mermaid
flowchart LR
  A[Markdown] --> B{Cecil}
  B --> C[HTML]
  C --> D([Pele])
  D --> E[SVG]
```

## Diagramme de séquence

```mermaid
sequenceDiagram
  participant Navigateur
  participant Site
  participant Pele
  Navigateur->>Site: GET /page.html
  Site-->>Navigateur: HTML avec des blocs de code Mermaid
  Navigateur->>Pele: chargement de la bibliothèque (premier diagramme seulement)
  Pele-->>Navigateur: diagrammes SVG
```

## Camembert

```mermaid
pie title Site statique
  "Contenu" : 60
  "Templates" : 25
  "Assets" : 15
```
