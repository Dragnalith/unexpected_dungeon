import type { GameState } from './types'
import { TILE_SIZE } from './types'

// Color palette
const COLORS = {
  floor: '#1a1a2e',
  wall: '#0f0f1a',
  grid: '#2a2a3e',
  player: '#4ade80',
  npc: '#60a5fa',
  npcText: '#ffffff',
}

export function renderGame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  scale: number
): void {
  const { map, player, npcs } = state
  const scaledTile = TILE_SIZE * scale

  // Clear canvas
  ctx.fillStyle = COLORS.floor
  ctx.fillRect(0, 0, map.width * scaledTile, map.height * scaledTile)

  // Draw tiles
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[y][x]
      const px = x * scaledTile
      const py = y * scaledTile

      // Fill tile
      ctx.fillStyle = tile === 'wall' ? COLORS.wall : COLORS.floor
      ctx.fillRect(px, py, scaledTile, scaledTile)

      // Draw grid lines
      ctx.strokeStyle = COLORS.grid
      ctx.lineWidth = 1
      ctx.strokeRect(px, py, scaledTile, scaledTile)
    }
  }

  // Draw NPCs
  for (const npc of npcs) {
    const px = npc.position.x * scaledTile
    const py = npc.position.y * scaledTile
    const padding = scaledTile * 0.1

    // NPC background
    ctx.fillStyle = COLORS.npc
    ctx.fillRect(
      px + padding,
      py + padding,
      scaledTile - padding * 2,
      scaledTile - padding * 2
    )

    // NPC initial letter
    ctx.fillStyle = COLORS.npcText
    ctx.font = `bold ${Math.floor(scaledTile * 0.6)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      npc.name.charAt(0).toUpperCase(),
      px + scaledTile / 2,
      py + scaledTile / 2
    )
  }

  // Draw player
  const playerPx = player.position.x * scaledTile
  const playerPy = player.position.y * scaledTile
  const playerPadding = scaledTile * 0.15

  ctx.fillStyle = COLORS.player
  ctx.fillRect(
    playerPx + playerPadding,
    playerPy + playerPadding,
    scaledTile - playerPadding * 2,
    scaledTile - playerPadding * 2
  )

  // Player indicator (small dot in center)
  ctx.fillStyle = '#166534'
  ctx.beginPath()
  ctx.arc(
    playerPx + scaledTile / 2,
    playerPy + scaledTile / 2,
    scaledTile * 0.15,
    0,
    Math.PI * 2
  )
  ctx.fill()
}

