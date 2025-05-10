// Test file for fetch options analyzer

// Basic fetch options
const options1 = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Fetch options with body
const options2 = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ data: 'test' })
};

// Fetch options with credentials
const options3 = {
  method: 'GET',
  credentials: 'include',
  mode: 'cors'
};

// Partial fetch options
const options4 = {
  method: 'PUT'
};

// Inlined fetch options
fetch('https://api.example.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'test' })
});

// Not fetch options (should not match)
const notOptions = {
  name: 'test',
  value: 123
}; 