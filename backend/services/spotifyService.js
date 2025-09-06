const axios = require('axios');

let accessToken = null;

// Get a new Spotify access token
async function getAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
}

// Create a playlist
async function createPlaylist(userId, name) {
  if (!accessToken) await getAccessToken();

  const res = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    { name, public: false },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data;
}

// Search for a track
async function searchTrack(query) {
  if (!accessToken) await getAccessToken();

  const res = await axios.get('https://api.spotify.com/v1/search', {
    params: { q: query, type: 'track', limit: 1 },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data.tracks.items.length > 0
    ? res.data.tracks.items[0].id
    : null;
}

// Add tracks to playlist
async function addTracksToPlaylist(playlistId, trackIds) {
  if (!accessToken) await getAccessToken();

  const uris = trackIds.map((id) => `spotify:track:${id}`);
  const res = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data;
}

module.exports = {
  getAccessToken,
  createPlaylist,
  searchTrack,
  addTracksToPlaylist,
};
