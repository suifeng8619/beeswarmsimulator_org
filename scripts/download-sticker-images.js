#!/usr/bin/env node
/**
 * Download all sticker images from Bee Swarm Simulator Wiki
 * Usage: node scripts/download-sticker-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// All sticker names from stickers.ts (282 total)
const stickers = [
  // Cub Skins (11)
  'Bee Cub', 'Brown Cub', 'Doodle Cub', 'Gingerbread Cub', 'Gloomy Cub',
  'Noob Cub', 'Peppermint Cub', 'Robo Cub', 'Snow Cub', 'Star Cub', 'Stick Cub',
  // Hive Skins (12)
  'Black Hive Skin', 'Blue Hive Skin', 'Doodle Hive Skin', 'Green Hive Skin',
  'Icy Crowned Hive Skin', 'Pink Hive Skin', 'Red Hive Skin', 'Wavy Cyan Hive Skin',
  'Wavy Festive Hive Skin', 'Wavy Gold Hive Skin', 'Wavy Purple Hive Skin', 'White Hive Skin',
  // Vouchers (6)
  'Bear Bee Voucher', 'Bee Gather Voucher', 'Convert Speed Voucher', 'Cub Voucher',
  'Offline Voucher', 'Ticket Voucher',
  // Bees (17)
  '4-Pronged Vector Bee', 'Basic Bee', 'Bear Bee Offer', 'Brave Bee', 'Bumble Bee',
  'Diamond Diamond Bee', 'Drooping Stubborn Bee', 'Fuzz Bomb', 'Looker Bee', 'Ninja Bee',
  'Photon Bee', 'Precise Eye', 'Rad Bee', 'Rascal Bee', 'Shocked Hive Slot',
  'Tabby From Behind', 'Tabby Scratch',
  // Bears (14)
  'Bomber Bear', 'Chef Hat Polar Bear', 'Dapper Bear From Above', 'Glowering Gummy Bear',
  'Honey Bee Bear', 'Panicked Science Bear', 'Shy Brown Bear', 'Sideways Spirit Bear',
  'Sitting Green Shirt Bear', 'Sitting Mother Bear', 'Squashed Head Bear', 'Stretched Head Bear',
  'Sunbear', 'Uplooking Bear',
  // Mobs (18)
  'Blue Triangle Critter', 'Coiled Snake', 'Flying Magenta Critter', 'Forward Facing Aphid',
  'Forward Facing Spider', 'Happy Fish', 'Left Facing Ant', 'Little Scorpion',
  'Menacing Mantis', 'Orange Leg Critter', 'Purple Pointed Critter', 'Right Facing Stump Snail',
  'Round Green Critter', 'Small Blue Chick', 'Standing Bean Bug', 'Standing Caterpillar',
  'Tadpole', 'Walking Stick Nymph',
  // Misc (90)
  'AFK', 'Alert Icon', 'Atom Symbol', 'Auryn', 'Barcode', 'Baseball Swing', 'Black Diamond',
  'Black Star', 'Blue Square', 'Built Ship', 'Classic Killroy', 'Colorful Buttons',
  'Cool Backpack', 'Cop And Robber', 'Cyan Hilted Sword', 'Cyan Star', 'Dark Flame',
  'Desperate Booth', 'Doodle S', 'Eighth Note', 'Eviction', 'Evil Pig', 'Fork And Knife',
  'Giraffe', 'Glowing Smile', 'Green Check Mark', 'Green Circle', 'Green Plus Sign',
  'Green Sell', 'Grey Diamond Logo', 'Grey Raining Cloud', 'Grey Shape Companion',
  'Hourglass', 'Interrobang Block', 'Jack-0-Lantern', 'Killroy With Hair', 'Launching Rocket',
  'Lightning', 'Orphan Dog', 'Pale Heart', 'Palm Tree', 'Peace Sign Hand', 'Pink Chair',
  'Pink Cupcake', 'Pizza Delivery Man', 'Prehistoric Boar', 'Prehistoric Hand', 'Pyramid',
  'Red Palm Hand', 'Red Wailing Cry', 'Red X', 'Rhubarb', 'Robot Head', 'Rubber Duck',
  'Saturn', 'Shining Halo', 'Shining Star', 'Shrugging Heart', 'Silly Tongue', 'Simple Cloud',
  'Simple Mountain', 'Simple Skyscraper', 'Simple Sun', 'Small Flame', 'Small Shield',
  'Sprout', 'Standing Beekeeper', 'Taunting Doodle Person', 'Theatrical Intruder',
  'Thumbs Up Hand', 'Tiny House', 'TNT', 'Tornado', 'Tough Potato', 'Traffic Light',
  'Triple Exclamation', 'Wall Crack', 'Waving Townsperson', 'Waxing Crescent Moon',
  'White Flag', 'Window', 'Wishbone', 'Yellow Coffee Mug', 'Yellow Hi', 'Yellow Left Arrow',
  'Yellow Right Arrow', 'Yellow Sticky Hand', 'Yellow Umbrella', 'Yellow Walking Wiggly Person',
  'Young Elf',
  // Art (12)
  'Abstract Color Painting', 'Banana Painting', 'Ionic Column Base', 'Ionic Column Middle',
  'Ionic Column Top', 'Moai', 'Nessie', 'Orange Green Tri Deco', 'Orange Step Array',
  'Pearl Girl', 'Prism Painting', 'Red Doodle Person',
  // Gems (16)
  'Blue And Green Marble', 'Cyan Decorative Border', 'Diamond Cluster', 'Diamond Trim',
  'Left Gold Swirl Fleuron', 'Left Mythic Gem Fleuron', 'Left Shining Diamond Fleuron',
  'Mythic M', 'Orange Swirled Marble', 'Purple Fleuron', 'Right Gold Swirl Fleuron',
  'Right Mythic Gem Fleuron', 'Right Shining Diamond Fleuron', 'Royal Bear', 'Royal Symbol',
  'Yellow Swirled Marble',
  // Nectar (5)
  'Comforting Nectar Icon', 'Invigorating Nectar Icon', 'Motivating Nectar Icon',
  'Refreshing Nectar Icon', 'Satisfying Nectar Icon',
  // Flowers (5)
  'Purple 4-Point Flower', 'Small Dandelion', 'Small Pink Tulip', 'Small Tickseed',
  'Small White Daisy',
  // Mushrooms (10)
  'Black Truffle Mushroom', 'Chanterelle Mushroom', 'Fly Agaric Mushroom', 'Morel Mushroom',
  'Oiler Mushroom', 'Porcini Mushroom', 'Prismatic Mushroom', 'Shiitake Mushroom',
  'Spore Covered Puffshroom', 'White Button Mushroom',
  // Leaves (5)
  'Autumn Leaf', 'Green Leaf', 'Maple Leaf', 'Oak Leaf', 'Pine Needle',
  // Tools (19)
  'Bubble Wand', 'Clippers', 'Dark Scythe', 'Electro-Magnet', 'Golden Rake', 'Gummyballer',
  'Honey Dipper', 'Magnet', 'Petal Wand', 'Porcelain Dipper', 'Pulsar', 'Rake', 'Scissors',
  'Scooper', 'Scythe', 'Spark Staff', 'Super-Scooper', 'Tide Popper', 'Vacuum',
  // Field Stamps (19)
  'Ant Field Stamp', 'Bamboo Field Stamp', 'Blue Flower Field Stamp', 'Cactus Field Stamp',
  'Clover Field Stamp', 'Coconut Field Stamp', 'Dandelion Field Stamp', 'Hub Field Stamp',
  'Mountain Top Field Stamp', 'Mushroom Field Stamp', 'Pepper Patch Stamp',
  'Pine Tree Forest Stamp', 'Pineapple Patch Stamp', 'Pumpkin Patch Stamp', 'Rose Field Stamp',
  'Spider Field Stamp', 'Strawberry Field Stamp', 'Stump Field Stamp', 'Sunflower Field Stamp',
  // Beesmas (11)
  'BBM From Below', 'Blue Beesmas Light', 'Critter In A Stocking', 'Festive Pea',
  'Festive Pufferfish', 'Flying Bee Bear', 'Flying Festive Bee', 'Green Beesmas Light',
  'Party Robo Bear', 'Red Beesmas Light', 'Yellow Beesmas Light',
  // Star Signs (12)
  'Aries Star Sign', 'Taurus Star Sign', 'Gemini Star Sign', 'Cancer Star Sign',
  'Leo Star Sign', 'Virgo Star Sign', 'Libra Star Sign', 'Scorpio Star Sign',
  'Sagittarius Star Sign', 'Capricorn Star Sign', 'Aquarius Star Sign', 'Pisces Star Sign'
];

// Create slug from name
function createSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Convert name to Wiki page name
function nameToWikiName(name) {
  return name.replace(/ /g, '_');
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

// Try to fetch image from Sticker wiki page
async function getImageFromStickerPage(stickerName) {
  const wikiUrl = `https://bee-swarm-simulator.fandom.com/wiki/Sticker`;

  return new Promise((resolve, reject) => {
    https.get(wikiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        // Find image for this specific sticker
        // Pattern: look for the sticker name near an image URL
        const escapedName = stickerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patterns = [
          new RegExp(`data-src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+\\.png/revision/latest[^"]*)"[^>]*>[^<]*${escapedName}`, 'i'),
          new RegExp(`${escapedName}[^<]*<[^>]*src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+\\.png)"`, 'i'),
          new RegExp(`alt="${escapedName}"[^>]*src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+\\.png)"`, 'i'),
          new RegExp(`src="(https://static\\.wikia\\.nocookie\\.net/bee-swarm-simulator/images/[^"]+/${escapedName.replace(/ /g, '_')}\\.png[^"]*)"`, 'i')
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            let imgUrl = match[1];
            imgUrl = imgUrl.replace(/\/scale-to-width-down\/\d+/, '');
            imgUrl = imgUrl.replace(/\/revision\/latest\/.*$/, '/revision/latest');
            resolve(imgUrl);
            return;
          }
        }

        reject(new Error('Image not found on Sticker page'));
      });
    }).on('error', reject);
  });
}

// Try to fetch image from individual wiki page
async function getImageFromDirectPage(pageName) {
  const wikiUrl = `https://bee-swarm-simulator.fandom.com/wiki/${encodeURIComponent(pageName)}`;

  return new Promise((resolve, reject) => {
    https.get(wikiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 404) {
        reject(new Error('Page not found'));
        return;
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        const patterns = [
          /data-src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png\/revision\/latest[^"]*)"/i,
          /src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png\/revision\/latest[^"]*)"/i,
          /src="(https:\/\/static\.wikia\.nocookie\.net\/bee-swarm-simulator\/images\/[^"]+\.png)"/i
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            let imgUrl = match[1];
            imgUrl = imgUrl.replace(/\/scale-to-width-down\/\d+/, '');
            imgUrl = imgUrl.replace(/\/revision\/latest\/.*$/, '/revision/latest');
            resolve(imgUrl);
            return;
          }
        }

        reject(new Error('Image not found'));
      });
    }).on('error', reject);
  });
}

// Try multiple strategies to get image
async function getImageUrl(name) {
  const wikiName = nameToWikiName(name);

  // Try direct page first (for items like tools, cub skins, etc.)
  try {
    return await getImageFromDirectPage(wikiName);
  } catch (e) {
    // Continue to next strategy
  }

  // Try with "_sticker" suffix
  try {
    return await getImageFromDirectPage(`${wikiName}_(sticker)`);
  } catch (e) {
    // Continue to next strategy
  }

  // Try Sticker page (main sticker page might have all images)
  try {
    return await getImageFromStickerPage(name);
  } catch (e) {
    throw new Error(`Could not find image for: ${name}`);
  }
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stickers');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting sticker image download...');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Total stickers: ${stickers.length}\n`);

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < stickers.length; i++) {
    const name = stickers[i];
    const slug = createSlug(name);
    const destPath = path.join(outputDir, `${slug}.png`);

    // Skip if already exists and valid
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 500) {
        console.log(`[${i + 1}/${stickers.length}] SKIP ${slug} (already exists)`);
        success++;
        continue;
      }
    }

    try {
      console.log(`[${i + 1}/${stickers.length}] Downloading ${name}...`);
      const imageUrl = await getImageUrl(name);
      await downloadFile(imageUrl, destPath);

      const stats = fs.statSync(destPath);
      console.log(`  -> OK (${stats.size} bytes)`);
      success++;
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
      failed++;
      failures.push({ name, slug, error: err.message });
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Success: ${success}/${stickers.length}`);
  console.log(`Failed: ${failed}/${stickers.length}`);

  if (failures.length > 0) {
    console.log('\nFailed downloads:');
    failures.forEach(f => console.log(`  - ${f.name}: ${f.error}`));

    // Save failed list to file for later processing
    fs.writeFileSync(
      path.join(__dirname, 'failed-stickers.json'),
      JSON.stringify(failures, null, 2)
    );
    console.log('\nFailed list saved to scripts/failed-stickers.json');
  }
}

main().catch(console.error);
