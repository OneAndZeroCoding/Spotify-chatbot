const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  searchTrack,
  addTracksToPlaylist,
} = require('../services/spotifyService');

// Test endpoint — create playlist
router.get('/test', async (req, res) => {
  try {
    const playlist = await createPlaylist(
      'your_spotify_user_id',
      'Test Playlist'
    );
    res.json(playlist);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

module.exports = router;
