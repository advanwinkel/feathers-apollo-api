
import request from 'request-promise';

export default function Resolvers(){
  
    let app = this;

    let Todos = app.service('todos');
    let Users = app.service('users');
    let Viewer = app.service('viewer');
    
    return {
      RootQuery: {
        alltodos(root, args, context){
          return Todos.find({});
        },
        todos(root, { completed }, context){
          return Todos.find({
            query: {
              completed
            }
          });
        },
        todo(root, { id }, context){
          return Todos.get(id)
        }
      },

      RootMutation: {
        createTodo(root, args, context){
        return Todos.create(args.todo, context);
        },
        editTodo(root, args, context){
        return Todos.patch(args.id, args.todo, context);
        },
        removeTodo(root, { id }, context) {
          return Posts.remove(id, context);
        }
      }

  }
}

