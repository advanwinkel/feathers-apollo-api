const typeDefinitions = `

type Todo {
  id: String!
  title: String
  created_at: String
  completed: Boolean
  order: Int
  url: String
}

input todoInput {
  title: String!
  completed: Boolean
  order: Int
}

# the schema allows the following two queries:
type RootQuery {
  alltodos: [Todo]
  todos(completed: Boolean): [Todo]
  todo(id: String!) : Todo
}

# this schema allows the following two mutations:
type RootMutation {
  createTodo (
    todo: todoInput
   ): Todo

  editTodo (
    id: String! # _id of todo to update
    todo: todoInput
  ): Todo

  removeTodo (
    id: String! # _id of todo to remove
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
