// Test case 1: Basic JSX dangerouslySetInnerHTML usage
const Component1 = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: '<span>Hello World</span>' }} />
  );
};

// Test case 2: Multiple dangerouslySetInnerHTML usages in JSX
const Component2 = () => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: '<p>First content</p>' }} />
      <span dangerouslySetInnerHTML={{ __html: '<strong>Second content</strong>' }} />
    </>
  );
};

// Test case 3: dangerouslySetInnerHTML with dynamic content
const Component3 = () => {
  const content = '<p>Dynamic content</p>';
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

// Test case 4: dangerouslySetInnerHTML with template literals
const Component4 = () => {
  const name = 'John';
  return (
    <div dangerouslySetInnerHTML={{ __html: `<p>Hello ${name}</p>` }} />
  );
};

// Test case 5: dangerouslySetInnerHTML with conditional rendering
const Component5 = () => {
  const shouldRender = true;
  return shouldRender ? (
    <div dangerouslySetInnerHTML={{ __html: '<p>Conditional content</p>' }} />
  ) : null;
};

// Test case 6: dangerouslySetInnerHTML in nested components
const Component6 = () => {
  const NestedComponent = () => (
    <div dangerouslySetInnerHTML={{ __html: '<div>Nested content</div>' }} />
  );
  return <NestedComponent />;
};

// Test case 7: dangerouslySetInnerHTML with other props
const Component7 = () => {
  return (
    <div 
      className="content"
      dangerouslySetInnerHTML={{ __html: '<div>Content with other props</div>' }}
      onClick={() => console.log('clicked')}
    />
  );
};

// Test case 8: dangerouslySetInnerHTML with spread props
const Component8 = () => {
  const props = {
    dangerouslySetInnerHTML: {
      __html: '<div>Content from spread props</div>'
    }
  };
  return <div {...props} />;
};

// Test case 9: dangerouslySetInnerHTML with function call
const Component9 = () => {
  const getContent = () => '<div>Content from function</div>';
  return (
    <div dangerouslySetInnerHTML={{ __html: getContent() }} />
  );
};

// Test case 10: dangerouslySetInnerHTML with ternary operator
const Component10 = () => {
  const isAdmin = true;
  return (
    <div dangerouslySetInnerHTML={{ 
      __html: isAdmin ? '<div>Admin content</div>' : '<div>User content</div>' 
    }} />
  );
};