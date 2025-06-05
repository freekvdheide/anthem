'use client'

import { useState, useEffect } from 'react'
import { getRelatedProducts } from '@/lib/api'
import type { Product } from '@/types'

export default function RelatedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getRelatedProducts()
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch related products:', err)
        setError('Kon geen producten laden')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section aria-labelledby="related-products-heading" className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 id="related-products-heading" className="text-xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group relative animate-pulse">
                <div className="aspect-square w-full rounded-md bg-gray-200 lg:aspect-auto lg:h-80" />
                <div className="mt-4 flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section aria-labelledby="related-products-heading" className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 id="related-products-heading" className="text-xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="mt-6 p-8 text-center">
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="related-products-heading" className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="related-products-heading" className="text-xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 transition-opacity duration-300 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href} className="group-hover:text-indigo-600 transition-colors duration-200">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 