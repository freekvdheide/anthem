'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe-client'
import { trackCheckoutInitiated, trackCheckoutCompleted, trackCheckoutFailed } from '@/lib/analytics'
import type { PlanType, BillingCycle, CheckoutSessionRequest, CheckoutSessionResponse } from '@/types/subscription'

interface CheckoutButtonProps {
  planType: PlanType
  billingCycle: BillingCycle
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export default function CheckoutButton({ 
  planType, 
  billingCycle, 
  disabled = false, 
  className = '',
  children 
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    try {
      setLoading(true)
      setError(null)

      // Track checkout initiated
      trackCheckoutInitiated(planType, billingCycle)

      // Checkout session aanmaken
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          billingCycle,
        } as CheckoutSessionRequest),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || 'Er is een fout opgetreden'
        
        // Track checkout failed
        trackCheckoutFailed(planType, billingCycle, errorMessage)
        
        throw new Error(errorMessage)
      }

      const { sessionId, url }: CheckoutSessionResponse = await response.json()

      if (!url) {
        const errorMessage = 'Geen checkout URL ontvangen'
        trackCheckoutFailed(planType, billingCycle, errorMessage)
        throw new Error(errorMessage)
      }

      // Redirect naar Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        const errorMessage = 'Stripe kon niet worden geladen'
        trackCheckoutFailed(planType, billingCycle, errorMessage)
        throw new Error(errorMessage)
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        trackCheckoutFailed(planType, billingCycle, stripeError.message || 'Stripe redirect error')
        throw new Error(stripeError.message)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden'
      setError(errorMessage)
      
      // Track error if not already tracked
      if (!error) {
        trackCheckoutFailed(planType, billingCycle, errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={disabled || loading}
        className={`
          ${className}
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500'}
          transition-all duration-200
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Laden...</span>
          </div>
        ) : (
          children
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  )
} 