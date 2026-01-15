// Popup script for New-Snippets Extension
// Handles UI interactions and storage operations

console.log('New-Snippets popup loaded');

// DOM elements
const snippetTitle = document.getElementById('snippet-title');
const snippetLanguage = document.getElementById('snippet-language');
const snippetCode = document.getElementById('snippet-code');
const saveButton = document.getElementById('save-snippet');
const snippetsList = document.getElementById('snippets-list');
const emptyState = document.getElementById('empty-state');
const loadingIndicator = document.getElementById('loading');

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  loadSnippets();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  saveButton.addEventListener('click', saveSnippet);
  
  // Allow Enter key in title field to focus on code area
  snippetTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      snippetCode.focus();
    }
  });
}

// Load snippets from chrome.storage.sync
function loadSnippets() {
  showLoading(true);
  
  chrome.storage.sync.get(['snippets'], (result) => {
    const snippets = result.snippets || [];
    displaySnippets(snippets);
    showLoading(false);
  });
}

// Display snippets in the UI
function displaySnippets(snippets) {
  snippetsList.innerHTML = '';
  
  if (snippets.length === 0) {
    emptyState.classList.remove('hidden');
    snippetsList.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    snippetsList.classList.remove('hidden');
    
    snippets.forEach((snippet) => {
      const snippetCard = createSnippetCard(snippet);
      snippetsList.appendChild(snippetCard);
    });
  }
}

// Create a snippet card element
function createSnippetCard(snippet) {
  const card = document.createElement('fluent-card');
  card.className = 'snippet-card';
  
  const header = document.createElement('div');
  header.className = 'snippet-header';
  
  const title = document.createElement('h3');
  title.textContent = snippet.title;
  
  const language = document.createElement('fluent-badge');
  language.textContent = snippet.language;
  language.className = 'language-badge';
  
  header.appendChild(title);
  header.appendChild(language);
  
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'snippet-code-block';
  const code = document.createElement('code');
  code.textContent = snippet.code;
  codeBlock.appendChild(code);
  
  const actions = document.createElement('div');
  actions.className = 'snippet-actions';
  
  const copyButton = document.createElement('fluent-button');
  copyButton.textContent = 'Copy';
  copyButton.appearance = 'stealth';
  copyButton.addEventListener('click', () => copyToClipboard(snippet.code));
  
  const deleteButton = document.createElement('fluent-button');
  deleteButton.textContent = 'Delete';
  deleteButton.appearance = 'stealth';
  deleteButton.addEventListener('click', () => deleteSnippet(snippet.id));
  
  actions.appendChild(copyButton);
  actions.appendChild(deleteButton);
  
  card.appendChild(header);
  card.appendChild(codeBlock);
  card.appendChild(actions);
  
  return card;
}

// Save a new snippet
function saveSnippet() {
  const title = snippetTitle.value.trim();
  const language = snippetLanguage.value || 'javascript';
  const code = snippetCode.value.trim();
  
  if (!title || !code) {
    showNotification('Please fill in both title and code fields', 'error');
    return;
  }
  
  showLoading(true);
  
  chrome.storage.sync.get(['snippets', 'nextSnippetId'], (result) => {
    const snippets = result.snippets || [];
    const nextId = result.nextSnippetId || 1;
    
    const snippetWithId = {
      id: nextId,
      title,
      language,
      code,
      createdAt: new Date().toISOString()
    };
    
    snippets.unshift(snippetWithId); // Add to beginning of array
    
    chrome.storage.sync.set({ 
      snippets,
      nextSnippetId: nextId + 1
    }, () => {
      if (chrome.runtime.lastError) {
        showNotification('Error saving snippet: ' + chrome.runtime.lastError.message, 'error');
        showLoading(false);
        return;
      }
      
      // Clear form
      snippetTitle.value = '';
      snippetCode.value = '';
      snippetLanguage.value = 'javascript'; // Set explicitly instead of using selectedIndex
      
      // Reload snippets
      loadSnippets();
      showNotification('Snippet saved successfully!', 'success');
    });
  });
}

// Delete a snippet
function deleteSnippet(snippetId) {
  if (!confirm('Are you sure you want to delete this snippet?')) {
    return;
  }
  
  showLoading(true);
  
  chrome.storage.sync.get(['snippets'], (result) => {
    const snippets = result.snippets || [];
    const filtered = snippets.filter(snippet => snippet.id !== snippetId);
    
    chrome.storage.sync.set({ snippets: filtered }, () => {
      if (chrome.runtime.lastError) {
        showNotification('Error deleting snippet: ' + chrome.runtime.lastError.message, 'error');
        showLoading(false);
        return;
      }
      
      loadSnippets();
      showNotification('Snippet deleted', 'success');
    });
  });
}

// Copy code to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Code copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy:', err);
    showNotification('Failed to copy code', 'error');
  });
}

// Show notification
function showNotification(message, type = 'info') {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Show/hide loading indicator
function showLoading(show) {
  if (show) {
    loadingIndicator.classList.remove('hidden');
  } else {
    loadingIndicator.classList.add('hidden');
  }
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.snippets) {
    console.log('Storage updated, reloading snippets');
    loadSnippets();
  }
});
