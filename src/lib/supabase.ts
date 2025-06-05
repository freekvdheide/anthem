import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = 'https://vmibwzfwkwniqabkmwtv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaWJ3emZ3a3duaXFhYmttd3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDYzNTIsImV4cCI6MjA2NDY4MjM1Mn0.MYdQtGKcGFMjUVnwPhak6_ME13o6NfY8eKtXMy_Fhv8'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type aliases for easier use
export type ProductOverview = Database['public']['Views']['product_overview']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductVariant = Database['public']['Tables']['product_variants']['Row']
export type ProductReview = Database['public']['Tables']['product_reviews']['Row']
export type Customer = Database['public']['Tables']['customers']['Row'] 