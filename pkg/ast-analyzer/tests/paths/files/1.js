// ===== API BASE URL EXAMPLES =====
const apiBaseUrl = "https://api.example.com"; // should not detect

// ===== VALID API ENDPOINT PATHS =====
// Simple endpoint paths
const userEndpointPath = "/users"; // should detect
const productEndpointPath = "api/products"; // should detect
const orderEndpointPath = "/orders/123"; // should detect
const longPath =
  "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users"; // should detect

// Endpoint paths with placeholders
const orderWithPlaceholderPath = "/orders/{orderId}/status"; // should detect
const orderWithColonParamPath = "/orders/:orderId/status"; // should detect
const orderWithMixedParamsPath = "orders/:orderId/status/456"; // should detect

// Endpoint paths with query parameters
const searchWithQueryParamsPath = "/search?q={query}&page={page}"; // should detect
const filterWithQueryParamsPath = "/filter?category={category}&sort={sort}"; // should detect
const longPathWithQueryParams =
  "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users?q={query}&page={page}"; // should detect

// ===== FULL URLS (SHOULD NOT DETECT) =====
const documentationUrl = "https://docs.example.com/api"; // should not detect
const dashboardUrl = "https://dashboard.example.com"; // should not detect
const loginUrl = "https://auth.example.com/login"; // should not detect

// ===== API ENDPOINT OBJECTS AND ARRAYS =====
// Object with URL paths
const apiEndpoints = {
  users: "/api/users", // should detect
  products: "/api/products", // should detect
  orders: "/api/orders", // should detect
  auth: "https://auth.example.com", // should not detect
};

// Array with URL paths
const apiEndpointList = [
  "https://api1.example.com", // should not detect
  "https://api2.example.com", // should not detect
  "/api/v1", // should detect
  "/api/v2", // should detect
  "api/v3", // should detect
];

// ===== FUNCTIONS USING URL PATHS =====
function fetchUserData(userId) {
  return fetch(`${apiBaseUrl}${userEndpointPath}/${userId}`);
}

function fetchProductDetails(productId) {
  return fetch(`${apiBaseUrl}/api/products/${productId}`);
}

function fetchOrderStatus(orderId) {
  return fetch(`${apiBaseUrl}${orderEndpointPath}/${orderId}/status`);
}

// ===== INVALID PATH EXAMPLES (SHOULD NOT DETECT) =====
// Paths with only special characters (no alphanumeric)
const specialCharsOnlyPath1 = "/"; // should not detect
const specialCharsOnlyPath2 = "/$"; // should not detect
const specialCharsOnlyPath3 = "/*"; // should not detect
const specialCharsOnlyPath4 = "//"; // should not detect
const specialCharsOnlyPath5 = "/?"; // should not detect
const specialCharsOnlyPath6 = "/#"; // should not detect

// Paths with special prefixes
const specialPrefixPath1 = "@lib/modal"; // should not detect
const specialPrefixPath2 = "./mypath/index.js"; // should not detect
const specialPrefixPath3 = "~/mypath/index.js"; // should not detect

// MIME types and content types
const mimeTypePath1 = "application/json"; // should not detect
const mimeTypePath2 = "text/csv"; // should not detect
const mimeTypePath3 = "image/png"; // should not detect
const mimeTypePath4 = "multipart/form-data"; // should not detect
const mimeTypePath5 = "application/ld+json"; // should not detect

// file extensions
const fileExtensionPath1 = "/image/users.png"; // should not detect
const fileExtensionPath2 = "/image/users.jpg"; // should not detect
const fileExtensionPath3 = "/image/users.jpeg"; // should not detect
const fileExtensionPath4 = "/image/users.gif"; // should not detect
const fileExtensionPath5 = "/image/users.webp"; // should not detect
const fileExtensionPath6 = "/image/users.svg"; // should not detect
const fileExtensionPath7 = "/image/users.ico"; // should not detect

// Data URIs and hashes (high entropy)
const dataUriPath =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="; // should not detect
const hashPath =
  "sha512-xt9QypT23DNupLy9wXPzK6uGCHucLx9ieBiprVZwJD/HfkKcTY5t9xUrMvJ/ybOBfVDiFPL8R/YCJHdANxjV3g=="; // should not detect
const md5Hash = "7b064dad507c266a161ffc73c53dcdc5";
const sha1Hash = "74dc916419a178d22cb0fc8a04f62d345784ad7d";

// Paths with very short segments (single character)
const shortSegmentPath1 = "a/b"; // should not detect
const shortSegmentPath2 = "a/i"; // should not detect
const shortSegmentPath3 = "x/y/z"; // should not detect

// Paths that don't look like API endpoints
const nonApiPath1 = "this-is-not-a-url-path"; // should not detect
const nonApiPath2 = "neither-is-this-one"; // should not detect
