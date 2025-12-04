# Claude Code Instructions

This document provides specific guidance for Claude Code when working with the Phorma Scientific website repository.

## Quick Reference

- **Project Type:** Static website (HTML/CSS/Vanilla JS)
- **No Build Process:** Pure static files, no compilation needed
- **No Package Manager:** Zero npm/yarn dependencies
- **Deployment:** GitHub Pages (auto-deploy on push to `main`)
- **Testing:** Local server only (`python3 -m http.server 8000`)

## Before Making Changes

Always read these files first to understand the current state:
1. `README.md` — Project overview and architecture
2. `AGENTS.md` — Detailed context for AI assistants
3. Relevant HTML/CSS/JS files you'll be modifying

## Key Constraints

### MUST Follow

1. **No Dependencies:** Never suggest installing npm packages, frameworks, or libraries
2. **Pure Web Standards:** HTML5, CSS3, Vanilla JavaScript only
3. **Bundle Size:** Keep total site under 50KB uncompressed
4. **Bilingual:** Always update both English (root) and Spanish (`/es/`) versions
5. **Semantic HTML:** Use proper tags, ARIA labels, accessibility features
6. **Mobile-First:** All changes must be responsive

### MUST NOT Do

- ❌ Add React, Vue, Angular, or any framework
- ❌ Introduce build tools (Webpack, Vite, etc.)
- ❌ Use npm/yarn/package.json
- ❌ Add CSS preprocessors (Sass, Less)
- ❌ Include external CSS/JS libraries (except fonts from Google)
- ❌ Make changes to only English OR Spanish (always both)
- ❌ Use inline styles (all CSS goes in `css/styles.css`)

## File Organization

### When to Edit Each File

| File/Directory | Purpose | When to Edit |
|----------------|---------|--------------|
| `index.html` / `es/index.html` | Home page | Hero section, manifesto, featured content |
| `services.html` / `es/services.html` | Services page | Page structure only (content in markdown) |
| `trainees.html` / `es/trainees.html` | Training programs | Page structure only (content in markdown) |
| `contact.html` / `es/contact.html` | Contact page | Form fields, contact info, response times |
| `css/styles.css` | All styles | Any visual changes, responsive design |
| `js/main.js` | Navigation & theme | Header behavior, mobile menu, theme toggle |
| `js/content-loader.js` | Content system | Markdown parsing, dynamic loading logic |
| `content/services/{en\|es}/` | Service content | Adding/editing service offerings |
| `content/trainees/{en\|es}/` | Training content | Adding/editing training programs |

## Common Tasks

### Task: Add New Service

1. Create markdown files:
   - `content/services/en/##-service-name.md`
   - `content/services/es/##-nombre-servicio.md`

2. Use this template:
   ```markdown
   ---
   title: Service Name
   meta: S# — CATEGORY
   order: #
   ---

   Service description with **bold** and `code`.

   - Feature 1
   - Feature 2
   - Feature 3

   ---

   **Deliverables:** What client receives
   **Timeline:** Duration estimate
   ```

3. Update file lists in `js/content-loader.js` (lines 166-181)

4. Test on both `/services.html` and `/es/services.html`

### Task: Update Styles

1. Edit `css/styles.css` only (never inline styles)
2. Use existing CSS variables (e.g., `var(--spacing-md)`)
3. Follow mobile-first approach (base styles + `@media (min-width: ...)`)
4. Test dark theme (`.dark` class on `<body>`)
5. Verify responsive breakpoints: 768px (tablet), 1024px (desktop)

### Task: Modify Navigation

1. Edit `js/main.js` for behavior (mobile menu toggle, theme switcher)
2. Edit HTML `<header>` sections in each file for links
3. Keep English and Spanish navigation structure identical
4. Test mobile hamburger menu functionality

### Task: Add New Page

