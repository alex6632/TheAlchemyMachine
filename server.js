require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

/* Define routes */
let game = require('./src/game/routes');

const init = () => {

  // BODY PARSER
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // ROUTES
  app.use('/api', game);
  
  // LISTEN
  app.listen(port, () => console.log(`Server watch on port -> ${port}`));
}

init();