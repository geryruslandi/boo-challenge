const { validationResult } = require("express-validator");
const { showValidation, storeValidation } = require("./profile.validation");
const { getProfile, createProfile } = require("../services/profile.service");
const { asyncHandler } = require("../middlewares/async-handler.middleware");

const show = [
  ...showValidation,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const profile = await getProfile(req.params.id)

      res.render('profile_template', {
        profile,
      });
    }
  ),
];

const store = [
  ...storeValidation,
  asyncHandler(
    async (req, res) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const newProfile = await createProfile(req.body)

      res.ok({
        profile: newProfile
      })
    }
  ),
]

module.exports = { store, show }
