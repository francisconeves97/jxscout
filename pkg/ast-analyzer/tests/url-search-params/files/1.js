// Test case for URLSearchParams analyzer

// Basic usage
const params1 = new URLSearchParams('?query=value');
const params2 = new URLSearchParams({ key: 'value' });
const params3 = new URLSearchParams([['key', 'value']]);

// Should not match
const notParams = new NotURLSearchParams();
const urlParams = new URLParams();