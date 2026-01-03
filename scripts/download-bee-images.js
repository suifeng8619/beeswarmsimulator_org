#!/usr/bin/env node
/**
 * Download all bee images from Bee Swarm Simulator Wiki
 * Usage: node scripts/download-bee-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// All 46 bee slugs
const bees = [
  'basic-bee', 'bomber-bee', 'brave-bee', 'bumble-bee', 'cool-bee',
  'hasty-bee', 'looker-bee', 'rad-bee', 'rascal-bee', 'stubborn-bee',
  'bubble-bee', 'bucko-bee', 'commander-bee', 'demo-bee', 'exhausted-bee',
  'fire-bee', 'frosty-bee', 'honey-bee', 'rage-bee', 'riley-bee',
  'shocked-bee', 'baby-bee', 'carpenter-bee', 'demon-bee', 'diamond-bee',
  'lion-bee', 'music-bee', 'ninja-bee', 'shy-bee', 'buoyant-bee',
  'fuzzy-bee', 'precise-bee', 'spicy-bee', 'tadpole-bee', 'vector-bee',
  'bear-bee', 'cobalt-bee', 'crimson-bee', 'digital-bee', 'festive-bee',
  'gummy-bee', 'photon-bee', 'puppy-bee', 'tabby-bee', 'vicious-bee',
  'windy-bee'
];

// Convert slug to Wiki page name (e.g., 'basic-bee' -> 'Basic_Bee')
function slugToWikiName(slug) {
  return slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('_');
}

// Download file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
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
async function getImageUrl(beeName) {
  const wikiUrl = `https://bee-swarm-simulator.fandom.com/wiki/${beeName}`;

  return new Promise((resolve, reject) => {
    https.get(wikiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        // Look for the main image in the infobox
        // Pattern: src="https://static.wikia.nocookie.net/bee-swarm-simulator/images/.../{BeeName}.png/revision/latest..."
        const patterns = [
          new RegExp(`src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+/${beeName.replace(/_/g, '_')}\\.png/revision/latest[^"]*)"`, 'i'),
          new RegExp(`data-src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+\\.png/revision/latest[^"]*)"`, 'i'),
          new RegExp(`src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+\\.png)"`, 'i')
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            // Clean up the URL - get the base image without scaling
            let imgUrl = match[1];
            // Remove scaling parameters
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
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'bees');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting bee image download...');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Total bees: ${bees.length}\n`);

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < bees.length; i++) {
    const slug = bees[i];
    const wikiName = slugToWikiName(slug);
    const destPath = path.join(outputDir, `${slug}.png`);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 1000) {
        console.log(`[${i + 1}/${bees.length}] SKIP ${slug} (already exists)`);
        success++;
        continue;
      }
    }

    try {
      console.log(`[${i + 1}/${bees.length}] Downloading ${slug}...`);
      const imageUrl = await getImageUrl(wikiName);
      await downloadFile(imageUrl, destPath);

      const stats = fs.statSync(destPath);
      console.log(`  -> OK (${stats.size} bytes)`);
      success++;
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
      failed++;
      failures.push({ slug, error: err.message });
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Success: ${success}/${bees.length}`);
  console.log(`Failed: ${failed}/${bees.length}`);

  if (failures.length > 0) {
    console.log('\nFailed downloads:');
    failures.forEach(f => console.log(`  - ${f.slug}: ${f.error}`));
  }
}

main().catch(console.error);
