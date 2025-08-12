#!/bin/bash

echo "🚀 AI Text Summarizer - GitHub Pages Deployment"
echo "================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/ai-summarize.git"
    exit 1
fi

echo "✅ Git repository found"
echo "✅ Remote origin configured"

# Build the project
echo "🔨 Building project for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix any errors and try again."
    exit 1
fi

echo "✅ Build completed successfully"

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Build output directory 'out' not found. Check your Next.js configuration."
    exit 1
fi

echo "✅ Static build files generated"

# Add and commit build files
echo "📝 Committing build files..."
git add .
git commit -m "Build for GitHub Pages deployment"

# Push to main branch
echo "🚀 Pushing to main branch..."
git push origin main

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Pages"
echo "3. Select 'GitHub Actions' as the source"
echo "4. Wait for the deployment workflow to complete"
echo "5. Your site will be available at: https://YOUR_USERNAME.github.io/ai-summarize/"
echo ""
echo "You can monitor the deployment progress in the Actions tab of your repository."
