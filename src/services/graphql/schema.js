const typeDefinitions = `

type User {
  id: String! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  username: String!
}

type Todo {
  id: Int!
  title: String
  created_at: String
  completed: Boolean
  order: Int
  url: String
}

type AuthPayload {
  token: String # JSON Web Token
  data: User
}

input todoInput {
  title: String!
  completed: Boolean
  order: Int
}

# the schema allows the following two queries:
type RootQuery {
  viewer(webtoken: String): User
  user(username: String!): User
  users: [User]  
  alltodos: [Todo]
  todos(completed: Boolean): [Todo]
  todo(id: String!) : Todo
}

# this schema allows the following two mutations:
type RootMutation {
  signUp (
    username: String!
    password: String!
    firstName: String
    lastName: String
  ): User

  logIn (
    username: String!
    password: String!
  ): AuthPayload 

  createTodo (
    todo: todoInput
    webtoken: String    
   ): Todo

  editTodo (
    id: Int! # _id of todo to update
    todo: todoInput
    webtoken: String    
  ): Todo

  removeTodo (
    id: Int! # _id of todo to remove
    webtoken: String    
  ): Todo
  
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;



export default [typeDefinitions]
