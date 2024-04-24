'use client'
import Link from 'next/link'
import React from 'react'
import { useLoginProvider } from '../providers/useLoginProvider'
import IconComponent from '@/components/IconComponent'
import { FcGoogle } from 'react-icons/fc'

function LoginPage() {
  const { handleGoogleLogin } = useLoginProvider()

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">ログイン</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              まだアカウントを持っていませんか？
              <Link
                href="/auth/signup"
                className="font-medium text-primary decoration-2 hover:underline"
              >
                こちらで登録
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="
          inline-flex w-full items-center justify-center gap-2 
          rounded-md border bg-white px-4 py-3 align-middle 
          text-sm font-medium text-gray-700 shadow-sm transition-all 
          hover:bg-gray-50 focus:outline-none focus:ring-2 
          focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              onClick={handleGoogleLogin}
            >
              <IconComponent Icon={FcGoogle} />
              Googleでログイン
            </button>

            {/* <div
          className="
        flex items-center py-3 text-xs uppercase 
        text-gray-400 before:mr-6 before:flex-[1_1_0%] 
        before:border-t before:border-gray-200 
        after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200"
        >
          または
        </div> */}

            {/* <form>
          <div className="grid gap-y-4">
            <FormInput label="メールアドレス">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={''}
                onChange={() => {}}
              />
            </FormInput>
            <FormInput label="パスワード">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={''}
                onChange={() => {}}
              />
            </FormInput>
            <FormInput label="パスワード（確認）">
              <Input
                name="password_confirmation"
                type="password"
                placeholder="Password"
                value={''}
                onChange={() => {}}
              />
            </FormInput>

            <div className="flex items-center">
              <div className="flex">
                <input
                  id="terms-conditions"
                  name="terms-conditions"
                  type="checkbox"
                  className="pointer-events-none mt-0.5 shrink-0 rounded border-gray-200 text-primary focus:ring-primary500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms-conditions" className="text-sm">
                  {' '}
                  <a
                    className="font-medium text-primary decoration-2 hover:underline"
                    href="#"
                  >
                    利用規約
                  </a>
                  に同意する
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="
              inline-flex items-center justify-center gap-2 
              rounded-md border border-transparent bg-primary px-4 
              py-3 text-sm font-semibold text-white transition-all 
              hover:bg-primary600 focus:outline-none focus:ring-2 
              focus:ring-primary500 focus:ring-offset-2"
            >
              サインアップ
            </button>
          </div>
        </form> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
