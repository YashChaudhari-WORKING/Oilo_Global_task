const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, login,getdeatils,getcreatedevent } = require('../controllers/userController');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/gets',authMiddleware,getdeatils);
router.get('/getcE',authMiddleware,getcreatedevent);
router.get('/notifications', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; 
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
      }
  
      const notifications = await Notification.find({ userId });
  
      if (notifications.length === 0) {
        return res.status(404).json({ message: 'No notifications found.' });
      }
  
      res.status(200).json({ message: 'Notifications fetched successfully.', notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });

module.exports = router;
