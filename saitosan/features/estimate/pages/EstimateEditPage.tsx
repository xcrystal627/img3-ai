'use client'
import IconComponent from '@/components/IconComponent'
import React from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import { addComma } from '@/utils/common'
import { useEstimateEditStateProvider } from '../providers/useEstimateEditStateProvider'
import { PDFDownloadLink } from '@react-pdf/renderer'
import EstimatePdfPage from './EstimatePdfPage'

import Modal from '@/components/Modal'
import FormInput from '@/components/FormInput'
import Input from '@/components/Input'
import Button from '@/components/buttons/Button'
import dayjs from 'dayjs'
import { DatePicker } from 'antd'
import locale from 'antd/es/date-picker/locale/ja_JP'

function EstimateEditPage() {
  const {
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
    company,
    companyModal,
    handleOpenCompany,
    handleCloseCompany,
    handleChangeCompany,
    handleUpdateCompany,
  } = useEstimateEditStateProvider()

  return (
    <div className="mx-auto mb-8 mt-8 max-w-[800px] px-8 md800:px-0">
      <div className="mb-8 flex justify-between">
        <Link
          href={'/estimate/create'}
          className="rounded-full bg-gray-200 p-3 hover:bg-gray-300"
        >
          <IconComponent Icon={AiOutlineArrowLeft} color="white" size={18} />
        </Link>
        <PDFDownloadLink
          document={
            <EstimatePdfPage
              totalPrice={totalPrice}
              taxPrice={taxPrice}
              grandTotalPrice={grandTotalPrice}
              items={items}
              note={note}
              company={company}
              partnerCompany={partnerCompany}
              estimateInfo={estimateInfo}
            />
          }
          fileName="見積書.pdf"
        >
          <button className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-70">
            PDFダウンロード
          </button>
        </PDFDownloadLink>
      </div>

      <div>
        <div className="mb-8 flex w-full justify-center">
          <h1 className="text-2xl font-semibold">見積書</h1>
        </div>

        <div className="overflow-x-scroll">
          <div className="mb-4 grid w-[800px] grid-cols-5 gap-4">
            <div className="col-span-3">
              <button
                className="mb-4 flex w-full flex-col space-y-4 hover:rounded-md hover:bg-gray-100"
                onClick={handleOpenPartnerModal}
              >
                <div>
                  <span className="border-b border-black text-xl">
                    {partnerCompany.companyName} 様
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span>〒{partnerCompany.zipCode}</span>
                  <span>{`${partnerCompany.prefecture} ${partnerCompany.city}${partnerCompany.address}`}</span>
                  <span>{partnerCompany.building}</span>
                </div>
              </button>
              <div>
                <div className="mb-2">下記の通り御⾒積もり申し上げます。</div>
                <div className="w-full border">
                  <div className="flex border-b">
                    <div className="w-1/3 border-r px-4 py-2">⼩計</div>
                    <div className="w-1/3 border-r px-4 py-2">消費税</div>
                    <div className="w-1/3 px-4 py-2">合計⾦額</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 border-r px-4 py-2 text-end">
                      {addComma(totalPrice)}円
                    </div>
                    <div className="w-1/3 border-r px-4 py-2 text-end">
                      {addComma(taxPrice)}円
                    </div>
                    <div className="w-1/3 px-4 py-2 text-end text-xl">
                      {addComma(grandTotalPrice)}円
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <dl className="mb-4 grid grid-cols-1 gap-1">
                <div className="flex items-center justify-between">
                  <dt>見積日：</dt>
                  <dd>
                    <DatePicker
                      defaultValue={dayjs(estimateInfo.issueEstimatedAt)}
                      locale={locale}
                      onChange={(value) =>
                        handleChangeEstimateInfo(
                          'issueEstimatedAt',
                          dayjs(value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>見積もり番号：</dt>
                  <dd className="flex justify-end">
                    <input
                      type="number"
                      name="estimateNumber"
                      value={Number(estimateInfo.estimateNumber).toString()}
                      onChange={(event) =>
                        handleChangeEstimateInfo(
                          'estimateNumber',
                          event.target.value,
                        )
                      }
                      className="w-[50%] rounded-md border border-gray-300 px-2 py-1 text-right text-sm outline-none"
                    />
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>有効期限：</dt>
                  <dd>
                    <DatePicker
                      defaultValue={dayjs(estimateInfo.expireEstimatedAt)}
                      locale={locale}
                      onChange={(value) =>
                        handleChangeEstimateInfo(
                          'expireEstimatedAt',
                          dayjs(value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                  </dd>
                </div>
              </dl>
              <button
                onClick={handleOpenCompany}
                className="flex w-full flex-col  hover:rounded-md hover:bg-gray-100"
              >
                <div>{company.companyName}</div>
                <div className="flex flex-col items-start">
                  <span>〒{company.zipCode}</span>
                  <span>{`${company.prefecture} ${company.city}${company.address}`}</span>
                  <span>{company.building}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-16 w-[800px]">
            <div className="mb-2 w-full table-fixed border-collapse text-left">
              <div>
                <div className="flex">
                  <div className="grid w-full grid-cols-16">
                    <div className="col-span-8 border px-4 py-2 text-center">
                      詳細
                    </div>
                    <div className="col-span-2 border px-4 py-2 text-center">
                      数量
                    </div>
                    <div className="col-span-3 border px-4 py-2 text-center">
                      単価
                    </div>
                    <div className="col-span-3 border px-4 py-2 text-center">
                      金額
                    </div>
                  </div>
                  <div className="w-7"></div>
                </div>
              </div>
              <div>
                {items.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="grid w-full grid-cols-16">
                      <div className="col-span-8 border">
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(event) => handleItemChange(index, event)}
                          className="w-full px-4 py-2"
                        />
                      </div>
                      <div className="col-span-2 border">
                        <input
                          type="number"
                          name="quantity"
                          value={Number(item.quantity).toString()}
                          onChange={(event) => handleItemChange(index, event)}
                          className="w-full px-4 py-2 text-right"
                        />
                      </div>
                      <div className="col-span-3 border">
                        <input
                          type="number"
                          name="unitPrice"
                          value={Number(item.unitPrice).toString()}
                          onChange={(event) => handleItemChange(index, event)}
                          className="w-full py-2 pr-4 text-right"
                        />
                      </div>
                      <div className="col-span-3 border">
                        <div className="w-full px-4 py-2 text-right">
                          {addComma(item.quantity * item.unitPrice)}円
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center justify-center px-1"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <IconComponent Icon={IoCloseCircleSharp} size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddItem}
              className="rounded-md border px-2 py-1"
            >
              + 項目を追加
            </button>
          </div>
        </div>

        <div className="border">
          <div className="border-b p-2 text-center font-semibold text-black">
            備考
          </div>
          <div className="">
            <textarea
              className="min-h-[400px] w-full p-2 text-sm"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <Modal isOpen={partnerModal} onClose={handleClosePartnerModal}>
        <div className="flex w-full items-center justify-center">
          <div className="w-[500px] rounded-md bg-white px-6 py-4">
            <div className="mb-8">
              <h2 className="text-center text-2xl">送り先会社情報</h2>
            </div>

            <div className="mb-8">
              <FormInput label="会社名">
                <Input
                  type="text"
                  name="companyName"
                  placeholder="会社名"
                  value={partnerCompany.companyName}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
              <FormInput label="郵便番号">
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="郵便番号"
                  value={partnerCompany.zipCode}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
              <FormInput label="都道府県">
                <Input
                  type="text"
                  name="prefecture"
                  placeholder="都道府県"
                  value={partnerCompany.prefecture}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
              <FormInput label="市区町村">
                <Input
                  type="text"
                  name="city"
                  placeholder="市区町村"
                  value={partnerCompany.city}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
              <FormInput label="番地">
                <Input
                  type="text"
                  name="address"
                  placeholder="番地"
                  value={partnerCompany.address}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
              <FormInput label="建物名">
                <Input
                  type="text"
                  name="building"
                  placeholder="建物名"
                  value={partnerCompany.building}
                  onChange={handleChangePartnerCompany}
                ></Input>
              </FormInput>
            </div>

            <div>
              <Button
                text={'閉じる'}
                onClick={handleClosePartnerModal}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={companyModal} onClose={handleCloseCompany}>
        <div className="flex w-full items-center justify-center">
          <div className="w-[500px] rounded-md bg-white px-6 py-4">
            <div className="mb-8">
              <h2 className="text-center text-2xl">送り先会社情報</h2>
            </div>

            <div className="mb-8">
              <FormInput label="会社名">
                <Input
                  type="text"
                  name="companyName"
                  placeholder="会社名"
                  value={company.companyName}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
              <FormInput label="郵便番号">
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="郵便番号"
                  value={company.zipCode}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
              <FormInput label="都道府県">
                <Input
                  type="text"
                  name="prefecture"
                  placeholder="都道府県"
                  value={company.prefecture}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
              <FormInput label="市区町村">
                <Input
                  type="text"
                  name="city"
                  placeholder="市区町村"
                  value={company.city}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
              <FormInput label="番地">
                <Input
                  type="text"
                  name="address"
                  placeholder="番地"
                  value={company.address}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
              <FormInput label="建物名">
                <Input
                  type="text"
                  name="building"
                  placeholder="建物名"
                  value={company.building}
                  onChange={handleChangeCompany}
                ></Input>
              </FormInput>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 sm:space-y-0">
              <Button
                text={'閉じる'}
                bgColor="bg-gray-200"
                textColor="text-gray-900"
                onClick={handleCloseCompany}
              ></Button>
              <Button
                text={'保存'}
                onClick={handleUpdateCompany}
                className="mb-4 sm:mb-0"
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EstimateEditPage
