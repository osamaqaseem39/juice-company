const jwt = require('jsonwebtoken');

const graphqlAuth = async (req) => {
  try {
    // Check for token in both authorization and x-auth-token headers
    const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-auth-token'];
    
    if (!token) {
      return { user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return { user: decoded };
  } catch (error) {
    console.error('GraphQL Auth Error:', error.message);
    return { user: null };
  }
};

module.exports = graphqlAuth; 