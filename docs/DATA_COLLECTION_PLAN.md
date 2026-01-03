# BSS Nexus Data Collection Plan

> Last Updated: 2026-01-03

## Overview

This document outlines the complete data collection plan for BSS Nexus, a utility website for Roblox's Bee Swarm Simulator game.

---

## 1. Core Trading Data (Tradeable Items)

According to the game's trading system, **only 3 types of items are tradeable**:

| # | Category | Count | Data Source | Fields to Collect |
|---|----------|-------|-------------|-------------------|
| 1 | **Stickers** | 288 | Wiki + bssmvalues | name, type, rarity, value, demand, buff, obtainable, image |
| 2 | **Beequips** | 41 | Wiki + bssmvalues | name, type, rarity, stats, value, image |
| 3 | **Cub Skins** | ~15 | Wiki + bssmvalues | name, rarity, value, image |

---

## 2. Sticker Sub-Categories (288 Total)

| Sub-Category | Code | Est. Count | Examples |
|--------------|------|------------|----------|
| Bee Stickers | type-Bee | 46+ | Basic Bee, Bomber Bee... |
| Bear Stickers | type-Bear | 12+ | Black Bear, Brown Bear... |
| Mob Stickers | type-Mob | 34+ | Ladybug, Spider... |
| Tool Stickers | type-Tool | 18+ | Scooper, Petal Wand... |
| Field Stamps | type-Stamp | 23 | Dandelion Field Stamp... |
| Star Signs | type-Sign | 12 | Aries, Taurus... |
| Leaf Stickers | type-Leaf | 10+ | Various leaves |
| Flower Stickers | type-Flower | 10+ | Various flowers |
| Mushroom Stickers | type-Puffshroom | 10+ | Various mushrooms |
| Gem Stickers | type-Gem | 5+ | Gem types |
| Nectar Stickers | type-Nectar | 6+ | Nectar types |
| Art Stickers | type-Art | 20+ | Art pieces |
| Misc Stickers | type-Misc | 30+ | Miscellaneous |
| Beesmas Stickers | event-Beesmas | 30+ | Holiday exclusive |
| Hive Skins | type-HiveSkin | ~10 | Hive skins |
| Vouchers | type-Voucher | ~5 | Vouchers |

---

## 3. Game Reference Data (Non-Tradeable)

| # | Category | Count | Data Source | Purpose |
|---|----------|-------|-------------|---------|
| 1 | **Bees** | 46 | Wiki/Bees | Hive Builder |
| 2 | **Fields** | 23 | Wiki/Fields | Field Stamps mapping |
| 3 | **Tools** | 18 | Wiki/Tools | Tool Stickers mapping |
| 4 | **Bears** | 12+ | Wiki/Quest_Givers | Bear Stickers mapping |
| 5 | **Mobs** | 34 | Wiki/Mobs | Mob Stickers mapping |
| 6 | **Codes** | 50+ | Wiki/Codes | Utility feature |

---

## 4. Beequips Details

### 4.1 Non-Event Beequips (21)

Thimble, Sweatband, Bandage, Thumbtack, Camo Bandana, Bottle Cap, Kazoo, Smiley Sticker, Whistle, Charm Bracelet, Paperclip, Beret, Bang Snap, Bead Lizard, Pink Shades, Lei, Demon Talisman, Camphor Lip Balm, Autumn Sunhat, Rose Headband, Candy Ring

### 4.2 Beesmas Beequips (19)

Elf Cap, Single Mitten, Warm Scarf, Peppermint Antennas, Beesmas Top, Pinecone, Icicles, Beesmas Tree Hat, Bubble Light, Snow Tiara, Snowglobe, Reindeer Antlers, Toy Horn, Paper Angel, Toy Drum, Lump Of Coal, Poinsettia, Electric Candle, Festive Wreath

---

## 5. Bees Complete List (46)

### By Rarity

| Rarity | Count | Bees |
|--------|-------|------|
| Common | 1 | Basic Bee |
| Rare | 9 | Bomber, Brave, Bumble, Cool, Hasty, Looker, Rad, Rascal, Stubborn |
| Epic | 11 | Bubble, Bucko, Commander, Demo, Exhausted, Fire, Frosty, Honey, Rage, Riley, Shocked |
| Legendary | 8 | Baby, Carpenter, Demon, Diamond, Lion, Music, Ninja, Shy |
| Mythic | 6 | Buoyant, Fuzzy, Precise, Spicy, Tadpole, Vector |
| Event | 11 | Bear, Cobalt, Crimson, Digital, Festive, Gummy, Photon, Puppy, Tabby, Vicious, Windy |

