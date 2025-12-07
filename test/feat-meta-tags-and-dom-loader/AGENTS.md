# AI Agent Context: Phorma Scientific Website

This document provides context for AI agents working with the Phorma Scientific website codebase.

## Project Overview

**Phorma Scientific** is a minimalist, high-performance static website built with zero frameworks or dependencies. The site embodies the company's "Structure over Chaos" philosophy through precise, architecturally sound design.

- **Live Sites:** `phorma.sh` / `phorma.xyz` / `phorma.ar`
- **Stack:** Pure HTML5, CSS3, and Vanilla JavaScript
- **Philosophy:** Zero-bloat, mobile-first, performance-obsessed
- **Bundle Size Target:** < 50KB total (uncompressed)

## Core Principles

When working with this codebase, always prioritize:

1. **Minimalism:** No frameworks, no dependencies, no bloat
2. **Performance:** Every byte counts. Keep total bundle size under 50KB
3. **Standards Compliance:** Use semantic HTML, accessible markup, pure CSS/JS
4. **Mobile-First:** Responsive design that works on all devices
5. **Maintainability:** Clear, simple code that's easy to understand

## Architecture

### Technology Stack

- **HTML5:** Semantic, accessible markup with ARIA labels
- **CSS3:** Single stylesheet (`css/styles.css`, ~12KB)
- **Vanilla JavaScript:** Minimal interaction layer
  - `js/main.js` — Navigation and theme toggling (~4KB)
  - `js/content-loader.js` — Dynamic markdown content loading

### File Structure

```
.
├── assets/                 # Logo variants and images
├── content/                # Markdown-based content
│   ├── services/          # Service offerings (en/es)
│   └── trainees/          # Training programs (en/es)
├── css/
│   └── styles.css         # Single stylesheet
├── js/
│   ├── main.js            # Navigation & theme
│   └── content-loader.js  # Content loading system
├── es/                    # Spanish translations
│   ├── index.html
│   ├── services.html
│   ├── trainees.html
│   └── contact.html
├── index.html             # English home page
├── services.html          # English services
├── trainees.html          # English trainees
└── contact.html           # English contact
```

### Content Management System

The site uses a **markdown-based content system** for services and trainees pages:

1. **Markdown Files:** Stored in `content/{services|trainees}/{en|es}/`
2. **Frontmatter:** YAML-style metadata (title, meta, order, etc.)
3. **Dynamic Loading:** `content-loader.js` fetches and renders markdown at runtime
4. **Simple Parsing:** Custom lightweight markdown parser (no external libs)

#### Example Service Markdown

```markdown
---
title: System Audit & Architecture
meta: S1 — DIAGNOSTIC
order: 1
---

Core service description in markdown format.

**Bold text** and `inline code` supported.

- Bullet points
- Work naturally

---

Footer content here (deliverables, timeline, etc.)
```

## Internationalization (i18n)

- **English:** Root directory (`/`)
- **Spanish:** `/es/` directory
- **Content:** Separate markdown files per language in `content/{type}/{lang}/`
- **Navigation:** Language switcher in header toggles between versions

**Important:** When adding/modifying content:
- Always update BOTH English and Spanish versions
- Maintain professional, technical tone in translations
- Keep file naming conventions consistent

## Design System

### Color Palette

```css
--black: #000000
--white: #FFFFFF
--grey: #E5E5E5
--dark-grey: #333333
```

### Typography

- **Headings:** JetBrains Mono (monospace) — technical, precise
- **Body:** Inter (sans-serif) — clean, readable

### Spacing System (8px base)

```
--spacing-xs:  8px
--spacing-sm:  16px
--spacing-md:  32px
--spacing-lg:  48px
--spacing-xl:  64px
--spacing-xxl: 96px
```

### Components

- Responsive navigation with mobile hamburger menu
- Hero sections with fade-in animations
- Card grids (2-col, 3-col, 4-col responsive)
- CTA buttons with hover effects
- Authority logo grid (client testimonials)
- Dark/light theme toggle

## Development Guidelines

### Making Changes

1. **HTML:**
   - Use semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
   - Include ARIA labels for accessibility
   - Keep structure consistent across English/Spanish versions

2. **CSS:**
   - All styles in single `css/styles.css` file
   - Use existing spacing variables
   - Mobile-first approach (min-width media queries)
   - Keep specificity low, avoid !important

