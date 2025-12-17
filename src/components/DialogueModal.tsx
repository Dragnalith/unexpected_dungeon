import * as stylex from '@stylexjs/stylex'
import { styles } from './DialogueModal.style'
import type { NPC, Player, ActiveDialogue, GameItem } from '../game/types'

interface DialogueModalProps {
  npc: NPC
  player: Player
  activeDialogue: ActiveDialogue
  onClose: () => void
  onNextDialogue: () => void
  onGiveItem: (itemId: string) => void
  onTakeItem: (itemId: string) => void
}

export function DialogueModal({
  npc,
  player,
  activeDialogue,
  onClose,
  onNextDialogue,
  onGiveItem,
  onTakeItem,
}: DialogueModalProps) {
  const currentDialogue = npc.dialogue[activeDialogue.dialogueIndex] || ''
  const hasMoreDialogue = activeDialogue.dialogueIndex < npc.dialogue.length - 1

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'Enter' && hasMoreDialogue) {
      onNextDialogue()
    }
  }

  return (
    <div
      {...stylex.props(styles.overlay)}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        {...stylex.props(styles.modal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div {...stylex.props(styles.header)}>
          <h3 {...stylex.props(styles.npcName)}>{npc.name}</h3>
          <button {...stylex.props(styles.closeButton)} onClick={onClose}>
            ✕
          </button>
        </div>

        <div {...stylex.props(styles.dialogue)}>
          "{currentDialogue}"
          {hasMoreDialogue && (
            <button {...stylex.props(styles.nextButton)} onClick={onNextDialogue}>
              Next →
            </button>
          )}
        </div>

        <div {...stylex.props(styles.section)}>
          <div {...stylex.props(styles.sectionTitle)}>Your Items</div>
          <div {...stylex.props(styles.itemList)}>
            {player.inventory.items.length === 0 ? (
              <span {...stylex.props(styles.emptyText)}>No items</span>
            ) : (
              player.inventory.items.map((item: GameItem) => (
                <div key={item.id} {...stylex.props(styles.itemRow)}>
                  <span {...stylex.props(styles.itemName)} title={item.description}>
                    {item.name}
                  </span>
                  <button
                    {...stylex.props(styles.actionButton)}
                    onClick={() => onGiveItem(item.id)}
                  >
                    Give
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div {...stylex.props(styles.section)}>
          <div {...stylex.props(styles.sectionTitle)}>{npc.name}'s Items</div>
          <div {...stylex.props(styles.itemList)}>
            {npc.inventory.items.length === 0 ? (
              <span {...stylex.props(styles.emptyText)}>No items</span>
            ) : (
              npc.inventory.items.map((item: GameItem) => (
                <div key={item.id} {...stylex.props(styles.itemRow)}>
                  <span {...stylex.props(styles.itemName)} title={item.description}>
                    {item.name}
                  </span>
                  <button
                    {...stylex.props(styles.actionButton)}
                    onClick={() => onTakeItem(item.id)}
                  >
                    Take
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

