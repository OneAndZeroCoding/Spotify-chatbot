const express = require('express');
const router = express.Router();
const { parsePlaylist } = require('../services/parserService');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    const songs = await parsePlaylist(url);
    res.json({ songs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to parse playlist' });
  }
});

module.exports = router;
