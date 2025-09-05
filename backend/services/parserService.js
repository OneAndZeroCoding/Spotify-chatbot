async function parseYouTubePlaylist(url) {
  // For MVP, stub this
  return [
    { title: "Song A", artist: "Artist A" },
    { title: "Song B", artist: "Artist B" }
  ];
}

async function parsePlaylist(url) {
  if (url.includes('youtube.com')) {
    return parseYouTubePlaylist(url);
  } else {
    throw new Error('Unsupported link for now');
  }
}

module.exports = { parsePlaylist };
