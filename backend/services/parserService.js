// Later: integrate YouTube API, SoundCloud, Apple Music, etc.
async function parseYouTubePlaylist(url) {
  // MVP stub
  return [
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Blinding Lights', artist: 'The Weeknd' },
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
