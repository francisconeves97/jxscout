// Paths analyzer
const apiPath = '/api/users';
const queryParam = '?id=123';

// Emails analyzer
const email = 'user@example.com';

// Post Message analyzer
window.postMessage('data', '*');

// Message Listener analyzer
window.addEventListener('message', (event) => {
  console.log(event.data);
});
 
// Regex Match analyzer
const regex = /test/;
regex.test('test string');

// Hash Change analyzer
window.location.hash = '#section1';

// Regex analyzer
const pattern = new RegExp('test');

// DOM XSS analyzer
document.write('<script>alert("xss")</script>');

// GraphQL analyzer
const query = `
  query {
    user(id: "123") {
      name
      email
    }
  }
`;

// URLs analyzer
const url = 'https://example.com';

// jQuery DOM XSS analyzer
$('#element').html('<script>alert("xss")</script>');

// Open Redirection analyzer
window.location.href = 'https://malicious.com';

// Cookie Manipulation analyzer
document.cookie = 'session=123';

// JavaScript Injection analyzer
eval('console.log("injected")');

// Document Domain Manipulation analyzer
document.domain = 'example.com';

// WebSocket URL Poisoning analyzer
const ws = new WebSocket('ws://example.com');

// Link Manipulation analyzer
const link = document.createElement('a');
link.href = 'javascript:alert(1)';

// AJAX Request Header Manipulation analyzer
const xhr = new XMLHttpRequest();
xhr.setRequestHeader('X-Custom-Header', 'value');

// Local File Path Manipulation analyzer
const filePath = 'file:///etc/passwd';

// HTML5 Storage Manipulation analyzer
localStorage.setItem('key', 'value');
sessionStorage.setItem('key', 'value');

// XPath Injection analyzer
const xpath = '//user[@id="' + userInput + '"]';

// DOM Data Manipulation analyzer
const element = document.getElementById('user');
element.setAttribute('data-user', JSON.stringify(userData));

// Common Sources analyzer
const userInput = document.getElementById('input').value;

// Secrets analyzer
const apiKey = 'sk_live_1234567890abcdef';
const password = 'password123';

// PII analyzer
const ssn = '123-45-6789';
const creditCard = '4111-1111-1111-1111'; 