#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Verify the _redirects file is in the dist directory
echo "Verifying _redirects file..."
if [ -f "dist/_redirects" ]; then
  echo "✅ _redirects file found in dist directory."
  echo "Content of _redirects:"
  cat dist/_redirects
else
  echo "❌ _redirects file NOT found in dist directory!"
  echo "Fixing by copying file manually..."
  cp public/_redirects dist/
fi

# Verify the static.json file is in the dist directory
echo "Verifying static.json file..."
if [ -f "dist/static.json" ]; then
  echo "✅ static.json file found in dist directory."
else
  echo "❌ static.json file NOT found in dist directory!"
  echo "Fixing by copying file manually..."
  cp public/static.json dist/
fi

echo ""
echo "Build completed! Your dist directory should now contain the necessary files for SPA routing on Render."
echo ""
echo "You can now deploy your app to Render static site hosting." 