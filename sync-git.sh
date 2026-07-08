#!/bin/bash
set -e

# Initialize if not exists
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Set origin
REMOTE_URL="https://github.com/saumypandey745/FlexiManage-ERP.git"
CURRENT_REMOTE=$(git remote -v | grep origin | grep fetch | awk '{print $2}' || echo "")

if [ -z "$CURRENT_REMOTE" ]; then
    echo "Adding remote origin..."
    git remote add origin $REMOTE_URL
elif [ "$CURRENT_REMOTE" != "$REMOTE_URL" ]; then
    echo "Updating remote origin..."
    git remote set-url origin $REMOTE_URL
fi

# Ensure branch is main
git branch -M main

# Add all files
git add .

# Commit
if git diff-index --quiet HEAD --; then
    # No changes after add (could happen on first commit if nothing was added, but unlikely here)
    echo "No changes to commit."
else
    # Fetch and pull only if we have a commit history to rebase against, and remote has main
    git fetch origin || true
    if git ls-remote --heads origin main | grep -q 'main'; then
        echo "Remote main exists. Rebasing..."
        git pull --rebase origin main || {
            echo "Rebase conflict. Aborting..."
            git rebase --abort
            exit 1
        }
    fi
    git commit -m "feat(crm): implement enterprise executive dashboard with realtime analytics"
    echo "Committing successful."
fi

# Push
echo "Pushing to origin main..."
git push -u origin main
