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
    title: String,
    mbti: String,
    enneagram: String,
    zodiac: String,
    comment: String,
  }]
})

const ProfileModel = mongoose.model('profile', profileSchema)

module.exports = { ProfileModel }
