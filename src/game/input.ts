import type { GameState, Position } from './types'

export type Direction = 'up' | 'down' | 'left' | 'right'

// Map arrow keys to directions
export function keyToDirection(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
      return 'up'
    case 'ArrowDown':
      return 'down'
    case 'ArrowLeft':
      return 'left'
    case 'ArrowRight':
      return 'right'
    default:
      return null
  }
}

// Calculate new position based on direction
function getNewPosition(position: Position, direction: Direction): Position {
  switch (direction) {
    case 'up':
      return { x: position.x, y: position.y - 1 }
    case 'down':
      return { x: position.x, y: position.y + 1 }
    case 'left':
      return { x: position.x - 1, y: position.y }
    case 'right':
      return { x: position.x + 1, y: position.y }
  }
}

// Check if a position is within map bounds
function isInBounds(position: Position, state: GameState): boolean {
  return (
    position.x >= 0 &&
    position.x < state.map.width &&
    position.y >= 0 &&
    position.y < state.map.height
  )
}

// Check if a position is walkable (not a wall)
function isWalkable(position: Position, state: GameState): boolean {
  return state.map.tiles[position.y][position.x] === 'floor'
}

// Check if an NPC is at the given position
function getNpcAtPosition(position: Position, state: GameState): string | null {
  const npc = state.npcs.find(
    (n) => n.position.x === position.x && n.position.y === position.y
  )
  return npc ? npc.id : null
}

// Result of attempting to move
export interface MoveResult {
  moved: boolean
  newState: GameState
  interactedNpcId: string | null
}

// Attempt to move the player in a direction
export function movePlayer(state: GameState, direction: Direction): MoveResult {
  const newPosition = getNewPosition(state.player.position, direction)

  // Check bounds
  if (!isInBounds(newPosition, state)) {
    return { moved: false, newState: state, interactedNpcId: null }
  }

  // Check for NPC at target position
  const npcId = getNpcAtPosition(newPosition, state)
  if (npcId) {
    // Can't move onto NPC, but trigger interaction
    return { moved: false, newState: state, interactedNpcId: npcId }
  }

  // Check if tile is walkable
  if (!isWalkable(newPosition, state)) {
    return { moved: false, newState: state, interactedNpcId: null }
  }

  // Move successful
  return {
    moved: true,
    newState: {
      ...state,
      player: {
        ...state.player,
        position: newPosition,
      },
    },
    interactedNpcId: null,
  }
}

