import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './Inspector.style'

type ContentItem =
  | { id: number; type: 'enemy' | 'npc'; name: string; position: { x: number; y: number }; status: string }
  | { id: number; type: 'item'; name: string; description: string }

type InspectorProps = {
  items: ContentItem[]
  width: number
  visible: boolean
  onStartResize: () => void
}

function getStatusStyle(status: string) {
  if (status === 'alive') return styles.statusAlive
  if (status === 'dead') return styles.statusDead
  if (status === 'active') return styles.statusActive
  return null
}

function getIcon(item: ContentItem) {
  if (item.type === 'enemy') return '💀'
  if (item.type === 'npc') return '🧑'
  return '🔑'
}

export function Inspector({ items, width, visible, onStartResize }: InspectorProps) {
  const [expandedIds, setExpandedIds] = useState<number[]>([])

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

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
          {items.map((item) => (
            <div key={item.id} {...stylex.props(styles.item)}>
              <button
                onClick={() => toggleExpanded(item.id)}
                {...stylex.props(styles.itemButton)}
                aria-expanded={expandedIds.includes(item.id)}
              >
                <span {...stylex.props(styles.itemIcon)}>{getIcon(item)}</span>
                <span {...stylex.props(styles.itemId)}>{item.id}</span>
                <span {...stylex.props(styles.itemName)}>{item.name}</span>
                <span {...stylex.props(styles.itemExpandIcon)}>
                  {expandedIds.includes(item.id) ? '▾' : '▸'}
                </span>
              </button>

              {expandedIds.includes(item.id) && (
                <div {...stylex.props(styles.itemDetails)}>
                  {'position' in item && (
                    <div {...stylex.props(styles.itemDetailRow)}>
                      <span {...stylex.props(styles.itemDetailLabel)}>position:</span>
                      <span>
                        @ ({item.position.x},{item.position.y})
                      </span>
                    </div>
                  )}
                  {'status' in item && (
                    <div {...stylex.props(styles.itemDetailRow)}>
                      <span {...stylex.props(styles.itemDetailLabel)}>status:</span>
                      <span {...stylex.props(getStatusStyle(item.status))}>{item.status}</span>
                    </div>
                  )}
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
