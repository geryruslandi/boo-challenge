const { createUser } = require("../../services/auth.service");
const { connectDb, resetDb, disconnectDb } = require("../utils/db");

describe("auth.service.js - test", () => {

  beforeAll(connectDb)

  afterAll(disconnectDb)

  beforeEach(resetDb)

  it("can create user", async () => {
    const user = await createUser("gery")

    expect(user).toBeTruthy()
  })

  it("cant create same user", async () => {
    await expect(async () => {
      await createUser("gery")
      await createUser("gery")
    }).rejects.toThrow()
  })
})
