const db = require('./db');

class Todo {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
    
    // CREATE
    static add(name, completed) {
        return db.one(`insert into todos (name, completed)
            values
                ($1, $2)
            returning id
        `, [name, completed]) 
    }

    // RETRIEVE
    static getAll() {
        return db.any('select * from todos').then(todoArray => {
            let instanceArray = todoArray.map(todoObj => {
                let u = new Todo(todoObj.id, todoObj.name, todoObj.completed);
                return u;
            });
            return instanceArray;
        })
    }

    static getById(id){
        return db.one(`select * from todos where id = $1`, [id])
            .then(result => {
                const u = new Todo(result.id, result.name, result.completed)
                return u;
            })
    }

    // UPDATE
    assignToUser(userId) {
        return db.result(`
            update todos
                set user_id = $2
            where id = $1
            `, [this.id, userId]);
    }

    updateName(name) {
        return db.result(`update todos
                            set name=$2
                            where id=$1`, [this.id, name]);
    }

    updateCompleted(didComplete) {
        return db.result(`update todos 
                            set completed=$2 
                            where id=$1`, [this.id, didComplete]);
    }
    
    markCompleted() {
        return this.updateCompleted(true);
    }

    markPending() {
        return this.updateCompleted(false);
    }

    // DELETE
    delete() {
        return db.result(`delete from users where id = $1`, [this.id]);
    }
    
    static deleteById(id){
        return db.result(`delete from todos where id = $1`, [id]);
    }

    
}


// CREATE
// example of adding a row
// function add(name, completed) {
//     return db.one(`insert into todos (name, completed)
//         values
//             ($1, $2)
//         returning id
//     `, [name, completed]) 
// }

// RETRIEVE
// example of grabbing all the rows
// function getAll() {
//     return db.any('select * from todos')
// }

// example of grabbing one row
// function getById(id){
//     return db.one(`select * from todos where id = $1`, [id])
//         .catch(err => {
//             // got nuthin
//             return {
//                 name: 'no todo found'
//             };
//         })
// }

// UPDATE
// function assignToUser(todoId, userId) {
//     return db.result(`
//         update todos
//             set user_id = $2
//         where id = $1
//         `, [todoId, userId]);
// }

// example of updating a row
// function updateName(id, name) {
//     return db.result(`update todos
//                         set name=$2
//                         where id=$1`, [id, name]);
// }


// function updateCompleted(id, didComplete) {
//     return db.result(`update todos 
// 	                    set completed=$2 
// 	                    where id=$1`, [id, didComplete]);
// }

// example of updating a row
// function markCompleted(id) {
//     return updateCompleted(id, true);
//     // return db.result(`update todos 
// 	//                     set completed=$2 
// 	//                     where id=$1`, [id, true]);
// }
// function markPending(id) {
//     return updateCompleted(id, false);
//     // return db.result(`update todos 
//     //                     set completed=$2 
//     //                     where id=$1`, [id, false]);
// }

// DELETE
// example of deleting a row
// function deleteById(id){
//     return db.result(`delete from todos where id = $1`, [id]);
// }

module.exports = Todo;
// module.exports = {
//     add,
//     assignToUser,
//     getAll,
//     getById,
//     updateName,
//     markCompleted,
//     markPending,
//     deleteById,
// };