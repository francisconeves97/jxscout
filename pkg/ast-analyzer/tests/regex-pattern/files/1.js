// Regex literals
const regex1 = /test/;
const regex2 = /[a-z]+/g;
const regex3 = /^\d{3}-\d{2}-\d{4}$/;

// RegExp constructor
const regex4 = new RegExp('test');
const regex5 = new RegExp('[a-z]+', 'g');
const regex6 = new RegExp('^\\d{3}-\\d{2}-\\d{4}$'); 

const regex7 = new RegExp(window.location)

name.match(/([a-zA-Z0-9]+|\s)+$/)