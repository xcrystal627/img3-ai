import { useRecoilState } from 'recoil'
import {
  CompanyState,
  companyState,
  useCompanyStateProvider,
} from './useCompanyStateProvider'
import { useLoadingStateProvider } from '@/features/loading/providers/loadingStateProvider'
import { appToastError } from '@/utils/toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useCompanySetupProvider = () => {
  const router = useRouter()
  const [company, setCompany] = useRecoilState(companyState)
  const { setIsLoading } = useLoadingStateProvider()
  const { addCompany, updateCompany } = useCompanyStateProvider()

  const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompany((prev) => ({ ...prev, [name]: value }))
  }

  const [errorMessage, setErrorMessage] = useState({
    companyName: '',
    zipCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
  })
  const validations = {
    isEmpty: (value: string) => value.trim() === '',
    isKana: (value: string) => /^[ァ-ヶー　]*$/.test(value),
  }
  const validateFields = () => {
    let isValid = true

    const fieldsToCheck: { [K in keyof Partial<CompanyState>]: string } = {
      companyName: '会社名を入力してください。',
      zipCode: '郵便番号を入力してください。',
      prefecture: '都道府県を入力してください。',
      city: '市区町村を入力してください。',
      address: '番地を入力してください。',
      building: '建物名・部屋番号を入力してください。',
      lastName: '姓を入力してください。',
      firstName: '名を入力してください。',
      lastNameKana: '姓（カナ）を入力してください。',
      firstNameKana: '名（カナ）を入力してください。',
    }

    const kanaFieldsToCheck: { [K in keyof Partial<CompanyState>]: string } = {
      lastNameKana: '姓（カナ）はカタカナで入力してください。',
      firstNameKana: '名（カナ）はカタカナで入力してください。',
    }

    for (const field in fieldsToCheck) {
      const value = company[field as keyof CompanyState]
      if (typeof value === 'string' && validations.isEmpty(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          [field]: fieldsToCheck[field as keyof CompanyState],
        }))
        isValid = false
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          [field]: '',
        }))
      }
    }

    for (const field in kanaFieldsToCheck) {
      const value = company[field as keyof CompanyState]
      if (typeof value === 'string' && !validations.isKana(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          [field]: kanaFieldsToCheck[field as keyof CompanyState],
        }))
        isValid = false
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          [field]: '',
        }))
      }
    }

    return isValid
  }

  const handleAddCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!validateFields()) return

      setIsLoading(true)
      await addCompany()
      setIsLoading(false)
      router.push('/estimate/create/projectOverview/new')
    } catch (error) {
      setIsLoading(false)
      appToastError('会社情報の登録に失敗しました。')
    }
  }
  const handleUpdateCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateFields()) return

    await updateCompany()
  }

  return {
    errorMessage,
    handleChangeCompany,
    handleAddCompany,
    handleUpdateCompany,
  }
}
