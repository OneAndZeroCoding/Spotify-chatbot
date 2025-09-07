console.log("Server started")
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const spotifyRoutes = require('./routes/spotify');
const convertRoutes = require('./routes/convert');
const app = express();
app.use(express.json());

// Use sessions to store user access token
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Mount Spotify routes
app.use('/spotify', spotifyRoutes);
app.use('/convert', convertRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

