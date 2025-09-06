const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const {
  createPlaylist,
  searchTrack,
  addTracksToPlaylist,
  getUserPlaylists
} = require('../services/spotifyService');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// 1️⃣ Login route → redirect user to Spotify auth
router.get('/login', (req, res) => {
  const scope = 'playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative';
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


// 5️⃣ Search track endpoint (multiple inputs)
router.post("/search-tracks", async (req, res) => {
  const { queries } = req.body; // array of song titles
  const accessToken = req.session.userAccessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated with Spotify" });
  }

  if (!Array.isArray(queries) || queries.length === 0) {
    return res.status(400).json({ error: "queries must be a non-empty array" });
  }

  try {
    const trackResults = [];

    for (const query of queries) {
      const trackId = await searchTrack(query, accessToken);
      trackResults.push({ query, trackId });
    }

    res.json({ tracks: trackResults });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to search tracks" });
  }
});



// Get all playlists of the logged-in user (name, id, number of tracks)
router.get('/my-playlists', async (req, res) => {
  const accessToken = req.session.userAccessToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'Not authenticated with Spotify' });
  }

  try {
    const playlists = await getUserPlaylists(accessToken);

    // Simplified for mobile display: only name, id, and track count
    const formatted = playlists.map(p => ({
      id: p.id,
      name: p.name,
      tracksTotal: p.tracksTotal
    }));

    res.json({ playlists: formatted });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get playlists' });
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
