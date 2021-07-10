const express = require('express');
const router = express.Router();
const config = require('config');
const bycrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @router      POST /api/user
// @description Register a User
// @access      Public
router.post(
  '/',
  [
    check('userName', 'Name is requred').not().isEmpty(),
    check('password', 'Password is requred').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, userName, password } = req.body;
    try {
      // Making sure that user with same username doesnot exist

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Email is Already in use' }] });
      }
      let user = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ error: [{ msg: 'User Name is Taken' }] });
      }

      user = new User({
        email,
        userName,
        password,
      });

      // Encrypt the password
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(user.password, salt);

      // Save the user in Database
      await user.save();

      // login Token Prepration
      const paylode = {
        user: {
          id: user.id,
        },
      };
      // jwt Sign
      jwt.sign(
        paylode,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json(token);
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
