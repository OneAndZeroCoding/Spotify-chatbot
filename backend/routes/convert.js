// Getting the required stuff

const express = require('express');
const router = express.Router();
const { parseYoutubePlaylist } = require('../services/parserService');
const { searchTrack, createPlaylist, addTracksToPlaylist } = require('../services/spotifyService');

// One shot route to create the playlist from link

router.post('/yt-to-spotify', async (req, res) => {
  const { playlistUrl, targetPlaylistId, playlistName } = req.body;
  const userAccessToken = req.session.userAccessToken;
  const userId = req.session.userId;

  if (!userAccessToken || !userId) {
    return res.status(401).json({ error: 'Not authenticated with Spotify' });
  }

  if (!playlistUrl) {
    return res.status(400).json({ error: 'No Url present' });
  }

  try {
    // 1. Parse YouTube playlist → queries
    const queries = await parseYoutubePlaylist(playlistUrl, { limit: 50 });

    // 2. Search each track
    const trackIds = [];
    for (const query of queries) {
      const id = await searchTrack(query, userAccessToken);
      if (id) trackIds.push(id);
    }

    if (trackIds.length === 0) {
      return res.status(404).json({ error: 'No matching tracks found on Spotify' });
    }

    // 3. Decide playlist
    let playlistId = targetPlaylistId;
    if (!playlistId) {
      const playlist = await createPlaylist(
        userId,
        playlistName || 'Imported from YouTube',
        userAccessToken
      );
      playlistId = playlist.id;
    }

    // 4. Add tracks
    await addTracksToPlaylist(playlistId, trackIds, userAccessToken);

    res.json({
      message: 'Tracks added successfully',
      playlistId,
      added: trackIds.length
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to convert YouTube playlist' });
  }
});

module.exports = router;