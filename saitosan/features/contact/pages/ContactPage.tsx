'use client'
import FormInput from '@/components/FormInput'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Button from '@/components/buttons/Button'
import React from 'react'
import { useContactProvider } from '../providers/useContactProvider'

function ContactPage() {
  const { contact, errorMessages, handleChange, handleSubmit } =
    useContactProvider()

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-1 text-gray-400">
            お手伝いできることがありましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <div className="flex flex-col rounded-xl border p-4 sm:p-6 lg:p-8">
          <h2 className="mb-8 text-xl font-semibold text-gray-900">
            フォームに入力してください
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                <FormInput label="姓" error={errorMessages.lastName}>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="星が"
                    value={contact.lastName}
                    onChange={handleChange}
                  ></Input>
                </FormInput>
                <FormInput label="名" error={errorMessages.firstName}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="きれい"
                    value={contact.firstName}
                    onChange={handleChange}
                  ></Input>
                </FormInput>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                <FormInput label="メールアドレス" error={errorMessages.email}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="saitou@example.com"
                    value={contact.email}
                    onChange={handleChange}
                  ></Input>
                </FormInput>
                <FormInput label="電話番号" error={errorMessages.phoneNumber}>
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="xxx-xxxx-xxxx"
                    value={contact.phoneNumber}
                    onChange={handleChange}
                  ></Input>
                </FormInput>
              </div>

              <div>
                <FormInput
                  label="お問い合わせ内容"
                  error={errorMessages.message}
                >
                  <Textarea
                    name="message"
                    placeholder="お問い合わせ内容を入力してください"
                    value={contact.message}
                    rows={4}
                    onChange={handleChange}
                  ></Textarea>
                </FormInput>
              </div>
            </div>

            <div className="mt-6 grid">
              <Button type="submit" text="お問い合わせを送信する"></Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                1-2営業日以内にご連絡させていただきます。<br></br>
                しかし、齋藤さんは忙しいので、返信が遅れる場合があります。
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
