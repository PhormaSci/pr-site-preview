/**
 * Phorma Scientific - Content Loader
 * Dynamically loads and renders markdown content for services and trainees pages
 */

(function() {
  'use strict';

  /**
   * Parse frontmatter and content from markdown
   */
  function parseMarkdown(text) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: {}, content: text };
    }

    const frontmatterText = match[1];
    const content = match[2];

    // Parse frontmatter
    const frontmatter = {};
    frontmatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Remove surrounding quotes (single or double) if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        frontmatter[key] = value;
      }
    });

    return { frontmatter, content };
  }

  /**
   * Convert simple markdown to HTML
   */
  function markdownToHtml(markdown) {
    let html = markdown;

    // Convert bold text
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="styled-list">$&</ul>');

    // Convert paragraphs (lines not already in tags)
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return line;
      if (trimmed === '---') return '<hr>';
      return `<p>${line}</p>`;
    });

    html = processedLines.join('\n');

    return html;
  }

  /**
   * Render a service card from markdown data
   */
  function renderServiceCard(data, lang) {
    const { frontmatter, content } = data;

    // Split content by horizontal rule
    const parts = content.split('---').map(p => p.trim());
    const body = parts[0] || '';
    const footer = parts[1] || '';

    return `
      <div class="card">
        <div class="card-header">
          <p class="card-meta">${frontmatter.meta || ''}</p>
          <h3 class="card-title">${frontmatter.title || ''}</h3>
        </div>
        <div class="card-body">
          ${markdownToHtml(body)}
        </div>
        <div class="card-footer">
          ${markdownToHtml(footer)}
        </div>
      </div>
    `;
  }

  /**
   * Render a trainee card from markdown data
   */
  function renderTraineeCard(data, lang) {
    const { frontmatter, content } = data;

    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${frontmatter.title || ''}</h3>
          <p class="card-meta">${frontmatter.meta || ''}</p>
        </div>
        <div class="card-body">
          ${markdownToHtml(content)}
          <p><strong>${lang === 'es' ? 'Duración:' : 'Duration:'}</strong> ${frontmatter.duration || ''}</p>
          <p><strong>${lang === 'es' ? 'Formato:' : 'Format:'}</strong> ${frontmatter.format || ''}</p>
          <p><strong>${lang === 'es' ? 'Requisitos:' : 'Prerequisites:'}</strong> ${frontmatter.prerequisites || ''}</p>
        </div>
        <div class="card-footer">
          <p class="text-muted text-upper" style="font-size: 0.75rem;"><strong>${lang === 'es' ? 'Resultado:' : 'Outcome:'}</strong> ${frontmatter.outcome || ''}</p>
        </div>
      </div>
    `;
  }

  /**
   * Render hero section from markdown data
   */
  function renderHeroSection(data) {
    const { frontmatter } = data;

    return `
      <section class="hero">
        <div class="container hero-content">
          <img src="${frontmatter.logo || 'assets/logo.svg'}" alt="Phorma Scientific" class="hero-logo">
          <h1>${frontmatter.heading || ''}</h1>
          <p class="hero-subheading">${frontmatter.subheading || ''}</p>
          <a href="${frontmatter.cta_link || '#'}" class="btn btn-primary">${frontmatter.cta_text || ''}</a>
        </div>
      </section>
    `;
  }

  /**
   * Render two-column section from markdown data
   */
  function renderTwoColumnSection(data) {
    const { frontmatter, content } = data;

    return `
      <section class="section border-bottom">
        <div class="container">
          <div class="grid grid-2">
            <div>
              <h2 class="text-mono">${frontmatter.title || ''}</h2>
              <p class="text-muted">${frontmatter.subtitle || ''}</p>
            </div>
            <div>
              ${markdownToHtml(content)}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render featured service section from markdown data
   */
  function renderFeaturedSection(data) {
    const { frontmatter, content } = data;

    return `
      <section class="section" id="audit">
        <div class="container">
          <div class="highlight-box">
            <div class="grid grid-2">
              <div>
                <h3 class="text-mono mb-sm">${frontmatter.title || ''}</h3>
                <p class="text-muted text-upper" style="font-size: 0.875rem; margin-bottom: 1rem;">${frontmatter.meta || ''}</p>
              </div>
              <div>
                ${markdownToHtml(content)}
                <p style="margin-top: 1.5rem;">
                  <a href="${frontmatter.cta_link || 'contact.html'}" class="btn">${frontmatter.cta_text || ''}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render home page section based on type
   */
  function renderHomeSection(data, lang) {
    const { frontmatter } = data;
    const type = frontmatter.type;

    if (type === 'hero') {
      return renderHeroSection(data);
    } else if (type === 'section') {
      return renderTwoColumnSection(data);
    } else if (type === 'featured') {
      return renderFeaturedSection(data);
    }

    return '';
  }

  /**
   * Render category header
   */
  function renderCategoryHeader(category) {
    return `
      <div style="grid-column: 1 / -1; margin-top: 2rem; margin-bottom: 1rem;">
        <h2 class="text-mono" style="font-size: 1.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">${category}</h2>
      </div>
    `;
  }

  /**
   * Load markdown files from a directory
   */
  async function loadMarkdownFiles(basePath, fileList, renderFunction, lang, groupByCategory = false) {
    const container = document.getElementById('content-container');
    if (!container) return;

    try {
      const promises = fileList.map(file =>
        fetch(`${basePath}/${file}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
          })
          .then(text => parseMarkdown(text))
      );

      const results = await Promise.all(promises);

      // Sort by order if specified in frontmatter
      results.sort((a, b) => {
        const orderA = parseInt(a.frontmatter.order) || 999;
        const orderB = parseInt(b.frontmatter.order) || 999;
        return orderA - orderB;
      });

      // Group by category if requested
      if (groupByCategory) {
        const grouped = {};
        results.forEach(data => {
          const category = data.frontmatter.category || 'Other';
          if (!grouped[category]) {
            grouped[category] = [];
          }
          grouped[category].push(data);
        });

        // Render grouped content with category headers
        let html = '';
        Object.keys(grouped).forEach(category => {
          html += renderCategoryHeader(category);
          html += grouped[category].map(data => renderFunction(data, lang)).join('');
        });
        container.innerHTML = html;
      } else {
        // Render all cards without grouping
        container.innerHTML = results.map(data => renderFunction(data, lang)).join('');
      }
    } catch (error) {
      console.error('Error loading content:', error);
      container.innerHTML = '<p class="text-center">Error loading content. Please refresh the page.</p>';
    }
  }

  /**
   * Initialize content loading based on page type
   */
  window.loadContent = function(type, lang) {
    const basePath = lang === 'es' ? '../content' : 'content';
    const contentPath = `${basePath}/${type}/${lang}`;

    let fileList = [];
    let renderFunction;

    if (type === 'services') {
      fileList = [
        '01-system-audit.md',
        '02-research-software-engineering.md',
        '03-scientific-ml.md',
        '04-performance-synthesis.md'
      ];

      // Adjust filenames for Spanish
      if (lang === 'es') {
        fileList = [
          '01-auditoria-sistema.md',
          '02-ingenieria-software-investigacion.md',
          '03-ml-cientifico.md',
          '04-sintesis-rendimiento.md'
        ];
      }

      renderFunction = renderServiceCard;
    } else if (type === 'trainees') {
      fileList = [
        '11-numerical-computing.md',
        '15-high-performance-julia.md',
        '21-generative-ai-scientific-software.md',
        '31-sciml.md',
        '41-production-rigor.md',
        '42-rse-pipelines.md',
        '43-architectural-systems.md',
        '51-python-bioimage-analysis.md',
        '52-napari-plugin-development.md',
        '53-ai-microscopy.md'
      ];

      // Adjust filenames for Spanish
      if (lang === 'es') {
        fileList = [
          '11-computacion-numerica.md',
          '15-julia-alto-rendimiento.md',
          '21-ia-generativa-software-cientifico.md',
          '31-sciml.md',
          '41-rigor-produccion.md',
          '42-rse-pipelines.md',
          '43-sistemas-arquitectonicos.md',
          '51-analisis-bioimagen-python.md',
          '52-desarrollo-plugins-napari.md',
          '53-ia-microscopia.md'
        ];
      }

      renderFunction = renderTraineeCard;
    } else if (type === 'home') {
      fileList = [
        '01-hero.md',
        '02-challenge.md',
        '03-solution.md',
        '04-featured.md'
      ];

      renderFunction = renderHomeSection;
    }

    // Enable category grouping for trainees page
    const groupByCategory = (type === 'trainees');
    loadMarkdownFiles(contentPath, fileList, renderFunction, lang, groupByCategory);
  };
})();
