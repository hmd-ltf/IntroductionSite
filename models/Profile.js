const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  profilePic: {
    data: String,
  },
  name: {
    type: String,
  },
  briefSummary: {
    type: String,
  },

  work: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
    },
  ],
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
    },
  ],
  totalVisits: {
    type: Number,
    required: true,
    default: 0,
  },
  lastActiveTime: {
    type: Date,
    default: Date.now,
  },

  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
      },
    },
  ],
});

module.exports = Profile = mongoose.model('profile', profileSchema);
