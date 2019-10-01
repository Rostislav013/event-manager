const express = require('express')

const EventCtrl = require('../e-controllers/event-ctrl')

const router = express.Router()

router.post('/dashboard/event', EventCtrl.createEvent) // changed
router.put('/event/:id', EventCtrl.updateEvent)
router.delete('/event/:id', EventCtrl.deleteEvent)
router.get('/event/:id', EventCtrl.getEventById)
router.get('/events', EventCtrl.getEvents)

module.exports = router
