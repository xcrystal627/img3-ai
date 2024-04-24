import Link from 'next/link'
import IconComponent from './IconComponent'
import { FiMenu } from 'react-icons/fi'
import { useRecoilValue } from 'recoil'
import {
  authUserState,
  useAuthUserStateProvider,
} from '@/features/auth/providers/useAuthUserStateProvider'

const Header = () => {
  const authUser = useRecoilValue(authUserState)
  const { logout } = useAuthUserStateProvider()

  return (
    <header className="flex max-h-20 flex-none items-center border-b border-gray-100">
      <div className="mx-auto flex w-full max-w-1440 items-center justify-between p-4">
        <div className="flex items-center">
          <Link href={'/'}>
            <h1 className="mr-8 font-kasugi text-2xl font-semibold">
              見積もり上手の齋藤さん
            </h1>
          </Link>
        </div>

        <div className="flex items-center py-4 tablet:hidden tablet:py-0">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <IconComponent Icon={FiMenu} />
          </button>
        </div>

        <div className="hidden tablet:flex tablet:space-x-2">
          <Link
            href={'/contact'}
            className="rounded-md border border-gray-200 px-4 py-2"
          >
            お問い合わせ
          </Link>
          {authUser ? (
            <button
              type="button"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              onClick={logout}
            >
              ログアウト
            </button>
          ) : (
            <>
              <Link
                href={'/auth/login'}
                className="rounded-md bg-gray-200 px-4 py-2"
              >
                ログイン
              </Link>
              <Link
                href={'/auth/signup'}
                className="rounded-md bg-gray-900 px-4 py-2 text-white"
              >
                登録
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