1. Create HTML file in root (English) and `/es/` (Spanish)
2. Copy structure from existing page (use `index.html` as reference)
3. Update all `<nav>` elements across site with new link
4. Ensure language switcher points to correct counterpart page
5. Test navigation from all pages

## Content Management

### Markdown Content System

The site uses a custom markdown loader for services and trainees pages:

**Supported Markdown:**
- `**bold text**` → `<strong>bold text</strong>`
- `` `inline code` `` → `<code>inline code</code>`
- `- list item` → `<li>list item</li>` (wrapped in `<ul>`)
- `---` → `<hr>` (horizontal rule / section separator)
- Regular text → `<p>paragraph</p>`

**Not Supported:**
- Headers (`#`, `##`, etc.) — use frontmatter `title`
- Links `[text](url)` — not implemented
- Images `![alt](src)` — not implemented
- Block code ``` ``` — not implemented

If you need these features, either:
1. Add them to the markdown parser in `js/content-loader.js`, OR
2. Use raw HTML in markdown files (it passes through)

### Frontmatter Fields

**Services:**
```yaml
---
title: Service Title       # Required, displayed as card title
meta: S# — CATEGORY       # Required, displayed above title
order: #                  # Required, determines sort order
---
```

**Trainees:**
```yaml
---
title: Program Title      # Required
meta: T# — FOCUS AREA    # Required
order: #                 # Required
duration: "4 weeks"      # Required, shown in card footer
format: "Virtual/Hybrid" # Required, shown in card footer
prerequisites: "Basic X" # Required, shown in card footer
outcome: "What you get"  # Required, shown in card footer
---
```

## Testing Workflow

### Before Committing

1. **Local Server:**
   ```bash
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```

2. **Manual Checks:**
   - [ ] Test on mobile viewport (Chrome DevTools)
   - [ ] Toggle dark/light theme (switch in header)
   - [ ] Switch between English/Spanish
   - [ ] Verify all navigation links work
   - [ ] Check responsive breakpoints (768px, 1024px)
   - [ ] Validate HTML (no console errors)

3. **Performance:**
   - [ ] Total page weight < 50KB (check Network tab)
   - [ ] No new HTTP requests added
   - [ ] Images optimized (use SVG where possible)

### When You Break Things

If you notice errors after making changes:

1. **Console Errors:** Open browser DevTools → Console tab
2. **404s:** Check file paths (case-sensitive on GitHub Pages)
3. **Broken Styles:** Verify CSS syntax, check class names match HTML
4. **JS Issues:** Check `'use strict';` mode catches errors
5. **Content Not Loading:** Verify markdown frontmatter syntax

## Git Workflow

### Branch Naming

- `feature/description` — New features
- `fix/description` — Bug fixes
- `docs/description` — Documentation updates
- `refactor/description` — Code refactoring

### Commit Messages

This project follows **Conventional Commits** format:

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
- `chore:` Maintenance tasks, tooling
- `ci:` CI/CD changes

**Examples:**
- `feat: Add new service XYZ`
- `fix: Correct mobile navigation bug`
- `docs: Update README with new instructions`
- `style: Improve dark theme contrast`
- `refactor: Simplify content loader logic`
- `chore: Add justfile for development`
- `ci: Add path filters to PR preview`

**Detailed Example:**
```
feat: Add dark theme toggle to navigation

Implement theme switcher that persists user preference in localStorage.
Toggle switches between light and dark mode by adding/removing 'dark'
class on body element.

- Add theme toggle button to header
- Store preference in localStorage
- Apply saved theme on page load
- Update logo based on theme
```

### Code Review Comments

Use **Conventional Comments** for PR reviews:

**Format:**
```
<label> [decorations]: <subject>

[discussion]
```

**Labels:**
- `praise:` Positive feedback
- `nitpick:` Minor issue (non-blocking)
- `suggestion:` Improvement idea
- `issue:` Problem that needs fixing
- `todo:` Follow-up task
- `question:` Clarification needed
- `thought:` General thought
- `chore:` Maintenance note
- `note:` General note

