import { useRouter } from 'next/navigation'
import { useAuthUserStateProvider } from './useAuthUserStateProvider'

export const useLoginProvider = () => {
  const router = useRouter()
  const { googleLogin, logout } = useAuthUserStateProvider()

  const handleGoogleLogin = async () => {
    try {
      await googleLogin()
      router.push('/')
    } catch (error) {
      throw error
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return {
    handleGoogleLogin,
    handleLogout,
  }
}
