'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
              error ? 'outline-red-500 focus:outline-red-500' : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'

export default AuthInput 