### By Color

| Color | Bees |
|-------|------|
| Red | Rad, Rascal, Rage, Riley, Fire, Demon, Shy, Precise, Spicy, Crimson, Festive |
| Blue | Bumble, Cool, Bubble, Bucko, Frosty, Diamond, Ninja, Buoyant, Tadpole, Cobalt, Vicious |
| Colorless | All others |

---

## 6. Fields Complete List (23)

### Main Fields (19)
1. Sunflower
2. Dandelion
3. Mushroom
4. Blue Flower
5. Clover
6. Strawberry
7. Spider
8. Bamboo
9. Pineapple
10. Stump
11. Cactus
12. Pumpkin
13. Pine Tree
14. Rose
15. Mountain Top
16. Pepper
17. Coconut
18. Mixed Brick
19. Blue Brick

### Special Fields (4)
- Hub Field
- Ant Field
- Red Brick Field
- White Brick Field

---

## 7. Mobs Complete List (34)

### Regular Mobs
Ladybug, Rhino Beetle, Spider, Mantis, Scorpion, Werewolf

### Mini-Bosses
Stump Snail, Rogue Vicious Bee, Wild Windy Bee, Commando Chick, Snowbear

### Bosses
King Beetle, Tunnel Bear, Mondo Chick, Coconut Crab, Stick Bug

### Miscellaneous
Aphids (Normal, Rage, Armored, Diamond), Army Ant, Bean Bug, Cave Monster, Cogmower, Cogturret, Festive Nymph, Fire Ant, Firefly, Flying Ant, Frog, Giant Ant, Golden Cogmower, Mechsquito, Mega Mechsquito, Puffshroom, Party Cogmower, Party Cogturret, Party Mechsquito, Party Mega Mechsquito, Regular Ant, Stick Nymph, Zombie, Slime, Brick Bloom

---

## 8. Bears/NPCs Complete List

### Permanent Quest Bears (8)
Black Bear, Brown Bear, Mother Bear, Panda Bear, Science Bear, Dapper Bear, Polar Bear, Spirit Bear

### Other Quest Givers
Onett, Gifted Bucko Bee, Gifted Riley Bee, Digital Bee (NPC), Honey Bee (NPC)

### Traveling/Temporary Bears
Bee Bear, Sun Bear, Gummy Bear, Bubble Bee Man

### Hostile Bears
Tunnel Bear, Shadow Bear, Snowbear

---

## 9. Data Schema Definitions

### 9.1 Sticker Schema

```typescript
interface Sticker {
  id: string;
  name: string;
  slug: string;
  type: 'Bee' | 'Bear' | 'Mob' | 'Tool' | 'Stamp' | 'Sign' | 'Leaf' |
        'Flower' | 'Mushroom' | 'Gem' | 'Nectar' | 'Art' | 'Misc' |
        'Beesmas' | 'HiveSkin' | 'Voucher';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Event';
  value: number;           // honey value
  demand: 'Low' | 'Medium' | 'High' | 'Very High';
  trend: 'up' | 'down' | 'stable';
  buff: string;            // Stack Boost effect
  reward: string;          // Stack Reward
  obtainable: boolean;     // Is obtainable (UNOBT = false)
  obtain_method: string;   // How to obtain
  image_url: string;
  description: string;
  last_updated: Date;
}
```

### 9.2 Beequip Schema

```typescript
interface Beequip {
  id: string;
  name: string;
  slug: string;
  type: 'Regular' | 'Beesmas';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  stats: {
    pollen?: number;
    conversion?: number;
    capacity?: number;
    attack?: number;
    energy?: number;
    speed?: number;
    gather_amount?: number;
    bee_ability?: number;
    critical?: number;
    instant_conversion?: number;
  };
  value: number;
  demand: 'Low' | 'Medium' | 'High';
  trend: 'up' | 'down' | 'stable';
  image_url: string;
  description: string;
  last_updated: Date;
}
```

### 9.3 Bee Schema

