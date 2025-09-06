const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const {
  createPlaylist,
  searchTrack,
  addTracksToPlaylist
} = require('../services/spotifyService');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// 1️⃣ Login route → redirect user to Spotify auth
router.get('/login', (req, res) => {
  const scope = 'playlist-modify-private playlist-modify-public';
  const authUrl =
    'https://accounts.spotify.com/authorize' +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authUrl);
});

//Logout route -> clearing the current token session
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Session cleared. Please log in again.');
  });
});


// 2️⃣ Callback route → Spotify sends authorization code
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token } = response.data;

    // get user profile
    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    req.session.userAccessToken = access_token;
    req.session.refreshToken = refresh_token;
    req.session.userId = userProfile.data.id;

    console.log("Saved session:", req.session);

    res.send("Login successful. You can now hit the /create-playlist endpoint.");
  } catch (err) {
    console.error("Callback error:", err.response?.data || err.message);
    res.status(500).json({ error: "Spotify authentication failed" });
  }
});


// 3️⃣ Create playlist endpoint
router.post('/create-playlist', async (req, res) => {
  console.log("Session:", req.session); // 👈 check if userAccessToken + userId exist
  console.log("Body:", req.body);
  const { name } = req.body;
  try {
    const playlist = await createPlaylist(
      req.session.userId,
      name,
      req.session.userAccessToken
    );
    res.json(playlist);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// 5️⃣ Search track endpoint
router.post('/search-track', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const trackId = await searchTrack(query, req.session.userAccessToken);
    if (!trackId) return res.status(404).json({ error: 'Track not found' });
    res.json({ trackId });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to search track' });
  }
});

// 4️⃣ Add songs to playlist endpoint
router.post('/add-songs-to-playlist', async (req, res) => {
  const { playlistId, trackIds } = req.body;
  try {
    const result = await addTracksToPlaylist(
      playlistId,
      trackIds,
      req.session.userAccessToken
    );
    res.json(result);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to add songs' });
  }
});

module.exports = router;
