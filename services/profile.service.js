const { ValidationError } = require("../exceptions/validation-error.exception")
const { ProfileModel } = require("../models/profile.model")

const getProfile = async (profileId) => {
  const profile = await ProfileModel.where({ _id: profileId }).findOne()

  if (profile == null) {
    throw new ValidationError("Profile not found")
  }

  return profile
}

const createProfile = (profileDto) => {
  return ProfileModel.create({
    name: profileDto.name,
    description: profileDto.description,
    mbti: profileDto.mbti,
    enneagram: profileDto.enneagram,
    variant: profileDto.variant,
    tritype: profileDto.tritype,
    socionics: profileDto.socionics,
    sloan: profileDto.sloan,
    psyche: profileDto.psyche,
    image: profileDto.image,
    temperaments: profileDto.temperaments,
  })
}

module.exports = { getProfile, createProfile }
