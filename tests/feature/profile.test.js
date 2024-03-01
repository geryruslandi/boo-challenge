const { connectDb, resetDb, disconnectDb } = require("../utils/db");
const request = require('supertest');
const { server } = require('../../server');

describe("Profile functionality test", () => {
  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(resetDb)

  it("POST / - is able to create profile", async () => {
    const { body } = await request(server)
      .post('/')
      .send(
        {
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
          "temperaments": "Phelgmatic"
        }
      )
      .expect(200)

    expect(body.data.profile.name).toBe("Gery")
  })

  it("POST / - is not able to create profile if one of required field is missing", async () => {
    const { body } = await request(server)
      .post('/')
      .send(
        {
          "description": "BOO gery's profile",
          "mbti": "ISFJ",
          "enneagram": "1w2",
          "variant": "sp/so",
          "tritype": 725,
          "socionics": "SEE",
          "sloan": "RCOEN",
          "psyche": "FEVL",
          "image": "https://soulverse.boo.world/images/1.png",
          "temperaments": "Phelgmatic"
        }
      )
      .expect(422)

    expect(body.message).toBe("name has Invalid value");
  })

  it("POST / - is not able to create profile if mbti is wrong", async () => {
    const { body } = await request(server)
      .post('/')
      .send(
        {
          "name": "Gery",
          "description": "BOO gery's profile",
          "mbti": "wrong mbti",
          "enneagram": "1w2",
          "variant": "sp/so",
          "tritype": 725,
          "socionics": "SEE",
          "sloan": "RCOEN",
          "psyche": "FEVL",
          "image": "https://soulverse.boo.world/images/1.png",
          "temperaments": "Phelgmatic"
        }
      )
      .expect(422)

    expect(body.message).toBe("mbti has Invalid value");
  })

  it("POST / - is not able to create profile if enneagram is wrong", async () => {
    const { body } = await request(server)
      .post('/')
      .send(
        {
          "name": "Gery",
          "description": "BOO gery's profile",
          "mbti": "ISFJ",
          "enneagram": "wrong enneagram",
          "variant": "sp/so",
          "tritype": 725,
          "socionics": "SEE",
          "sloan": "RCOEN",
          "psyche": "FEVL",
          "image": "https://soulverse.boo.world/images/1.png",
          "temperaments": "Phelgmatic"
        }
      )
      .expect(422)

    expect(body.message).toBe("enneagram has Invalid value");
  })

  it("GET /:profileId - is able to render html page if profile is exist", async () => {
    const { body } = await request(server)
      .post('/')
      .send(
        {
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
          "temperaments": "Phelgmatic"
        }
      )
      .expect(200)

    await request(server)
      .get(`/${body.data.profile._id}`)
      .expect(200)
  })

  it("GET /:profileId - is not able to render html page if profile is not exist", async () => {
    await request(server)
      .get(`/somerandomprofileid`)
      .expect(422)
  })
})
