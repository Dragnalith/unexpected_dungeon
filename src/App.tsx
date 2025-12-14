import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize, borderRadius, transitions } from './tokens.stylex'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ContentItem =
  | { id: number; type: 'enemy' | 'npc'; name: string; position: { x: number; y: number }; status: string }
  | { id: number; type: 'item'; name: string; description: string }

const MOCK_MESSAGES: Message[] = [
  { role: 'user', content: 'Create a quest where I need to find a key' },
  { role: 'assistant', content: "I'll create a quest for you. Spawning a goblin enemy at position (5,5) who will drop a key when defeated." },
  { role: 'user', content: 'Add an NPC who wants the key' },
  { role: 'assistant', content: 'Added Mayor NPC at position (8,8). He will give you a reward when you bring him the key.' },
]

const MOCK_CONTENT: ContentItem[] = [
  { id: 1, type: 'enemy', name: 'Goblin', position: { x: 5, y: 5 }, status: 'alive' },
  { id: 2, type: 'npc', name: 'Mayor', position: { x: 8, y: 8 }, status: 'active' },
  { id: 3, type: 'item', name: 'Rusty Key', description: 'An old key that might open something' },
  { id: 4, type: 'enemy', name: 'Skeleton', position: { x: 3, y: 7 }, status: 'dead' },
]

