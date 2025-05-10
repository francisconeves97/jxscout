// Simple query with variables
const getUserQuery = `query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }`;
  
  // Mutation with input type
  const createUserMutation = `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }`;
  
  // Query with fragment
  const getProductsQuery = `query GetProducts {
    products {
      id
      name
      price
      ...ProductDetails
    }
  }`;
  
  // Query with directives
  const getUserWithDirectives = `query GetUserWithDirectives {
    user(id: "123") @include(if: $shouldInclude) {
      id
      name @skip(if: $shouldSkip)
    }
  }`;
  
  const getUserWithNewLine = `
      query GetUserWithDirectives {
          user(id: "123") @include(if: $shouldInclude) {
              id
              name @skip(if: $shouldSkip)
          }
      }
  `
  
  const graphQLKeyword = "type User { name: String }"; // Just a type definition 
  
  // These should not be matched
  const notGraphQL = "This is not a GraphQL query";
  const invalidGraphQL = "query { user { name }"; // Missing closing brace