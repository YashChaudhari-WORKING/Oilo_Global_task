const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); 
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message); 
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
