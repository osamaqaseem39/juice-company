const jwt = require('jsonwebtoken');

const graphqlAuth = async (req) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return { user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return { user: decoded };
  } catch (error) {
    return { user: null };
  }
};

module.exports = graphqlAuth; 