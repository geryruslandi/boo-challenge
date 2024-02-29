const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  description: String,
  mbti: String,
  enneagram: String,
  variant: String,
  tritype: Number,
  socionics: String,
  sloan: String,
  psyche: String,
  image: String,
})

const ProfileModel = mongoose.model('profile', profileSchema)

module.exports = { ProfileModel }
