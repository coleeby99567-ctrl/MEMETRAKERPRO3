document.addEventListener('DOMContentLoaded', () => {
  const usersTextarea = document.getElementById('users');
  const keywordsTextarea = document.getElementById('keywords');
  const saveBtn = document.getElementById('saveBtn');

  // Load existing settings
  chrome.storage.sync.get(['users', 'keywords'], ({ users = [], keywords = [] }) => {
    usersTextarea.value = users.join('\n');
    keywordsTextarea.value = keywords.join('\n');
  });

  // Save settings
  saveBtn.addEventListener('click', () => {
    const users = usersTextarea.value.split('\n').map(u => u.trim()).filter(u => u);
    const keywords = keywordsTextarea.value.split('\n').map(k => k.trim()).filter(k => k);
    chrome.storage.sync.set({ users, keywords }, () => {
      alert('Settings saved!');
    });
  });
});
