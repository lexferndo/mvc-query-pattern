const express = require('express')
const MoviesController = require('../controller/movies.js')
const router = express.Router()

router.get('/', MoviesController.getAllMovies)
router.get('/pagination', MoviesController.getMoviesLimit)
router.get('/:id', MoviesController.getMoviebyID)
router.post('/', MoviesController.createMovie)
router.put('/:id', MoviesController.updateMovie)
router.delete('/:id', MoviesController.deleteMovie)

module.exports = router