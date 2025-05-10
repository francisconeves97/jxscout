// Basic HTTP method calls
axios.get("/api/users");
fetch.post("/api/users", { name: "John" });
api.delete("/api/users/123");
request.put("/api/users/123", { name: "John" });
http.patch("/api/users/123", { name: "John" });

// HTTP method calls with template literals
axios.get(`/api/users/${userId}`);
fetch.post(`/api/users/${userId}/posts`, postData);

// HTTP method calls with string concatenation
api.delete("/api/users/" + userId);
request.put("/api/users/" + userId + "/profile", profileData);

// HTTP method calls with query parameters
axios.get("/api/users?page=1&limit=10");
fetch.post("/api/users?admin=true", userData);

// HTTP method calls with headers
api.delete("/api/users/123", { headers: { Authorization: "Bearer token" } });
request.put("/api/users/123", userData, {
  headers: { "Content-Type": "application/json" },
});

// HTTP method calls with options object
axios.get("/api/users", { params: { page: 1, limit: 10 } });
fetch.post("/api/users", userData, {
  headers: { "Content-Type": "application/json" },
});

// HTTP method calls with base URL
const api = axios.create({ baseURL: "https://api.example.com" });
api.get("/users");
api.post("/users", userData);

// HTTP method calls with chaining
axios.get("/api/users").then((response) => console.log(response));
fetch.post("/api/users", userData).then((response) => response.json());

// HTTP method calls with async/await
async function fetchUser() {
  const response = await axios.get("/api/users/123");
  return response.data;
}

// HTTP method calls with error handling
axios.get("/api/users").catch((error) => console.error(error));
fetch.post("/api/users", userData).catch((error) => console.error(error));

// HTTP method calls with multiple arguments
api.delete(
  "/api/users/123",
  { headers: { Authorization: "Bearer token" } },
  { timeout: 5000 }
);
request.put(
  "/api/users/123",
  userData,
  { headers: { "Content-Type": "application/json" } },
  { timeout: 5000 }
);

// HTTP method calls with dynamic method names
const method = "get";
axios[method]("/api/users");

// HTTP method calls with object destructuring
const { get, post } = axios;
get("/api/users");
post("/api/users", userData);

// HTTP method calls with function parameters
function makeRequest(method, url, data) {
  return axios[method](url, data);
}
makeRequest("get", "/api/users");
makeRequest("post", "/api/users", userData);

// HTTP method calls with class methods
class ApiClient {
  get(url) {
    return axios.get(url);
  }
  post(url, data) {
    return axios.post(url, data);
  }
}
const client = new ApiClient();
client.get("/api/users");
client.post("/api/users", userData);

// HTTP method calls with arrow functions
const getUsers = () => axios.get("/api/users");
const createUser = (data) => axios.post("/api/users", data);

// HTTP method calls with default parameters
function fetchData(url = "/api/users", method = "get") {
  return axios[method](url);
}

// HTTP method calls with rest parameters
function makeApiCall(method, url, ...args) {
  return axios[method](url, ...args);
}

// HTTP method calls with spread operator
const options = { headers: { Authorization: "Bearer token" } };
axios.get("/api/users", { ...options });

// HTTP method calls with computed property names
const methods = {
  ["get"]: (url) => axios.get(url),
  ["post"]: (url, data) => axios.post(url, data),
};
methods["get"]("/api/users");
methods["post"]("/api/users", userData);

// HTTP method calls with optional chaining
const apiClient = {
  get: (url) => axios.get(url),
  post: (url, data) => axios.post(url, data),
};
apiClient?.get("/api/users");
apiClient?.post("/api/users", userData);

// HTTP method calls with nullish coalescing
const methodName = null ?? "get";
axios[methodName]("/api/users");

// HTTP method calls with logical operators
const shouldUsePost = true;
const requestMethod = (shouldUsePost && "post") || "get";
axios[requestMethod]("/api/users", shouldUsePost ? userData : undefined);

// HTTP method calls with ternary operators
const usePost = true;
axios[usePost ? "post" : "get"]("/api/users", usePost ? userData : undefined);

// HTTP method calls with array methods
["get", "post", "put", "delete", "patch"].forEach((method) => {
  axios[method]("/api/users");
});

// HTTP method calls with object methods
Object.entries({
  get: "/api/users",
  post: "/api/users",
  put: "/api/users/123",
  delete: "/api/users/123",
  patch: "/api/users/123",
}).forEach(([method, url]) => {
  axios[method](url);
});

// HTTP method calls with async iteration
async function* generateRequests() {
  yield axios.get("/api/users");
  yield axios.post("/api/users", userData);
}

// HTTP method calls with Promise.all
Promise.all([axios.get("/api/users"), axios.post("/api/users", userData)]);

// HTTP method calls with Promise.race
Promise.race([axios.get("/api/users"), axios.post("/api/users", userData)]);

