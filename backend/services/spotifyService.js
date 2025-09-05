const axios = require('axios');

let accessToken = null;

// Get a new access token
async function getAccessToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials'
    }),
    {
      headers: {
        Authorization: 'Basic ' + Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
}

// Example: create a playlist
async function createPlaylist(userId, name) {
  if (!accessToken) await getAccessToken();

  const res = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    { name, public: false },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data;
}

module.exports = { getAccessToken, createPlaylist };
