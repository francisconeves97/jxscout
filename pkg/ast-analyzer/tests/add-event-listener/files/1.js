// Test file for addEventListener analyzer

// Basic event listener
document.addEventListener('click', () => {
  console.log('clicked');
});

// Event listener with options
window.addEventListener('resize', () => {
  console.log('resized');
}, { once: true });

// Dynamic event type
const eventType = 'scroll';
document.addEventListener(eventType, () => {
  console.log('scrolled');
});

// Event listener on element
const button = document.querySelector('button');
button?.addEventListener('mouseover', () => {
  console.log('mouseover');
}); 

addEventListener('click', () => {
  console.log('clicked');
});
