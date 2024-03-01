const { connectDb, resetDb, disconnectDb } = require("../utils/db");
const request = require('supertest');
const { server } = require('../../server');
const { ProfileModel } = require("../../models/profile.model");
const { UserModel } = require("../../models/user.model");
const { sortValue, enneagram, mbti, zodiac } = require("../../enums/common.enum");

describe("comments functionality test", () => {

  let profileId;
  let loggedInUser;
  let firstCommentId;

  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(async () => {
    await resetDb()

    const user = await UserModel.create({ name: "gery" })

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
      "comments": [
        {
          "creator_id": user.id,
          "title": "titles 1",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3",
          "likes": 5,
          "created_at": Date.now()
        },
        {
          "creator_id": user.id,
          "title": "titles 2",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3",
          "likes": 10,
          "created_at": Date.now() + 1
        },
        {
          "creator_id": user.id,
          "title": "titles 3",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3",
          "likes": 2,
          "created_at": Date.now() + 2
        }
      ]
    })

    profileId = profile.id
    loggedInUser = user.name
    firstCommentId = profile.comments[0].id
  })

  it("POST /:profileId/comments - is able to post a comment to an existing profile", async () => {
    await request(server)
      .post(`/${profileId}/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "title": "titles 3",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3"
        }
      )
      .expect(200)
  })

  it("POST /:profileId/comments - is not able to post a comment if profileId is not exist", async () => {
    await request(server)
      .post(`/nonexist/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "title": "titles 3",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3"
        }
      )
      .expect(422)
  })

  it("POST /:profileId/comments - is not able to post a comment if validation fails", async () => {
    // missing name
    await request(server)
      .post(`/${profileId}/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3"
        }
      )
      .expect(422)

    // wrong zodiac
    await request(server)
      .post(`/${profileId}/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "title": "titles 3",
          "zodiac": "wrongzodiac",
          "mbti": "INFJ",
          "enneagram": "2w3",
          "comment": "test comment 3"
        }
      )
      .expect(422)

    // wrong mbti
    await request(server)
      .post(`/${profileId}/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "title": "titles 3",
          "zodiac": "Aries",
          "mbti": "wrong mbti",
          "enneagram": "2w3",
          "comment": "test comment 3"
        }
      )
      .expect(422)

    // wrong enneagram
    await request(server)
      .post(`/${profileId}/comments`)
      .set("authorization", loggedInUser)
      .send(
        {
          "title": "titles 3",
          "zodiac": "Aries",
          "mbti": "INFJ",
          "enneagram": "wrongeeneagram",
          "comment": "test comment 3"
        }
      )
      .expect(422)
  })

  it("GET /:profileId/comments - is able to get comments on existing profiles ", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .expect(200)
  })

  it("GET /:profileId/comments - is able to get comments sorted by the best", async () => {
    const { body } = await request(server)
      .get(`/${profileId}/comments`)
      .query({ sort: sortValue.BEST })
      .expect(200)

    expect(body.data.comments[0].likes).toBe(10)
    expect(body.data.comments[1].likes).toBe(5)
    expect(body.data.comments[2].likes).toBe(2)
  })

  it("GET /:profileId/comments - is able to get comments sorted by latest", async () => {
    const { body } = await request(server)
      .get(`/${profileId}/comments`)
      .query({ sort: sortValue.RECENT })
      .expect(200)

    expect(body.data.comments[0].title).toBe(`titles 3`)
    expect(body.data.comments[1].title).toBe(`titles 2`)
    expect(body.data.comments[2].title).toBe(`titles 1`)
  })

  it("GET /:profileId/comments - is not able to get comments if enneagram filter wrong", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "enneagram",
        filter_value: "wrong"
      })
      .expect(422)
  })

  it("GET /:profileId/comments - is able to get comments if enneagram filter correct", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "enneagram",
        filter_value: enneagram.EightW7
      })
      .expect(200)
  })

  it("GET /:profileId/comments - is not able to get comments if mbti filter wrong", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "mbti",
        filter_value: "wrong"
      })
      .expect(422)
  })

  it("GET /:profileId/comments - is able to get comments if mbti filter correct", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "mbti",
        filter_value: mbti.ENFP
      })
      .expect(200)
  })

  it("GET /:profileId/comments - is not able to get comments if zodiac filter wrong", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "zodiac",
        filter_value: "wrong"
      })
      .expect(422)
  })

  it("GET /:profileId/comments - is able to get comments if zodiac filter correct", async () => {
    await request(server)
      .get(`/${profileId}/comments`)
      .query({
        filter_field: "zodiac",
        filter_value: zodiac.Aquarius
      })
      .expect(200)
  })

  it("GET /:profileId/comments - is not able to get comments on wrong profile id", async () => {
    await request(server)
      .get(`/wrongProfile/comments`)
      .expect(422)
  })

  it("POST /:profileId/comments/:commentId/toggle-like - is able to like comment", async () => {
    await request(server)
      .post(`/${profileId}/comments/${firstCommentId}/toggle-like`)
      .set("authorization", loggedInUser)
      .expect(200)

    const profile = await ProfileModel.findOne()

    expect(profile.comments[0].likes).toBe(6)
  })

  it("POST /:profileId/comments/:commentId/toggle-like - is able to unlike comment", async () => {
    await request(server)
      .post(`/${profileId}/comments/${firstCommentId}/toggle-like`)
      .set("authorization", loggedInUser)
      .expect(200)

    await request(server)
      .post(`/${profileId}/comments/${firstCommentId}/toggle-like`)
      .set("authorization", loggedInUser)
      .expect(200)

    const profile = await ProfileModel.findOne()

    expect(profile.comments[0].likes).toBe(5)
  })

  it("POST /:profileId/comments/:commentId/toggle-like - is not able to like non exist comment", async () => {
    await request(server)
      .post(`/${profileId}/comments/notFoundComment/toggle-like`)
      .set("authorization", loggedInUser)
      .expect(422)
  })

  it("POST /:profileId/comments/:commentId/toggle-like - is not able to like non exist profile", async () => {
    await request(server)
      .post(`/nonexistprofile/comments/${firstCommentId}/toggle-like`)
      .set("authorization", loggedInUser)
      .expect(422)
  })

})
