// Basic fetch call
fetch('https://api.example.com/data');

// Fetch with options
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
});

// Fetch with variable
const url = 'https://api.example.com/data';
fetch(url);

// Fetch with template literal
const endpoint = 'data';
fetch(`https://api.example.com/${endpoint}`);

// Fetch with await
async function getData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
} 