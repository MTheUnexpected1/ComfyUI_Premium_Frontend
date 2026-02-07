#!/bin/bash

# 🚀 ComfyUI Premium - Quick Start Script
# This script sets up the repository and pushes to GitHub

echo "🎨 ComfyUI Premium Frontend - GitHub Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "📥 Install Git from: https://git-scm.com/"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if we're already in a git repo
if [ -d .git ]; then
    echo "⚠️  Git repository already initialized"
    echo "Would you like to:"
    echo "  1) Push to existing remote"
    echo "  2) Start fresh (remove .git and reinitialize)"
    read -p "Enter choice (1 or 2): " choice
    
    if [ "$choice" = "2" ]; then
        rm -rf .git
        echo "🗑️  Removed existing .git directory"
    fi
fi

# Initialize git if needed
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
    echo ""
fi

# Add all files
echo "📝 Adding files to Git..."
git add .
echo "✅ Files staged"
echo ""

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Premium ComfyUI frontend with React Flow

- Crystal-clear port-to-port connections (16px ports, 4.5px edges)
- 40+ ComfyUI nodes with category theming
- Glassmorphic dark UI (#0f0f11) with smooth animations
- Smooth Bézier edge routing with 12 category colors
- Node hover highlighting system
- React Flow 11.11 + Framer Motion 11.0
- Complete visual foundation (25% project completion)

Features:
- Drag nodes around canvas
- Create/delete connections
- Search 40 nodes in sidebar
- Zoom/pan/fit view controls
- MiniMap overview
- Category-based theming

Known limitations (in progress):
- Cannot add nodes from sidebar yet
- No node parameter widgets
- No backend integration
- No workflow save/load

See PROJECT_STATUS.md for detailed roadmap."

echo "✅ Initial commit created"
echo ""

# Add remote
echo "🌐 Setting up GitHub remote..."
read -p "Enter your GitHub username (default: MTheUnexpected2): " username
username=${username:-MTheUnexpected2}

read -p "Enter repository name (default: ComfyUI-Premium-Frontend): " repo
repo=${repo:-ComfyUI-Premium-Frontend}

remote_url="https://github.com/$username/$repo.git"

# Check if remote already exists
if git remote | grep -q origin; then
    echo "⚠️  Remote 'origin' already exists"
    git remote set-url origin $remote_url
    echo "✅ Updated remote URL to: $remote_url"
else
    git remote add origin $remote_url
    echo "✅ Added remote: $remote_url"
fi

echo ""

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main
echo "✅ Branch set to 'main'"
echo ""

# Push to GitHub
echo "🚀 Ready to push to GitHub!"
echo "Repository: $remote_url"
echo ""
read -p "Push to GitHub now? (y/n): " push_now

if [ "$push_now" = "y" ] || [ "$push_now" = "Y" ]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Success! Repository pushed to GitHub!"
        echo ""
        echo "🌐 View your repository at:"
        echo "   https://github.com/$username/$repo"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Add repository topics (comfyui, react-flow, node-editor)"
        echo "   2. Add screenshots to README"
        echo "   3. Create first release (v0.1.0-alpha)"
        echo "   4. Share with the community!"
        echo ""
        echo "📚 See GITHUB_SETUP.md for detailed post-push instructions"
    else
        echo ""
        echo "❌ Push failed. This might mean:"
        echo "   1. Repository doesn't exist on GitHub yet"
        echo "   2. Authentication is required"
        echo "   3. Network issues"
        echo ""
        echo "🔧 To fix:"
        echo "   1. Create repository at: https://github.com/new"
        echo "   2. Don't initialize with README, .gitignore, or license"
        echo "   3. Run: git push -u origin main"
        echo ""
        echo "Or see GITHUB_SETUP.md for detailed instructions"
    fi
else
    echo ""
    echo "⏸️  Push cancelled"
    echo ""
    echo "📝 To push manually later:"
    echo "   git push -u origin main"
    echo ""
    echo "🔧 Before pushing, create repository at:"
    echo "   https://github.com/new"
fi

echo ""
echo "✅ Setup complete!"
