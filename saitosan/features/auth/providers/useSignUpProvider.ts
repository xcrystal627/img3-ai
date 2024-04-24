import { useRouter } from 'next/navigation'
import { useAuthUserStateProvider } from './useAuthUserStateProvider'

export const useSignUpProvider = () => {
  const { googleLogin } = useAuthUserStateProvider()
  const router = useRouter()

  const handleGoogleSignUp = async () => {
    try {
      await googleLogin()
      router.push('/setup')
    } catch (error) {
      throw error
    }
  }

  return {
    handleGoogleSignUp,
  }
}
