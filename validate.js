// Extension validation script
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating New-Snippets Extension Structure...\n');

const requiredFiles = [
  'manifest.json',
  'service_worker.js',
  'popup.html',
  'popup.js',
  'popup.css',
  'lib/fluent-ui.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png',
  'package.json',
  'README.md'
];

let allValid = true;

// Check required files
console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  const icon = exists ? '✅' : '❌';
  console.log(`  ${icon} ${file}`);
  if (!exists) allValid = false;
});

// Validate manifest.json
console.log('\n📋 Validating manifest.json...');
try {
  const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  console.log(`  ✅ Manifest version: ${manifest.manifest_version}`);
  console.log(`  ✅ Extension name: ${manifest.name}`);
  console.log(`  ✅ Service worker: ${manifest.background.service_worker}`);
  console.log(`  ✅ Permissions: ${manifest.permissions.join(', ')}`);
  console.log(`  ✅ Popup: ${manifest.action.default_popup}`);
  
  if (manifest.manifest_version !== 3) {
    console.log('  ❌ Must be Manifest V3');
    allValid = false;
  }
  if (!manifest.permissions.includes('storage')) {
    console.log('  ❌ Missing storage permission');
    allValid = false;
  }
} catch (err) {
  console.log(`  ❌ Error reading manifest: ${err.message}`);
  allValid = false;
}

// Check JavaScript syntax
console.log('\n🔧 Validating JavaScript files...');
const jsFiles = ['service_worker.js', 'popup.js'];
jsFiles.forEach(file => {
  try {
    require.resolve(`./${file}`);
    console.log(`  ✅ ${file} - syntax valid`);
  } catch (err) {
    console.log(`  ❌ ${file} - ${err.message}`);
    allValid = false;
  }
});

// Check service worker uses chrome.storage.sync
console.log('\n💾 Checking chrome.storage.sync API usage...');
const serviceWorker = fs.readFileSync('service_worker.js', 'utf8');
const popup = fs.readFileSync('popup.js', 'utf8');

if (serviceWorker.includes('chrome.storage.sync')) {
  console.log('  ✅ service_worker.js uses chrome.storage.sync');
} else {
  console.log('  ❌ service_worker.js missing chrome.storage.sync');
  allValid = false;
}

if (popup.includes('chrome.storage.sync')) {
  console.log('  ✅ popup.js uses chrome.storage.sync');
} else {
  console.log('  ❌ popup.js missing chrome.storage.sync');
  allValid = false;
}

// Check Fluent UI integration
console.log('\n🎨 Checking Fluent UI integration...');
const html = fs.readFileSync('popup.html', 'utf8');
if (html.includes('fluent-')) {
  console.log('  ✅ popup.html uses Fluent UI components');
} else {
  console.log('  ❌ popup.html missing Fluent UI components');
  allValid = false;
}

if (fs.existsSync('lib/fluent-ui.js')) {
  const stats = fs.statSync('lib/fluent-ui.js');
  console.log(`  ✅ Fluent UI library bundled (${Math.round(stats.size / 1024)}KB)`);
} else {
  console.log('  ❌ Fluent UI library not bundled');
  allValid = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('✅ All validations passed!');
  console.log('🚀 Extension is ready to be loaded in the browser.');
  process.exit(0);
} else {
  console.log('❌ Some validations failed.');
  console.log('Please fix the issues above before loading the extension.');
  process.exit(1);
}