const styles = stylex.create({
  // Layout
  container: {
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: colors.gray900,
    color: colors.gray100,
    display: 'flex',
    flexDirection: 'column',
  },

  // Header
  header: {
    position: 'relative',
    height: spacing['12'],
    backgroundColor: colors.gray800,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.gray700,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: spacing['3'],
    paddingRight: spacing['3'],
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  headerLeftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
  },
  headerTitle: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray50,
    letterSpacing: '0.025em',
  },
  headerRightSection: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
  },

  // Toggle buttons
  toggleButton: {
    position: 'relative',
    display: 'inline-flex',
    height: spacing['9'],
    width: spacing['9'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    transition: `background-color ${transitions.fast}`,
    ':hover': {
      backgroundColor: 'rgba(55, 65, 81, 0.6)',
    },
  },
  toggleButtonOn: {
    color: colors.gray100,
  },
  toggleButtonOff: {
    color: colors.gray500,
  },
  toggleButtonIcon: {
    fontSize: fontSize.lg,
  },
  toggleButtonTooltip: {
    pointerEvents: 'none',
    position: 'absolute',
    bottom: '-2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    borderRadius: borderRadius.DEFAULT,
    backgroundColor: colors.gray700,
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
    paddingBottom: spacing['1'],
    fontSize: fontSize['10px'],
    color: colors.gray100,
    opacity: 0,
    transition: `opacity ${transitions.fast}`,
  },
  toggleButtonTooltipVisible: {
    ':hover': {
      opacity: 1,
    },
  },

  // Settings dropdown
  settingsDropdown: {
    position: 'absolute',
    top: spacing['12'],
    right: spacing['2'],
    width: '18rem',
    borderRadius: borderRadius.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray700,
    backgroundColor: colors.gray900,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    padding: spacing['4'],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['3'],
    zIndex: 20,
  },
  settingsLabel: {
    display: 'block',
    fontSize: fontSize.xs,
    color: colors.gray400,
    marginBottom: spacing['1'],
  },
  settingsInput: {
    width: '100%',
    borderRadius: borderRadius.DEFAULT,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray700,
    backgroundColor: colors.gray800,
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
    paddingBottom: spacing['1'],
    fontSize: fontSize.sm,
    color: colors.gray100,
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.blue500}`,
    },
  },
  settingsButtonWrapper: {
    paddingTop: spacing['1'],
  },
  settingsCloseButton: {
    width: '100%',
    borderRadius: borderRadius.DEFAULT,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray700,
    backgroundColor: colors.gray800,
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
    paddingBottom: spacing['1'],
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray100,
    transition: `background-color ${transitions.fast}`,
    ':hover': {
      backgroundColor: colors.gray700,
    },
  },

  // Main layout
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    minWidth: 0,
  },

  // Left panel (Chat)
  leftPanel: {
    position: 'relative',
    flexShrink: 0,
    height: '100%',
    backgroundColor: colors.gray800,
    overflow: 'hidden',
  },
  leftPanelWithBorder: {
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: colors.gray800,
  },
  leftPanelNoBorder: {
    borderWidth: 0,
  },
  leftPanelInner: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  leftPanelHeader: {
    paddingLeft: spacing['4'],
    paddingRight: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['3'],
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.gray800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray800,
  },
  leftPanelTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray100,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['3'],
    padding: spacing['4'],
  },
  messageRow: {
    display: 'flex',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAssistant: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: borderRadius.lg,
    paddingLeft: spacing['3'],
    paddingRight: spacing['3'],
    paddingTop: spacing['2'],
    paddingBottom: spacing['2'],
    fontSize: fontSize.sm,
    lineHeight: '1.625',
    transition: `background-color ${transitions.fast}, color ${transitions.fast}`,
  },
  messageBubbleUser: {
    backgroundColor: colors.blue500,
    color: colors.white,
  },
  messageBubbleAssistant: {
    backgroundColor: colors.gray700,
    color: colors.gray100,
  },
  chatInputContainer: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.gray800,
    padding: spacing['3'],
    backgroundColor: colors.gray800,
  },
  chatInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
  },
  chatTextarea: {
    flex: 1,
    resize: 'none',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray900,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray700,
    paddingLeft: spacing['3'],
    paddingRight: spacing['3'],
    paddingTop: spacing['2'],
    paddingBottom: spacing['2'],
    fontSize: fontSize.sm,
    color: colors.gray100,
    transition: `box-shadow ${transitions.fast}`,
    '::placeholder': {
      color: colors.gray500,
    },
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.blue500}`,
    },
  },
  chatSendButton: {
    height: '100%',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.blue600,
    paddingLeft: spacing['4'],
    paddingRight: spacing['4'],
    paddingTop: spacing['2'],
    paddingBottom: spacing['2'],
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    transition: `background-color ${transitions.fast}`,
    ':hover': {
      backgroundColor: colors.blue500,
    },
  },
  resizeHandle: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '1px',
    cursor: 'col-resize',
    backgroundColor: colors.transparent,
    transition: `background-color ${transitions.fast}`,
    ':hover': {
      backgroundColor: 'rgba(55, 65, 81, 0.5)',
    },
  },
  resizeHandleLeft: {
    right: 0,
  },
  resizeHandleRight: {
    left: 0,
  },

  // Center panel (Canvas)
  centerPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing['2'],
    overflow: 'hidden',
    minWidth: 0,
    '@media (min-width: 640px)': {
      padding: spacing['3'],
    },
  },
  canvasWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  canvas: {
    aspectRatio: '4 / 3',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: colors.gray950,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.gray300,
    fontSize: fontSize.lg,
  },

  // Right panel (Content)
  rightPanel: {
    position: 'relative',
    flexShrink: 0,
    height: '100%',
    backgroundColor: colors.gray800,
    overflow: 'hidden',
  },
  rightPanelWithBorder: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: colors.gray800,
  },
  rightPanelNoBorder: {
    borderWidth: 0,
  },
  rightPanelInner: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  rightPanelHeader: {
    paddingLeft: spacing['4'],
    paddingRight: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['3'],
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.gray800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray800,
  },
  rightPanelTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray100,
  },
  contentList: {
    flex: 1,
    overflowY: 'auto',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.gray800,
  },

  contentItem: {
    paddingTop: 0,
    paddingBottom: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.gray800,
    ':first-child': {
      paddingTop: 0,
    },
    ':last-child': {
      paddingBottom: 0,
    },
  },
  contentItemButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: spacing['1'],
    fontSize: fontSize.sm,
    color: colors.gray100,
    backgroundColor: colors.gray900,
    transition: `background-color ${transitions.fast}`,
    borderRadius: '0',
    paddingLeft: spacing['1'],
    paddingRight: spacing['1'],
    paddingTop: spacing['1'],
    paddingBottom: spacing['1'],
    lineHeight: '1.25',
    ':hover': {
      backgroundColor: 'rgba(55, 65, 81, 0.7)',
    },
  },
  contentItemIcon: {
    fontSize: fontSize.sm,
    lineHeight: '1.25',
    flexShrink: 0,
  },
  contentItemId: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    lineHeight: '1.25',
    flexShrink: 0,
  },
  contentItemName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'left',
    lineHeight: '1.25',
  },
  contentItemExpandIcon: {
    flexShrink: 0,
    fontSize: fontSize.sm,
    color: colors.gray400,
    lineHeight: '1.25',
  },
  contentItemDetails: {
    marginTop: spacing['1'],
    marginLeft: spacing['8'],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['1'],
    fontSize: fontSize.xs,
    color: colors.gray300,
  },
  contentItemDetailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['1'],
  },
  contentItemDetailLabel: {
    color: colors.gray500,
  },
  statusAlive: {
    color: colors.green400,
  },
  statusDead: {
    color: colors.red400,
  },
  statusActive: {
    color: colors.blue400,
  },
})

