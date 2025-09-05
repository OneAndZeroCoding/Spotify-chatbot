const express = require('express');
const router = express.Router();
const { createPlaylist } = require('../services/spotifyService');

router.get('/test', async (req, res) => {
  try {
    // Replace with your Spotify test account userId
    const playlist = await createPlaylist('spotify_user_id_here', 'Test Playlist from API');
    res.json(playlist);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

module.exports = router;
