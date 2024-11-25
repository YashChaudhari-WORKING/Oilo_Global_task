// routes/eventRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createEvent ,getEventDetails,rsvpEvent,getAllEvents,updateEvent,deleteEvent,inviteToEvent,getNotifications} = require('../controllers/eventController');
const router = express.Router();


router.post('/create', authMiddleware, createEvent);
router.get('/:id', authMiddleware, getEventDetails);
router.post('/:id/rsvp', authMiddleware, rsvpEvent);
router.get('/', authMiddleware, getAllEvents);
router.put('/update/:eventId', authMiddleware, updateEvent);
router.delete('/delete/:eventId', authMiddleware, deleteEvent);
router.post('/invite/:eventId', authMiddleware, inviteToEvent);


module.exports = router;
