#!/bin/bash
# Navigate to the script's directory
cd "$(dirname "$0")"

# Check if node_modules exists, install if missing
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Installing dependencies..."
  npm install
fi

echo "Launching the development server..."
npm run dev
