const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Backend running...');
});

// Import routes
const spotifyRoutes = require('./routes/spotify');
const convertRoutes = require('./routes/convert');

app.use('/spotify', spotifyRoutes);
app.use('/convert', convertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
