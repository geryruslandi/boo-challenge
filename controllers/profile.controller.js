const { validationResult } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { showValidation, storeValidation } = require("./profile.validation");

const show = [
  ...showValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

    const profile = await ProfileModel.where({ _id: req.params.id }).findOne()

    if (profile == null) {
      return res.notFound("Profile not found")
    }

    res.render('profile_template', {
      profile,
    });
  }
];

const store = [
  ...storeValidation,
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

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
      temperaments: req.body.temperaments,
    })

    res.ok({
      profile: newProfile
    })
  }
]

module.exports = { store, show }
