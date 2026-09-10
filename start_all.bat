@echo off
title BISync Full Stack Launcher
echo ========================================================
echo   Starting BISync Services (Backend + Frontend)
echo ========================================================
echo.

:: 1. Launch FastAPI Backend in a new window
echo [1/2] Starting Python FastAPI Backend on http://localhost:8000 ...
if exist "%~dp0..\.venv\Scripts\python.exe" (
    start "BISync Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && ..\..\.venv\Scripts\python.exe run.py"
) else if exist "%~dp0backend\..\.venv\Scripts\python.exe" (
    start "BISync Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && ..\.venv\Scripts\python.exe run.py"
) else (
    start "BISync Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && python run.py"
)

:: Small delay to let backend initialize
timeout /t 3 /nobreak > nul

:: 2. Launch Vite React Frontend in a new window
echo [2/2] Starting React Frontend on http://localhost:5173 ...
start "BISync Frontend (Port 5173)" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ========================================================
echo   Both services are now running!
echo   - Frontend: http://localhost:5173
echo   - Backend API: http://localhost:8000/api/v1
echo   - API Swagger Docs: http://localhost:8000/docs
echo ========================================================
echo.
pause

