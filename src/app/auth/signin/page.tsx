import AuthLayout from '@/components/Auth/AuthLayout'
import SigninForm from '@/components/Auth/SigninForm'

export default function SigninPage() {
  return (
    <AuthLayout 
      title="Inloggen op je account"
      subtitle="Welkom terug! Log in om verder te gaan."
    >
      <SigninForm />
    </AuthLayout>
  )
} 