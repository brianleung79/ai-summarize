@echo off
echo Installing AI Text Summarizer...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not available. Please ensure Node.js is properly installed.
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

REM Install dependencies
echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo Installation complete!
echo.
echo Next steps:
echo 1. Copy env.example to .env.local
echo 2. Add your OpenAI API key to .env.local
echo 3. Run: npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
pause



