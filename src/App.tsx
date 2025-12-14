import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './App.style'
import { Header } from './components/Header'
import { Chat } from './components/Chat'
import { Inspector } from './components/Inspector'
import { GameCanvas } from './components/GameCanvas'

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

function App() {
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [leftWidth, setLeftWidth] = useState(30)
  const [rightWidth, setRightWidth] = useState(30)
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [showSettings, setShowSettings] = useState(false)

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
        onToggleLeft={() => setShowLeft((prev) => !prev)}
        onToggleRight={() => setShowRight((prev) => !prev)}
        onToggleSettings={() => setShowSettings((prev) => !prev)}
      />

      <main ref={mainRef} {...stylex.props(styles.main)}>
        <Chat
          messages={MOCK_MESSAGES}
          width={leftWidth}
          visible={showLeft}
          onStartResize={() => setDragging('left')}
        />

        <GameCanvas />

        <Inspector
          items={MOCK_CONTENT}
          width={rightWidth}
          visible={showRight}
          onStartResize={() => setDragging('right')}
        />
      </main>
    </div>
  )
}

export default App
