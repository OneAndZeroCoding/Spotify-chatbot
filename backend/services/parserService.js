const ytpl = require('ytpl');

/**
 * Cleans a YouTube video title to make it suitable for Spotify search.
 * Removes Official Video, HD, ft., feat., [Remix], extra spaces, etc.
 */
function cleanTitle(title) {
  return title
    .replace(/\(.*Official.*\)/gi, '')   // remove (Official Video)
    .replace(/\[.*\]/gi, '')             // remove [Remix] or any brackets
    .replace(/HD/gi, '')                  // remove HD
    .replace(/ft\.|feat\./gi, 'feat')    // normalize featuring
    .replace(/\s+/g, ' ')                // remove extra spaces
    .trim();
}

/**
 * Parses a YouTube playlist URL and returns an array of cleaned song queries.
 * @param {string} url - YouTube playlist URL
 * @returns {Promise<string[]>} Array of track queries
 */
async function parseYoutubePlaylist(url) {
  try {
    if (!ytpl.validateID(url)) {
      throw new Error('Invalid YouTube playlist URL');
    }

    const playlist = await ytpl(url, { pages: Infinity });

    const queries = playlist.items.map(item => cleanTitle(item.title));

    return queries;
  } catch (error) {
    throw new Error(`Failed to parse playlist: ${error.message}`);
  }
}

module.exports = { parseYoutubePlaylist };
