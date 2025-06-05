import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-600" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Betaling Geslaagd!
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            Bedankt voor je aankoop. Je subscription is nu actief.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Je account is bijgewerkt
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Je hebt nu toegang tot alle functies van je gekozen plan. 
                      Een bevestigingsmail is verstuurd naar je e-mailadres.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Volgende stappen:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Check je e-mail voor de bevestiging en factuur</li>
                <li>Log in op je account om je nieuwe functies te verkennen</li>
                <li>Stel je profiel en voorkeuren in</li>
                <li>Begin met het gebruik van je nieuwe plan</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/"
                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Ga naar Dashboard
              </Link>
              <Link
                href="/pricing"
                className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-4 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Bekijk Alle Plannen
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Vragen over je subscription?{' '}
            <a href="mailto:support@anthem.com" className="text-indigo-600 hover:text-indigo-500">
              Neem contact op
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 