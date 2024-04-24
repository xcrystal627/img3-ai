import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { authUserState } from '../auth/providers/useAuthUserStateProvider'
import {
  companyState,
  useCompanyStateProvider,
} from '../company/providers/useCompanyStateProvider'

const publicPaths = ['/', '/auth/login', '/auth/signup', '/contact']

export const useMiddleware = () => {
  const router = useRouter()
  const pathName = usePathname()
  const authUser = useRecoilValue(authUserState)
  const company = useRecoilValue(companyState)
  const { fetchCompany } = useCompanyStateProvider()

  // 未ログイン時にTOPページにリダイレクトする
  if (pathName && !publicPaths.includes(pathName) && !authUser) {
    router.push('/')
  }

  // ログイン済みで、publicPaths以外にいて、会社情報が未設定の場合は、会社情報設定画面にリダイレクトする
  if (
    pathName &&
    !publicPaths.includes(pathName) &&
    authUser &&
    !company?.isCompletedSetup
  ) {
    try {
      fetchCompany().then((data) => {
        if (!data?.isCompletedSetup) {
          router.push('/setup')
        }
      })
    } catch (error) {
      router.push('/setup')
    }
  }
}
