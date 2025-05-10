// Basic window.open call
window.open('https://example.com');

// Window.open with target and features
window.open('https://example.com', '_blank', 'width=500,height=500');

// Window.open with variable
const url = 'https://example.com';
window.open(url);

// Window.open with dynamic URL
const baseUrl = 'https://example.com';
window.open(`${baseUrl}/path`);

// Window.open with object property
const config = {
  url: 'https://example.com',
  target: '_blank'
};
window.open(config.url, config.target); 