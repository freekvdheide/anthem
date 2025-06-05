'use client'

import { useAuth } from './AuthProvider'

export default function AuthDebug() {
  const { user, profile, loading, error } = useAuth()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-0 right-0 z-50 bg-black/80 text-white p-4 m-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? '✅ YES' : '❌ NO'}</div>
        <div>User: {user ? '✅ YES' : '❌ NO'}</div>
        <div>Profile: {profile ? '✅ YES' : '❌ NO'}</div>
        <div>Error: {error || 'None'}</div>
        {user && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <div>Email: {user.email}</div>
            <div>ID: {user.id}</div>
          </div>
        )}
        {profile && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <div>Name: {profile.full_name || 'No name'}</div>
            <div>Subscription: {profile.subscription_status}</div>
          </div>
        )}
      </div>
    </div>
  )
} 