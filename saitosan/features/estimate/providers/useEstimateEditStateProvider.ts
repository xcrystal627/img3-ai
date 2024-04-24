import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Item } from '../types/estimateEdit'
import { estimateState } from './useEstimateStateProvider'
import dayjs from 'dayjs'
import {
  companyState,
  useCompanyStateProvider,
} from '@/features/company/providers/useCompanyStateProvider'
import { appToastError, appToastSuccess } from '@/utils/toast'
import { useLoadingStateProvider } from '@/features/loading/providers/loadingStateProvider'

export interface PartnerCompany {
  companyName: string
  zipCode: string
  prefecture: string
  city: string
  address: string
  building: string
}

export interface EstimateInfo {
  issueEstimatedAt: string
  expireEstimatedAt: string
  estimateNumber: string
}

export const useEstimateEditStateProvider = () => {
  const estimate = useRecoilValue(estimateState)
  const [items, setItems] = useState<Item[]>([])
  const [note, setNote] = useState('')
  const [estimateInfo, setEstimateInfo] = useState<EstimateInfo>({
    issueEstimatedAt: dayjs().format('YYYY/MM/DD'),
    expireEstimatedAt: dayjs().add(2, 'week').format('YYYY/MM/DD'),
    estimateNumber: '0',
  })
  const handleChangeEstimateInfo = (
    name: 'issueEstimatedAt' | 'expireEstimatedAt' | 'estimateNumber',
    value: dayjs.Dayjs | string,
  ) => {
    setEstimateInfo((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (estimate) {
      const items = estimate.estimates.map((item) => {
        return {
          description: item.name,
          quantity: 1,
          unitPrice: item.cost,
          totalPrice: item.cost,
        }
      })
      setItems(items)

      const noteData = estimate.estimates.map((item) => {
        return `
${item.name}：
${item.description}
${item.formula}
        `
      })
      setNote(noteData.join(''))
    }
  }, [estimate])

  const handleAddItem = () => {
    setItems([
      ...items,
      { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
    ])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const handleItemChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const name = event.target.name as 'description' | 'quantity' | 'unitPrice'
    const value = event.target.value

    const list = [...items]
    if (name === 'quantity') {
      list[index].quantity = Number(value)
    } else if (name === 'unitPrice') {
      list[index].unitPrice = Number(value)
    } else if (name === 'description') {
      list[index].description = value
    }

    list[index].totalPrice = list[index].quantity * list[index].unitPrice
    setItems(list)
  }

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.totalPrice
    }, 0)
  }, [items])

  const TAX_RATE = 0.1
  const taxPrice = useMemo(() => {
    return Math.floor(totalPrice * TAX_RATE)
  }, [totalPrice])

  const grandTotalPrice = useMemo(() => {
    return totalPrice + taxPrice
  }, [totalPrice, taxPrice])

  // //////////////////////////////////////////
  // 相手の顧客情報
  // //////////////////////////////////////////
  const [partnerModal, setPartnerModal] = useState(false)
  const handleOpenPartnerModal = () => setPartnerModal(true)
  const handleClosePartnerModal = () => setPartnerModal(false)
  const [partnerCompany, setPartnerCompany] = useState<{
    companyName: string
    zipCode: string
    prefecture: string
    city: string
    address: string
    building: string
  }>({
    companyName: '株式会社〇〇',
    zipCode: '0001111',
    prefecture: '〇〇県',
    city: '〇〇市',
    address: '〇〇0-1-3',
    building: '〇〇ビル 300',
  })
  const handleChangePartnerCompany = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setPartnerCompany((prev) => ({ ...prev, [name]: value }))
  }
  // //////////////////////////////////////////

  // //////////////////////////////////////////
  // 自社情報
  // //////////////////////////////////////////
  const { setIsLoading } = useLoadingStateProvider()
  const [company, setCompany] = useRecoilState(companyState)
  const { updateCompany } = useCompanyStateProvider()
  const [companyModal, setCompanyModal] = useState(false)
  const handleCloseCompany = () => setCompanyModal(false)
  const handleOpenCompany = () => setCompanyModal(true)
  const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }
  const handleUpdateCompany = async () => {
    try {
      setIsLoading(true)
      await updateCompany()
      handleCloseCompany()

      setIsLoading(false)
      appToastSuccess('会社情報を更新しました')
    } catch (error) {
      setIsLoading(false)
      appToastError('会社情報の更新に失敗しました')
    }
  }

  // //////////////////////////////////////////

  return {
    items,
    note,
    setNote,
    handleAddItem,
    handleRemoveItem,
    handleItemChange,
    totalPrice,
    taxPrice,
    grandTotalPrice,
    partnerModal,
    handleOpenPartnerModal,
    handleClosePartnerModal,
    partnerCompany,
    handleChangePartnerCompany,
    estimateInfo,
    handleChangeEstimateInfo,

    // 自社情報
    company,
    companyModal,
    handleOpenCompany,
    handleCloseCompany,
    handleChangeCompany,
    handleUpdateCompany,
  }
}
