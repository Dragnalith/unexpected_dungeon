import { useState, KeyboardEvent } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './Chat.style'

type Message = {
  role: 'user' | 'assistant' | 'system' | 'error'
  content: string
}

type ChatProps = {
  messages: Message[]
  width: number
  visible: boolean
  isLoading?: boolean
  onStartResize: () => void
  onSendMessage: (content: string) => void
  onResetChat?: () => void
}

export function Chat({ messages, width, visible, isLoading, onStartResize, onSendMessage, onResetChat }: ChatProps) {
  const [input, setInput] = useState('')

  const lastMessage = messages[messages.length - 1]
  const isError = lastMessage?.role === 'error'

  const handleSend = () => {
    if (!input.trim() || isLoading || isError) return
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section
      {...stylex.props(styles.panel, visible ? styles.panelWithBorder : styles.panelNoBorder)}
      style={{ width: visible ? `${width}%` : 0 }}
    >
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.title)}>AI Chat</p>
          {onResetChat && (
            <button onClick={onResetChat} {...stylex.props(styles.resetButton)}>
              Reset
            </button>
          )}
        </div>
        <div {...stylex.props(styles.messagesContainer)}>
          {messages.map((msg, idx) => {
            if (msg.role === 'error') {
              return (
                <div key={idx} {...stylex.props(styles.messageRowError)}>
                  <div {...stylex.props(styles.messageErrorText)}>
                    {msg.content}
                  </div>
                </div>
              )
            }
            if (msg.role === 'system') return null

            return (
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
            )
          })}
          {isLoading && (
            <div {...stylex.props(styles.messageRow, styles.messageRowAssistant)}>
              <div {...stylex.props(styles.messageBubble, styles.messageBubbleAssistant)}>
                Typing...
              </div>
            </div>
          )}
        </div>
        <div {...stylex.props(styles.inputContainer)}>
          <div {...stylex.props(styles.inputWrapper)}>
            <textarea
              {...stylex.props(styles.textarea)}
              placeholder={isError ? "Reset chat to continue..." : "Type a message..."}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || isError}
            />
            <button
              {...stylex.props(styles.sendButton)}
              onClick={handleSend}
              disabled={isLoading || !input.trim() || isError}
            >
              Send
            </button>
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
