'use client'

import { Switch } from '@headlessui/react'
import type { BillingCycle } from '@/types/subscription'

interface BillingToggleProps {
  billingCycle: BillingCycle
  onChange: (cycle: BillingCycle) => void
}

export default function BillingToggle({ billingCycle, onChange }: BillingToggleProps) {
  const isAnnually = billingCycle === 'annually'

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <span className={`text-sm font-medium ${!isAnnually ? 'text-gray-900' : 'text-gray-500'}`}>
        Maandelijks
      </span>
      
      <Switch
        checked={isAnnually}
        onChange={(checked) => onChange(checked ? 'annually' : 'monthly')}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-checked:bg-indigo-600"
      >
        <span className="sr-only">Jaarlijkse billing</span>
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
        />
      </Switch>
      
      <span className={`text-sm font-medium ${isAnnually ? 'text-gray-900' : 'text-gray-500'}`}>
        Jaarlijks
        <span className="ml-1 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
          Bespaar tot 20%
        </span>
      </span>
    </div>
  )
} 