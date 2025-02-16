import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>echoes of solace</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Yes, the frontend will exist soon! Change <code>src/App.tsx</code> to make that happen 
        </p>
      </div>
    </>
  )
}

export default App
