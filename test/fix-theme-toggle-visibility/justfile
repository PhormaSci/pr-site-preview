# Phorma Scientific Website - Justfile
# Simple command runner for local development

# Default recipe (runs when you type `just`)
default:
  @just --list

# Run local development server
serve port="8000":
  @echo "Starting local server at http://localhost:{{port}}"
  @echo "Press Ctrl+C to stop"
  python3 -m http.server {{port}}

# Alias for serve
dev: serve

# Check total bundle size
size:
  @echo "=== Bundle Size Report ==="
  @echo ""
  @echo "HTML files:"
  @find . -name "*.html" -not -path "./.git/*" -exec du -ch {} + | tail -1
  @echo ""
  @echo "CSS files:"
  @du -ch css/*.css | tail -1
  @echo ""
  @echo "JS files:"
  @du -ch js/*.js | tail -1
  @echo ""
  @echo "Assets:"
  @du -ch assets/* | tail -1
  @echo ""
  @echo "Total site size (excluding .git):"
  @du -csh --exclude=.git --exclude=content . | tail -1
  @echo ""
  @echo "Performance budget: 50KB (uncompressed)"

# Validate HTML files (requires tidy)
validate:
  @echo "Validating HTML files..."
  @for file in *.html es/*.html; do \
    echo "Checking $$file..."; \
    tidy -q -e $$file 2>&1 | grep -v "Warning:" || true; \
  done

# Clean up common artifacts
clean:
  @echo "Cleaning up..."
  @find . -name ".DS_Store" -delete
  @find . -name "Thumbs.db" -delete
  @echo "Done!"

# Show git status
status:
  @git status -sb

# Quick commit with message
commit message:
  git add -A
  git status -sb
  git commit -m "{{message}}"
