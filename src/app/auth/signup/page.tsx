import AuthLayout from '@/components/Auth/AuthLayout'
import SignupForm from '@/components/Auth/SignupForm'

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Maak je account aan"
      subtitle="Sluit je aan bij duizenden tevreden gebruikers."
    >
      <SignupForm />
    </AuthLayout>
  )
} 