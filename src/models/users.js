const pool =  require('../config/database.js')

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users'

    return pool.query(SQLQuery)
}

const getUsersLimit = (page, limit) => {
    const SQLQuery = `SELECT * FROM users LIMIT ${page} OFFSET ${limit}`

    return pool.query(SQLQuery)
}

const getUserbyID = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE id=${id}`

    return pool.query(SQLQuery)
}

const createUser= (body) => {
    const SQLQuery = `INSERT INTO users
                      VALUES ('${body.id}','${body.email}','${body.gender}','${body.password}', '${body.role}')`

    return pool.query(SQLQuery)
}

const updateUser =(body, id) =>{
    // const SQLQuery = `UPDATE users
    //                   SET title = '${body.email}','${body.gender}','${body.password}', '${body.role}'
    //                   WHERE id = '${id}'`

    const SQLQuery = `IF EXISTS
                        (SELECT * FROM users WHERE id=${id}
                      BEGIN
                        UPDATE users
                          SET title = '${body.email}','${body.gender}','${body.password}', '${body.role}'
                          WHERE id = '${id}
                      END ELSE
                      BEGIN
                        INSERT INTO movies
                          VALUES ('${body.id}','${body.email}','${body.gender}','${body.password}', '${body.role}
                      END
                      GO`

    return pool.query(SQLQuery)
}

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM users WHERE id=${id}`

    return pool.query(SQLQuery)
}

module.exports = {
    getAllUsers,
    getUsersLimit,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
}