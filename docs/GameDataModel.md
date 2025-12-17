# Game Data Model

This document describes the data model for the tile-based dungeon game.

## Constants

- **Tile Size**: 16x16 pixels
- **Map Dimensions**: 16 tiles wide × 12 tiles tall (256×192 pixels base resolution)

## Core Types

### Position

Represents a location on the tile grid.

| Field | Type | Description |
|-------|------|-------------|
| `x` | `number` | Horizontal tile coordinate (0-15) |
| `y` | `number` | Vertical tile coordinate (0-11) |

### TileType

Enum representing the type of terrain tile.

| Value | Description |
|-------|-------------|
| `floor` | Walkable terrain |
| `wall` | Impassable terrain |

### GameItem

An item that can be owned by the player or NPCs. Items are not visible on the map.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `description` | `string` | Item description |

### Inventory

A collection of items owned by an entity.

| Field | Type | Description |
|-------|------|-------------|
| `items` | `GameItem[]` | Array of owned items |

### Player

The player-controlled character.

| Field | Type | Description |
|-------|------|-------------|
| `position` | `Position` | Current tile position |
| `inventory` | `Inventory` | Owned items |

### NPC

A non-player character that can be interacted with.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `position` | `Position` | Tile position (static) |
| `inventory` | `Inventory` | Items available for exchange |
| `dialogue` | `string[]` | Lines of dialogue |

### GameMap

The game world layout.

| Field | Type | Description |
|-------|------|-------------|
| `width` | `number` | Map width in tiles (16) |
| `height` | `number` | Map height in tiles (12) |
| `tiles` | `TileType[][]` | 2D array of tile types [y][x] |

### ActiveDialogue

State for when the player is interacting with an NPC.

| Field | Type | Description |
|-------|------|-------------|
| `npcId` | `string` | ID of the NPC being talked to |
| `dialogueIndex` | `number` | Current line of dialogue |

### GameState

The complete game state.

| Field | Type | Description |
|-------|------|-------------|
| `player` | `Player` | Player state |
| `npcs` | `NPC[]` | All NPCs in the game |
| `map` | `GameMap` | The game map |
| `activeDialogue` | `ActiveDialogue \| null` | Current dialogue state |

## Interactions

### Movement
- Player moves one tile at a time using arrow keys
- Movement is blocked by walls and map boundaries
- Movement is blocked by NPCs (cannot walk through them)

### NPC Interaction
- Player initiates dialogue by moving toward an NPC
- Dialogue opens a modal overlay
- Player can exchange items with the NPC
- Dialogue closes when player presses a close button or Escape

