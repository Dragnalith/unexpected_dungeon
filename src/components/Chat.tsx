import * as stylex from '@stylexjs/stylex'
import { styles } from './Chat.style'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatProps = {
  messages: Message[]
  width: number
  visible: boolean
  onStartResize: () => void
}

export function Chat({ messages, width, visible, onStartResize }: ChatProps) {
  return (
    <section
      {...stylex.props(styles.panel, visible ? styles.panelWithBorder : styles.panelNoBorder)}
      style={{ width: visible ? `${width}%` : 0 }}
    >
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.title)}>AI Chat</p>
        </div>
        <div {...stylex.props(styles.messagesContainer)}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              {...stylex.props(
                styles.messageRow,
                msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant
              )}
            >
              <div
                {...stylex.props(
                  styles.messageBubble,
                  msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div {...stylex.props(styles.inputContainer)}>
          <div {...stylex.props(styles.inputWrapper)}>
            <textarea
              {...stylex.props(styles.textarea)}
              placeholder="Type a message..."
              rows={2}
              disabled
            />
            <button {...stylex.props(styles.sendButton)}>Send</button>
          </div>
        </div>
      </div>
      {visible && (
        <div
          {...stylex.props(styles.resizeHandle)}
          onMouseDown={onStartResize}
          aria-label="Resize chat panel"
        />
      )}
    </section>
  )
}
