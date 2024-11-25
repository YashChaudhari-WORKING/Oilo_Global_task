const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');


const createEvent = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const newEvent = new Event({
        ...req.body,
        creator: userId  
      });
      const savedEvent = await newEvent.save();
      const user = await User.findById(userId);
      if (user) {
        if (!user.eventsCreated.includes(savedEvent._id)) {
          user.eventsCreated.push(savedEvent._id);
          await user.save();
        }
      }
      return res.status(201).json({
        message: 'Event created successfully',
        event: savedEvent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating event',
        error: error.message,
      });
    }
  };


const getEventDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id)
        .populate('attendees', 'name profilePicture') 
        .populate('creator', 'name email'); 
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
      }
  
      res.status(200).json({ event });
    } catch (error) {
      console.error('Error fetching event details:', error.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  





  const rsvpEvent = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const { id: eventId } = req.params ;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
      }
  
      if (event.eventType === 'Private' && !event.invitedUsers.includes(userId)) {
        return res.status(403).json({ message: 'You are not invited to this private event.' });
      }
  
      if (event.attendees.includes(userId)) {
        return res.status(400).json({ message: 'You have already RSVP’d to this event.' });
      }
  
      event.attendees.push(userId);
      await event.save();
  
      const user = await User.findById(userId);
      if (user) {
        if (!user.eventsRSVP.includes(eventId)) {
          user.eventsRSVP.push(eventId);
          await user.save();
        }
      }
  
      console.log('User ID:', userId);
  
      res.status(200).json({ message: 'RSVP successful!', attendees: event.attendees });
    } catch (error) {
      console.error('Error during RSVP:', error.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };


  const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find({ eventType: 'Public' })
        .sort({ date: 1 }) 
        .exec();
  
      if (events.length === 0) {
        return res.status(404).json({ message: 'No public events found' });
      }
  
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };





  const updateEvent = async (req, res) => {
    const { eventId } = req.params; 
    const userId = req.user.userId; 
    const updateData = req.body; 
  
    try {
      const event = await Event.findById(eventId);
        if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.creator.toString() !== userId) {
        return res.status(403).json({ message: 'Access denied. Only the creator can update this event.' });
      }
  
      Object.assign(event, updateData);
  
      const updatedEvent = await event.save();
  
      if (event.attendees && event.attendees.length > 0) {
        await Notification.deleteMany({ eventId: updatedEvent._id });
  
        const notifications = event.attendees
          .filter((attendee) => attendee.toString() !== userId) 
          .map((attendee) => ({
            userId: attendee,
            eventId: updatedEvent._id,
            message: `The details of the event '${updatedEvent.title}' have been updated. Please check the event for more information.`,
            isRead: false,
          }));
  
        if (notifications.length > 0) {
          await Notification.insertMany(notifications);
        }
      }
  
      return res.status(200).json({
        message: 'Event updated successfully and notifications sent to attendees.',
        event: updatedEvent,
      });
    } catch (error) {
      console.error('Error updating event and sending notifications:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  




  const getNotifications = async (req, res) => {
    try {
      const userId = req.user.userId; 
    console.log("-------------"+userId);
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      const notifications = await Notification.find({ userId });
  
      if (notifications.length === 0) {
        return res.status(404).json({ message: 'No notifications found.' });
      }
  
      return res.status(200).json({ message: 'Notifications fetched successfully.', notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
 



  const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.userId; 
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.creator.toString() !== userId) {
        return res.status(403).json({ message: 'Access denied. Only the creator can delete this event.' });
      }
  
      await event.deleteOne();
  
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };





  const inviteToEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body; 
    const creatorId = req.user.userId; 
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.eventType !== 'Private') {
        return res.status(400).json({ message: 'Invitations can only be sent for private events.' });
      }
  
      if (event.creator.toString() !== creatorId) {
        return res.status(403).json({ message: 'Access denied. Only the creator can invite users.' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User to invite not found.' });
      }
  
      if (event.attendees.includes(userId)) {
        return res.status(400).json({ message: 'User is already an attendee.' });
      }
  
      event.attendees.push(userId);
      await event.save();
  
      return res.status(200).json({ message: 'User successfully invited to the event.' });
    } catch (error) {
      console.error('Error inviting user to event:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };









 











module.exports = { createEvent ,getEventDetails,rsvpEvent,getAllEvents,updateEvent,deleteEvent,inviteToEvent,getNotifications};
