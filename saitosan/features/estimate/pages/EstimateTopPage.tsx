'use client'
import Link from 'next/link'
import React from 'react'
import HowToUse from '../components/HowToUse'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { authUserState } from '@/features/auth/providers/useAuthUserStateProvider'

function EstimateTopPage() {
  const authUser = useRecoilValue(authUserState)
  return (
    <main className="mx-auto max-w-6xl px-8 sm:px-12 lg:px-24 xl:px-0">
      <div className="grid grid-cols-1 gap-10 px-4 pb-14 pt-16 tablet:px-16 lg:max-w-1440 lg:grid-cols-5 lg:px-22">
        <div className="grid grid-flow-row content-center justify-items-center gap-4 lg:col-span-2 lg:justify-items-start lg:gap-10 lg:justify-self-start">
          <h2 className="hidden text-4xl font-bold leading-tight tracking-tight lg:block lg:text-4xl xl:text-5.5xl">
            見積もり上手の
            <br />
            齋藤さん
          </h2>
          <h2 className="text-4xl font-bold leading-tight tracking-tight lg:hidden xl:text-5.5xl">
            見積もり上手の齋藤さん
          </h2>

          <p className="text-center text-gray-600 lg:text-start">
            プロジェクトに合った見積書を齋藤さんが自動生成することで、見積もり業務の効率化を実現します。
          </p>

          <Link
            href={
              authUser ? '/estimate/create/projectOverview/new' : '/auth/signup'
            }
            className="w-full rounded-full bg-gradient-to-r from-primary to-primary600 px-4 py-4 text-center text-white tablet:w-[320px] lg:w-[90%] xl:w-4/5"
          >
            見積書を自動生成してみる
          </Link>
        </div>

        <div className="grid items-center justify-center lg:col-span-3">
          <Image
            src={'/images/main.png'}
            alt="main"
            width={0}
            height={0}
            sizes="44vw"
            className="hidden h-auto w-full lg:block"
          ></Image>
          <Image
            src={'/images/main.png'}
            alt="main"
            width={0}
            height={0}
            sizes="66vw"
            className="h-auto w-full lg:hidden"
          ></Image>
        </div>
      </div>

      <section className="grid max-w-1440 grid-flow-row gap-8 px-22 pb-16 pt-12 text-center md:gap-16 md:pb-24 md:pt-20">
        <h2 className="text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
          見積書を自動生成する方法
        </h2>
        <div className="grid grid-cols-1 items-start justify-items-center gap-8 md:grid-cols-3">
          <HowToUse
            src={'/images/input_company_info.svg'}
            alt="how to input company info"
            title="会社情報を入力"
            description="齋藤さんの手を煩わせないように会社情報を入力します。"
          ></HowToUse>
          <HowToUse
            src={'/images/generate_estimate.svg'}
            alt="how to generate estimate"
            title="見積書を自動生成"
            description="忙しい齋藤さんに申し訳なさそうに見積書の作成依頼を出します。"
          ></HowToUse>
          <HowToUse
            src={'/images/download_estimate.svg'}
            alt="how to download estimate"
            title="見積書をダウンロード"
            description="優しい齋藤さんから頂いた見積書をPDFでダウンロードできます。"
          ></HowToUse>
        </div>
      </section>

      <section className="grid max-w-1440 grid-flow-row gap-8 px-22 pb-16 pt-12 text-center md:gap-16 md:pb-24 md:pt-20">
        <h2 className="text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
          「見積書を自動生成」チュートリアル
        </h2>
      </section>
    </main>
  )
}

export default EstimateTopPage
