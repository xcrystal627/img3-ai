'use client'
import React from 'react'
import { companyState } from '../providers/useCompanyStateProvider'
import FormInput from '@/components/FormInput'
import Input from '@/components/Input'
import { useRecoilValue } from 'recoil'
import { useCompanySetupProvider } from '../providers/useCompanySetupProvider'
import Button from '@/components/buttons/Button'

function CompanySetupPage() {
  const company = useRecoilValue(companyState)
  const { errorMessage, handleAddCompany, handleChangeCompany } =
    useCompanySetupProvider()

  return (
    <div className="mx-auto max-w-800 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Company Info</h1>
      </div>

      <form onSubmit={handleAddCompany}>
        <div className="mb-16 flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="会社名" error={errorMessage.companyName}>
              <Input
                name="companyName"
                type="text"
                placeholder="会社名"
                value={company.companyName}
                onChange={handleChangeCompany}
              />
            </FormInput>
            <FormInput label="郵便番号" error={errorMessage.zipCode}>
              <Input
                name="zipCode"
                type="text"
                placeholder="郵便番号"
                value={company.zipCode}
                onChange={handleChangeCompany}
              />
            </FormInput>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="都道府県" error={errorMessage.prefecture}>
              <Input
                name="prefecture"
                type="text"
                placeholder="都道府県"
                value={company.prefecture}
                onChange={handleChangeCompany}
              />
            </FormInput>
            <FormInput label="市区町村" error={errorMessage.city}>
              <Input
                name="city"
                type="text"
                placeholder="市区町村"
                value={company.city}
                onChange={handleChangeCompany}
              />
            </FormInput>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="番地" error={errorMessage.address}>
              <Input
                name="address"
                type="text"
                placeholder="番地"
                value={company.address}
                onChange={handleChangeCompany}
              />
            </FormInput>
            <FormInput label="建物名・部屋番号" error={errorMessage.building}>
              <Input
                name="building"
                type="text"
                placeholder="建物名・部屋番号"
                value={company.building}
                onChange={handleChangeCompany}
              />
            </FormInput>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="姓" error={errorMessage.lastName}>
              <Input
                name="lastName"
                type="text"
                placeholder="姓"
                value={company.lastName}
                onChange={handleChangeCompany}
              />
            </FormInput>
            <FormInput label="名" error={errorMessage.firstName}>
              <Input
                name="firstName"
                type="text"
                placeholder="名"
                value={company.firstName}
                onChange={handleChangeCompany}
              />
            </FormInput>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="姓（カナ）" error={errorMessage.lastNameKana}>
              <Input
                name="lastNameKana"
                type="text"
                placeholder="姓（カナ）"
                value={company.lastNameKana}
                onChange={handleChangeCompany}
              />
            </FormInput>
            <FormInput label="名（カナ）" error={errorMessage.firstNameKana}>
              <Input
                name="firstNameKana"
                type="text"
                placeholder="名（カナ）"
                value={company.firstNameKana}
                onChange={handleChangeCompany}
              />
            </FormInput>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            text="会社情報を登録する"
            type="submit"
            className="w-[320px]"
          ></Button>
        </div>
      </form>
    </div>
  )
}

export default CompanySetupPage
