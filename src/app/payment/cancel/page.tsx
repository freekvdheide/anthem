import { XCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <XCircleIcon className="mx-auto h-16 w-16 text-red-600" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Betaling Geannuleerd
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            Je betaling is geannuleerd. Er zijn geen kosten in rekening gebracht.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Geen zorgen!
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Je kunt altijd later terugkomen om een plan te kiezen. 
                      Je gegevens zijn bewaard en je kunt op elk moment upgraden.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Wat kun je nu doen:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Bekijk opnieuw onze prijsplannen</li>
                <li>Neem contact op met ons team voor vragen</li>
                <li>Meld je aan voor onze nieuwsbrief voor updates</li>
                <li>Verken onze gratis functies</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/pricing"
                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Bekijk Plannen
              </Link>
              <Link
                href="/"
                className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-4 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Terug naar Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Hulp nodig bij het kiezen van een plan?{' '}
            <a href="mailto:support@anthem.com" className="text-indigo-600 hover:text-indigo-500">
              Chat met ons team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 