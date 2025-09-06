const express = require('express');
const router = express.Router();
const axios = require('axios');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// Step 1: Login route → redirect user to Spotify for consent
router.get('/login', (req, res) => {
  const scope = 'playlist-modify-private playlist-modify-public';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authUrl);
});

// Step 2: Callback route → Spotify redirects here with authorization code
router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) return res.send('No code provided');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Store the access token in session
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.send('Logged in! You can now use your access token.');
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error getting access token');
  }
});

// Example route to test using the access token
router.get('/me', async (req, res) => {
  const token = req.session.accessToken;
  if (!token) return res.send('Not logged in');

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching user profile');
  }
});

module.exports = router;
