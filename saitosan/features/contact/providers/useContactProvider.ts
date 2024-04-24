import { useLoadingStateProvider } from '@/features/loading/providers/loadingStateProvider'
import { appToastError, appToastSuccess } from '@/utils/toast'
import React, { useState } from 'react'

type ContactKey = 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'message'
const fieldNames: ContactKey[] = [
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'message',
]

export const useContactProvider = () => {
  const { setIsLoading } = useLoadingStateProvider()
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setContact((prev) => ({ ...prev, [name]: value }))
  }

  const [errorMessages, setErrorMessages] = useState<{
    [K in ContactKey]?: string
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const validateFields = () => {
    const errors = fieldNames.reduce(
      (prev, fieldName) => {
        if (!contact[fieldName]) {
          return { ...prev, [fieldName]: '入力してください' }
        }
        return prev
      },
      {} as { [K in ContactKey]?: string },
    )

    setErrorMessages(errors)

    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateFields()) {
      return
    }

    try {
      setIsLoading(true)
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${contact.lastName} ${contact.firstName}`,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
          message: contact.message,
        }),
      })
      setIsLoading(false)

      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      })
      appToastSuccess('お問い合わせを送信しました。')
    } catch (error) {
      setIsLoading(false)
      appToastError('お問い合わせの送信に失敗しました。')
    }
  }

  return {
    contact,
    errorMessages,
    handleChange,
    handleSubmit,
  }
}
