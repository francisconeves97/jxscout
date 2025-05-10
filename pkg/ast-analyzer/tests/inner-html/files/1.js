// Direct innerHTML assignment
document.getElementById('container').innerHTML = '<div>Hello World</div>';

// Chained property access
const element = document.querySelector('.content');
element.innerHTML = '<span>Dynamic content</span>';

// Using innerHTML in a function
function updateContent() {
  const div = document.createElement('div');
  div.innerHTML = '<p>Function content</p>';
  return div;
}

// Nested property access
const obj = {
  element: document.getElementById('nested')
};
obj.element.innerHTML = '<div>Nested access</div>';

// Multiple assignments
const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
container1.innerHTML = '<div>First container</div>';
container2.innerHTML = '<div>Second container</div>';

// Using innerHTML with template literals
const name = 'User';
document.getElementById('greeting').innerHTML = `<h1>Welcome ${name}</h1>`;

// Using innerHTML in an event handler
document.getElementById('button').addEventListener('click', () => {
  document.getElementById('result').innerHTML = '<p>Button clicked!</p>';
}); 