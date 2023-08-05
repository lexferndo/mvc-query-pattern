const modelMovies = require('../models/movies.js')
const express = require('express')
const pool =  require('../config/database.js')
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const getAllMovies = async (request, response) => {
    try {
        const data = await modelMovies.getAllMovies()

        response.status(200).json({
            message: 'Get All Movies Success',
            data: data.rows,
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getMoviesLimit = async (request, response) => {
    try {
        let{ page, limit } = request.query

        page = +page || DEFAULT_PAGE
        limit = +limit || DEFAULT_LIMIT
        let itemPerPage = (page - 1) * limit

        const data = await modelMovies.getMoviesLimit(limit, itemPerPage)

        response.status(200).json({
            message: 'Get Movies Success',
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

const getMoviebyID = async (request, response) => {
    const { id } = request.params
    
    try {
        const data = await modelMovies.getMoviebyID(id)

        response.status(200).json({
            message: 'Get Movie Success',
            data: data.rows
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const createMovie = async (request, response) => {
    const {body} = request

    try {
        await modelMovies.createMovie(body)

        response.status(200).json({
            message: 'Create New Movie Success',
            data: body
        })
    } catch (error) {
        response.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateMovie = async (request, response) => {
    const {id} = request.params
    const {body} = request

    try {
        await modelMovies.createMovie(body, id)

        response.status(201).json({
            message: 'Update & Create Movie Success',
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

const deleteMovie = async (request, response) => {
    const {id} = request.params

    try {
        await modelMovies.deleteMovie(id)

        response.json({
            message: 'Delete Movie Success',
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
    getAllMovies,
    getMoviesLimit,
    getMoviebyID,
    createMovie,
    updateMovie,
    deleteMovie
}