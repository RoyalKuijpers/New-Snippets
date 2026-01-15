// Service Worker for New-Snippets Extension
// Handles background tasks and events

console.log('New-Snippets service worker initialized');

// Install event - fired when the extension is first installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    // Initialize default storage on first install
    chrome.storage.sync.set({
      snippets: [],
      settings: {
        theme: 'light',
        defaultLanguage: 'javascript'
      },
      nextSnippetId: 1
    }, () => {
      console.log('Default storage initialized');
    });
  }
});

// Message handler for communication between popup and service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  switch (request.action) {
    case 'getSnippets':
      chrome.storage.sync.get(['snippets'], (result) => {
        sendResponse({ snippets: result.snippets || [] });
      });
      return true; // Keep channel open for async response
      
    case 'saveSnippet':
      chrome.storage.sync.get(['snippets', 'nextSnippetId'], (result) => {
        const snippets = result.snippets || [];
        const nextId = result.nextSnippetId || 1;
        
        const snippetWithId = { ...request.snippet, id: nextId };
        snippets.push(snippetWithId);
        
        chrome.storage.sync.set({ 
          snippets, 
          nextSnippetId: nextId + 1 
        }, () => {
          sendResponse({ success: true, snippets });
        });
      });
      return true;
      
    case 'deleteSnippet':
      chrome.storage.sync.get(['snippets'], (result) => {
        const snippets = result.snippets || [];
        const filtered = snippets.filter(snippet => snippet.id !== request.snippetId);
        chrome.storage.sync.set({ snippets: filtered }, () => {
          sendResponse({ success: true, snippets: filtered });
        });
      });
      return true;
      
    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// Storage change listener
chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('Storage changed:', areaName, changes);
});
