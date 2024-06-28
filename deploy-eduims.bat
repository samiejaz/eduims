@echo off

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrative privileges...
    powershell start-process -verb runas "%~dpnx0"
    exit /B
)


cd /d D:\React\eduims\scripts\


node deploy-eduims.js

pause
