const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route   GET api/profile
// @desc    GET the profile of all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/:id
// @desc    GET the profile of one user by profile id
// @access  Public
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    if (profile.id != req.user.id) {
      // When Someone else visits profile
      profile.totalVisits = profile.totalVisits + 1;
    }
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/me
// @desc    GET the profile of one user who is logged in
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Update the profile of one user
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, profilePic, briefSummary } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (name) {
      profile.name = name;
    }
    if (profilePic) {
      profile.profilePic = profilePic;
    }
    if (briefSummary) {
      profile.briefSummary = briefSummary;
    }
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/work
// @desc    put a new Work Experiance
// @access  Private
router.put(
  '/work',
  [
    auth,
    check('title', 'What you did? Title is Required').not().isEmpty(),
    check('company', 'Where did you? Company is Required').not().isEmpty(),
    check('from', 'When did you Start working pick a date').isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.work.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/profile/work/:exp_id
// @desc    Delete a Work Experiance with its id
// @access  Private
router.delete(
  '/work/:exp_id',
  [auth, checkObjectId('exp_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.work = profile.work.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/profile/education
// @desc    put a new Education
// @access  Private
router.put(
  '/education',
  [
    auth,
    check('institution', 'Where did you Study? Institution is Required')
      .not()
      .isEmpty(),
    check('from', 'When did you Start studying? Pick a date').isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/profile/education/:edu_id
// @desc    Delete a Work Experiance with its id
// @access  Private
router.delete(
  '/education/:edu_id',
  [auth, checkObjectId('edu_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education = profile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/profile/message/:id
// @desc    POST a message for user
// @access  Public
router.post(
  '/message/id',
  [
    checkObjectId('id'),
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    check('message', 'What is The Message').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findById(req.params.id);

      profile.messages.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/profile/message/:msg_id
// @desc    User can delete a message
// @access  Private
router.delete(
  '/message/:msg_id',
  [auth, checkObjectId('msg_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.messages = profile.messages.filter(
        (msg) => msg._id.toString() !== req.params.msg_id
      );

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/profile/lastactive/:id
// @desc    Update the profile for last active time
// @access  Private
router.post('/lastactive', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    profile.lastActiveTime = Date.now();

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
