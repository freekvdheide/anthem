'use client'

import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { getProductReviews } from '@/lib/api'
import type { ReviewData } from '@/types'
import { classNames } from '@/lib/utils'

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        const data = await getProductReviews(2) // Basic Tee 6-Pack
        setReviews(data)
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
        setError('Kon reviews niet laden')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !reviews) {
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
        <p className="mt-4 text-gray-500">{error || 'Geen reviews beschikbaar'}</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>

      <div className="mt-6 pb-10">
        <h4 className="sr-only">Reviews</h4>
        <div className="space-y-10">
          {reviews.featured.map((review) => (
            <div key={review.id} className="flex space-x-4">
              <img
                alt={review.author}
                src={review.avatarSrc}
                className="size-10 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-gray-900">{review.title}</h4>
                <div className="mt-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{review.rating} out of 5 stars</p>

                <div
                  dangerouslySetInnerHTML={{ __html: review.content }}
                  className="mt-4 space-y-6 text-sm italic text-gray-600"
                />
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-900">
                    {review.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 