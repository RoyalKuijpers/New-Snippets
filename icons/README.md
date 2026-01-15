# Extension Icons

## Generating Icons

To generate the required PNG icons from the SVG source:

### Using ImageMagick (if available):
```bash
convert -background none icons/icon.svg -resize 16x16 icons/icon16.png
convert -background none icons/icon.svg -resize 48x48 icons/icon48.png
convert -background none icons/icon.svg -resize 128x128 icons/icon128.png
```

### Using Inkscape (if available):
```bash
inkscape icons/icon.svg --export-filename=icons/icon16.png --export-width=16 --export-height=16
inkscape icons/icon.svg --export-filename=icons/icon48.png --export-width=48 --export-height=48
inkscape icons/icon.svg --export-filename=icons/icon128.png --export-width=128 --export-height=128
```

### Using online tools:
1. Open https://cloudconvert.com/svg-to-png
2. Upload icons/icon.svg
3. Set the desired dimensions (16x16, 48x48, 128x128)
4. Download and save as icon16.png, icon48.png, icon128.png

## Current Status

For development purposes, placeholder canvas-based icons are generated via a simple HTML file.
For production, please generate proper PNG icons using one of the methods above.
