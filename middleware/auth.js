const config = require('config');
const jwtSecret = config.get('jwtSecret');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header('x-auth-token');

  //   check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'Unvalid Token' });
  }

  //   Varify Token now that it exists
  try {
    const decodedToken = jwt.verify(token, jwtSecret);

    // Put the decoded user in req
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: 'Unvalid Token' });
  }
};
