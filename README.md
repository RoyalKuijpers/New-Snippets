# New-Snippets

A modern, synchronized browser extension for managing code snippets built with Manifest V3 and Microsoft Fluent UI v2.

## Features

- 🚀 **Manifest V3** - Built with the latest extension architecture
- 💾 **Cloud Sync** - Uses `chrome.storage.sync` API for cross-device synchronization
- 🎨 **Fluent UI v2** - Beautiful Microsoft Fluent Design System components
- 📝 **Code Snippets** - Save, organize, and manage your code snippets
- 🔍 **Multiple Languages** - Support for JavaScript, Python, HTML, CSS, TypeScript, Java, C#, and more
- 📋 **Quick Copy** - One-click copy to clipboard
- 🌐 **Cross-Browser** - Compatible with Chrome, Edge, and other Chromium-based browsers

## Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/RoyalKuijpers/New-Snippets.git
   cd New-Snippets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Load the extension in your browser:
   - **Chrome/Edge**:
     1. Open `chrome://extensions/` (or `edge://extensions/`)
     2. Enable "Developer mode"
     3. Click "Load unpacked"
     4. Select the `New-Snippets` directory

### For Production

Install from the Chrome Web Store (coming soon).

## Usage

1. Click the extension icon in your browser toolbar
2. Add a new snippet:
   - Enter a title for your snippet
   - Select the programming language
   - Paste or type your code
   - Click "Save Snippet"
3. Manage your snippets:
   - Click "Copy" to copy code to clipboard
   - Click "Delete" to remove a snippet
4. Your snippets sync automatically across all your devices using Chrome Sync!

## Project Structure

```
New-Snippets/
├── manifest.json          # Manifest V3 configuration
├── service_worker.js      # Background service worker
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic and chrome.storage.sync integration
├── popup.css             # Fluent UI styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── package.json          # Node.js dependencies
└── node_modules/         # Fluent UI Web Components
```

## Technologies

- **Manifest V3** - Latest Chrome extension architecture
- **Service Workers** - Background task handling
- **chrome.storage.sync API** - Cross-device data synchronization
- **Microsoft Fluent UI v2** - Modern, accessible UI components
- **Vanilla JavaScript** - No framework dependencies

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chrome, Edge, or another Chromium-based browser

### Scripts

```bash
# Install dependencies
npm install

# Build (currently just validates structure)
npm run build

# Development mode info
npm run dev
```

### Key Files

- **manifest.json** - Extension configuration (permissions, background scripts, popup)
- **service_worker.js** - Handles background events and storage operations
- **popup.html/js/css** - User interface for managing snippets

## Storage

The extension uses `chrome.storage.sync` API which:
- Automatically syncs across devices where you're signed into Chrome
- Has a quota of ~100KB for all data
- Supports up to 512 items
- Each item can be up to ~8KB

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Search and filter snippets
- [ ] Tags and categories
- [ ] Syntax highlighting
- [ ] Export/Import functionality
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Firefox support

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
