// Simple icon generator for development
// This creates basic placeholder PNG icons using node-canvas
// For production, use proper design tools or convert the SVG

const fs = require('fs');
const path = require('path');

// Create a simple data URL for a placeholder icon
function createIconDataURL(size) {
  // Simple base64 encoded 1x1 blue pixel PNG
  // This is a minimal placeholder - replace with actual icons for production
  const bluePixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  return bluePixel;
}

// For now, we'll create a simple HTML file that generates the icons
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Icon Generator</title>
</head>
<body>
  <h1>Icon Generator</h1>
  <p>Open browser console and run this page to generate icons</p>
  <canvas id="canvas"></canvas>
  <script>
    const sizes = [16, 48, 128];
    sizes.forEach(size => {
      const canvas = document.getElementById('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      // Draw blue background with rounded corners
      ctx.fillStyle = '#0078d4';
      ctx.fillRect(0, 0, size, size);
      
      // Draw </> text
      ctx.fillStyle = 'white';
      ctx.font = \`bold \${size * 0.5}px Arial\`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('</>', size / 2, size / 2);
      
      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`icon\${size}.png\`;
        a.click();
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'icons', 'generate.html'), htmlContent);
console.log('Created icons/generate.html - Open this file in a browser to generate icon PNG files');
