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

// RETRIEVE
// example of grabbing all the rows
function getAll() {
    return db.any('select * from todos')
}

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

// UPDATE
function updateName(id, name) {
    return db.result(`update todos
                        set name=$2
                        where id=$1`, [id, name]);
}


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

// DELETE
// example of deleting a row
function deleteById(id){
    return db.result(`delete from todos where id = $1`, [id]);
}


module.exports = {
    add,
    getAll,
    getById,
    updateName,
    markCompleted,
    markPending,
    deleteById,
};