const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    throw err;
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});
