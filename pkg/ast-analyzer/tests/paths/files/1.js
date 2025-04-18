// Example JavaScript file with various URL-like paths

// API endpoints
const apiBaseUrl = 'https://api.example.com';
const userEndpoint = '/users';
const productEndpoint = '/products';
const orderEndpoint = '/orders';

// Full URLs
const documentationUrl = 'https://docs.example.com/api';
const dashboardUrl = 'https://dashboard.example.com';
const loginUrl = 'https://auth.example.com/login';

// Relative paths
const assetsPath = '/assets/images';
const staticPath = '/static/css';
const mediaPath = '/media/videos';

// Paths with parameters
const userProfilePath = '/users/{userId}/profile';
const productDetailsPath = '/products/{productId}/details';
const orderStatusPath = '/orders/{orderId}/status';

// Paths with query parameters
const searchPath = '/search?q={query}&page={page}';
const filterPath = '/filter?category={category}&sort={sort}';

// Function that uses URL paths
function fetchUserData(userId) {
  return fetch(`${apiBaseUrl}${userEndpoint}/${userId}`);
}

function fetchProductDetails(productId) {
  return fetch(`${apiBaseUrl}${productEndpoint}/${productId}`);
}

function fetchOrderStatus(orderId) {
  return fetch(`${apiBaseUrl}${orderEndpoint}/${orderId}/status`);
}

// Object with URL paths
const endpoints = {
  users: '/api/users',
  products: '/api/products',
  orders: '/api/orders',
  auth: 'https://auth.example.com'
};

// Array with URL paths
const apiEndpoints = [
  'https://api1.example.com',
  'https://api2.example.com',
  '/api/v1',
  '/api/v2',
  'api/v3'
];

// String that looks like a path but isn't really a URL
const notAUrl = 'this-is-not-a-url-path';
const alsoNotAUrl = 'neither-is-this-one';

// Export the endpoints for use in other modules
export {
  apiBaseUrl,
  userEndpoint,
  productEndpoint,
  orderEndpoint,
  documentationUrl,
  dashboardUrl,
  loginUrl,
  endpoints,
  apiEndpoints
}; 