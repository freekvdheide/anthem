import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
})

export const STRIPE_CONFIG = {
  currency: 'eur',
  success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
} as const

export const PRICING_PLANS = {
  basic: {
    name: 'Basic',
    monthly: { 
      price: 1900, 
      priceId: process.env.STRIPE_PRICE_BASIC_MONTHLY || 'price_1RWenV4f76WGF2trCN4RvoZU'
    },
    annually: { 
      price: 1500, 
      priceId: process.env.STRIPE_PRICE_BASIC_ANNUALLY || 'price_1RWenl4f76WGF2triJW3V3RV'
    },
  },
  essential: {
    name: 'Essential', 
    monthly: { 
      price: 4900, 
      priceId: process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY || 'price_1RWenq4f76WGF2trycKwYwGm'
    },
    annually: { 
      price: 3900, 
      priceId: process.env.STRIPE_PRICE_ESSENTIAL_ANNUALLY || 'price_1RWeoJ4f76WGF2trPkWDH0pB'
    },
  },
  growth: {
    name: 'Growth',
    monthly: { 
      price: 9900, 
      priceId: process.env.STRIPE_PRICE_GROWTH_MONTHLY || 'price_1RWeoS4f76WGF2trUcebFovV'
    },
    annually: { 
      price: 7900, 
      priceId: process.env.STRIPE_PRICE_GROWTH_ANNUALLY || 'price_1RWeoZ4f76WGF2trLGUezuiW'
    },
  },
} as const

export type PlanType = keyof typeof PRICING_PLANS
export type BillingCycle = 'monthly' | 'annually' 