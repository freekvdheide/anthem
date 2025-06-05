'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'

interface AuthLinksProps {
  variant: 'mobile' | 'desktop'
}

export default function AuthLinks({ variant }: AuthLinksProps) {
  const { user, profile, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Show minimal loading only for auth operations
  if (loading && !user) {
    return (
      <div className={variant === 'mobile' ? 'space-y-6' : 'space-x-6'}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    )
  }

  if (user) {
    // User is logged in - show immediately, profile loads in background
    const displayName = profile?.full_name || user.email?.split('@')[0] || 'Gebruiker'
    
    if (variant === 'mobile') {
      return (
        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          <div className="flow-root">
            <div className="-m-2 block p-2 font-medium text-gray-900">
              Welkom, {displayName}
            </div>
          </div>
          <div className="flow-root">
            <Link href="/profile" className="-m-2 block p-2 font-medium text-gray-900">
              Mijn profiel
            </Link>
          </div>
          <div className="flow-root">
            <button 
              onClick={handleSignOut}
              className="-m-2 block p-2 font-medium text-gray-900 text-left w-full"
            >
              Uitloggen
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <span className="text-sm font-medium text-white">
            Welkom, {displayName}
          </span>
          <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
          <Link href="/profile" className="text-sm font-medium text-white hover:text-gray-100">
            Mijn profiel
          </Link>
          <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
          <button 
            onClick={handleSignOut}
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            Uitloggen
          </button>
        </div>
      )
    }
  }

  // User is not logged in
  if (variant === 'mobile') {
    return (
      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
        <div className="flow-root">
          <Link href="/auth/signup" className="-m-2 block p-2 font-medium text-gray-900">
            Account aanmaken
          </Link>
        </div>
        <div className="flow-root">
          <Link href="/auth/signin" className="-m-2 block p-2 font-medium text-gray-900">
            Inloggen
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Link href="/auth/signup" className="text-sm font-medium text-white hover:text-gray-100">
          Account aanmaken
        </Link>
        <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
        <Link href="/auth/signin" className="text-sm font-medium text-white hover:text-gray-100">
          Inloggen
        </Link>
      </div>
    )
  }
} 