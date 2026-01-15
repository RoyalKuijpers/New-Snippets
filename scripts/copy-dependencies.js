#!/usr/bin/env node
// Copy necessary dependencies for the extension

const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, '..', 'lib');
const sourceFile = path.join(__dirname, '..', 'node_modules', '@fluentui', 'web-components', 'dist', 'web-components.min.js');
const targetFile = path.join(libDir, 'fluent-ui.js');

// Create lib directory if it doesn't exist
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
  console.log('✓ Created lib directory');
}

// Copy Fluent UI
if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, targetFile);
  console.log('✓ Copied Fluent UI Web Components');
} else {
  console.warn('⚠ Fluent UI source file not found. Run npm install first.');
}

console.log('\nDependencies ready! Extension can be loaded in browser.');
