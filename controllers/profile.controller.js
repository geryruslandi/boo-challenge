const { body, validationResult, param } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { mbti, enneagram, zodiac } = require("../enums/common.enum");
const { default: mongoose } = require("mongoose");

const showValidation = [
  param('id').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("id is incorrect")
    }
    return true
  }),
]

const show = [
  ...showValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.notValidated(errors.array()[0].msg);
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

const storeValidation = [
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('mbti')
    .isString()
    .isIn(mbti)
    .notEmpty(),
  body('enneagram')
    .isString()
    .isIn(enneagram)
    .notEmpty(),
  body('variant').isString().notEmpty(),
  body('tritype').isNumeric().notEmpty(),
  body('socionics').isString().notEmpty(),
  body('sloan').isString().notEmpty(),
  body('psyche').isString().notEmpty(),
  body('image').isURL().notEmpty(),
  body('temperaments').isString().notEmpty(),
]

const store = [
  ...storeValidation,
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
      temperaments: req.body.temperaments,
    })

    res.ok({
      profile: newProfile
    })
  }
]

const postCommentValidation = [
  param('profileId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("id is incorrect")
    }
    return true
  }),
  body('title').isString().notEmpty(),
  body('mbti').isString().isIn(mbti).notEmpty(),
  body('enneagram').isString().isIn(enneagram).notEmpty(),
  body('zodiac').isString().isIn(zodiac).notEmpty(),
  body('comment').isString().notEmpty(),
]

const postComment = [
  ...postCommentValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.notValidated(errors.array());
    }

    const profile = await ProfileModel.where({ _id: req.params.profileId }).findOne()

    if (!profile) {
      return res.notValidated("profile not found")
    }

    profile.comments.push({
      title: req.body.title,
      mbti: req.body.mbti,
      enneagram: req.body.enneagram,
      zodiac: req.body.zodiac,
      comment: req.body.comment,
    })

    await profile.save()

    res.ok(profile)
  }
]

module.exports = { store, show, postComment }
