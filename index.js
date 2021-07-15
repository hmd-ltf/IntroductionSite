const express = require('express');
const app = express();
const ConnectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

//  Init MiddleWare
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ extended: false }));

// Cors Policy
app.use(cors());

//  Connect the DataBase
ConnectDB();

// Defined Routes
app.use('/api/user', require('./router/api/user'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port Variable
const PORT = process.env.PORT || 8001;

//  Start Listening
app.listen(PORT);
