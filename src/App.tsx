import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './App.style'
import { Header } from './components/Header'
import { Chat } from './components/Chat'
import { Inspector } from './components/Inspector'
import { GameCanvas } from './components/GameCanvas'
import { SYSTEM_PROMPT } from './config'
import type { GameState } from './game/types'
import { createInitialGameState } from './game/state'

type Message = {
  role: 'user' | 'assistant' | 'system' | 'error'
  content: string
}

function App() {
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [leftWidth, setLeftWidth] = useState(30)
  const [rightWidth, setRightWidth] = useState(30)
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiUrl, setApiUrl] = useState('https://openrouter.ai/api/v1')
  const [modelName, setModelName] = useState('anthropic/claude-sonnet-4.5')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [gameState, setGameState] = useState<GameState>(createInitialGameState)

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = { role: 'user', content }
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    try {
      // Determine the endpoint. If the user provided a full URL, use it.
      // If they provided a base URL (ending in /v1), append /chat/completions.
      let endpoint = apiUrl
      if (!endpoint.endsWith('/chat/completions')) {
        if (endpoint.endsWith('/')) {
          endpoint += 'chat/completions'
        } else {
          endpoint += '/chat/completions'
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          max_tokens: 1024,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.concat(newMessage).map(({ role, content }) => ({ role, content })),
          ],
        }),
      })

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`
        try {
          const errorData = await response.json()
          if (errorData?.error?.message) {
            errorMessage += ` - ${errorData.error.message}`
          }
        } catch {
          // Ignore parse errors
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const assistantMessage = data.choices?.[0]?.message
      if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        { role: 'error', content: `Error: ${error instanceof Error ? error.message : String(error)}` },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetChat = () => {
    setMessages([])
    setIsLoading(false)
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
      <Header
        showLeft={showLeft}
        showRight={showRight}
        showSettings={showSettings}
        apiKey={apiKey}
        setApiKey={setApiKey}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        modelName={modelName}
        setModelName={setModelName}
        onToggleLeft={() => setShowLeft((prev) => !prev)}
        onToggleRight={() => setShowRight((prev) => !prev)}
        onToggleSettings={() => setShowSettings((prev) => !prev)}
      />

      <main ref={mainRef} {...stylex.props(styles.main)}>
        <Chat
          messages={messages}
          width={leftWidth}
          visible={showLeft}
          isLoading={isLoading}
          onStartResize={() => setDragging('left')}
          onSendMessage={handleSendMessage}
          onResetChat={handleResetChat}
        />

        <GameCanvas
          gameState={gameState}
          onGameStateChange={setGameState}
        />

        <Inspector
          gameState={gameState}
          width={rightWidth}
          visible={showRight}
          onStartResize={() => setDragging('right')}
        />
      </main>
    </div>
  )
}

export default App
