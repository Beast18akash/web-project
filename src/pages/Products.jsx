import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ui/ProductCard'

const Products = () => {
  const { items: products = [], loading } = useSelector((s) => s.products || {})

  if (loading) return <div className="py-10 text-center">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>

      {products.length === 0 ? (
        <div className="py-10 text-center">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products

