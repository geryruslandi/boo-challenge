const { createProfile, getProfile } = require("../../services/profile.service");
const { connectDb, resetDb, disconnectDb } = require("../utils/db");
describe("profile.service.js - test", () => {

  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(resetDb)

  it("can create profile", async () => {
    const profile = await createProfile({
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
    })

    expect(profile).toBeTruthy()
  })

  it("can get profile", async () => {
    const profile = await createProfile({
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
    })

    const fetchedProfile = await getProfile(profile.id)

    expect(fetchedProfile).toBeTruthy()
  })
})
