'use client'

import { useState } from 'react'
import { 
  CreditCardIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  CogIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline'

export default function SubscriptionDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  const handleManageBilling = async () => {
    setIsLoading(true)
    // Redirect naar Stripe billing portal
    window.open('https://billing.stripe.com/p/login/test_7sYfZaa3Yf93ecg7ub4ko00', '_blank')
    setIsLoading(false)
  }

  const stats = [
    {
      name: 'Actieve Abonnement',
      value: 'Essential Plan',
      icon: CreditCardIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Volgende Betaling',
      value: '15 januari 2024',
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Maandelijks Bedrag',
      value: '€49,00',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-10">
        {/* Header */}
        <div className="pb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Beheer je abonnement en bekijk je facturatiegeschiedenis
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <dt>
                  <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                    <stat.icon aria-hidden="true" className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Actions */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acties</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Manage Billing Button */}
              <button
                onClick={handleManageBilling}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CogIcon className="h-5 w-5 mr-2" />
                {isLoading ? 'Laden...' : 'Beheer Facturatie'}
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
              </button>

              {/* View Usage Button */}
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Bekijk Gebruik
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recente Activiteit</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <CreditCardIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">Betaling succesvol verwerkt</p>
                        <p className="text-sm text-gray-500">€49,00 voor Essential Plan</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        15 dec 2023
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">Factuur gegenereerd</p>
                        <p className="text-sm text-gray-500">Factuur #INV-2023-12-001</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        15 dec 2023
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <CogIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">Abonnement gestart</p>
                        <p className="text-sm text-gray-500">Essential Plan geactiveerd</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        15 nov 2023
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 