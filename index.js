
// pulls in a function from pg-promise
// so it's followed by ();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});

db.any('select * from todos')
    .then(results => {
        console.log(results);
    })