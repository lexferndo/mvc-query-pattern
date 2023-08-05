const { verifyToken } = require('../../lib/jwt.js')
const pool = require('../config/database.js')
const authenUser = require('../models/auth.js')

const authentication = async(req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1]

        const { id, email, role } = verifyToken(accessToken)

        const data = await authenUser.authenticationUser({id})

        if(data.rows.length === 0){
            throw { name: "Unauthenticated"}
        }else{
            const foundUser = data.rows[0]

            req.logUser = {
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role
            }
            
            next()
        }
        
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const authorization = (req, res, next) => {

}

module.exports = {
    authentication,
    authorization
}