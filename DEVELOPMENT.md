# New-Snippets Extension - Development Guide

## Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- Chrome, Edge, or another Chromium-based browser

### Installation

1. **Clone and Setup**
   ```bash
   git clone https://github.com/RoyalKuijpers/New-Snippets.git
   cd New-Snippets
   npm install
   npm run build
   ```

2. **Load in Browser**
   - Open `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
   - Enable "Developer mode" toggle (top-right corner)
   - Click "Load unpacked" button
   - Select the `New-Snippets` directory
   - The extension icon should appear in your toolbar

3. **Test the Extension**
   - Click the extension icon
   - Add a test snippet
   - Verify it saves and displays correctly

## Architecture Overview

### Manifest V3 Structure

This extension follows the latest Chrome Extension Manifest V3 architecture:

```
New-Snippets/
├── manifest.json          # Extension configuration
├── service_worker.js      # Background script (replaces background pages)
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic
├── popup.css             # Fluent UI styling
├── lib/                  # Bundled libraries
│   └── fluent-ui.js     # Microsoft Fluent UI Web Components
└── icons/               # Extension icons
```

### Key Features

1. **Manifest V3 Compliance**
   - Service Worker instead of background pages
   - No inline scripts or eval()
   - Strict Content Security Policy (CSP)

2. **chrome.storage.sync API**
   - Cross-device synchronization
   - Automatic data syncing across Chrome installations
   - No manual sync implementation needed

3. **Microsoft Fluent UI v2**
   - Modern, accessible UI components
   - Fluent Design System principles
   - Responsive and touch-friendly

## File Descriptions

### manifest.json
The extension's configuration file defining:
- Extension metadata (name, version, description)
- Required permissions (storage)
- Service worker registration
- Browser action (popup) configuration
- Content Security Policy

### service_worker.js
Background script that handles:
- Extension installation/update events
- Message passing from popup
- Storage operations coordination
- Background task management

Key features:
- Initializes default storage on first install
- Handles CRUD operations for snippets
- Listens for storage changes

### popup.html
The user interface displayed when clicking the extension icon:
- Fluent UI Web Components integration
- Form for adding new snippets
- List view for saved snippets
- Responsive 500px width design

### popup.js
Client-side logic for the popup:
- DOM manipulation
- Form handling
- chrome.storage.sync API calls
- Clipboard operations
- Real-time storage change listeners

### popup.css
Styling following Fluent Design System:
- CSS custom properties for theming
- Fluent color palette
- Responsive design
- Smooth animations and transitions

## chrome.storage.sync API Usage

### Storage Quotas
- **Total Quota**: ~100KB for all data
- **Max Items**: 512 items
- **Item Size**: ~8KB per item
- **Sync Frequency**: Automatic, managed by Chrome

### Data Structure
```javascript
{
  snippets: [
    {
      title: "Example Snippet",
      language: "javascript",
      code: "console.log('Hello');",
      createdAt: "2024-01-15T12:00:00.000Z"
    }
  ],
  settings: {
    theme: "light",
    defaultLanguage: "javascript"
  }
}
```

### API Examples

**Reading from storage:**
```javascript
chrome.storage.sync.get(['snippets'], (result) => {
  const snippets = result.snippets || [];
  console.log('Loaded snippets:', snippets);
});
```

**Writing to storage:**
```javascript
chrome.storage.sync.set({ snippets: updatedSnippets }, () => {
  console.log('Snippets saved');
});
```

**Listening for changes:**
```javascript
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.snippets) {
    console.log('Snippets updated');
  }
});
```

## Development Workflow

### Making Changes

1. **Edit Files**
   - Modify HTML/CSS/JS files as needed
   - Changes to service_worker.js require extension reload

2. **Reload Extension**
   - Go to `chrome://extensions/`
   - Click reload icon on the New-Snippets card
   - Or use keyboard shortcut (varies by browser)

3. **Test Changes**
   - Click extension icon to open popup
   - Check browser console for errors
   - Verify functionality works as expected

### Debugging

**Popup Debugging:**
- Right-click extension icon → "Inspect popup"
- Opens DevTools for popup.html
- Console shows popup.js logs and errors

**Service Worker Debugging:**
- Go to `chrome://extensions/`
- Click "Service worker" link under extension
- Opens DevTools for service_worker.js
- View logs, network requests, storage

**Storage Inspection:**
- In DevTools (popup or service worker)
- Application tab → Storage → Extension Storage
- View and edit chrome.storage.sync data

### Common Issues

**Fluent UI components not rendering:**
- Check if lib/fluent-ui.js exists
- Run `npm run build` to copy dependencies
- Check browser console for loading errors

**Storage not syncing:**
- Ensure you're signed into Chrome/Edge
- Check if sync is enabled in browser settings
- Verify storage permissions in manifest.json

**Service worker not updating:**
- Explicitly reload extension in chrome://extensions/
- Check for syntax errors in service_worker.js
- Service workers cache aggressively - hard reload may be needed

## Build System

### Scripts

```bash
# Install dependencies
npm install

# Copy Fluent UI library to lib/
npm run build

# Show development instructions
npm run dev
```

### Build Process
The `npm run build` command:
1. Creates `lib/` directory if needed
2. Copies Fluent UI Web Components from node_modules
3. Validates extension structure

### Production Build
For production deployment:
1. Run `npm run build`
2. Remove development files (test/, generate-icons.js)
3. Create ZIP of extension directory
4. Upload to Chrome Web Store

## Testing

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] Service worker initializes correctly
- [ ] Popup opens and displays UI
- [ ] Fluent UI components render properly
- [ ] Can add a snippet with all fields
- [ ] Snippet saves to chrome.storage.sync
- [ ] Snippets list updates in real-time
- [ ] Can copy snippet to clipboard
- [ ] Can delete a snippet
- [ ] Data persists after browser restart
- [ ] No CSP violations in console

### Cross-Browser Testing
The extension is compatible with:
- ✅ Google Chrome (v88+)
- ✅ Microsoft Edge (v88+)
- ✅ Brave Browser
- ✅ Other Chromium-based browsers

Note: Firefox requires a separate manifest.json (Manifest V2 or V3 with modifications)

## Contributing

### Code Style
- Use modern ES6+ JavaScript
- Follow existing code formatting
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
- Use descriptive commit messages
- Reference issue numbers when applicable
- Follow conventional commits format

### Pull Requests
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit PR with description

## Resources

### Documentation
- [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [chrome.storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Fluent UI Web Components](https://docs.microsoft.com/en-us/fluent-ui/web-components/)

### Tools
- [Extension DevTools](https://chrome://extensions/)
- [Chrome Web Store Dashboard](https://chrome.google.com/webstore/devconsole)

## License

See [LICENSE](LICENSE) file for details.
