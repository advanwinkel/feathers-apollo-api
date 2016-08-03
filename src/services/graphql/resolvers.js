
import request from 'request-promise';

export default function Resolvers(){
  
    let app = this;

    const makeRequest = request.defaults({
      baseUrl: 'http://localhost:3030',
      json: true
    });

    let Todos = app.service('todos');
    let Users = app.service('users');
    let Viewer = app.service('viewer');
    
    return {
      AuthPayload : {
        data(auth, args, context) {
          return auth.data;
        }
      },
      RootQuery: {
        viewer(root, args, context) {
            context.token = args.webtoken
            return Viewer.find(context);
        },
        user(root, { username }, context){
          return Users.find({
            query: {
              username
            }
          }).then((users) => users[0]);
        },
        users(root, args, context){
          return Users.find({})
        },        
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
        signUp(root, args, context){
          return Users.create(args)
        },
        logIn(root, {username, password}, context){
          return makeRequest({
            uri: '/auth/local',
            method: 'POST',
            body: { username: username, password: password }
          });
        },        
        createTodo(root, args, context){
          context.token = args.webtoken;
          return Todos.create(args.todo, context);
        },
        editTodo(root, args, context){
          context.token = args.webtoken;
          return Todos.patch(args.id, args.todo, context);
        },
        removeTodo(root, { id, webtoken }, context) {
          context.token = webtoken;
          return Todos.remove(id, context);
        }
      }

  }
}

