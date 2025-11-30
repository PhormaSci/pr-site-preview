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
        const value = line.substring(colonIndex + 1).trim();
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
  function renderServiceCard(data) {
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
  function renderTraineeCard(data) {
    const { frontmatter, content } = data;

    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${frontmatter.title || ''}</h3>
          <p class="card-meta">${frontmatter.meta || ''}</p>
        </div>
        <div class="card-body">
          ${markdownToHtml(content)}
          <p><strong>${frontmatter.duration ? 'Duration:' : 'Duración:'}</strong> ${frontmatter.duration || ''}</p>
          <p><strong>${frontmatter.format ? 'Format:' : 'Formato:'}</strong> ${frontmatter.format || ''}</p>
          <p><strong>${frontmatter.prerequisites ? 'Prerequisites:' : 'Requisitos:'}</strong> ${frontmatter.prerequisites || ''}</p>
        </div>
        <div class="card-footer">
          <p class="text-muted text-upper" style="font-size: 0.75rem;"><strong>${frontmatter.outcome ? 'Outcome:' : 'Resultado:'}</strong> ${frontmatter.outcome || ''}</p>
        </div>
      </div>
    `;
  }

  /**
   * Load markdown files from a directory
   */
  async function loadMarkdownFiles(basePath, fileList, renderFunction) {
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

      // Render all cards
      container.innerHTML = results.map(renderFunction).join('');
    } catch (error) {
      console.error('Error loading content:', error);
      container.innerHTML = '<p class="text-center">Error loading content. Please refresh the page.</p>';
    }
  }

  /**
   * Initialize content loading based on page type
   */
  window.loadContent = function(type, lang) {
    const isServices = type === 'services';
    const basePath = lang === 'es' ? '../content' : 'content';
    const contentPath = `${basePath}/${type}/${lang}`;

    let fileList = [];
    let renderFunction;

    if (isServices) {
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
    } else {
      // Trainees
      fileList = [
        '01-numerical-computing.md',
        '02-production-rigor.md',
        '03-sciml.md',
        '04-rse-pipelines.md',
        '05-high-performance-julia.md',
        '06-architectural-systems.md'
      ];

      // Adjust filenames for Spanish
      if (lang === 'es') {
        fileList = [
          '01-computacion-numerica.md',
          '02-rigor-produccion.md',
          '03-sciml.md',
          '04-rse-pipelines.md',
          '05-julia-alto-rendimiento.md',
          '06-sistemas-arquitectonicos.md'
        ];
      }

      renderFunction = renderTraineeCard;
    }

    loadMarkdownFiles(contentPath, fileList, renderFunction);
  };
})();
