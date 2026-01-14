#!/bin/bash
set -e

echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Preparing Backend..."
rm -rf backend/public
mkdir -p backend/public
cp -r frontend/dist/* backend/public/

echo "Ready for deployment!"
echo "To deploy to App Engine, run: cd backend && gcloud app deploy"
