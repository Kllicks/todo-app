require('dotenv').config();

const Todo = require('./models/Todo');
const User = require('./models/User');

// User.updateName('bobby')
//     .then(users => {
//         console.log(users);
//     })

// User.searchByName('ylin')
//     .then(users => {
//         console.log(users);
//     });

// User.getById(7)
//     .then(u => {
//         u.delete();
//     })

// User.deleteById(8);

// User.getAll()
//     .then(allUsers => {
//         allUsers.forEach(user => {
//             console.log(user.name);
//         });
//     })

// User.getById(1)
//     .then(userFromDB => {
//         console.log(userFromDB);
//         userFromDB.getTodos()
//             .then(todos => {
//                 console.log(todos);
//             })
//     })

// const beth = new User(2,  'beth');
// beth.getTodos()
//     .then(result => {
//         console.log(result);
//     })

// let newUsers = [
//     'jeff',
//     'brandy',
//     'zack',
//     'tasha',
//     'jenn',
//     'cori',
// ]

// newUsers.forEach(u => {
//     User.add(u)
//         .then(aNewUser => {
//             aNewUser.addTodo('do the thing');
//         })
// });

// User.add('jeff')
//     .then(theNewUser => {
//         theNewUser.getTodos()
//             .then(todos => {
//                 console.log(`${theNewUser.name} has ${todos.length} things todo`);
//             })
//     })

// const skyler = new User(`Skyler the Dog`);
// const ahjuma = new User(`Ahjuma the Impressive`)

// debugger;

// skyler.greet(ahjuma);
// ahjuma.greet(skyler);
// let u = User.findById(1);
// u.name = 'eileen';
// u.save();

// User.deleteById(2)
//     .then(result => { console.log(result); })

// Todo.deleteById(1)
//     .then(result => { console.log(result); })

// User.getTodosForUser(3)
//     .then(result => {
//         console.log(result);
//     })

// Todo.assignToUser(2,2)
//     .then(() => {
//         User.getTodosForUser(2)
//             .then(result => {
//                 console.log(result);
//         })
//     })
// User.getAll()
//     .then(result => {
//         console.log(result);
//     })


//FOR TESTING DATABASE PURPOSES:
//=============================
// CREATE
// example of adding a row
// --------------------------
// Todo.add('walk chewbacca', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })
// User.add('jeff')
//     .then(result => {
//         console.log(result);
//     })

// RETRIEVE
// example of grabbing all the rows
// --------------------------------
// Todo.getAll()
//     .then(results => {
//         console.log(results);
//         console.log('those were the todos');
//     })
// User.getAll()
//     .then(results => {
//         console.log(results);
//         console.log('those were the users');
//     })

// example of grabbing one row

// Todo.getById(2)
//     .then(result => {
//         console.log(result);
//     })
// Todo.getById(200000)
//     .then(result => {
//         console.log(result);
//     })
// User.getById(2)
//     .then(result => {
//         console.log(result);
//     })

// UPDATE
// example of updating a row
// -----------------------------
// Todo.updateName(2, 'buy new hyperdrive')
//     .then(result => {
//         console.log(result);
//     })
// User.updateName(6, 'JEFF')
//     .then(result => {
//         console.log(result);
//     })

// Todo.markPending(1)
//     .then(result => {
//         console.log(result);
//     })

// DELETE
// example of deleting a row
// --------------------------------------
// Todo.deleteById(10)
//     .then(result => {
//         console.log(result.rowCount);
//     })
// User.deleteById(6)
//     .then(result => {
//         console.log(result.rowCount);
//     })

