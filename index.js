const express = require('express');
const app = express();
const ConnectDB = require('./config/db');

//  Init MiddleWare
app.use(express.json({ extended: false }));

//  Connect the DataBase
ConnectDB();

// Defined Routes
app.use('/api/user', require('./router/api/user'));
app.use('/api/auth', require('./router/api/auth'));

app.use('/', (req, res) => {
  res.send('Working');
});

// Port Variable
const PORT = process.env.PORT || 8001;

//  Start Listening
app.listen(PORT);
