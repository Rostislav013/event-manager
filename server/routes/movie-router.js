const express = require('express')

const MovieCtrl = require('../e-controllers/movie-ctrl')

const router = express.Router()

router.post('/dashboard/movie', MovieCtrl.createMovie) // changed
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)

module.exports = router