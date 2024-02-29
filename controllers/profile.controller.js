const { body, validationResult, param } = require("express-validator");
const { ProfileModel } = require("../models/profile.model")

const show = [
  param('id').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("id is incorrect")
    }
    return true
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.notValidated(errors.array());
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
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('mbti').isString().notEmpty(),
  body('enneagram').isString().notEmpty(),
  body('variant').isString().notEmpty(),
  body('tritype').isNumeric().notEmpty(),
  body('socionics').isString().notEmpty(),
  body('sloan').isString().notEmpty(),
  body('psyche').isString().notEmpty(),
  body('image').isURL().notEmpty(),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.notValidated(errors.array());
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
    })

    res.ok({
      profile: newProfile
    })
  }
]

module.exports = { store, show }
