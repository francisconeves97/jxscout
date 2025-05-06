// Test case 1: Basic object property dangerouslySetInnerHTML
const props1 = {
  dangerouslySetInnerHTML: {
    __html: '<span>Hello World</span>'
  }
};

// Test case 2: dangerouslySetInnerHTML with other properties
const props2 = {
  className: 'content',
  dangerouslySetInnerHTML: {
    __html: '<div>Content with other props</div>'
  },
  onClick: () => console.log('clicked')
};

// Test case 3: Multiple dangerouslySetInnerHTML objects
const props3 = {
  dangerouslySetInnerHTML: {
    __html: '<p>First content</p>'
  }
};

const props4 = {
  dangerouslySetInnerHTML: {
    __html: '<strong>Second content</strong>'
  }
};

// Test case 4: dangerouslySetInnerHTML with dynamic content
const userContent = fetchUserContent(); // Some function that returns HTML
const props5 = {
  dangerouslySetInnerHTML: {
    __html: userContent
  }
};

// Test case 5: dangerouslySetInnerHTML with template literals
const name = 'John';
const props6 = {
  dangerouslySetInnerHTML: {
    __html: `<p>Hello ${name}</p>`
  }
};

// Test case 6: dangerouslySetInnerHTML in nested objects
const props7 = {
  content: {
    dangerouslySetInnerHTML: {
      __html: '<div>Nested content</div>'
    }
  }
};

// Test case 7: dangerouslySetInnerHTML with computed property names
const propName = 'dangerouslySetInnerHTML';
const props8 = {
  [propName]: {
    __html: '<div>Computed property content</div>'
  }
};

// Test case 8: dangerouslySetInnerHTML with spread operator
const baseProps = {
  dangerouslySetInnerHTML: {
    __html: '<div>Base content</div>'
  }
};

const props9 = {
  ...baseProps,
  className: 'extended'
};