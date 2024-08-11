const express =require('express')

const router =express.Router()
const eventcontroller =require('../controllers/eventController')


// Route for creating a new event
router.post('/events', eventcontroller.createEvent);

// Route for getting all events
router.get('/events', eventcontroller.getEvents);


// router.get('/events/:id', eventcontroller.getEvents);

// Route for updating an event by ID
router.put('/events', eventcontroller.updateEvent)

// Route for deleting an event by ID
router.delete('/events/:id',eventcontroller.deleteEvent)


module.exports =router