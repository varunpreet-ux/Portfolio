@echo off
:: Navigate to the directory of this batch file
cd /d "%~dp0"

:: Check if node_modules exists, install if missing
if not exist node_modules (
  echo node_modules not found. Installing dependencies...
  call npm install
)

echo Launching the development server...
call npm run dev
