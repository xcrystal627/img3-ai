'use client'
import React from 'react'
import { useEstimateStateProvider } from '../providers/useEstimateStateProvider'
import FormInput from '@/components/FormInput'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/buttons/Button'

function EstimateCreatePage() {
  const { OPTIONS, formData, handleChange, handleSubmit, handleCheckedChange } =
    useEstimateStateProvider()

  return (
    <div className="mx-auto max-w-[800px] px-3 py-8">
      <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
        <FormInput label="プロジェクト概要">
          <Textarea
            name="projectOverview"
            value={formData.projectOverview}
            placeholder="ドライブデートマッチングアプリ"
            onChange={handleChange}
          ></Textarea>
        </FormInput>
        <div className="grid grid-cols-2 gap-x-4">
          <FormInput label="プロジェクト期間">
            <div className="flex items-end">
              <Input
                name="period"
                type="number"
                value={Number(formData.period).toString()}
                placeholder="3"
                onChange={handleChange}
              ></Input>
              <div className="flex-none">ヶ月</div>
            </div>
          </FormInput>
          <FormInput label="開発予算">
            <div className="flex items-end">
              <Input
                name="budget"
                type="number"
                value={Number(formData.budget).toString()}
                placeholder="3000000"
                onChange={handleChange}
              ></Input>
              <div className="flex-none">円</div>
            </div>
          </FormInput>
        </div>
        <FormInput label="機能">
          <Textarea
            name="functions"
            value={formData.functions}
            placeholder="認証(アカウント作成、ログイン・ログアウト)、プロフィール作成・編集、本人確認、チャット、通話、退会"
            onChange={handleChange}
          ></Textarea>
        </FormInput>
        <FormInput label="使用技術">
          <Textarea
            name="techUsed"
            value={formData.techUsed}
            placeholder="Flutter, Firebase, chat-gpt, Google Cloud"
            onChange={handleChange}
          ></Textarea>
        </FormInput>
        <FormInput label="開発リソース">
          <Textarea
            name="resources"
            value={formData.resources}
            placeholder="開発者２名：時給4000円"
            onChange={handleChange}
          ></Textarea>
        </FormInput>

        <div>
          <Label>オプション（*あくまで見積書の項目です）</Label>
          <div className="flex flex-col space-y-2">
            {OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                name={option.name}
                value={option.value}
                checked={formData.options.includes(option.value)}
                onCheckedChange={handleCheckedChange}
              />
            ))}
          </div>
        </div>

        <div className="w-full">
          <Button type="submit" text="見積書作成"></Button>
        </div>
      </form>
    </div>
  )
}

export default EstimateCreatePage
