@echo off
title BISync FastAPI Backend
echo Starting BISync FastAPI Backend...
cd /d "%~dp0backend"
..\.venv\Scripts\python.exe run.py
pause
