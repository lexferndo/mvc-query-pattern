const modelUsers = require('../models/users.js')

const pool =  require('../config/database.js')

const getAllUsers = async (request, response) => {
    try {
        const data = await modelUsers.getAllUsers()

        response.status(200).json({
            message: 'Get All Users Success',
            data: data.rows,
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getUsersLimit = async (request, response) => {
    try {
        let{ page, limit } = request.query

        page = +page || DEFAULT_PAGE
        limit = +limit || DEFAULT_LIMIT
        let itemPerPage = (page - 1) * limit

        const data = await modelUsers.getUsersLimit(limit, itemPerPage)

        response.status(200).json({
            message: 'Get Users Success',
            data: data.rows
        })
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getUserbyID = async (request, response) => {
    const { id } = request.params
    
    try {
        const data = await modelUsers.getUserbyID(id)

        response.status(200).json({
            message: 'Get User Success',
            data: data.rows
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const createUser = async (request, response) => {
    const {body} = request

    try {
        await modelUsers.createUser(body)

        response.status(200).json({
            message: 'Create New User Success',
            data: body
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateUser = async (request, response) => {
    const {id} = request.params
    const {body} = request

    try {
        await modelUsers.createUser(body, id)

        response.status(201).json({
            message: 'UPDATE User Success',
            data: {
                id: id,
                ...body
            }
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const deleteUser = async (request, response) => {
    const {id} = request.params

    try {
        await modelUsers.deleteUser(id)

        response.json({
            message: 'DELETE User Success',
            data: null
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllUsers,
    getUsersLimit,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
}