import { useState } from 'react'

const styles = {
  page: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4',
  card: 'bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full',
  title: 'text-4xl font-bold text-gray-800 mb-4',
  body: 'text-gray-600 mb-8',
  counter: 'text-6xl font-bold text-indigo-600 mb-4',
  primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200',
  secondaryButton: 'w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.body}>
          This is a minimal single page application built with React, TypeScript, Vite, and Tailwind CSS.
        </p>
        <div className="mb-8">
          <p className={styles.counter}>{count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className={styles.primaryButton}
          >
            Increment
          </button>
        </div>
        <button
          onClick={() => setCount(0)}
          className={styles.secondaryButton}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
