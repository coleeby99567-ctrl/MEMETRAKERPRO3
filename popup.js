document.addEventListener('DOMContentLoaded', () => {
  const postsDiv = document.getElementById('posts');
  const optionsBtn = document.getElementById('optionsBtn');

  // Load settings from storage
  chrome.storage.sync.get(['users', 'keywords'], ({ users = [], keywords = [] }) => {
    // Default top 50 accounts (sample list; replace with actual top accounts)
    const topAccounts = [
      'elonmusk', 'cristiano', 'justinbieber', 'rihanna', 'katyperry',
      'taylorswift13', 'narendramodi', 'ladygaga', 'barackobama', 'kimkardashian',
      'arianagrande', 'selenagomez', 'neymarjr', 'drake', 'beyonce',
      'oprah', 'shakira', 'ddlovato', 'jimmyfallon', 'billgates',
      'lebron', 'mileycyrus', 'nickiminaj', 'jlo', 'bruno_mars',
      'nasa', 'theellenshow', 'britneyspears', 'cnn', 'nytimes',
      'espn', 'fcbarcelona', 'realmadrid', 'manutd', 'juventusfc',
      'kanyewest', 'khloekardashian', 'kyliejenner', 'adele', 'emmawatson',
      'zendaya', 'chrishemsworth', 'therock', 'davidbeckham', 'snoopdogg',
      'justintimberlake', 'ushistory', 'nfl', 'nba', 'bbcnews'
    ];

    // Combine user-defined accounts with top accounts
    const allUsers = [...new Set([...users, ...topAccounts])];

    // Mock API call (replace with actual X API)
    fetchPosts(allUsers, keywords).then(posts => {
      if (posts.length === 0) {
        postsDiv.innerHTML = '<p>No posts match your criteria.</p>';
        return;
      }
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <strong>@${post.user}</strong> (${post.followers} followers)<br>
          ${post.text}<br>
          <small>${new Date(post.created_at).toLocaleString()}</small>
        `;
        postsDiv.appendChild(postElement);
      });
    }).catch(error => {
      postsDiv.innerHTML = '<p>Error fetching posts. Please check your API setup.</p>';
      console.error('Error:', error);
    });
  });

  // Open options page
  optionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Mock function to fetch posts (replace with actual API call)
  async function fetchPosts(users, keywords) {
    // Placeholder: Simulate fetching posts
    const mockPosts = users.map(user => ({
      user,
      followers: Math.floor(Math.random() * 100000) + 2000, // Ensure 2k+ followers
      text: `Sample post from @${user} ${keywords.length > 0 ? keywords.join(' ') : ''}`,
      created_at: new Date().toISOString()
    }));

    // Filter posts by keywords and follower count
    return mockPosts.filter(post => 
      post.followers >= 2000 &&
      (keywords.length === 0 || keywords.some(keyword => 
        post.text.toLowerCase().includes(keyword.toLowerCase())
      ))
    );
  }
});
