const { default: mongoose } = require('mongoose');

const serverInstance = global.__MONGOINSTANCE

const connectDb = async () => {
  await mongoose.connect(serverInstance.getUri())
}

const resetDb = async () => {
  await mongoose.connection.db.dropDatabase();
}

const disconnectDb = async () => {
  await mongoose.disconnect()
}

module.exports = {
  resetDb,
  connectDb,
  disconnectDb,
}
