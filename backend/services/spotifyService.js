const axios = require('axios');

// Create a playlist
async function createPlaylist(userId, name, userAccessToken) {
  const res = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    { name, public: false },
    { headers: { Authorization: `Bearer ${userAccessToken}` } }
  );
  return res.data;
}

// Search for a track
async function searchTrack(query, userAccessToken) {
  const res = await axios.get('https://api.spotify.com/v1/search', {
    params: { q: query, type: 'track', limit: 1 },
    headers: { Authorization: `Bearer ${userAccessToken}` },
  });
  return res.data.tracks.items.length > 0
    ? res.data.tracks.items[0].id
    : null;
}

// Add tracks to a playlist
async function addTracksToPlaylist(playlistId, trackIds, userAccessToken) {
  const uris = trackIds.map((id) => `spotify:track:${id}`);
  const res = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris },
    { headers: { Authorization: `Bearer ${userAccessToken}` } }
  );
  return res.data;
}

// Get all playlists in the account
async function getUserPlaylists(userAccessToken) {
  let playlists = [];
  let limit = 50;
  let offset = 0;
  let total = 0;

  do {
    const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${userAccessToken}` },
      params: {
        limit,
        offset,
        include_external: 'playlist'
      }
    });

    playlists = playlists.concat(
      res.data.items.map(p => ({
        id: p.id,
        name: p.name,
        tracksTotal: p.tracks.total,
        ownerId: p.owner.id,
        collaborative: p.collaborative,
        public: p.public
      }))
    );

    total = res.data.total;
    offset += limit;
  } while (offset < total);

  return playlists;
}


module.exports = { createPlaylist, searchTrack, addTracksToPlaylist, getUserPlaylists };
