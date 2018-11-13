require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');
app.use(session({
    store: new pgSession({
        pgPromise: db
    }),
    secret: 'abc123',
    saveUninitialized: false
}));

app.use(express.static(`public`));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


const Todo = require('./models/Todo');
const User = require('./models/User');
// const bcrypt = require('bcrypt');

const page = require(`./views/page`);
const userList = require(`./views/userList`);
const todoList = require(`./views/todoList`);
const userForm = require(`./views/userForm`);
const registerForm = require(`./views/registerForm`);
const loginForm = require(`./views/loginForm`);

// User.add('jimmy hendrix', 'jim', 'guitar')
//     .then(console.log)

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
app.get('/users/:id([0-9]+)/edit', (req, res) => {
// app.get('/users/:id(\\d+)', (req, res) => {
    console.log(req.params.id);
    User.getById(req.params.id)
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
        // catch in this layer rather than within model layer
        .catch(err => {
            res.send({
                message: `no response`
            })
        })
});

// User registration
// ------------------
app.get('/register' , (req, res) => {
    // signup form
    res.send(page(registerForm()));

});

app.post('/register' , (req, res) => {
    // process the signup form
        // Process the signup form
    // 1. Grab the values out of req.body
    const newName = req.body.name;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    console.log(newName);
    console.log(newUsername);
    console.log(newPassword);
    // 2. Call User.add
    User.add(newName, newUsername, newPassword)
        .then(newUser => {
            // 3. If that works, redirect to the welcome page
            req.session.user = newUser;
            res.redirect('/welcome');
        });

});
app.get('/welcome' , (req, res) => {
    // send them the welcom page
    console.log(req.session.user);
    const visitorName = `Person visiting`;
    if (req.session.user){
        visitorName = req.session.user.username;
    }
    res.send(page(`<h1>Hey ${visitorName} </h1>`));
});

// User login
// ----------
app.get('/login', (req, res) => {
    // Send them the login form
    const theForm = loginForm();
    const thePage = page(theForm);
    res.send(thePage);
});

app.post('/login', (req, res) => {
    // Process the login form
    // 1. Grab values from form
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    // 2. Find a user whose name
    // matches `theUsername`
    User.getByUsername(theUsername)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        .then(theUser => {
            // const didMatch = bcrypt.compareSync(thePassword, theUser.pwhash);
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.redirect('/welcome');
            } else {
                res.redirect('/login');
            }
        })
    // 3. If I find a. user
    // then, check to see if
    // the password matches

    // 4. 

});

// Logout
// ------
app.post(`/logout`, (req, res) => {
    // kill the session
    req.session.destroy();
    // redirect them to homepage
    res.redirect(`/`);

})

app.get('/users/:id([0-9]+)', (req, res) => {
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(theUser);
        })
        
});

// Retrieve all todos for a user
app.get('/users/:id([0-9]+)/todos', (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTodos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUL);
                    res.send(thePage);
                })
        })
});

app.get('/todos/:id([0-9]+)', (req,res) => {
    Todo.getById(req.params.id)
        .then(theTodo => {
            res.send(theTodo);
        })
});

// app.get(`/users/register`, (req, res) => {
//     res.send(`you are on the registration page`);
// })

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
app.post(`/users/:id([0-9]+)/edit`, (req,res) => {
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
                        // res.redirect(`/users/${id}/edit`);
                        res.redirect(`/users/`);
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

