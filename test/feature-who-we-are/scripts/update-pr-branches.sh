#!/usr/bin/env bash
#
# Update all PR branches with latest origin/main
#

echo "=== Updating PR branches ==="

CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Fetch latest changes
git fetch origin

# Get list of open PR branches
PR_BRANCHES=$(gh pr list --state open --json headRefName --jq '.[].headRefName')

if [ -z "$PR_BRANCHES" ]; then
  echo "No open pull requests found."
  exit 0
fi

echo "Found PR branches: $PR_BRANCHES"
echo ""

# Update each branch
for BRANCH in $PR_BRANCHES; do
  echo "Updating: $BRANCH"

  git switch "$BRANCH" || {
    echo "✗ Failed to switch to $BRANCH"
    continue
  }

  if git rebase origin/main; then
    git push origin "$BRANCH" && echo "✓ Updated $BRANCH" || echo "✗ Push failed for $BRANCH"
  else
    echo "✗ Rebase conflict in $BRANCH - skipping"
    git rebase --abort
  fi

  echo ""
done

# Return to original branch
git switch "$CURRENT_BRANCH"
echo "=== Done ==="
