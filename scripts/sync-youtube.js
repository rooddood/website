const https = require('https');
const fs = require('fs');
const path = require('path');

const CHANNEL_ID = 'UC57nZOIj89ScXvzia7KIZ9g'; // @sniffyscloset
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'youtubeFeed.json');

console.log(`[YouTube Sync] Fetching feed for channel: ${CHANNEL_ID}...`);

https.get(FEED_URL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`[YouTube Sync] Failed with status code: ${res.statusCode}`);
    return;
  }

  let xml = '';
  res.on('data', (chunk) => {
    xml += chunk;
  });

  res.on('end', () => {
    try {
      const entryMatches = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
      const videos = [];

      for (const entry of entryMatches) {
        const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
        const titleMatch = entry.match(/<title>(.*?)<\/title>/);
        const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
        const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);

        if (!idMatch || !titleMatch) continue;

        const id = idMatch[1].trim();
        const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
        const published = publishedMatch ? publishedMatch[1].trim() : '';
        const description = descMatch ? descMatch[1].trim() : '';

        // Auto-detect category & tags
        let category = 'Don\'t Tell Comedy';
        let tag = 'Montage';
        let format = '16:9 Comedy Show';
        let aspect = '16:9';

        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('apocasniff') || lowerTitle.includes('short')) {
          category = 'My Shorts';
          tag = lowerTitle.includes('social') ? 'Shorts' : 'Trailer';
          format = lowerTitle.includes('social') ? '9:16 Vertical Short' : '16:9 Widescreen';
          aspect = lowerTitle.includes('social') ? '9:16' : '16:9';
        } else if (lowerTitle.includes('stand up') || lowerTitle.includes('standup') || lowerTitle.includes('set')) {
          category = 'Stand Up Sets';
          tag = 'Standup';
          format = '16:9 Standup Set';
        } else if (lowerTitle.includes("don't tell") || lowerTitle.includes('dont tell')) {
          category = "Don't Tell Comedy";
          tag = 'Montage';
          format = '16:9 Comedy Show';
        }

        videos.push({
          id,
          youtubeId: id,
          title,
          published,
          category,
          tag,
          format,
          aspect,
          embedUrl: `https://www.youtube.com/embed/${id}`,
          thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          creator: category === 'My Shorts' ? '@sniffyscloset' : 'Don\'t Tell Comedy',
          summary: description ? description.slice(0, 160) + '...' : `Live comedy video filmed & edited by Kyle Rood (@sniffyscloset).`
        });
      }

      const outDir = path.dirname(OUTPUT_FILE);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(videos, null, 2), 'utf-8');
      console.log(`[YouTube Sync] Successfully saved ${videos.length} videos to ${OUTPUT_FILE}`);
    } catch (err) {
      console.error('[YouTube Sync] Error parsing YouTube XML:', err);
    }
  });
}).on('error', (err) => {
  console.error('[YouTube Sync] Network error fetching feed:', err.message);
});
