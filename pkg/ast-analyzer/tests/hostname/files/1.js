// Basic domain names
const domain1 = 'example.com';
const domain2 = 'sub.example.com';
const domain3 = 'sub.sub.example.com';

// Domains with hyphens
const domain4 = 'my-domain.com';
const domain5 = 'sub-domain.example.com';

// Domains with numbers
const domain6 = 'domain123.com';
const domain7 = '123domain.com';
const domain8 = 'sub123.example.com';

// Mixed characters
const domain9 = 'a1-b2-c3.example.com';
const domain10 = 'test-123.example.com';

// Different TLDs
const domain11 = 'example.org';
const domain12 = 'example.net';
const domain13 = 'example.io';

// Not hostnames (should not match)
const notHostname1 = 'example'; // No TLD
const notHostname2 = 'example.'; // No TLD
const notHostname3 = 'example..com'; // Double dot
const notHostname4 = '-example.com'; // Starts with hyphen
const notHostname5 = 'example-.com'; // Ends with hyphen
const notHostname6 = 'example.com.'; // Ends with dot
const notHostname7 = 'example@com'; // Invalid character
const notHostname8 = 'example.com/'; // Invalid character
const notHostname9 = 'example.com:8080'; // Port number
const notHostname10 = 'http://example.com'; // URL scheme 
const notHostname11 = 'abc.svg';
const notHostname12 = 'react.lazy';