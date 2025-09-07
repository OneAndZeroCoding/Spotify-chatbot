const ytpl = require('ytpl');


function cleanTitle(title) {
  if (!title || typeof title !== 'string') return '';

  let t = title;

  //Replacment of titles
  t = t.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '');
  t = t.replace(
    /\b(official|officially|official video|official music video|music video|audio|lyric|lyrics|lyric video|hd|hq|live|remix|version|explicit|video clip|video)\b/gi,
    ''
  );
  t = t.replace(/\b(ft\.?|feat\.?|featuring)\b/gi, 'feat');
  t = t.replace(/[|–—:•·]/g, ' - ');
  t = t.replace(/\s*-\s*/g, ' - ');
  t = t.replace(/\s+/g, ' ').trim();
  t = t.replace(/^[\-\:\s]+|[\-\:\s]+$/g, '').trim();

  // Checking for title parts
  const parts = t.split(' - ').map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    t = `${parts[0]} - ${parts[1]}`;
  } else if (parts.length === 1) {
    t = parts[0];
  } else {
    t = t.trim();
  }

  return t;
}


async function parseYoutubePlaylist(url, options = {}) {
  const { debug = false, limit = Infinity, pages = Infinity } = options;

  try {
    // Some URLs work directly with ytpl; if validateID fails for your URL, remove this check
    if (!ytpl.validateID(url)) {
      throw new Error('Invalid YouTube playlist URL or ID');
    }

    const playlist = await ytpl(url, { pages });
    const queries = [];

    for (let i = 0; i < playlist.items.length && queries.length < limit; i++) {
      const item = playlist.items[i];
      const original = item.title || '';
      const cleaned = cleanTitle(original);
      if (debug) {
        console.log(`${i + 1}. original: "${original}" => cleaned: "${cleaned}"`);
      }
      queries.push(cleaned);
    }

    return queries;
  } catch (err) {
    throw new Error(`Failed to parse playlist: ${err.message}`);
  }
}

module.exports = { parseYoutubePlaylist, cleanTitle };
