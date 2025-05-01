// Regex literal examples
const regex1 = /hello/;
const regex2 = /world/g;
const regex3 = /[0-9]+/i;
const regex4 = /^start.*end$/m;

// RegExp constructor examples
const regex5 = new RegExp("pattern");
const regex6 = new RegExp("case-insensitive", "i");
const regex7 = new RegExp("global", "g");
const regex8 = new RegExp("multiline", "m");

const str = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$";

// Complex regex examples
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = new RegExp(
  "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$",
  "i"
);


const a = "asd"