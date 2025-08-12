@echo off
echo 🚀 AI Text Summarizer - GitHub Pages Deployment
echo ================================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    pause
    exit /b 1
)

REM Check if remote origin is set
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found. Please add your GitHub repository:
    echo    git remote add origin https://github.com/YOUR_USERNAME/ai-summarize.git
    pause
    exit /b 1
)

echo ✅ Git repository found
echo ✅ Remote origin configured

REM Build the project
echo 🔨 Building project for production...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Please fix any errors and try again.
    pause
    exit /b 1
)

echo ✅ Build completed successfully

REM Check if out directory exists
if not exist "out" (
    echo ❌ Build output directory 'out' not found. Check your Next.js configuration.
    pause
    exit /b 1
)

echo ✅ Static build files generated

REM Add and commit build files
echo 📝 Committing build files...
git add .
git commit -m "Build for GitHub Pages deployment"

REM Push to main branch
echo 🚀 Pushing to main branch...
git push origin main

echo.
echo 🎉 Deployment initiated!
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Navigate to Settings → Pages
echo 3. Select 'GitHub Actions' as the source
echo 4. Wait for the deployment workflow to complete
echo 5. Your site will be available at: https://YOUR_USERNAME.github.io/ai-summarize/
echo.
echo You can monitor the deployment progress in the Actions tab of your repository.
pause
