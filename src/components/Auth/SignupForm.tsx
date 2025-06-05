'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { SignupFormData } from '@/types/auth'
import AuthInput from './AuthInput'
import AuthButton from './AuthButton'

export default function SignupForm() {
  const { signUp, loading, error } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const [formErrors, setFormErrors] = useState<Partial<SignupFormData>>({})

  const validateForm = (): boolean => {
    const errors: Partial<SignupFormData> = {}

    if (!formData.email) {
      errors.email = 'E-mailadres is verplicht'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Voer een geldig e-mailadres in'
    }

    if (!formData.password) {
      errors.password = 'Wachtwoord is verplicht'
    } else if (formData.password.length < 6) {
      errors.password = 'Wachtwoord moet minimaal 6 karakters lang zijn'
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Bevestig je wachtwoord'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Wachtwoorden komen niet overeen'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await signUp(formData)
      router.push('/auth/verify-email') // Redirect naar email verificatie pagina
    } catch (error) {
      // Error wordt al afgehandeld door AuthProvider
      console.error('Signup error:', error)
    }
  }

  const handleInputChange = (field: keyof SignupFormData) => (
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
        id="fullName"
        name="fullName"
        type="text"
        label="Volledige naam (optioneel)"
        autoComplete="name"
        value={formData.fullName}
        onChange={handleInputChange('fullName')}
        error={formErrors.fullName}
      />

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
        autoComplete="new-password"
        required
        value={formData.password}
        onChange={handleInputChange('password')}
        error={formErrors.password}
      />

      <AuthInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Bevestig wachtwoord"
        autoComplete="new-password"
        required
        value={formData.confirmPassword}
        onChange={handleInputChange('confirmPassword')}
        error={formErrors.confirmPassword}
      />

      <AuthButton type="submit" loading={loading}>
        Account aanmaken
      </AuthButton>

      <p className="text-center text-sm text-gray-500">
        Heb je al een account?{' '}
        <Link
          href="/auth/signin"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </Link>
      </p>
    </form>
  )
} 