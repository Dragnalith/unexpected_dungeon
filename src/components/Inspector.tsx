import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './Inspector.style'
import type { GameState } from '../game/types'

type InspectorProps = {
  gameState: GameState
  width: number
  visible: boolean
  onStartResize: () => void
}

export function Inspector({ gameState, width, visible, onStartResize }: InspectorProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(['player'])

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const { player, npcs } = gameState

  return (
    <section
      {...stylex.props(styles.panel, visible ? styles.panelWithBorder : styles.panelNoBorder)}
      style={{ width: visible ? `${width}%` : 0 }}
    >
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.title)}>Inspector</p>
        </div>
        <div {...stylex.props(styles.list)}>
          {/* Player Section */}
          <div {...stylex.props(styles.item)}>
            <button
              onClick={() => toggleExpanded('player')}
              {...stylex.props(styles.itemButton)}
              aria-expanded={expandedIds.includes('player')}
            >
              <span {...stylex.props(styles.itemIcon)}>🎮</span>
              <span {...stylex.props(styles.itemName)}>Player</span>
              <span {...stylex.props(styles.itemExpandIcon)}>
                {expandedIds.includes('player') ? '▾' : '▸'}
              </span>
            </button>

            {expandedIds.includes('player') && (
              <div {...stylex.props(styles.itemDetails)}>
                <div {...stylex.props(styles.itemDetailRow)}>
                  <span {...stylex.props(styles.itemDetailLabel)}>position:</span>
                  <span>({player.position.x}, {player.position.y})</span>
                </div>
                <div {...stylex.props(styles.itemDetailRow)}>
                  <span {...stylex.props(styles.itemDetailLabel)}>inventory:</span>
                  <span>{player.inventory.items.length} item(s)</span>
                </div>
                {player.inventory.items.map((item) => (
                  <div key={item.id} {...stylex.props(styles.subItem)}>
                    <span {...stylex.props(styles.subItemIcon)}>📦</span>
                    <span {...stylex.props(styles.subItemName)}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NPCs Section */}
          {npcs.map((npc) => (
            <div key={npc.id} {...stylex.props(styles.item)}>
              <button
                onClick={() => toggleExpanded(npc.id)}
                {...stylex.props(styles.itemButton)}
                aria-expanded={expandedIds.includes(npc.id)}
              >
                <span {...stylex.props(styles.itemIcon)}>🧑</span>
                <span {...stylex.props(styles.itemName)}>{npc.name}</span>
                <span {...stylex.props(styles.itemExpandIcon)}>
                  {expandedIds.includes(npc.id) ? '▾' : '▸'}
                </span>
              </button>

              {expandedIds.includes(npc.id) && (
                <div {...stylex.props(styles.itemDetails)}>
                  <div {...stylex.props(styles.itemDetailRow)}>
                    <span {...stylex.props(styles.itemDetailLabel)}>position:</span>
                    <span>({npc.position.x}, {npc.position.y})</span>
                  </div>
                  <div {...stylex.props(styles.itemDetailRow)}>
                    <span {...stylex.props(styles.itemDetailLabel)}>inventory:</span>
                    <span>{npc.inventory.items.length} item(s)</span>
                  </div>
                  {npc.inventory.items.map((item) => (
                    <div key={item.id} {...stylex.props(styles.subItem)}>
                      <span {...stylex.props(styles.subItemIcon)}>📦</span>
                      <span {...stylex.props(styles.subItemName)}>{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {visible && (
        <div
          {...stylex.props(styles.resizeHandle)}
          onMouseDown={onStartResize}
          aria-label="Resize inspector panel"
        />
      )}
    </section>
  )
}
