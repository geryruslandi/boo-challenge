const { postComment, toggleLike } = require("../../services/comment.service");
const { connectDb, resetDb, disconnectDb } = require("../utils/db");
const { ProfileModel } = require("../../models/profile.model");
const { UserModel } = require("../../models/user.model");
const { default: mongoose } = require("mongoose");

describe("comments.service.js - test", () => {

  let profileId;
  let creator;

  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(async () => {
    await resetDb()

    creator = await UserModel.create({ name: "gery" })
    const profile = await ProfileModel.create({
      "name": "Gery",
      "description": "BOO gery's profile",
      "mbti": "ISFJ",
      "enneagram": "1w2",
      "variant": "sp/so",
      "tritype": 725,
      "socionics": "SEE",
      "sloan": "RCOEN",
      "psyche": "FEVL",
      "image": "https://soulverse.boo.world/images/1.png",
      "temperaments": "Phelgmatic",
    })

    profileId = new mongoose.Types.ObjectId(profile.id)
  })

  it("can post comment", async () => {
    const comments = await postComment(
      profileId,
      {
        "title": "titles 3",
        "zodiac": "Aries",
        "mbti": "INFJ",
        "enneagram": "2w3",
        "comment": "test comment 3"
      },
      creator,
    )

    expect(comments).toBeTruthy()
  })

  it("can toggle like", async () => {
    const profile = await postComment(
      profileId,
      {
        "title": "titles 3",
        "zodiac": "Aries",
        "mbti": "INFJ",
        "enneagram": "2w3",
        "comment": "test comment 3"
      },
      creator,
    )

    const comment = profile.comments[0]

    await toggleLike(profileId, comment._id, creator)

    const afterLikeProfile = await ProfileModel.findById(profileId)

    expect(afterLikeProfile.comments[0].likes).toBe(1)
  })

  it("can toggle unlike", async () => {
    const profile = await postComment(
      profileId,
      {
        "title": "titles 3",
        "zodiac": "Aries",
        "mbti": "INFJ",
        "enneagram": "2w3",
        "comment": "test comment 3"
      },
      creator,
    )

    const comment = profile.comments[0]

    await toggleLike(profileId, comment._id, creator)

    await toggleLike(profileId, comment._id, creator)

    const afterLikeProfile = await ProfileModel.findById(profileId)

    expect(afterLikeProfile.comments[0].likes).toBe(0)
  })
})
