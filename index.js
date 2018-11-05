const Todo = require('./models/Todo');
const User = require('./models/User');

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

// RETRIEVE
// example of grabbing all the rows
// --------------------------------
// Todo.getAll()
//     .then(results => {
//         console.log(results);
//         console.log('those were the todos');
//     })
User.getAll()
    .then(results => {
        console.log(results);
        console.log('those were the users');
    })

// example of grabbing one row

// Todo.getById(2)
//     .then(result => {
//         console.log(result);
//     })
// Todo.getById(200000)
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

