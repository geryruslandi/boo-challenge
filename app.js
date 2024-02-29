'use strict';
require('dotenv').config();
const express = require('express');
const { initDb } = require('./models');
const { responseWrapper } = require('./middlewares/response-wrapper.middleware')

const app = express();
const port = process.env.APP_PORT || 3000;
app.use(express.json());
app.use(responseWrapper);
app.set('view engine', 'ejs');
app.use('/', require('./routes/profile')());
app.use('*', (req, res) => res.notFound("Page not found"))

const main = async () => {
  await initDb();

  app.listen(port, () => {
    console.log('Express started. Listening on %s', port);
  });
}

main()
