require('dotenv').config(); // Load .env first
const express = require('express');
const session = require('express-session'); // For storing user tokens
const spotifyRoutes = require('./spotify');

const app = express();

// Use sessions to store user access token
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Mount Spotify routes
app.use('/spotify', spotifyRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
