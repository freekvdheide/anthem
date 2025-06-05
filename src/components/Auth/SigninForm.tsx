'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { SigninFormData } from '@/types/auth'
import AuthInput from './AuthInput'
import AuthButton from './AuthButton'

export default function SigninForm() {
  const { signIn, loading, error } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<SigninFormData>({
    email: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<Partial<SigninFormData>>({})

  const validateForm = (): boolean => {
    const errors: Partial<SigninFormData> = {}

    if (!formData.email) {
      errors.email = 'E-mailadres is verplicht'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Voer een geldig e-mailadres in'
    }

    if (!formData.password) {
      errors.password = 'Wachtwoord is verplicht'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await signIn(formData)
      router.push('/') // Redirect naar hoofdpagina na succesvol inloggen
    } catch (error) {
      // Error wordt al afgehandeld door AuthProvider
      console.error('Signin error:', error)
    }
  }

  const handleInputChange = (field: keyof SigninFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <AuthInput
        id="email"
        name="email"
        type="email"
        label="E-mailadres"
        autoComplete="email"
        required
        value={formData.email}
        onChange={handleInputChange('email')}
        error={formErrors.email}
      />

      <AuthInput
        id="password"
        name="password"
        type="password"
        label="Wachtwoord"
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={handleInputChange('password')}
        error={formErrors.password}
      />

      <AuthButton type="submit" loading={loading}>
        Inloggen
      </AuthButton>

      {/* Forgot password link - Better UX placement */}
      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Wachtwoord vergeten?
        </Link>
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">
          Nog geen account?{' '}
          <Link
            href="/auth/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Maak een account aan
          </Link>
        </span>
      </div>
    </form>
  )
} 