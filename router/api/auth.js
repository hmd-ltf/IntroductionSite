const express = require('express');
const { check, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route    GET api/auth
// @desc     Get USER by Token (login)
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router      POST /api/auth
// @description Autherize  a User and get Token Login
// @access      Public
router.post(
  '/',
  [
    check('email', 'Valid Email is requred').isEmail(),
    check('password', 'Password is requred').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Making sure that user with same username doesnot exist

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }

      // Match Password
      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }
      // Return A valid Json Web Token

      const paylode = {
        user: {
          id: user.id,
        },
      };
      // jwt Sign
      jwt.sign(paylode, jwtSecret, { expiresIn: 36000 }, (error, token) => {
        if (error) {
          throw error;
        }
        res.json(token);
      });

      //
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
