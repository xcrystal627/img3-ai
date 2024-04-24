import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { Company } from '../models/company.model'
import { authUserState } from '@/features/auth/providers/useAuthUserStateProvider'
import { useEffect } from 'react'
import { setDoc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import {
  DocRef,
  appServerTimestamp,
  getDocIdWithData,
  toTimestamp,
} from '@/libs/firebase/firestore'

export interface CompanyState extends Company {}
export const companyState = atom<CompanyState>({
  key: 'companyState',
  default: new Company({
    id: '',
    createdAt: toTimestamp(new Date()),
    updatedAt: toTimestamp(new Date()),
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
    isCompletedSetup: false,
  }),
})
export const useCompanyStateProvider = () => {
  const authUser = useRecoilValue(authUserState)
  const [company, setCompany] = useRecoilState(companyState)

  const addCompany = async () => {
    if (!authUser) return
    await setDoc(DocRef.company(authUser.uid), {
      ...company,
      createdAt: appServerTimestamp(),
      updatedAt: appServerTimestamp(),
      isCompletedSetup: true,
    })
  }

  const updateCompany = async () => {
    if (!authUser) return
    await updateDoc(DocRef.company(authUser.uid), {
      ...company,
      updatedAt: appServerTimestamp(),
    })
  }

  const fetchCompany = async () => {
    if (!authUser) return
    const doc = await getDoc(DocRef.company(authUser.uid))
    if (!doc.exists()) return

    const data = getDocIdWithData(doc)
    setCompany(data)
    return data
  }

  useEffect(() => {
    if (!authUser) return

    const unsub = onSnapshot(DocRef.company(authUser.uid), (doc) => {
      if (!doc.exists()) return

      const data = getDocIdWithData(doc)
      setCompany(data)
    })

    return () => {
      unsub()
    }
  }, [authUser])

  return {
    addCompany,
    updateCompany,
    fetchCompany,
  }
}
