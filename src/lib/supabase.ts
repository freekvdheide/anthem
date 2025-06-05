import { createClient } from '@supabase/supabase-js'
import type { Session } from '@supabase/supabase-js'
import { Database, OptimizedProfile } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helper functions
export const auth = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, metadata?: { full_name?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) throw error
    return data
  },

  // Update password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    if (error) throw error
    return data
  },

  // Get current session
  getSession: () => supabase.auth.getSession(),

  // Get current user
  getUser: () => supabase.auth.getUser(),

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Profile helper functions
export const profiles = {
  // Get user profile (optimized)
  getProfile: async (userId: string): Promise<OptimizedProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, subscription_status, avatar_url') // Only select needed fields
      .eq('id', userId)
      .single()
    
    // If profile doesn't exist, return null instead of throwing error
    if (error && error.code === 'PGRST116') {
      return null
    }
    
    if (error) throw error
    return data
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<OptimizedProfile>): Promise<OptimizedProfile> => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select('id, email, full_name, subscription_status, avatar_url') // Only select needed fields
      .single()
    
    if (error) throw error
    return data
  }
} 