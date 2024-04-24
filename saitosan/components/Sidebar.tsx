import {
  authUserState,
  useAuthUserStateProvider,
} from '@/features/auth/providers/useAuthUserStateProvider'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Divider from './Divider'
import { useRouter } from 'next/navigation'
import IconComponent from './IconComponent'
import { GrClose } from 'react-icons/gr'

function Sidebar() {
  const authUser = useRecoilValue(authUserState)
  const { logout } = useAuthUserStateProvider()

  const router = useRouter()
  const handleLink = (link: string) => {
    router.push(link)

    const element = document.getElementById('application-sidebar')
    element?.click()
  }

  const handleClose = () => {
    const element = document.getElementById('application-sidebar')
    element?.click()
  }

  return (
    <div
      id="application-sidebar"
      className="
      hs-overlay scrollbar-y
      fixed bottom-0 left-0 
      top-0 z-[60] flex hidden w-full -translate-x-full transform 
      flex-col overflow-y-auto border-r 
      border-gray-200 
      bg-gradient-to-r from-primary50 to-primary200 
      pb-10 pt-7 transition-all duration-300 hs-overlay-open:translate-x-0
      "
    >
      <div className="flex justify-end px-6">
        <button onClick={handleClose}>
          <IconComponent Icon={GrClose} color="" />
        </button>
      </div>
      <nav
        className="hs-accordion-group flex w-full flex-col flex-wrap p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <LinkButton text="ホーム" onClick={() => handleLink('/')} />
          <LinkButton
            text="お問い合わせ"
            onClick={() => handleLink('/contact')}
          />
          {authUser ? (
            <LinkButton text="ログアウト" onClick={logout} />
          ) : (
            <>
              <LinkButton
                text="ログイン"
                onClick={() => handleLink('/auth/login')}
              />
              <LinkButton
                text="登録"
                onClick={() => handleLink('/auth/signup')}
              />
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

const LinkButton = ({
  text,
  onClick,
  className = 'text-xl text-gray-700',
}: {
  text: string
  onClick: () => void
  className?: string
}) => (
  <li className="text-center">
    <button type="button" onClick={onClick} className={className}>
      {text}
    </button>
    <Divider className="mt-3" />
  </li>
)

export default Sidebar
