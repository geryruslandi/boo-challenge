const { ProfileModel } = require("../models/profile.model")

const show = async (req, res) => {
  const profile = await ProfileModel.findById(req.params.id)

  if (profile == null) {
    return res.notFound("Profile not found")
  }

  res.render('profile_template', {
    profile,
  });
}

const store = async (req, res) => {
  const newProfile = await ProfileModel.create({
    name: req.body.name,
    description: req.body.description,
    mbti: req.body.mbti,
    enneagram: req.body.enneagram,
    variant: req.body.variant,
    tritype: req.body.tritype,
    socionics: req.body.socionics,
    sloan: req.body.sloan,
    psyche: req.body.psyche,
    image: req.body.image,
  })

  res.ok({
    profile: newProfile
  })
}

module.exports = { store, show }
