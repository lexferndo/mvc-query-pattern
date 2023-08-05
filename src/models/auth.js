const pool =  require('../config/database.js')

const newRegist = (body) => {
    const SQLQuery = `INSERT INTO users
                      VALUES ('${body.id}','${body.email}','${body.gender}','${body.hashPassword}', '${body.role}')`

    return pool.query(SQLQuery)
}

const loginUser = (body) => {
    const SQLQuery = `SELECT * FROM users WHERE email=${body.email}`

    return pool.query(SQLQuery)
}

const authenticationUser = (body) => {
    const SQLQuery = `SELECT * FROM users WHERE id=${body.id}`

    return pool.query(SQLQuery)
}

module.exports={
    newRegist,
    loginUser,
    authenticationUser
}