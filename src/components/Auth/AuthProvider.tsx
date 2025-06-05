'use client'

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { AuthState, AuthAction, AuthContextType, SigninFormData, SignupFormData, ForgotPasswordFormData, ResetPasswordFormData } from '@/types/auth'
import { Profile } from '@/types/database'
import { auth, profiles } from '@/lib/supabase'

// Initial state
const initialState: AuthState = {
  user: null,
  profile: null,
  loading: true,
  error: null,
}

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'SET_PROFILE':
      return { ...state, profile: action.profile }
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false }
    case 'RESET_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Sign in function
  const signIn = async (data: SigninFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      dispatch({ type: 'RESET_ERROR' })
      
      const result = await auth.signIn(data.email, data.password)
      
      if (result.user) {
        dispatch({ type: 'SET_USER', user: result.user })
        // Profile will be loaded by the auth state change listener
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      // Don't set loading false here, let the auth state change listener handle it
    }
  }

  // Sign up function
  const signUp = async (data: SignupFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      dispatch({ type: 'RESET_ERROR' })

      const result = await auth.signUp(
        data.email, 
        data.password, 
        data.fullName ? { full_name: data.fullName } : undefined
      )

      if (result.user) {
        dispatch({ type: 'SET_USER', user: result.user })
        // Profile will be created by the database trigger
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      // Don't set loading false here, let the auth state change listener handle it
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      await auth.signOut()
      dispatch({ type: 'SET_USER', user: null })
      dispatch({ type: 'SET_PROFILE', profile: null })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  // Forgot password function
  const forgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      dispatch({ type: 'RESET_ERROR' })
      
      await auth.resetPassword(data.email)
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  // Reset password function
  const resetPassword = async (data: ResetPasswordFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      dispatch({ type: 'RESET_ERROR' })
      
      await auth.updatePassword(data.password)
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!state.user) throw new Error('No user logged in')
      
      dispatch({ type: 'SET_LOADING', loading: true })
      const updatedProfile = await profiles.updateProfile(state.user.id, updates)
      dispatch({ type: 'SET_PROFILE', profile: updatedProfile })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: (error as Error).message })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  // Load user profile (non-blocking)
  const loadProfile = async (user: User) => {
    console.log('🔄 Loading profile for user:', user.id)
    
    try {
      const profile = await profiles.getProfile(user.id)
      console.log('✅ Profile loaded:', profile)
      dispatch({ type: 'SET_PROFILE', profile })
    } catch (error) {
      console.error('❌ Error loading profile:', error)
      // Profile might not exist yet for new users, that's okay
      dispatch({ type: 'SET_PROFILE', profile: null })
    }
    // Don't set loading to false here - loading is only for auth operations
  }

  // Listen to auth changes
  useEffect(() => {
    let mounted = true
    console.log('🚀 Auth useEffect mounted')

    // Get initial session
    auth.getSession().then(({ data: { session } }) => {
      console.log('📋 Initial session check:', session?.user ? 'User found' : 'No user')
      if (mounted) {
        if (session?.user) {
          dispatch({ type: 'SET_USER', user: session.user })
          // Load profile in background (non-blocking)
          loadProfile(session.user) // No await, no error handling needed
        } else {
          dispatch({ type: 'SET_USER', user: null })
          dispatch({ type: 'SET_PROFILE', profile: null })
        }
        // Always set loading to false after auth check
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    }).catch((error) => {
      console.error('Failed to get initial session:', error)
      if (mounted) {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state change:', event, session?.user ? 'User present' : 'No user')
      if (mounted) {
        if (session?.user) {
          dispatch({ type: 'SET_USER', user: session.user })
          // Load profile in background (non-blocking)
          loadProfile(session.user) // No await
        } else {
          dispatch({ type: 'SET_USER', user: null })
          dispatch({ type: 'SET_PROFILE', profile: null })
        }
        // Always set loading to false after auth state change
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    })

    return () => {
      console.log('🛑 Auth useEffect unmounting')
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 