const express = require('express')

const MovieCtrl = require('../e-controllers/movie-ctrl')

const router = express.Router()

router.post('/dashboard2/event', MovieCtrl.createMovie) // changed
router.put('/event/:id', MovieCtrl.updateMovie)
router.delete('/event/:id', MovieCtrl.deleteMovie)
router.get('/event/:id', MovieCtrl.getMovieById)
router.get('/events', MovieCtrl.getMovies)

module.exports = router