**Decorations:**
- `(blocking)` — Must fix before merge
- `(non-blocking)` — Can address later
- `(if-minor)` — Only if small change

**Examples:**
```
suggestion: Consider using CSS custom properties for theme values

issue (blocking): This breaks mobile nav on iOS Safari

nitpick: Extra whitespace on line 42

praise: Excellent semantic HTML usage!

question: Should this work in Spanish version too?

todo (non-blocking): Add unit tests for this function
```

### Pull Requests

When creating PRs:
1. Ensure both English and Spanish versions are updated
2. Verify site loads correctly on local server
3. Reference any related issues
4. Include screenshots for visual changes

## Specific Code Patterns

### Adding Event Listeners

```javascript
// Good: Use addEventListener
document.getElementById('myButton').addEventListener('click', function() {
  // handler
});

// Bad: Avoid inline handlers
// <button onclick="doSomething()">
```

### Responsive CSS

```css
/* Good: Mobile-first with min-width */
.element {
  /* Mobile styles (base) */
  width: 100%;
}

@media (min-width: 768px) {
  .element {
    /* Tablet styles */
    width: 50%;
  }
}

/* Bad: Desktop-first with max-width */
/* Don't do this */
```

### Theme-Aware Styles

```css
/* Light theme (default) */
.element {
  background: var(--white);
  color: var(--black);
}

/* Dark theme */
.dark .element {
  background: var(--black);
  color: var(--white);
}
```

## Troubleshooting

### Problem: Content Not Loading

**Check:**
1. Markdown file exists in correct `content/{type}/{lang}/` directory
2. Filename matches pattern in `js/content-loader.js`
3. Frontmatter has valid YAML syntax (colons, quotes)
4. `#content-container` div exists on page

### Problem: Styles Not Applying

**Check:**
1. CSS added to `css/styles.css` (not inline)
2. Class names match exactly (case-sensitive)
3. No typos in selectors
4. Sufficient specificity (but avoid `!important`)
5. Dark theme variant added if needed

### Problem: Mobile Menu Not Working

**Check:**
1. `js/main.js` loaded before `</body>`
2. Mobile toggle button has class `mobile-menu-toggle`
3. Nav has class `nav-links`
4. CSS media query at 768px breakpoint

## Performance Budget

| Asset Type | Max Size | Current |
|------------|----------|---------|
| HTML (per page) | 15KB | ~12KB |
| CSS (total) | 15KB | ~12KB |
| JS (total) | 10KB | ~8KB |
| Images (all) | 10KB | ~8KB |
| **Total** | **50KB** | **~44KB** |

Before adding content:
1. Check current total size (Network tab)
2. Estimate size of new additions
3. If approaching 50KB, optimize elsewhere first

## Questions to Ask User

If unsure about implementation details, ask:

1. **Content Changes:**
   - "Should this appear on both English and Spanish versions?"
   - "What should the Spanish translation be?"

2. **Design Changes:**
   - "Should this work in dark theme as well?"
   - "What should the mobile behavior be?"

3. **New Features:**
   - "Should this be added without external dependencies?"
   - "Is there a specific file size budget for this?"

## Resources

- **Main Documentation:** See `README.md`
- **General AI Context:** See `AGENTS.md`
- **Web Standards:** [MDN Web Docs](https://developer.mozilla.org/)
- **Accessibility:** [ARIA Guidelines](https://www.w3.org/WAI/ARIA/apg/)

## Final Reminders

1. ✅ Read existing code before modifying
2. ✅ Test locally before committing
3. ✅ Update both languages (en + es)
4. ✅ Keep it simple and minimal
5. ✅ Verify bundle size stays under 50KB
6. ✅ Follow semantic HTML practices
7. ✅ Use existing CSS variables and patterns
8. ✅ No frameworks, no dependencies, ever

---

**Philosophy:** Structure over Chaos. Every change should make the codebase simpler and more maintainable.
