'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export default function AuthButton({ 
  children, 
  loading = false, 
  variant = 'primary',
  fullWidth = true,
  className = '',
  disabled,
  ...props 
}: AuthButtonProps) {
  const baseClasses = `flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
    fullWidth ? 'w-full' : ''
  }`
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600 disabled:bg-indigo-400',
    secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-indigo-600'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Bezig...
        </div>
      ) : (
        children
      )}
    </button>
  )
} 