// HTTP method calls with Promise.allSettled
Promise.allSettled([
  axios.get("/api/users"),
  axios.post("/api/users", userData),
]);

// HTTP method calls with Promise.any
Promise.any([axios.get("/api/users"), axios.post("/api/users", userData)]);

// HTTP method calls with try/catch
try {
  await axios.get("/api/users");
} catch (error) {
  console.error(error);
}

// HTTP method calls with finally
axios
  .get("/api/users")
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
  .finally(() => console.log("Request completed"));

// HTTP method calls with custom error handling
axios
  .get("/api/users")
  .then((response) => {
    if (response.status === 200) {
      console.log(response.data);
    } else {
      throw new Error("Request failed");
    }
  })
  .catch((error) => console.error(error));

// HTTP method calls with request cancellation
const controller = new AbortController();
axios.get("/api/users", { signal: controller.signal });
controller.abort();

// HTTP method calls with request timeout
axios.get("/api/users", { timeout: 5000 });

// HTTP method calls with request retry
axios.get("/api/users", { retry: 3 });

// HTTP method calls with request validation
axios.get("/api/users", {
  validateStatus: (status) => status >= 200 && status < 300,
});

// HTTP method calls with request transformation
axios.get("/api/users", {
  transformResponse: [(data) => JSON.parse(data)],
});

// HTTP method calls with request progress
axios.get("/api/users", {
  onDownloadProgress: (progressEvent) => {
    console.log(progressEvent.loaded);
  },
});

// HTTP method calls with request upload progress
axios.post("/api/users", userData, {
  onUploadProgress: (progressEvent) => {
    console.log(progressEvent.loaded);
  },
});

// HTTP method calls with request caching
axios.get("/api/users", {
  cache: "force-cache",
});

// HTTP method calls with request credentials
axios.get("/api/users", {
  withCredentials: true,
});

// HTTP method calls with request mode
fetch.get("/api/users", {
  mode: "cors",
});

// HTTP method calls with request redirect
fetch.get("/api/users", {
  redirect: "follow",
});

// HTTP method calls with request referrer
fetch.get("/api/users", {
  referrer: "https://example.com",
});

// HTTP method calls with request referrer policy
fetch.get("/api/users", {
  referrerPolicy: "strict-origin-when-cross-origin",
});

// HTTP method calls with request integrity
fetch.get("/api/users", {
  integrity: "sha256-1234567890",
});

// HTTP method calls with request keepalive
fetch.get("/api/users", {
  keepalive: true,
});

// HTTP method calls with request signal
const signal = new AbortSignal();
fetch.get("/api/users", {
  signal,
});

// HTTP method calls with request priority
fetch.get("/api/users", {
  priority: "high",
});

// HTTP method calls with request window
fetch.get("/api/users", {
  window: null,
});

// HTTP method calls with request window reference
fetch.get("/api/users", {
  window: window,
});

// HTTP method calls with request window reference and options
fetch.get("/api/users", {
  window: window,
  mode: "cors",
  credentials: "include",
});

// HTTP method calls with request window reference and headers
fetch.get("/api/users", {
  window: window,
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

// HTTP method calls with request window reference and body
fetch.post("/api/users", {
  window: window,
  body: JSON.stringify(userData),
});

// HTTP method calls with request window reference and method
fetch.request("/api/users", {
  window: window,
  method: "GET",
});

// HTTP method calls with request window reference and url
fetch.request({
  window: window,
  url: "/api/users",
});

// HTTP method calls with request window reference and url and method
fetch.request({
  window: window,
  url: "/api/users",
  method: "GET",
});

// HTTP method calls with request window reference and url and method and headers
fetch.request({
  window: window,
  url: "/api/users",
  method: "GET",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});

// HTTP method calls with request window reference and url and method and headers and body
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
});

// HTTP method calls with request window reference and url and method and headers and body and mode
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy and integrity
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
  integrity: "sha256-1234567890",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy and integrity and keepalive
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
  integrity: "sha256-1234567890",
  keepalive: true,
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy and integrity and keepalive and signal
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
  integrity: "sha256-1234567890",
  keepalive: true,
  signal: new AbortSignal(),
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy and integrity and keepalive and signal and priority
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
  integrity: "sha256-1234567890",
  keepalive: true,
  signal: new AbortSignal(),
  priority: "high",
});

// HTTP method calls with request window reference and url and method and headers and body and mode and credentials and cache and redirect and referrer and referrerPolicy and integrity and keepalive and signal and priority and window
fetch.request({
  window: window,
  url: "/api/users",
  method: "POST",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  mode: "cors",
  credentials: "include",
  cache: "no-cache",
  redirect: "follow",
  referrer: "https://example.com",
  referrerPolicy: "strict-origin-when-cross-origin",
  integrity: "sha256-1234567890",
  keepalive: true,
  signal: new AbortSignal(),
  priority: "high",
  window: window,
});
