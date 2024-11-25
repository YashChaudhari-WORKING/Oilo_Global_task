// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated Token:', token); 
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getdeatils= async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('eventsRSVP');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const rsvpEvents = user.eventsRSVP;  
      res.json(rsvpEvents);
    } catch (error) {
      console.error('Error fetching RSVP events:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  const getcreatedevent= async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('eventsCreated');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const createdevent = user.eventsCreated;  
      res.json(createdevent);
    } catch (error) {
      console.error('Error fetching RSVP events:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  
  


module.exports = { signup , login,getdeatils ,getcreatedevent };
