const express = require ('express');
const app = express();
const bodyParser = require('body-parser')
const mongodb = require('./db/connect');
const port = 3000;

app.use(bodyParser.json());
app.use('/', require('./routes/index'));

// Connect to DB then start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port);
    console.log('Web Server is listening at port '+(process.env.port || port));
  }
});