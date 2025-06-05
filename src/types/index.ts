// Export API types for consistent usage across the app
export type { Product, ProductData, ReviewData } from '@/lib/api'

// Additional UI types
export interface SearchModalProps {
  open: boolean
  setOpen: (open: boolean) => void
} 