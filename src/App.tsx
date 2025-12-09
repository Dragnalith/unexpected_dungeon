import { useEffect, useRef, useState } from 'react'

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

const statusColor: Record<string, string> = {
  alive: 'text-green-400',
  dead: 'text-red-400',
  active: 'text-blue-400',
}

function App() {
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [leftWidth, setLeftWidth] = useState(30)
  const [rightWidth, setRightWidth] = useState(30)
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [showSettings, setShowSettings] = useState(false)

  const toggleButtonClass = (isOn: boolean) =>
    `group relative inline-flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-700/60 ${
      isOn ? 'text-gray-100' : 'text-gray-500'
    }`

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
    <div className="h-screen overflow-hidden bg-gray-900 text-gray-100 flex flex-col">
      <header className="relative h-12 bg-gray-800 border-b border-gray-700 flex items-center px-3 shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={() => setShowLeft((prev) => !prev)} className={toggleButtonClass(showLeft)} aria-label="Toggle chat panel">
            <span className="text-lg">◧</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
              {showLeft ? 'Chat On' : 'Chat Off'}
            </span>
          </button>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-50 tracking-wide">Unexpected Dungeon</h1>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowRight((prev) => !prev)} className={toggleButtonClass(showRight)} aria-label="Toggle content panel">
            <span className="text-lg">◨</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
              {showRight ? 'Content On' : 'Content Off'}
            </span>
          </button>
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className={toggleButtonClass(showSettings)}
            aria-label="Open settings"
          >
            <span className="text-lg">⚙</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
              Settings
            </span>
          </button>
        </div>

        {showSettings && (
          <div className="absolute top-12 right-2 w-72 rounded-md border border-gray-700 bg-gray-900 shadow-lg p-4 space-y-3 z-20">
            <div>
              <label className="block text-xs text-gray-400 mb-1" htmlFor="api-url">
                API URL
              </label>
              <input
                id="api-url"
                type="text"
                className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://api.example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1" htmlFor="api-key">
                API KEY
              </label>
              <input
                id="api-key"
                type="text"
                className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="sk-..."
              />
            </div>
            <div className="pt-1">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm font-semibold text-gray-100 hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      <main ref={mainRef} className="flex flex-1 overflow-hidden min-w-0">
        <section
          className={`relative flex-shrink-0 h-full bg-gray-800 overflow-hidden ${
            showLeft ? 'border-r border-gray-800' : 'border-0'
          }`}
          style={{ width: showLeft ? `${leftWidth}%` : 0 }}
        >
          <div className="flex h-full flex-col">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-800">
              <p className="text-sm font-semibold text-gray-100">AI Chat</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 p-4">
              {MOCK_MESSAGES.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed transition-colors duration-200 ${
                      msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 p-3 bg-gray-800">
              <div className="flex items-center gap-2">
                <textarea
                  className="flex-1 resize-none rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Type a message..."
                  rows={2}
                  disabled
                />
                <button className="h-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
          {showLeft && (
            <div
              className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-gray-700/50 transition"
              onMouseDown={() => setDragging('left')}
              aria-label="Resize left panel"
            />
          )}
        </section>

        <section className="flex-1 flex flex-col p-2 sm:p-3 overflow-hidden min-w-0">
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              className="aspect-[4/3] w-full h-full max-w-full max-h-full bg-gray-950 flex items-center justify-center text-gray-300 text-lg"
            >
              Game Canvas
            </div>
          </div>
        </section>

        <section
          className={`relative flex-shrink-0 h-full bg-gray-800 overflow-hidden ${
            showRight ? 'border-l border-gray-800' : 'border-0'
          }`}
          style={{ width: showRight ? `${rightWidth}%` : 0 }}
        >
          <div className="flex h-full flex-col">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-800">
              <p className="text-sm font-semibold text-gray-100">Content</p>
            </div>
            <div className="flex-1 overflow-y-auto p-0 space-y-0 divide-y divide-gray-800">
              {MOCK_CONTENT.map((item) => (
                <div key={item.id} className="py-0 first:pt-0 last:pb-0">
                  <button
                    onClick={() =>
                      setExpandedIds((prev) =>
                        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
                      )
                    }
                    className="w-full flex items-center gap-1 text-sm text-gray-100 bg-gray-900 hover:bg-gray-700/70 transition rounded-none px-1 py-1 leading-tight"
                    aria-expanded={expandedIds.includes(item.id)}
                  >
                    <span className="text-sm leading-tight shrink-0">{getIcon(item)}</span>
                    <span className="text-sm text-gray-500 leading-tight shrink-0">{item.id}</span>
                    <span className="text-sm font-semibold truncate flex-1 text-left leading-tight">{item.name}</span>
                    <span className="shrink-0 text-sm text-gray-400 leading-tight">{expandedIds.includes(item.id) ? '▾' : '▸'}</span>
                  </button>

                  {expandedIds.includes(item.id) && (
                    <div className="mt-1 ml-8 space-y-1 text-xs text-gray-300">
                      {'position' in item && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">position:</span>
                          <span>@ ({item.position.x},{item.position.y})</span>
                        </div>
                      )}
                      {'status' in item && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">status:</span>
                          <span className={statusColor[item.status] ?? 'text-gray-300'}>{item.status}</span>
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
              className="absolute top-0 left-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-gray-700/50 transition"
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