3. **JavaScript:**
   - Vanilla JS only, no frameworks
   - Keep functions pure and testable
   - Minimize DOM manipulation
   - Use strict mode (`'use strict';`)

4. **Content:**
   - Update markdown files in `content/` directories
   - Use frontmatter for metadata
   - Keep markdown simple (bold, code, lists, hr only)
   - Maintain parallel English/Spanish content

### Adding New Services or Trainees

1. Create markdown file in `content/{type}/{lang}/`
2. Use naming convention: `##-descriptive-name.md` (e.g., `05-new-service.md`)
3. Add frontmatter with required fields:
   ```yaml
   ---
   title: Service Title
   meta: S# — CATEGORY
   order: #
   ---
   ```
4. Update file list in `js/content-loader.js` if needed
5. Verify on both English and Spanish pages

### Testing Locally

```bash
# Python simple server
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Performance Checklist

Before committing changes:
- [ ] Total page weight still < 50KB
- [ ] Images optimized (use SVG where possible)
- [ ] No new dependencies added
- [ ] Mobile responsive on all screen sizes
- [ ] Dark theme works correctly
- [ ] Both English and Spanish versions updated

## Common Tasks

### Update Logo
- Replace files in `assets/` directory
- Ensure both light (`logo.svg`) and dark (`logo-invertido.svg`) versions exist
- Keep file sizes minimal (< 5KB per SVG)

### Add New Page
1. Create HTML in root for English, `/es/` for Spanish
2. Copy structure from existing pages (header, nav, main, footer)
3. Update navigation links in `js/main.js` if needed
4. Test language switcher functionality

### Modify Styles
- Edit `css/styles.css` only
- Use existing CSS variables
- Test dark theme compatibility
- Verify mobile responsiveness

### Update Contact Form
- Form currently uses Formspree integration
- Update action URL in `contact.html` and `es/contact.html`
- Keep form fields minimal and accessible

## Brand Voice

When writing content (markdown or HTML):

- **Tone:** Professional, precise, technical
- **Style:** Direct, no fluff, architecture-focused
- **Language:** Clear, confident, authoritative
- **Avoid:** Marketing jargon, buzzwords, excessive adjectives
- **Example:** "Structure over Chaos" not "Amazing Innovative Solutions"

## Git Workflow

- **Main Branch:** `main` (auto-deploys to GitHub Pages)
- **Feature Branches:** Use descriptive names (`feature/`, `docs/`, `fix/`)
- **Commits:** Follow Conventional Commits format (see below)
- **PRs:** Required for all changes (no direct pushes to main)

### Conventional Commits

This project uses **Conventional Commits** for structured, readable commit history:

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, CSS changes (no code change)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance, tooling
- `ci:` CI/CD changes

**Examples:**
```bash
feat: Add dark theme toggle to navigation
fix: Correct mobile menu z-index on iOS
docs: Update README with justfile commands
style: Improve hero section spacing
refactor: Simplify markdown parser logic
chore: Add justfile for development tasks
ci: Add path filters to PR preview workflow
```

### Conventional Comments

Use **Conventional Comments** for PR reviews and code discussions:

**Format:**
```
<label> [decorations]: <subject>

[discussion]
```

**Labels:**
- `praise:` Positive feedback
- `nitpick:` Minor issue
- `suggestion:` Improvement idea
- `issue:` Problem that needs fixing
- `todo:` Follow-up task
- `question:` Clarification needed
- `thought:` Thinking out loud
- `chore:` Maintenance task
- `note:` General note

**Decorations:**
- `(blocking)` — Must be addressed before merge
- `(non-blocking)` — Can be addressed later
- `(if-minor)` — Only if it's a small change

**Examples:**
```
suggestion: Consider using CSS custom properties for consistent theming

issue (blocking): This breaks mobile navigation on Safari iOS

nitpick: Extra whitespace on line 42

praise: Excellent use of semantic HTML!

question: Should this work in the Spanish version too?
```

## Deployment

- Automatic deployment via GitHub Pages on push to `main`
- Custom domains: `phorma.sh` / `phorma.xyz` / `phorma.ar`
- CNAME file in root manages domain routing
- No build step required (pure static files)

## Resources

- **README.md** — Full project documentation
- **LICENSE** — Licensing information
- **CNAME** — Domain configuration

## Contact

For questions about the codebase or Phorma Scientific:
- **Email:** info@phorma.sh
- **Philosophy:** Structure over Chaos
