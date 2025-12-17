import type { GameState, GameMap, TileType, GameItem } from './types'
import { MAP_WIDTH, MAP_HEIGHT } from './types'

// Test items
const RUSTY_KEY: GameItem = {
  id: 'rusty-key',
  name: 'Rusty Key',
  description: 'An old key covered in rust. It might open something.',
}

const HEALING_POTION: GameItem = {
  id: 'healing-potion',
  name: 'Healing Potion',
  description: 'A red liquid that restores health.',
}

const OLD_MAP: GameItem = {
  id: 'old-map',
  name: 'Old Map',
  description: 'A faded map showing secret passages.',
}

const GOLD_COIN: GameItem = {
  id: 'gold-coin',
  name: 'Gold Coin',
  description: 'A shiny gold coin.',
}

const MAGIC_SCROLL: GameItem = {
  id: 'magic-scroll',
  name: 'Magic Scroll',
  description: 'A scroll containing ancient words of power.',
}

// Create a map with walls around the border
function createInitialMap(): GameMap {
  const tiles: TileType[][] = []

  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row: TileType[] = []
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Walls on the border
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        row.push('wall')
      } else {
        row.push('floor')
      }
    }
    tiles.push(row)
  }

  // Add some interior walls for interest
  tiles[3][5] = 'wall'
  tiles[3][6] = 'wall'
  tiles[4][5] = 'wall'
  tiles[7][10] = 'wall'
  tiles[7][11] = 'wall'
  tiles[8][10] = 'wall'

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
  }
}

// Create the initial game state with test data
export function createInitialGameState(): GameState {
  return {
    player: {
      position: { x: 2, y: 2 },
      inventory: {
        items: [RUSTY_KEY, HEALING_POTION],
      },
    },
    npcs: [
      {
        id: 'merchant',
        name: 'Merchant',
        position: { x: 8, y: 3 },
        inventory: {
          items: [OLD_MAP, GOLD_COIN],
        },
        dialogue: [
          'Welcome, traveler!',
          'I have many wares for sale.',
          'Perhaps we can make a trade?',
        ],
      },
      {
        id: 'wizard',
        name: 'Wizard',
        position: { x: 12, y: 8 },
        inventory: {
          items: [MAGIC_SCROLL],
        },
        dialogue: [
          'Ah, a visitor...',
          'I sense great potential in you.',
          'Take this scroll, it may aid your quest.',
        ],
      },
      {
        id: 'guard',
        name: 'Guard',
        position: { x: 4, y: 7 },
        inventory: {
          items: [],
        },
        dialogue: [
          'Halt! State your business.',
          'Hmm, you seem harmless enough.',
          'Move along, citizen.',
        ],
      },
    ],
    map: createInitialMap(),
    activeDialogue: null,
  }
}

