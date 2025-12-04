# Phorma Scientific Website

**Structure over Chaos** — A minimalist, high-performance static website for Phorma Scientific.

## Overview

Phorma Scientific transforms scientific complexity into production-grade systems. This website embodies our core philosophy through precise, architecturally sound design.

**Live Site:** `phorma.sh` / `phorma.xyz` / `phorma.ar`

## Technical Architecture

### Stack
- **HTML5** — Semantic, accessible markup
- **CSS3** — Mobile-first, zero-bloat styling
- **Vanilla JavaScript** — Minimal interaction layer (navigation only)
- **Static Hosting** — GitHub Pages / Cloudflare Pages

### Design Principles
1. **Zero-Bloat:** Total bundle size < 50KB (uncompressed)
2. **Mobile-First:** Responsive design optimized for all devices
3. **Performance:** No frameworks, no dependencies, pure web standards
4. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation

### File Structure
```
.
├── assets/
│   ├── logo.svg              # Main logo (SVG)
│   └── logo*.png             # Logo variants
├── css/
│   └── styles.css            # Single stylesheet (12KB)
├── js/
│   └── main.js               # Minimal navigation JS (4KB)
├── es/                       # Spanish translations
│   ├── index.html            # Home (Spanish)
│   ├── services.html         # Services (Spanish)
│   ├── trainees.html         # Trainees (Spanish)
│   └── contact.html          # Contact (Spanish)
├── index.html                # Home (Manifesto)
├── services.html             # Service Offerings
├── trainees.html             # Corporate Workshops
├── contact.html              # Contact page with form
└── README.md
```

## Pages

### 1. Home (`index.html`)
- Hero section with manifesto
- The Challenge & Solution sections
- Featured System Audit service
- Authority logos (Tier-1 clients)

### 2. Services (`services.html`)
- **S1:** System Audit & Architecture
- **S2:** Research Software Engineering (RSE)
- **S3:** Scientific Machine Learning (SciML)
- **S4:** Performance Synthesis

### 3. Trainees (`trainees.html`)
- 6 Corporate Workshop programs
- Structured training for R&D teams
- Production-grade upskilling

### 4. Contact (`contact.html`)
- Contact information and response times
- Contact form (Formspree integration ready)
- Quick action cards for common inquiries

## Internationalization

The site is available in **English** and **Spanish**:

- **English:** Root directory (`/`)
- **Spanish:** `/es/` directory

Language switcher in navigation allows seamless switching between languages. All content, including technical terminology, has been professionally translated while maintaining the brand's precise, architecturally-focused tone.

## Development

### Local Preview
```bash
# Using justfile (recommended)
just serve      # or: just dev

# Python simple server
python3 -m http.server 8000

# Node.js (if installed)
npx serve

# Then open: http://localhost:8000
```

### Available Commands (justfile)
```bash
just           # List all available commands
just serve     # Run local server (default port 8000)
just dev       # Alias for serve
just size      # Check bundle sizes
just validate  # Validate HTML files
just clean     # Remove artifacts
just status    # Git status
```

### Deployment
This repository is configured for GitHub Pages. Any push to `main` will automatically deploy.

**Custom Domain Setup:**
1. Add CNAME record: `phorma.sh` → `phormasci.github.io`
2. Create `CNAME` file in root with domain name

### Commit Conventions

This project follows **Conventional Commits** for clear, structured commit messages:

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
- `chore:` Maintenance tasks, tooling
- `ci:` CI/CD changes

**Examples:**
```bash
feat: Add dark theme toggle to navigation
fix: Correct mobile menu z-index issue
docs: Update README with deployment instructions
style: Improve card grid spacing on tablet
refactor: Simplify content loader markdown parser
chore: Add justfile for local development
ci: Add path filters to PR preview workflow
```

**Code Comments:**
Use **Conventional Comments** for PR reviews and code discussions:

```
<label> [decorations]: <subject>

[discussion]
```

**Labels:** `praise`, `nitpick`, `suggestion`, `issue`, `todo`, `question`, `thought`, `chore`, `note`

**Decorations:** `(blocking)`, `(non-blocking)`, `(if-minor)`

**Examples:**
```
suggestion: Consider using CSS custom properties here for theme consistency

issue (blocking): This breaks mobile navigation on iOS Safari

nitpick: Extra whitespace on line 42

praise: Excellent use of semantic HTML here!
```

## Design System

### Color Palette
- **Black:** `#000000`
- **White:** `#FFFFFF`
- **Grey:** `#E5E5E5`
- **Dark Grey:** `#333333`

### Typography
- **Headings:** JetBrains Mono (monospace)
- **Body:** Inter (sans-serif)

### Spacing System (8px base)
- XS: 8px
- SM: 16px
- MD: 32px
- LG: 48px
- XL: 64px
- XXL: 96px

### Components
- Responsive navigation with mobile toggle
- Hero sections with fade-in animations
- Card grids (2-column, 3-column, 4-column)
- CTA buttons with hover effects
- Authority logo grid

## Performance Metrics

- **Total Page Weight:** ~44KB (HTML + CSS + JS)
- **Load Time:** < 1s on 3G
- **Lighthouse Score:** 100/100/100/100 (Performance/Accessibility/Best Practices/SEO)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

See [LICENSE](LICENSE) file.

## Contact

- **Email:** info@phorma.sh
- **Philosophy:** Structure over Chaos

---

**© 2025 Phorma Scientific** — Rigor. Performance. Architecture.