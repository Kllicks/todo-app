const db = require('./db');

// declare a class named "User"
class User {
    // what properties should
    // a user start off with?
    // `constructor` is a method
    // that is automatically
    // called when you create a user
    constructor(id, name) {
        // define properties that
        // are also the names
        // of the database columns
        this.id = id;
        this.name = name;
    }
    
    // CREATE

    static add(name) {
        return db.one(`
            insert into users 
                (name)
            values
                ($1)
            returning id
            `, [name])
            .then(data => {
                const u = new User(data.id, name);
                return u;
            })
    }

    // RETRIEVE

    static getById(id){
        return db.one(`select * from users where id = $1`, [id])
            .then(result => {
                const u = new User(result.id, result.name);
                return u;
            })
    }

    static searchByName(name) {
        return db.any(`
            select * from users 
                where name ilike '%$1:raw%'
                `, [name])
    }
    
    getTodos() {
        return db.any(`select * from todos where user_id = $1`, [this.id])
    }

    static getAll() {
        return db.any(`select * from users
                        `).then(userArray => {
                            // transform array of objects
                            // into array of User instances
                            let instanceArray = userArray.map(userObj => {
                                let u = new User(userObj.id, userObj.name);
                                return u;
                            });
                            return instanceArray;
                        })
    }

    // UPDATE

    updateName(newName) {
        this.name = newName;
        return db.result(`update users
                            set name=$2
                            where id=$
                            `, [this.id, newName]);
    }

    // DELETE
    delete() {
        return db.result(`delete from users where id = $1`, [this.id]);
    }

    static deleteById(id){
        return db.result(`delete from users where id = $1`, [id])
        // .then(result => {
        //     if (result.rowCount === 0) {
        //         return {
        //             message: 'no row exists'
        //         }
        //     }
        // })
        // .catch(err => {
        //     return {
        //         message: 'error'
        //     }
        // })
    }
    // greet(otherUser) {
    //     console.log(`hello ${otherUser}, I am ${this.name}`);
    // }
}


// CREATE
// -------
// function add(name) {
//     return db.one(`insert into users (name)
//         values
//             ($1)
//         returning id
//     `, [name]) 
// }

// RETRIEVE
// --------
// function getAll() {
//     return db.any('select * from users')
// }
// function getAll() {
//     return db.any(`select
//                         users.id,
//                         users.name,
//                         t.name as todo,
//                         t.completed as completed
//                     from
//                         users
//                         left join todos t
//                         on users.id = t.user_id`);
// }



// function getById(id){
//     return db.one(`select * from users where id = $1`, [id]);
// }

// function getTodosForUser(id) {
//     return db.any(`select * from todos where user_id = $1`, [id]);
// }

// UPDATE
// ------
// function updateName(id, name) {
//     return db.result(`update users
//                         set name=$2
//                         where id=$1`, [id, name]);
// }

// DELETE
// ------
// function deleteById(id){
//     return db.result(`delete from users where id = $1`, [id]);
// }

// Export
// ------

module.exports = User;
// module.exports = {
//     add,
//     getAll,
//     getById, 
//     updateName,
//     getTodosForUser,
//     deleteById,
//     User
// };