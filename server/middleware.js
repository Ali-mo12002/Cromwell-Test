const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';  // Token expiration time 

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // Create and sign a new token
  },

  authMiddleware: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization; // Extract token from request
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // Verify the token's validity
      req.user = data;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  },
};
