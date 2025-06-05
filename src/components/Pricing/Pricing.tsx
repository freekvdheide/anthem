'use client'

import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import CheckoutButton from './CheckoutButton'
import BillingToggle from './BillingToggle'
import type { BillingCycle } from '@/types/subscription'

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic' as const,
    planType: 'basic' as const,
    description: 'Everything necessary to get started.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    price: {
      monthly: 19,
      annually: 15,
    },
  },
  {
    name: 'Essential',
    id: 'tier-essential' as const,
    planType: 'essential' as const,
    description: 'Everything in Basic, plus essential tools for growing your business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    price: {
      monthly: 49,
      annually: 39,
    },
  },
  {
    name: 'Growth',
    id: 'tier-growth' as const,
    planType: 'growth' as const,
    description: 'Everything in Essential, plus collaboration tools and deeper insights.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    price: {
      monthly: 99,
      annually: 79,
    },
  },
]

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
            Pricing that grows with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-600 sm:text-center sm:text-xl/8">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>

        {/* Billing Toggle */}
        <div className="mt-16">
          <BillingToggle 
            billingCycle={billingCycle} 
            onChange={setBillingCycle} 
          />
        </div>

        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3 id={tier.id} className="text-base/7 font-semibold text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">
                    {formatPrice(tier.price[billingCycle])}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">
                    /{billingCycle === 'monthly' ? 'maand' : 'jaar'}
                  </span>
                </p>
                {billingCycle === 'annually' && (
                  <p className="mt-3 text-sm/6 text-gray-500">
                    {formatPrice(tier.price.monthly)} per maand bij maandelijkse betaling
                  </p>
                )}
                
                <CheckoutButton
                  planType={tier.planType}
                  billingCycle={billingCycle}
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Kies {tier.name} Plan
                </CheckoutButton>
                
                <p className="mt-10 text-sm/6 font-semibold text-gray-900">{tier.description}</p>
                <ul role="list" className="mt-6 space-y-3 text-sm/6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 