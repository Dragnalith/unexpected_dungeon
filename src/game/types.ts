// Game constants
export const TILE_SIZE = 16
export const MAP_WIDTH = 16
export const MAP_HEIGHT = 12

// Tile types for the map
export type TileType = 'floor' | 'wall'

// Position on the tile grid
export interface Position {
  x: number
  y: number
}

// An item that can be owned by player or NPCs
export interface GameItem {
  id: string
  name: string
  description: string
}

// Collection of items
export interface Inventory {
  items: GameItem[]
}

// The player character
export interface Player {
  position: Position
  inventory: Inventory
}

// Non-player character
export interface NPC {
  id: string
  name: string
  position: Position
  inventory: Inventory
  dialogue: string[]
}

// The game map
export interface GameMap {
  width: number
  height: number
  tiles: TileType[][]
}

// Active dialogue state
export interface ActiveDialogue {
  npcId: string
  dialogueIndex: number
}

// Complete game state
export interface GameState {
  player: Player
  npcs: NPC[]
  map: GameMap
  activeDialogue: ActiveDialogue | null
}

