import { useCallback, useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './GameCanvas.style'
import { DialogueModal } from './DialogueModal'
import type { GameState } from '../game/types'
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../game/types'
import { renderGame } from '../game/renderer'
import { keyToDirection, movePlayer } from '../game/input'

interface GameCanvasProps {
  gameState: GameState
  onGameStateChange: (state: GameState) => void
}

export function GameCanvas({ gameState, onGameStateChange }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Calculate scale to fit canvas in container while maintaining aspect ratio
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const baseWidth = MAP_WIDTH * TILE_SIZE
      const baseHeight = MAP_HEIGHT * TILE_SIZE

      const scaleX = containerWidth / baseWidth
      const scaleY = containerHeight / baseHeight
      const newScale = Math.min(scaleX, scaleY)

      setScale(Math.max(1, Math.floor(newScale)))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Render game when state or scale changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderGame(ctx, gameState, scale)
  }, [gameState, scale])

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLCanvasElement>) => {
      // Ignore input if dialogue is open
      if (gameState.activeDialogue) return

      const direction = keyToDirection(e.key)
      if (direction) {
        e.preventDefault()
        const result = movePlayer(gameState, direction)

        if (result.interactedNpcId) {
          // Open dialogue with NPC
          onGameStateChange({
            ...result.newState,
            activeDialogue: {
              npcId: result.interactedNpcId,
              dialogueIndex: 0,
            },
          })
        } else if (result.moved) {
          onGameStateChange(result.newState)
        }
      }
    },
    [gameState, onGameStateChange]
  )

  // Close dialogue
  const handleCloseDialogue = useCallback(() => {
    onGameStateChange({
      ...gameState,
      activeDialogue: null,
    })
    // Refocus canvas after closing dialogue
    canvasRef.current?.focus()
  }, [gameState, onGameStateChange])

  // Advance dialogue
  const handleNextDialogue = useCallback(() => {
    if (!gameState.activeDialogue) return
    const npc = gameState.npcs.find((n) => n.id === gameState.activeDialogue?.npcId)
    if (!npc) return

    const nextIndex = gameState.activeDialogue.dialogueIndex + 1
    if (nextIndex >= npc.dialogue.length) {
      return // Stay on last dialogue
    }

    onGameStateChange({
      ...gameState,
      activeDialogue: {
        ...gameState.activeDialogue,
        dialogueIndex: nextIndex,
      },
    })
  }, [gameState, onGameStateChange])

  // Give item from player to NPC
  const handleGiveItem = useCallback((itemId: string) => {
    if (!gameState.activeDialogue) return

    const item = gameState.player.inventory.items.find((i) => i.id === itemId)
    if (!item) return

    onGameStateChange({
      ...gameState,
      player: {
        ...gameState.player,
        inventory: {
          items: gameState.player.inventory.items.filter((i) => i.id !== itemId),
        },
      },
      npcs: gameState.npcs.map((npc) =>
        npc.id === gameState.activeDialogue?.npcId
          ? {
              ...npc,
              inventory: {
                items: [...npc.inventory.items, item],
              },
            }
          : npc
      ),
    })
  }, [gameState, onGameStateChange])

  // Take item from NPC to player
  const handleTakeItem = useCallback((itemId: string) => {
    if (!gameState.activeDialogue) return

    const npc = gameState.npcs.find((n) => n.id === gameState.activeDialogue?.npcId)
    if (!npc) return

    const item = npc.inventory.items.find((i) => i.id === itemId)
    if (!item) return

    onGameStateChange({
      ...gameState,
      player: {
        ...gameState.player,
        inventory: {
          items: [...gameState.player.inventory.items, item],
        },
      },
      npcs: gameState.npcs.map((n) =>
        n.id === gameState.activeDialogue?.npcId
          ? {
              ...n,
              inventory: {
                items: n.inventory.items.filter((i) => i.id !== itemId),
              },
            }
          : n
      ),
    })
  }, [gameState, onGameStateChange])

  // Get current NPC for dialogue
  const activeNpc = gameState.activeDialogue
    ? gameState.npcs.find((n) => n.id === gameState.activeDialogue?.npcId)
    : null

  const canvasWidth = MAP_WIDTH * TILE_SIZE * scale
  const canvasHeight = MAP_HEIGHT * TILE_SIZE * scale

  return (
    <section {...stylex.props(styles.panel)}>
      <div ref={containerRef} {...stylex.props(styles.canvasWrapper)}>
        <div {...stylex.props(styles.canvasContainer)}>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            {...stylex.props(styles.canvas)}
          />
          {activeNpc && gameState.activeDialogue && (
            <DialogueModal
              npc={activeNpc}
              player={gameState.player}
              activeDialogue={gameState.activeDialogue}
              onClose={handleCloseDialogue}
              onNextDialogue={handleNextDialogue}
              onGiveItem={handleGiveItem}
              onTakeItem={handleTakeItem}
            />
          )}
        </div>
      </div>
    </section>
  )
}
