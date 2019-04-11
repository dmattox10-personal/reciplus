const jwt = require('jsonwebtoken');
const secret = './config/jwtConfig.js';

const checkAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        // Do stuff here?
        next();
      }
    });
  }
}

module.exports = checkAuth;