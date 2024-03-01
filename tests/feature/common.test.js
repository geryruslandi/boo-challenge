const request = require('supertest');
const { server } = require('../../server');

describe("common test", () => {
  it("will return 404 if page not exist", async () => {
    await request(server)
      .get('/some/non/exist/page')
      .expect(404)
  })
})
