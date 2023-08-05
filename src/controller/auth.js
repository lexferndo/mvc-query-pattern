const express = require('express')
const modelAuth = require('../models/auth.js')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const { generateToken } = require('../../lib/jwt.js')


const newRegist = async (request, response) => {
    const {id, email, gender, password, role} = request.body
    const hashPassword = bcrypt.hashSync(password, salt)

    try {
        await modelAuth.newRegist({id, email, gender, hashPassword, role})
        response.status(200).json({
            message: 'Create New User Success',
            data: {
                id: id,
                email: email,
                gender: gender,
                password:hashPassword,
                role: role
            }
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const loginUser = async (request, response) => {
    const { email, password } = request.body

    try {
        const data = await modelAuth.loginUser({email})
        
        if(data.rows.length === 0){
            throw { name: "Error Not Found"}
        }else{
            const user = data.rows[0]
            const isValid = bcrypt.compareSync(password, user.password)

            if(isValid){
                const accessToken = generateToken({
                    id: user.id,
                    email: user.email,
                    gender: user.gender,
                    role: user.role
                })
                
                response.status(200).json({
                    message: "Login Successfully",
                    accessToken
                })
            }else{
                throw { name: "Login Unsuccesfully"}
            }
            
        }
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    newRegist,
    loginUser
}