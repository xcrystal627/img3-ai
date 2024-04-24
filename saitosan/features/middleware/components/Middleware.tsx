import React from 'react'
import { useMiddleware } from '../useMiddleware'
import { useCompanyStateProvider } from '@/features/company/providers/useCompanyStateProvider'
import { useAuthUserStateProvider } from '@/features/auth/providers/useAuthUserStateProvider'

function Middleware({ children }: { children: React.ReactNode }) {
  useAuthUserStateProvider()
  useMiddleware()
  useCompanyStateProvider()
  return <div>{children}</div>
}

export default Middleware
