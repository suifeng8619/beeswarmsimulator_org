#!/usr/bin/env node
/**
 * Download all beequip images from Bee Swarm Simulator Wiki
 * Usage: node scripts/download-beequip-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// All 41 beequip slugs (22 regular + 19 beesmas)
const beequips = [
  // Regular beequips (22)
  'thimble', 'sweatband', 'bandage', 'thumbtack', 'camo-bandana',
  'bottle-cap', 'kazoo', 'smiley-sticker', 'whistle', 'charm-bracelet',
  'paperclip', 'beret', 'bang-snap', 'bead-lizard', 'pink-shades',
  'lei', 'demon-talisman', 'camphor-lip-balm', 'autumn-sunhat',
  'rose-headband', 'pink-eraser', 'candy-ring',
  // Beesmas beequips (19)
  'elf-cap', 'single-mitten', 'warm-scarf', 'peppermint-antennas',
  'beesmas-top', 'pinecone', 'icicles', 'beesmas-tree-hat', 'bubble-light',
  'snow-tiara', 'snowglobe', 'reindeer-antlers', 'toy-horn', 'paper-angel',
  'toy-drum', 'lump-of-coal', 'poinsettia', 'electric-candle', 'festive-wreath'
];

// Convert slug to Wiki page name (e.g., 'camo-bandana' -> 'Camo_Bandana')
function slugToWikiName(slug) {
  return slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('_');
}

// Download file from URL with redirect support
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// Fetch Wiki page and extract image URL
async function getImageUrl(pageName) {
  const wikiUrl = `https://bee-swarm-simulator.fandom.com/wiki/${pageName}`;

  return new Promise((resolve, reject) => {
    https.get(wikiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = response.headers.location;
        const match = redirectUrl.match(/\/wiki\/(.+)$/);
        if (match) {
          getImageUrl(match[1]).then(resolve).catch(reject);
          return;
        }
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        // Look for the main image in infobox or article-thumb
        const patterns = [
          // Infobox image
          /data-src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png\/revision\/latest[^"]*)"/i,
          /src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png\/revision\/latest[^"]*)"/i,
          // Any matching image
          /src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png)"/i
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            let imgUrl = match[1];
            // Remove scaling parameters to get full size
            imgUrl = imgUrl.replace(/\/scale-to-width-down\/\d+/, '');
            imgUrl = imgUrl.replace(/\/revision\/latest\/.*$/, '/revision/latest');
            resolve(imgUrl);
            return;
          }
        }

        reject(new Error('Image URL not found'));
      });
    }).on('error', reject);
  });
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'beequips');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting beequip image download...');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Total beequips: ${beequips.length}\n`);

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < beequips.length; i++) {
    const slug = beequips[i];
    const wikiName = slugToWikiName(slug);
    const destPath = path.join(outputDir, `${slug}.png`);

    // Skip if already exists and valid
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 1000) {
        console.log(`[${i + 1}/${beequips.length}] SKIP ${slug} (already exists)`);
        success++;
        continue;
      }
    }

    try {
      console.log(`[${i + 1}/${beequips.length}] Downloading ${slug}...`);
      const imageUrl = await getImageUrl(wikiName);
      await downloadFile(imageUrl, destPath);

      const stats = fs.statSync(destPath);
      console.log(`  -> OK (${stats.size} bytes)`);
      success++;
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
      failed++;
      failures.push({ slug, wikiName, error: err.message });
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Success: ${success}/${beequips.length}`);
  console.log(`Failed: ${failed}/${beequips.length}`);

  if (failures.length > 0) {
    console.log('\nFailed downloads:');
    failures.forEach(f => console.log(`  - ${f.slug} (${f.wikiName}): ${f.error}`));
  }
}

main().catch(console.error);