function App() {
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [leftWidth, setLeftWidth] = useState(30)
  const [rightWidth, setRightWidth] = useState(30)
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [showSettings, setShowSettings] = useState(false)

  const getStatusStyle = (status: string) => {
    if (status === 'alive') return styles.statusAlive
    if (status === 'dead') return styles.statusDead
    if (status === 'active') return styles.statusActive
    return null
  }

  const getIcon = (item: ContentItem) => {
    if (item.type === 'enemy') return '💀'
    if (item.type === 'npc') return '🧑'
    return '🔑'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !mainRef.current) return
      const totalWidth = mainRef.current.clientWidth
      if (!totalWidth) return

      if (dragging === 'left') {
        const pct = (e.clientX / totalWidth) * 100
        setLeftWidth(Math.min(45, Math.max(15, pct)))
      } else {
        const pct = ((totalWidth - e.clientX) / totalWidth) * 100
        setRightWidth(Math.min(45, Math.max(15, pct)))
      }
    }

    const stopDragging = () => setDragging(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopDragging)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
    }
  }, [dragging])

  return (
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerLeftSection)}>
          <button
            onClick={() => setShowLeft((prev) => !prev)}
            {...stylex.props(styles.toggleButton, showLeft ? styles.toggleButtonOn : styles.toggleButtonOff)}
            aria-label="Toggle chat panel"
          >
            <span {...stylex.props(styles.toggleButtonIcon)}>◧</span>
            <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
              {showLeft ? 'Chat On' : 'Chat Off'}
            </span>
          </button>
        </div>

        <h1 {...stylex.props(styles.headerTitle)}>Unexpected Dungeon</h1>

        <div {...stylex.props(styles.headerRightSection)}>
          <button
            onClick={() => setShowRight((prev) => !prev)}
            {...stylex.props(styles.toggleButton, showRight ? styles.toggleButtonOn : styles.toggleButtonOff)}
            aria-label="Toggle content panel"
          >
            <span {...stylex.props(styles.toggleButtonIcon)}>◨</span>
            <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
              {showRight ? 'Content On' : 'Content Off'}
            </span>
          </button>
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            {...stylex.props(styles.toggleButton, showSettings ? styles.toggleButtonOn : styles.toggleButtonOff)}
            aria-label="Open settings"
          >
            <span {...stylex.props(styles.toggleButtonIcon)}>⚙</span>
            <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
              Settings
            </span>
          </button>
        </div>

        {showSettings && (
          <div {...stylex.props(styles.settingsDropdown)}>
            <div>
              <label {...stylex.props(styles.settingsLabel)} htmlFor="api-url">
                API URL
              </label>
              <input
                id="api-url"
                type="text"
                {...stylex.props(styles.settingsInput)}
                placeholder="https://api.example.com"
              />
            </div>
            <div>
              <label {...stylex.props(styles.settingsLabel)} htmlFor="api-key">
                API KEY
              </label>
              <input
                id="api-key"
                type="text"
                {...stylex.props(styles.settingsInput)}
                placeholder="sk-..."
              />
            </div>
            <div {...stylex.props(styles.settingsButtonWrapper)}>
              <button
                onClick={() => setShowSettings(false)}
                {...stylex.props(styles.settingsCloseButton)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      <main ref={mainRef} {...stylex.props(styles.main)}>
        <section
          {...stylex.props(styles.leftPanel, showLeft ? styles.leftPanelWithBorder : styles.leftPanelNoBorder)}
          style={{ width: showLeft ? `${leftWidth}%` : 0 }}
        >
          <div {...stylex.props(styles.leftPanelInner)}>
            <div {...stylex.props(styles.leftPanelHeader)}>
              <p {...stylex.props(styles.leftPanelTitle)}>AI Chat</p>
            </div>
            <div {...stylex.props(styles.messagesContainer)}>
              {MOCK_MESSAGES.map((msg, idx) => (
                <div key={idx} {...stylex.props(styles.messageRow, msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant)}>
                  <div
                    {...stylex.props(styles.messageBubble, msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant)}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div {...stylex.props(styles.chatInputContainer)}>
              <div {...stylex.props(styles.chatInputWrapper)}>
                <textarea
                  {...stylex.props(styles.chatTextarea)}
                  placeholder="Type a message..."
                  rows={2}
                  disabled
                />
                <button {...stylex.props(styles.chatSendButton)}>
                  Send
                </button>
              </div>
            </div>
          </div>
          {showLeft && (
            <div
              {...stylex.props(styles.resizeHandle, styles.resizeHandleLeft)}
              onMouseDown={() => setDragging('left')}
              aria-label="Resize left panel"
            />
          )}
        </section>

        <section {...stylex.props(styles.centerPanel)}>
          <div {...stylex.props(styles.canvasWrapper)}>
            <div {...stylex.props(styles.canvas)}>
              Game Canvas
            </div>
          </div>
        </section>

        <section
          {...stylex.props(styles.rightPanel, showRight ? styles.rightPanelWithBorder : styles.rightPanelNoBorder)}
          style={{ width: showRight ? `${rightWidth}%` : 0 }}
        >
          <div {...stylex.props(styles.rightPanelInner)}>
            <div {...stylex.props(styles.rightPanelHeader)}>
              <p {...stylex.props(styles.rightPanelTitle)}>Content</p>
            </div>
            <div {...stylex.props(styles.contentList)}>
              {MOCK_CONTENT.map((item) => (
                <div key={item.id} {...stylex.props(styles.contentItem)}>
                  <button
                    onClick={() =>
                      setExpandedIds((prev) =>
                        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
                      )
                    }
                    {...stylex.props(styles.contentItemButton)}
                    aria-expanded={expandedIds.includes(item.id)}
                  >
                    <span {...stylex.props(styles.contentItemIcon)}>{getIcon(item)}</span>
                    <span {...stylex.props(styles.contentItemId)}>{item.id}</span>
                    <span {...stylex.props(styles.contentItemName)}>{item.name}</span>
                    <span {...stylex.props(styles.contentItemExpandIcon)}>{expandedIds.includes(item.id) ? '▾' : '▸'}</span>
                  </button>

                  {expandedIds.includes(item.id) && (
                    <div {...stylex.props(styles.contentItemDetails)}>
                      {'position' in item && (
                        <div {...stylex.props(styles.contentItemDetailRow)}>
                          <span {...stylex.props(styles.contentItemDetailLabel)}>position:</span>
                          <span>@ ({item.position.x},{item.position.y})</span>
                        </div>
                      )}
                      {'status' in item && (
                        <div {...stylex.props(styles.contentItemDetailRow)}>
                          <span {...stylex.props(styles.contentItemDetailLabel)}>status:</span>
                          <span {...stylex.props(getStatusStyle(item.status))}>{item.status}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {showRight && (
            <div
              {...stylex.props(styles.resizeHandle, styles.resizeHandleRight)}
              onMouseDown={() => setDragging('right')}
              aria-label="Resize right panel"
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
