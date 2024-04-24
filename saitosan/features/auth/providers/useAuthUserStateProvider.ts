import { useLoadingStateProvider } from '@/features/loading/providers/loadingStateProvider'
import { auth } from '@/libs/firebase/firebase'
import {
  GoogleAuthProvider,
  User,
  deleteUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

type AuthUserState = User | null
export const authUserState = atom<AuthUserState>({
  key: 'authUserState',
  default: null,
  dangerouslyAllowMutability: true,
})

export const useAuthUserStateProvider = () => {
  const [authUser, setAuthUser] = useRecoilState(authUserState)
  const { setIsLoading } = useLoadingStateProvider()

  // Googleアカウントでのログイン
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  // ログアウト
  const logout = async () => {
    await signOut(auth)
  }

  // ユーザーの削除
  const deleteAuthUser = async () => {
    const currentUser = auth.currentUser
    if (!currentUser || !authUser) return

    try {
      await deleteUser(currentUser)
    } catch (error) {
      throw error
    }
  }

  // ユーザーの状態を監視
  useEffect(() => {
    if (authUser) return

    const authUserChangedFunction = new Promise((resolve) => {
      return onAuthStateChanged(auth, (user) => {
        if (!user) {
          setAuthUser(null)
          resolve(null)
          return
        }
        setAuthUser(user)
        resolve(user)
      })
    })

    setIsLoading(true)
    authUserChangedFunction.finally(() => {
      setIsLoading(false)
    })
  }, [setAuthUser])

  return {
    authUser,
    setIsLoading,
    deleteAuthUser,

    // ログイン関連
    googleLogin,
    logout,
  }
}
