const express = require('express');
const router = express.Router();
const { parsePlaylist } = require('../services/parserService');
const {
  createPlaylist,
  searchTrack,
  addTracksToPlaylist,
} = require('../services/spotifyService');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    // Step 1: Parse songs from external playlist
    const songs = await parsePlaylist(url);

    // Step 2: Create new Spotify playlist
    const playlist = await createPlaylist(
      'your_spotify_user_id',
      'Converted Playlist'
    );

    // Step 3: Map songs → Spotify track IDs
    const trackIds = [];
    for (let song of songs) {
      const query = `${song.title} ${song.artist}`;
      const trackId = await searchTrack(query);
      if (trackId) trackIds.push(trackId);
    }

    // Step 4: Add tracks to playlist
    await addTracksToPlaylist(playlist.id, trackIds);

    res.json({ message: 'Playlist created!', playlistUrl: playlist.external_urls.spotify });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

module.exports = router;
