import { useState } from 'react'
import axios from 'axios'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = isRegister ? '/api/register' : '/api/token'
      const data = isRegister ? { username, password } : { username, password }
      const response = await axios.post(`http://localhost:8000${url}`, data)
      if (!isRegister) {
        localStorage.setItem('token', response.data.access_token)
        setToken(response.data.access_token)
      } else {
        alert('Ro\'yxatdan o\'tildi! Endi kirish mumkin.')
      }
    } catch (error) {
      alert(error.response.data.detail)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'Ro\'yxatdan o\'tish' : 'Kirish'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 bg-white/20 rounded-lg text-white placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-white/20 rounded-lg text-white placeholder-gray-300"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 py-3 rounded-lg font-bold hover:bg-indigo-700">
            {isRegister ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isRegister ? 'Allaqachon akkauntingiz bormi? ' : 'Yangi akkaunt yarating: '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-300 underline">
            {isRegister ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login