```typescript
interface Bee {
  id: string;
  name: string;
  slug: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Event';
  color: 'Red' | 'Blue' | 'Colorless';
  energy: number;
  speed: number;
  attack: number;
  gather_amount: number;
  abilities: string[];
  gifted_ability: string;
  description: string;
  image_url: string;
  obtain_method: string;
}
```

### 9.4 Code Schema

```typescript
interface Code {
  id: string;
  code: string;
  rewards: string[];
  status: 'active' | 'expired';
  added_date: Date;
  expired_date?: Date;
}
```

---

## 10. Data Sources Reference

| Data Type | Base Data Source | Value Data Source | Image Source |
|-----------|------------------|-------------------|--------------|
| Stickers | Wiki/Sticker | bssmvalues.com | Wiki |
| Beequips | Wiki/Beequip | bssmvalues.com | Wiki |
| Cub Skins | Wiki | bssmvalues.com | Wiki |
| Bees | Wiki/Bees | - | Wiki |
| Fields | Wiki/Fields | - | Wiki |
| Tools | Wiki/Tools | - | Wiki |
| Mobs | Wiki/Mobs | - | Wiki |
| Bears | Wiki/Quest_Givers | - | Wiki |
| Codes | Wiki/Codes | - | - |

### Source URLs

- **Wiki Base**: https://bee-swarm-simulator.fandom.com/wiki/
- **BSS Values**: https://www.bssmvalues.com/
- **BSS Trades**: https://bsstrades.com/
- **Traderie**: https://traderie.com/beeswarmsimulator/values

---

## 11. Collection Checklist

| Check Item | Status |
|------------|--------|
| All tradeable item types | Stickers, Beequips, Cub Skins |
| All sticker sub-categories | 16 sub-categories |
| All beequip sub-categories | Regular + Beesmas |
| Complete bee list | 46 bees ✅ **DONE** |
| Complete field list | 23 fields (for Field Stamps) |
| Complete tool list | 18 tools (for Tool Stickers) |
| Complete mob list | 34 mobs (for Mob Stickers) |
| NPC/Bears list | 12+ (for Bear Stickers) |
| Codes | Active + Expired |
| Value data fields | value, demand, trend |
| Image URLs | All items |

---

## 11.1 Collection Progress

| Category | Status | Count | File Location |
|----------|--------|-------|---------------|
| Bees | ✅ Complete | 46/46 | `src/data/bees.ts` |
| Codes | ✅ Complete | 33 (12 active + 21 expired) | `src/data/codes.ts` |
| Beequips | ✅ Complete | 41/41 (22 regular + 19 beesmas) | `src/data/beequips.ts` |
| Stickers | ✅ Complete | 282/288 (17 categories) | `src/data/stickers.ts` |
| Cub Skins | ✅ (In Stickers) | 11 | Included in stickers.ts |
| Hive Skins | ✅ (In Stickers) | 12 | Included in stickers.ts |
| Star Signs | ✅ (In Stickers) | 12 | Included in stickers.ts |

**Last Updated: 2026-01-03**

### Sticker Categories Breakdown
| Sub-Category | Count |
|-------------|-------|
| Cub Skins | 11 |
| Hive Skins | 12 |
| Vouchers | 6 |
| Bee Stickers | 17 |
| Bear Stickers | 14 |
| Mob Stickers | 18 |
| Misc Stickers | 90 |
| Art Stickers | 12 |
| Gem Stickers | 16 |
| Nectar Stickers | 5 |
| Flower Stickers | 5 |
| Mushroom Stickers | 10 |
| Leaf Stickers | 5 |
| Tool Stickers | 19 |
| Field Stamps | 19 |
| Beesmas Stickers | 11 |
| Star Signs | 12 |
| **Total** | **282** |

---

## 12. Collection Priority Order

1. **Bees** - Core data, fixed count (46), for Hive Builder
2. **Codes** - Most practical, users care most
3. **Stickers** - Largest count (288), collect by category
4. **Beequips** - Moderate count (41)
5. **Cub Skins / Hive Skins** - Small count, high value

---

## Notes

- All data should be verified against multiple sources
- Value data updates frequently, consider implementing auto-refresh
- Image URLs should be cached locally to avoid hotlinking issues
- Consider rate limiting when scraping data sources
