#!/bin/bash
set -e

# Stage changes
git add .

# Check if there are changes
if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
else
    # Commit changes
    git commit -m "release(v1.0.0): production ready enterprise ERP"
fi

# Switch branch
git branch -M main

# Remote setup
git remote remove origin || true
git remote add origin https://github.com/saumypandey745/FlexiManage-ERP.git

# Try HTTPS push
echo "Attempting HTTPS Push..."
if git push -u origin main; then
    echo "HTTPS Push Succeeded."
    exit 0
else
    echo "HTTPS Push Failed. Attempting SSH Push..."
    git remote set-url origin git@github.com:saumypandey745/FlexiManage-ERP.git
    if git push -u origin main; then
        echo "SSH Push Succeeded."
        exit 0
    else
        echo "SSH Push Failed."
        exit 1
    fi
fi
