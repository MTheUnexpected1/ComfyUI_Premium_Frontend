@echo off
REM ComfyUI Premium - Quick Start Script (Windows)
REM This script sets up the repository and pushes to GitHub

echo.
echo ========================================
echo  ComfyUI Premium Frontend - GitHub Setup
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo X Error: Git is not installed
    echo.
    echo Install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo ✓ Git is installed
echo.

REM Check if already in a git repo
if exist .git (
    echo ! Git repository already initialized
    echo.
    echo Would you like to:
    echo   1) Push to existing remote
    echo   2) Start fresh (remove .git and reinitialize)
    set /p choice="Enter choice (1 or 2): "
    
    if "!choice!"=="2" (
        rmdir /s /q .git
        echo.
        echo ✓ Removed existing .git directory
        echo.
    )
)

REM Initialize git if needed
if not exist .git (
    echo Initializing Git repository...
    git init
    echo ✓ Git initialized
    echo.
)

REM Add all files
echo Adding files to Git...
git add .
echo ✓ Files staged
echo.

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: Premium ComfyUI frontend with React Flow - Crystal-clear port-to-port connections (16px ports, 4.5px edges) - 40+ ComfyUI nodes with category theming - Glassmorphic dark UI with smooth animations - Complete visual foundation (25%% project completion)"
echo ✓ Initial commit created
echo.

REM Add remote
echo Setting up GitHub remote...
set /p username="Enter your GitHub username (default: MTheUnexpected2): "
if "%username%"=="" set username=MTheUnexpected2

set /p repo="Enter repository name (default: ComfyUI-Premium-Frontend): "
if "%repo%"=="" set repo=ComfyUI-Premium-Frontend

set remote_url=https://github.com/%username%/%repo%.git

REM Check if remote exists
git remote | find "origin" >nul
if errorlevel 1 (
    git remote add origin %remote_url%
    echo ✓ Added remote: %remote_url%
) else (
    git remote set-url origin %remote_url%
    echo ✓ Updated remote URL to: %remote_url%
)
echo.

REM Set main branch
echo Setting main branch...
git branch -M main
echo ✓ Branch set to 'main'
echo.

REM Push to GitHub
echo Ready to push to GitHub!
echo Repository: %remote_url%
echo.
set /p push_now="Push to GitHub now? (y/n): "

if /i "%push_now%"=="y" (
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo X Push failed. This might mean:
        echo   1. Repository doesn't exist on GitHub yet
        echo   2. Authentication is required
        echo   3. Network issues
        echo.
        echo To fix:
        echo   1. Create repository at: https://github.com/new
        echo   2. Don't initialize with README, .gitignore, or license
        echo   3. Run: git push -u origin main
        echo.
        echo Or see GITHUB_SETUP.md for detailed instructions
    ) else (
        echo.
        echo ========================================
        echo  Success! Repository pushed to GitHub!
        echo ========================================
        echo.
        echo View your repository at:
        echo   https://github.com/%username%/%repo%
        echo.
        echo Next steps:
        echo   1. Add repository topics (comfyui, react-flow, node-editor)
        echo   2. Add screenshots to README
        echo   3. Create first release (v0.1.0-alpha)
        echo   4. Share with the community!
        echo.
        echo See GITHUB_SETUP.md for detailed post-push instructions
    )
) else (
    echo.
    echo Push cancelled
    echo.
    echo To push manually later:
    echo   git push -u origin main
    echo.
    echo Before pushing, create repository at:
    echo   https://github.com/new
)

echo.
echo ✓ Setup complete!
echo.
pause
