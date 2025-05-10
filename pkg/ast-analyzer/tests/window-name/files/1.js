// Test window.name assignment
window.name = "testWindow";

// Test window.name read
const currentName = window.name;
console.log(window.name);

// Test window.name in a function
function handleWindowName() {
    const name = window.name;
    window.name = "newName";
    return window.name;
}

// Test window.name in an object
const windowObj = {
    getName() {
        return window.name;
    },
    setName(newName) {
        window.name = newName;
    }
}; 