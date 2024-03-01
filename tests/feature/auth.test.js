const { connectDb, resetDb, disconnectDb } = require("../utils/db");
const request = require('supertest');
const { server } = require('../../server');

describe("Auth functionality test", () => {

  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(resetDb)

  it("POST /auth/register - is able to create a new user", async () => {
    const { body } = await request(server)
      .post('/auth/register')
      .send({ name: "gery" })

    expect(body.data.user.name).toBe("gery");
  })

  it("POST /auth/register - is not able to create a new user with same name", async () => {
    await request(server)
      .post('/auth/register')
      .send({ name: "gery" })

    const { body } = await request(server)
      .post('/auth/register')
      .send({ name: "gery" })

    expect(body.message).toBe("user with same name exist");
  })


  it("POST /auth/register - is able to create a new user if name not provided", async () => {
    await request(server)
      .post('/auth/register')
      .expect(422)
  })

  it("wont validate user if doesnt profile user id on guarded routes", async () => {
    await request(server)
      .post(`/nonexistprofile/comments/nonexistcomment/toggle-like`)
      .expect(401)
  })

  it("wont validate user if given user name on authorization header is not exist on user collection", async () => {
    await request(server)
      .post(`/nonexistprofile/comments/nonexistcomment/toggle-like`)
      .set("authorization", "nonexistuser")
      .expect(401)
  })

})
