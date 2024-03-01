'use strict';

const { server } = require("./server");
const { initDb } = require('./models');

const port = process.env.APP_PORT || 3000;

initDb().then(() => console.log('Database connected'))

server.listen(port, () => {
  console.log('Express started. Listening on %s', port);
});
