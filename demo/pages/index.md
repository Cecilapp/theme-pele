---
title: Home
---
# Pele for Cecil

This website is the demo of the [_Pele_ component theme](https://github.com/Cecilapp/theme-pele) for [Cecil](https://cecil.app): the Mermaid code blocks of the pages are rendered to SVG by [Pele](https://pele.run), a small and fast Mermaid renderer.

Switch the color scheme in the header: the diagrams follow it, without being re-rendered.

## Flowchart

````markdown
```mermaid
flowchart LR
  A[Markdown] --> B{Cecil}
  B --> C[HTML]
  C --> D([Pele])
  D --> E[SVG]
```
````

```mermaid
flowchart LR
  A[Markdown] --> B{Cecil}
  B --> C[HTML]
  C --> D([Pele])
  D --> E[SVG]
```

## Sequence diagram

```mermaid
sequenceDiagram
  participant Browser
  participant Site
  participant Pele
  Browser->>Site: GET /page.html
  Site-->>Browser: HTML with Mermaid code blocks
  Browser->>Pele: load the library (first diagram only)
  Pele-->>Browser: SVG diagrams
```

## Pie chart

```mermaid
pie title Static site
  "Content" : 60
  "Templates" : 25
  "Assets" : 15
```

## Gantt chart

```mermaid
gantt
  title Release
  dateFormat YYYY-MM-DD
  section Theme
    Layouts   :done, a1, 2026-10-01, 5d
    Assets    :active, a2, after a1, 4d
  section Demo
    Pages     :a3, after a2, 3d
    Deploy    :crit, a4, after a3, 1d
```

## Error

A diagram with a syntax error is displayed with its error message:

```mermaid
flowchart LR
  A --> 
```
