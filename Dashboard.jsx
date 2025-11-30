import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductsTable from './ProductsTable'

const Dashboard = ({ token, setToken }) => {
  const [products, setProducts] = useState([])
  const [uzumToken, setUzumToken] = useState('')

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [token])

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products')
      setProducts(response.data.data || response.data)
    } catch (error) {
      alert('Mahsulotlarni yuklashda xato: ' + error.message)
    }
  }

  const saveUzumToken = async () => {
    try {
      await axios.post('http://localhost:8000/api/set-uzum-token', { token: uzumToken })
      alert('Uzum token saqlandi!')
      loadProducts()
    } catch (error) {
      alert('Token saqlashda xato')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Uzum Dashboard</h1>
        <button onClick={() => { localStorage.removeItem('token'); setToken(''); }} className="bg-red-600 px-4 py-2 rounded">
          Chiqish
        </button>
      </div>
      {!uzumToken && (
        <div className="bg-white/10 p-4 rounded-lg mb-6">
          <h2 className="text-xl mb-2">Uzum token kiriting</h2>
          <input
            type="text"
            placeholder="Uzum API token"
            value={uzumToken}
            onChange={(e) => setUzumToken(e.target.value)}
            className="w-full p-3 bg-white/20 rounded mb-2"
          />
          <button onClick={saveUzumToken} className="bg-green-600 px-4 py-2 rounded">
            Saqlash
          </button>
        </div>
      )}
      <ProductsTable products={products} loadProducts={loadProducts} />
    </div>
  )
}

export default Dashboard