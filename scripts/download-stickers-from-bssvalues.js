#!/usr/bin/env node
/**
 * Download sticker images from bssmvalues.com extracted data
 * Usage: node scripts/download-stickers-from-bssvalues.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Read the extracted data
const rawData = fs.readFileSync('/Users/wumingjie/.claude/projects/-Users-wumingjie-python-2026-wangzhan-26-1-beeswarmsimulator-org/197a5927-cace-4a27-bfa8-b29c7205c515/tool-results/mcp-playwright-browser_evaluate-1767438507497.txt', 'utf8');

// Parse the outer JSON
const outerJson = JSON.parse(rawData);
const innerText = outerJson[0].text;

// Extract the JSON array from the text (between "### Result\n" and "\n\n### Ran Playwright code")
const startMarker = '### Result\n';
const endMarker = '\n\n### Ran Playwright code';
const startIdx = innerText.indexOf(startMarker) + startMarker.length;
const endIdx = innerText.indexOf(endMarker);
const jsonStr = innerText.substring(startIdx, endIdx);

// Parse sticker data
const stickerData = JSON.parse(jsonStr);
console.log(`Found ${stickerData.length} total sticker image entries`);

// Create unique name-to-url mapping (deduplicate by name)
const uniqueStickers = new Map();
for (const item of stickerData) {
  if (!uniqueStickers.has(item.name)) {
    uniqueStickers.set(item.name, item.src);
  }
}
console.log(`Unique stickers: ${uniqueStickers.size}`);

// Create slug from name
function createSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
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

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stickers');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('\nStarting sticker image download from bssmvalues data...');
  console.log(`Output directory: ${outputDir}\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;
  const failures = [];
  const entries = Array.from(uniqueStickers.entries());

  for (let i = 0; i < entries.length; i++) {
    const [name, src] = entries[i];
    const slug = createSlug(name);
    const destPath = path.join(outputDir, `${slug}.png`);

    // Skip if already exists and valid (> 500 bytes)
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 500) {
        console.log(`[${i + 1}/${entries.length}] SKIP ${slug} (exists, ${stats.size} bytes)`);
        skipped++;
        success++;
        continue;
      }
    }

    try {
      console.log(`[${i + 1}/${entries.length}] Downloading ${name}...`);
      await downloadFile(src, destPath);

      const stats = fs.statSync(destPath);
      console.log(`  -> OK (${stats.size} bytes)`);
      success++;
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
      failed++;
      failures.push({ name, slug, src, error: err.message });
    }

    // Small delay
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Total unique stickers: ${entries.length}`);
  console.log(`Success: ${success} (${skipped} already existed)`);
  console.log(`Failed: ${failed}`);

  if (failures.length > 0) {
    console.log('\nFailed downloads:');
    failures.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
  }
}

main().catch(console.error);
