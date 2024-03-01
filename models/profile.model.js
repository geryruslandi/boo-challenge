const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mbti: {
    type: String,
    required: true,
  },
  enneagram: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  tritype: Number,
  socionics: {
    type: String,
    required: true,
  },
  sloan: {
    type: String,
    required: true,
  },
  psyche: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  temperaments: {
    type: String,
    required: true,
  },
  comments: [{
    creator_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    mbti: { type: String, required: true },
    enneagram: { type: String, required: true },
    zodiac: { type: String, required: true },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
    users_like: [{
      userId: { type: mongoose.Schema.Types.ObjectId, required: true }
    }],
    created_at: {
      type: mongoose.Schema.Types.Date,
      default: () => Date.now()
    }
  }]
})

const ProfileModel = mongoose.model('profiles', profileSchema)

module.exports = { ProfileModel }
