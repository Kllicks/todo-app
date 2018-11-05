
// pulls in a function from pg-promise
// so it's followed by ();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});

// CREATE
// example of adding a row
function add(name, completed) {
    return db.one(`insert into todos (name, completed)
        values
            ($1, $2)
        returning id
    `, [name, completed]) 
}
// add('walk chewbacca', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })

// RETRIEVE
// example of grabbing all the rows
function getAll() {
    return db.any('select * from todos')
}
// getAll()
//     .then(results => {
//         console.log(results);
//         console.log('those were the todos');
//     })

// example of grabbing one row
function getById(id){
    return db.one(`select * from todos where id = $1`, [id])
        .catch(err => {
            // got nuthin
            return {
                name: 'no todo found'
            };
        })
}
// getById(2)
//     .then(result => {
//         console.log(result);
//     })
// getById(200000)
//     .then(result => {
//         console.log(result);
//     })

// UPDATE
function updateName(id, name) {
    return db.result(`update todos
                        set name=$2
                        where id=$1`, [id, name]);
}

updateName(2, 'buy new hyperdrive')
    .then(result => {
        console.log(result);
    })

function updateCompleted(id, didComplete) {
    return db.result(`update todos 
	                    set completed=$2 
	                    where id=$1`, [id, didComplete]);
}
// example of updating a row
function markCompleted(id) {
    return updateCompleted(id, true);
    // return db.result(`update todos 
	//                     set completed=$2 
	//                     where id=$1`, [id, true]);
}
function markPending(id) {
    return updateCompleted(id, false);
    // return db.result(`update todos 
    //                     set completed=$2 
    //                     where id=$1`, [id, false]);
}

// markPending(1)
//     .then(result => {
//         console.log(result);
//     })



// DELETE
// example of deleting a row
function deleteById(id){
    return db.result(`delete from todos where id = $1`, [id])
        
}
// deleteById(10)
//     .then(result => {
//         console.log(result.rowCount);
//     })

