// Test case 1: Direct onmessage assignment
window.onmessage = function(event) {
  console.log('Message received:', event.data);
};

// Test case 2: addEventListener for message
window.addEventListener('message', function(event) {
  console.log('Message received via addEventListener:', event.data);
});

// Test case 3: Non-matching addEventListener
window.addEventListener('click', function() {
  console.log('Click event');
}); 