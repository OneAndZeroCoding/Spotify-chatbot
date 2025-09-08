console.log("Server started")
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const spotifyRoutes = require('./routes/spotify');
const convertRoutes = require('./routes/convert');
const authRoutes = require('./routes/auth');
const app = express();
console.log("Initializing middleware...");
app.use(express.json());

// Use sessions to store user access token
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Mount Spotify routes
app.use('/auth', authRoutes);
console.log("Mounted /auth routes");
app.use('/spotify', spotifyRoutes);
console.log("Mounted /spotfiy routes");
app.use('/convert', convertRoutes);
console.log("Mounted /convert routes");

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

