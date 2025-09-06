const express = require('express');
const router = express.Router();
const { parseYoutubePlaylist } = require('../services/parserService');

/**
 * POST /convert
 * Body: { playlistUrl: string }
 * Returns: { queries: string[] }
 */
router.post('/', async (req, res) => {
  const { playlistUrl } = req.body;

  if (!playlistUrl) {
    return res.status(400).json({ error: 'playlistUrl is required' });
  }

  try {
    const queries = await parseYoutubePlaylist(playlistUrl);
    res.json({ queries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
