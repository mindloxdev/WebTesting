@echo off
setlocal EnableDelayedExpansion
title Mindlox AI - local site (development)
cd /d "%~dp0"

set "PORT=3000"
if not "%~1"=="" set "PORT=%~1"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js was not found. Install it from https://nodejs.org ^(LTS^) and run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo.
  echo  First run - installing dependencies. This takes a minute or two...
  echo.
  call npm install
  if errorlevel 1 (
    echo  npm install failed. See the messages above.
    pause
    exit /b 1
  )
)

echo.
echo  Starting Mindlox AI at http://localhost:%PORT%
echo  Leave this window open while you browse. Press Ctrl+C here to stop the site.
echo.

start "Mindlox AI dev server" cmd /k "cd /d "%~dp0" && npm run dev -- --port %PORT%"

rem Wait until the server answers, then open the browser on the home page.
set /a tries=0
:wait
set /a tries+=1
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:%PORT%/' -TimeoutSec 3; exit 0 } catch { exit 1 }" >nul 2>nul
if not errorlevel 1 goto ready
if !tries! geq 40 goto ready
timeout /t 2 /nobreak >nul
goto wait

:ready
start "" "http://localhost:%PORT%/"
echo  Browser opened. The first page load compiles the site and can take 10-20 seconds.
echo  Home page: http://localhost:%PORT%/
echo  Services:  http://localhost:%PORT%/services
echo.
pause
