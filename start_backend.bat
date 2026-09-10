@echo off
title BISync FastAPI Backend
echo Starting BISync FastAPI Backend...
cd /d "%~dp0backend"

if exist "..\..\.venv\Scripts\python.exe" (
    ..\..\.venv\Scripts\python.exe run.py
) else if exist "..\.venv\Scripts\python.exe" (
    ..\.venv\Scripts\python.exe run.py
) else (
    python run.py
)
pause

