import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <Routes>
          <Route path="/" element={token ? <Dashboard token={token} setToken={setToken} /> : <Login setToken={setToken} />} />
          <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App