const axios = require("axios");
require("dotenv").config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// ========== AUTH HELPERS ==========

// Build the Spotify authorization URL
function buildAuthURL() {
  const scope =
    "playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative";

  return (
    "https://accounts.spotify.com/authorize" +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`
  );
}

// Exchange authorization code for access & refresh tokens
async function exchangeCodeForTokens(code) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
    expires_in: response.data.expires_in,
  };
}

// Refresh access token using refresh token
async function refreshAccessToken(refreshToken) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

// ========== PLAYLIST/TRACK HELPERS ==========

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
  const res = await axios.get("https://api.spotify.com/v1/search", {
    params: { q: query, type: "track", limit: 1 },
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
    const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${userAccessToken}` },
      params: {
        limit,
        offset,
        include_external: "playlist",
      },
    });

    playlists = playlists.concat(
      res.data.items.map((p) => ({
        id: p.id,
        name: p.name,
        tracksTotal: p.tracks.total,
        ownerId: p.owner.id,
        collaborative: p.collaborative,
        public: p.public,
      }))
    );

    total = res.data.total;
    offset += limit;
  } while (offset < total);

  return playlists;
}

// Export everything
module.exports = {
  buildAuthURL,
  exchangeCodeForTokens,
  refreshAccessToken,
  createPlaylist,
  searchTrack,
  addTracksToPlaylist,
  getUserPlaylists,
};
