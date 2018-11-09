require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(express.static(`public`));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

const Todo = require('./models/Todo');
const User = require('./models/User');

const page = require(`./views/page`);
const userList = require(`./views/userList`);

app.get(`/`, (req, res) => {
    const thePage = page(`hello`);
    res.send(thePage);
});
// CREATE - Post 
// RETRIEVE - Get
// UPDATE - Put
// DELETE - Delete

// Listen for a GET request
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // can only send route event once
            // res.send(allUsers);
            // res.status(200).json(allUsers);
            const usersUL = userList(allUsers);
            
            const thePage = page(usersUL);
            res.send(thePage);
            // or
            // res.send(page(userList(allUsers)));
        })
    // res.send(`hello express`);
});

app.get(`/todos`, (req, res) => {
    Todo.getAll()
        .then(allTodos => {
            res.send(allTodos);
        })
});

// Match the string "/users/" followed by one or more digits
// REGular EXpressions - REGEX
app.get('/users/:id([0-9]+)', (req, res) => {
// app.get('/users/:id(\\d+)', (req, res) => {
    console.log(req.params.id);
    User.getById(req.params.id)
        .then(theUser => {
            res.send(theUser);
        })
        // catch in this layer rather than within model layer
        .catch(err => {
            res.send({
                message: `no response`
            })
        })
});

app.get('/todos/:id([0-9]+)', (req,res) => {
    Todo.getById(req.params.id)
        .then(theTodo => {
            res.send(theTodo);
        })
});

app.get(`/users/register`, (req, res) => {
    res.send(`you are on the registration page`);
})

app.get(`/todos/users/:id([0-9]+)/pending`, (req, res) => {
    User.getById(req.params.id)
        .then(usertodo => {
            usertodo.getTodos()
            .then(result => {
                res.send(result);
            })
        })
});

// Listen for POST requests
app.post(`/users`, (req, res) => {
    // console.log(req.body)
    // res.send(`ok`);
    const newUsername = req.body.name;
    console.log(newUsername);
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});

// Updating an existing user
// Using Post because HTML Forms can only send GET or POST.
// HTML Form cannot send a PUT or DELETE
app.post(`/users/id/:id([0-9]+)`, (req,res) => {
    const id = req.params.id;
    const newName = req.body.name;
    console.log(newName);
    console.log(id);
    // res.send(`ok`);

    // Get the user by thier id
    User.getById(id)
        .then(theUser => {
            // call that user's updateName method
            theUser.updateName(newName)
                .then(result => {
                    if (result.rowCount === 1){
                        res.send(`success`);
                    } else {
                        res.send(`error`);
                    }
                })
        })
}); 

app.post(`/users/name/:name([A-Z0-9]+)`, (req,res) => {
    const id = req.params.name;
    const newName = req.body.name;
    console.log(newName);
    console.log(id);
    // res.send(`ok`);

    // Get the user by thier id
    User.searchByName(name)
        .then(theUser => {
            // call that user's updateName method
            theUser.updateName(newName)
                .then(result => {
                    if (result.rowCount === 1){
                        res.send(`success`);
                    } else {
                        res.send(`error`);
                    }
                })
        })
}); 


app.listen(3000, () => {
    console.log(`You're express app is ready`);
});

// Todo.getById(1)
//     .then(usertodo => {
//         usertodo.assignToUser(1)
//         .then(result => {
//             console.log(result);
//         })
//     })

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
//     // .catch(err => {
//     //     console.log(err);
//     // })
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

// Todo.markCompleted(2)
//     .then(result => {
//         console.log(result);
//     })

// Todo.getById(2)
//     .then(todo => {
//         todo.markCompleted(true);
    
//     })
//     .then(result => {
//         console.log(result);
//     })

// Todo.getById(2)
//     .then(todo => {
//         todo.markPending()
//             .then(result => {
//                 console.log(result);
//             })
//     })
// Todo.getById(2)
//     .then(todo => {
//         todo.updateName('buy new hyperdrive');
//     })
//     .then(result => {
//         console.log(result);
//     })

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

// Todo.deleteById(2);

