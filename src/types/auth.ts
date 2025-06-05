import { User } from '@supabase/supabase-js'
import { Profile, OptimizedProfile } from './database'

// Auth form data types
export interface SigninFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  fullName?: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

// Auth state types (using OptimizedProfile for better performance)
export interface AuthState {
  user: User | null
  profile: OptimizedProfile | null
  loading: boolean
  error: string | null
}

// Auth actions
export type AuthAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_USER'; user: User | null }
  | { type: 'SET_PROFILE'; profile: OptimizedProfile | null }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'RESET_ERROR' }

// Auth context type
export interface AuthContextType extends AuthState {
  signIn: (data: SigninFormData) => Promise<void>
  signUp: (data: SignupFormData) => Promise<void>
  signOut: () => Promise<void>
  forgotPassword: (data: ForgotPasswordFormData) => Promise<void>
  resetPassword: (data: ResetPasswordFormData) => Promise<void>
  updateProfile: (updates: Partial<OptimizedProfile>) => Promise<void>
}

// Subscription status options
export type SubscriptionStatus = 'free' | 'essential' | 'growth' | 'enterprise' 