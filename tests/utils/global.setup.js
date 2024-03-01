module.exports = async () => {
  const mongoTestServer = await require('mongodb-memory-server').MongoMemoryServer.create()
  global.__MONGOINSTANCE = mongoTestServer
}
