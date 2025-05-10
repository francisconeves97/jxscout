// Test localStorage methods
window.localStorage.setItem('key', 'value');
window.localStorage.getItem('key');
window.localStorage.removeItem('key');
window.localStorage.clear();

localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// Test with variables
const key = 'testKey';
const value = 'testValue';
window.localStorage.setItem(key, value);
window.localStorage.getItem(key);

// Test with template literals
const prefix = 'user_';
window.localStorage.setItem(`${prefix}name`, 'John');
window.localStorage.getItem(`${prefix}name`);

// Test with object properties
const user = { id: 123, name: 'Alice' };
window.localStorage.setItem('user', JSON.stringify(user));
window.localStorage.getItem('user');

// Test with nested calls
const data = window.localStorage.getItem('data');
if (data) {
  window.localStorage.setItem('backup', data);
} 