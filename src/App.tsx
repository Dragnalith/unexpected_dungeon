import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 mb-8">
          This is a minimal single page application built with React, TypeScript, Vite, and Tailwind CSS.
        </p>
        <div className="mb-8">
          <p className="text-6xl font-bold text-indigo-600 mb-4">
            {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Increment
          </button>
        </div>
        <button
          onClick={() => setCount(0)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
