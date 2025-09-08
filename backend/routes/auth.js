// routes/auth.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const {
  buildAuthURL,
  exchangeCodeForTokens,
  refreshAccessToken,
} = require("../services/spotifyService");


// 1. Login → redirect to Spotify authorization page
router.get("/login", (req, res) => {
  console.log("/login called");
  const authUrl = buildAuthURL();
  console.log("User redirected to spotify")
  return res.redirect(authUrl);
});


// 2. Callback → Spotify redirects here with "code"
router.get("/callback", async (req, res) => {
  console.log("/callback called");
  const code = req.query.code;
  if (!code) {
    console.log("Error : No code provided");
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    // Exchange code for tokens
    const { access_token, refresh_token } = await exchangeCodeForTokens(code);
    console.log("Access token and refresh token received.");

    // Fetch user profile with access_token
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = response.data;
    console.log("User data received");

    // Redirect back to mobile app with tokens + user info
    const redirectUrl = `yt2spotify://auth?access=${encodeURIComponent(
      access_token
    )}&refresh=${encodeURIComponent(refresh_token)}&id=${encodeURIComponent(
      user.id
    )}&name=${encodeURIComponent(user.display_name || "")}`;
    console.log("Redirected to mobile.");
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("Auth callback error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to exchange code for tokens" });
  }
});


// 3. Refresh tokens
router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  try {
    const newAccessToken = await refreshAccessToken(refresh_token);
    return res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error("Token refresh error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to refresh token" });
  }
});


// Logout -> clears all tokens and memory
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
