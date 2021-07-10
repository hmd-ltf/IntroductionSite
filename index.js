const express = require('express');
const app = express();
const ConnectDB = require('./config/db');

//  Init MiddleWare
app.use(express.json({ extended: false }));

//  Connect the DataBase
ConnectDB();

app.use('/', (req, res) => {
  res.send('Working');
});

// Port Variable
const PORT = process.env.PORT || 8001;

//  Start Listening
app.listen(PORT);
