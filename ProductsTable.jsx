import { useState } from 'react'

const ProductsTable = ({ products, loadProducts }) => {
  const [filter, setFilter] = useState('')

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Mahsulot qidirish"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 bg-white/20 rounded mb-4"
      />
      <div className="overflow-x-auto">
        <table className="w-full bg-white/10 rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Nomi</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Narx</th>
              <th className="p-3 text-left">Qoldiq</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{prod.name}</td>
                <td className="p-3">{prod.sku}</td>
                <td className="p-3">{prod.price} so'm</td>
                <td className="p-3">{prod.stock}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    prod.status === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {prod.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length === 0 && <button onClick={loadProducts} className="mt-4 bg-blue-600 px-4 py-2 rounded">Yangilash</button>}
    </div>
  )
}

export default ProductsTable