'use strict';

const { server } = require("./server");

const port = process.env.APP_PORT || 3000;

server.listen(port, () => {
  console.log('Express started. Listening on %s', port);
});
