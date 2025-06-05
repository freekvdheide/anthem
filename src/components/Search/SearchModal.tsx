'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { searchProducts } from '@/lib/api'
import type { SearchModalProps, Product } from '@/types'

export default function SearchModal({ open, setOpen }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function performSearch() {
      if (query === '') {
        setFilteredProducts([])
        return
      }

      setLoading(true)
      try {
        const results = await searchProducts(query)
        setFilteredProducts(results)
      } catch (error) {
        console.error('Search failed:', error)
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleClose = () => {
    setOpen(false)
    setQuery('')
    setFilteredProducts([])
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-in-out data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="relative">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-3.5 size-5 text-indigo-500"
            />
            <input
              type="text"
              placeholder="Zoek producten..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-3.5 size-5 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
          </div>

          {loading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm text-gray-500">Zoeken...</span>
              </div>
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="max-h-96 transform-gpu scroll-py-2 overflow-y-auto p-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative cursor-pointer rounded-md p-3 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="size-16 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {product.color}
                        </p>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && query !== '' && filteredProducts.length === 0 && (
            <div className="px-6 py-14 text-center sm:px-14">
              <MagnifyingGlassIcon aria-hidden="true" className="mx-auto size-6 text-indigo-400" />
              <p className="mt-4 text-sm text-gray-900">
                Geen producten gevonden voor &quot;{query}&quot;. Probeer een andere zoekterm.
              </p>
            </div>
          )}

          {query === '' && (
            <div className="px-6 py-14 text-center sm:px-14">
              <MagnifyingGlassIcon aria-hidden="true" className="mx-auto size-6 text-indigo-400" />
              <p className="mt-4 text-sm text-gray-900">
                Begin met typen om producten te zoeken...
              </p>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
} 