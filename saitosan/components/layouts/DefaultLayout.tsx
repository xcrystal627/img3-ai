'use client'
import Loading from '@/app/loading'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import Header from '../Header'
import Footer from '../Footer'
import Middleware from '@/features/middleware/components/Middleware'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../Sidebar'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('preline')
  }, [])

  return (
    <RecoilRoot>
      <Loading />
      <Toaster position="top-center" reverseOrder={false} />

      <Middleware>
        <div className="flex h-screen flex-col">
          <Header></Header>
          <Sidebar></Sidebar>
          <div className="flex-1">{children}</div>
          <Footer></Footer>
        </div>
      </Middleware>
    </RecoilRoot>
  )
}

export default DefaultLayout
