import { authUserState } from '@/features/auth/providers/useAuthUserStateProvider'
import { useLoadingStateProvider } from '@/features/loading/providers/loadingStateProvider'
import { generateDocId } from '@/libs/firebase/firestore'
import { appToastError } from '@/utils/toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { atom, useRecoilState, useRecoilValue } from 'recoil'

const OPTIONS = [
  {
    name: '要件定義書作成',
    value: '要件定義書作成',
  },
  {
    name: 'デザイン作成',
    value: 'デザイン作成',
  },
  {
    name: '仕様書作成',
    value: '仕様書作成',
  },
  {
    name: 'テスト',
    value: 'テスト',
  },
]

export interface Estimate {
  name: string
  description: string
  formula: string
  cost: number
}

export interface EstimateState {
  total_cost: number
  project: string
  estimates: Estimate[]
}

export const estimateState = atom<EstimateState>({
  key: 'estimateState',
  default: {
    total_cost: 0,
    project: '',
    estimates: [],
  },
})

export const useEstimateStateProvider = () => {
  const router = useRouter()
  const authUser = useRecoilValue(authUserState)
  const { setIsLoading } = useLoadingStateProvider()
  const [, setEstimate] = useRecoilState(estimateState)
  const [formData, setFormData] = useState<{
    projectOverview: string
    functions: string
    techUsed: string
    period: number
    resources: string
    budget: number
    options: string[]
  }>({
    projectOverview: '',
    functions: '',
    techUsed: '',
    period: 0,
    resources: '',
    budget: 0,
    options: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      setIsLoading(
        true,
        '齋藤さんが席を外していまして、\n申し訳ないのですが、2分ほどお待ちください。',
      )
      // TODO: firestoreにformDataを保存

      const response = await fetch('/api/createEstimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)

        // TODO: firestoreにプロジェクト内容と見積結果を保存
        const estimateId = generateDocId()
        // await setDoc(DocRef.companyEstimate(authUser?.uid!, estimateId), {
        //   ...formData,
        // })

        setEstimate(data)
        router.push(`/estimate/${estimateId}/edit`)
      }

      setIsLoading(false)
    } catch (error) {
      appToastError('エラーが発生しました。')
      setIsLoading(false)
    }
  }

  const handleCheckedChange = (value: string, isChecked: boolean) => {
    setFormData((prevState) => {
      if (isChecked) {
        return { ...prevState, options: [...prevState.options, value] }
      } else {
        return {
          ...prevState,
          options: prevState.options.filter((item) => item !== value),
        }
      }
    })
  }

  return {
    OPTIONS,
    formData,
    handleChange,
    handleSubmit,
    handleCheckedChange,
  }
}
