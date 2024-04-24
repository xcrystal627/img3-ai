'use client'
import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'
import { addComma } from '@/utils/common'
import { Item } from '../types/estimateEdit'
import { CompanyState } from '@/features/company/providers/useCompanyStateProvider'
import { EstimateInfo, PartnerCompany } from '../providers/useEstimateEditStateProvider'

Font.register({
  family: 'Noto Sans JP, sans-serif;',
  src: '/assets/fonts/notosan/static/NotoSansJP-Regular.ttf',
})

const tw = createTw({
  theme: {
    extend: {
      colors: {
        primary: 'cornflowerblue',
      },
      fontFamily: {
        notojp: ['Noto Sans', 'sans-serif'],
      },
    },
  },
})

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    maxWidth: '800px',
    fontFamily: 'Noto Sans JP, sans-serif;',
  },
  headerContent: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 16,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexJustifyCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estimateContent: {
    ...tw(`border-t border-l border-r`),
  },
  grid: {
    flexDirection: 'row',
    ...tw(`w-full border-b`),
  },
  col8: {
    flex: 8,
    ...tw(`border-r px-4 py-2`),
  },
  col2: {
    flex: 2,
    ...tw(`border-r px-4 py-2`),
  },
  col3: {
    flex: 3,
    ...tw(`px-4 py-2`),
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
})

const EstimatePdfPage = ({
  totalPrice,
  taxPrice,
  grandTotalPrice,
  items,
  note,
  company,
  partnerCompany,
  estimateInfo,
}: {
  totalPrice: number
  taxPrice: number
  grandTotalPrice: number
  items: Item[]
  note: string
  company: CompanyState
  partnerCompany: PartnerCompany
  estimateInfo: EstimateInfo
}) => {
  return (
    // <PDFViewer width={'100%'} height="950px">
    <Document>
      <Page size="A4" style={[styles.page, tw('text-sm')]}>
        <Text style={{ ...tw(`mb-8 text-2xl font-bold text-center`) }}>見積書</Text>

        <View style={styles.headerContent}>
          <View style={{ ...tw(`w-[55%]`) }}>
            <View style={{ ...tw(`mb-4`) }}>
              <View>
                <Text style={{ ...tw(`text-xl`) }}>{partnerCompany.companyName} 様</Text>
              </View>
              <View style={{ ...tw(`flex flex-col`) }}>
                <Text style={{ ...tw('text-sm') }}>〒{partnerCompany.zipCode}</Text>
                <Text
                  style={{ ...tw('text-sm') }}
                >{`${partnerCompany.prefecture} ${partnerCompany.city}${partnerCompany.address}`}</Text>
                <Text style={{ ...tw('text-sm') }}>{partnerCompany.building}</Text>
              </View>
            </View>

            <View>
              <Text style={{ ...tw(`mb-2`) }}>下記の通り御⾒積もり申し上げます。</Text>
              <View style={{ ...tw(`w-full border`) }}>
                <View style={[styles.tableHeader, tw(`border-b`)]}>
                  <View style={{ ...tw(`w-[33%] text-center border-r p-2`) }}>
                    <Text>⼩計</Text>
                  </View>
                  <View style={{ ...tw(`w-[33%] text-center border-r p-2`) }}>
                    <Text>消費税</Text>
                  </View>
                  <View style={{ ...tw(`w-[33%] text-center p-2`) }}>
                    <Text>合計⾦額</Text>
                  </View>
                </View>
                <View style={[styles.tableHeader]}>
                  <View style={{ ...tw(`w-[33%] border-r p-2 text-right`) }}>
                    <Text>{addComma(totalPrice)}円</Text>
                  </View>
                  <View style={{ ...tw(`w-[33%] border-r p-2 text-right`) }}>
                    <Text>{addComma(taxPrice)}円</Text>
                  </View>
                  <View style={{ ...tw(`w-[33%] p-2 text-right`) }}>
                    <Text>{addComma(grandTotalPrice)}円</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ ...tw(`w-[40%]`) }}>
            <View style={{ ...tw(`mb-4`) }}>
              <View style={[styles.flexJustifyCenter]}>
                <Text>見積日：</Text>
                <Text>{estimateInfo.issueEstimatedAt}</Text>
              </View>
              <View style={[styles.flexJustifyCenter]}>
                <Text>見積もり番号：</Text>
                <Text>{estimateInfo.estimateNumber}</Text>
              </View>
              <View style={[styles.flexJustifyCenter]}>
                <Text>有効期限：</Text>
                <Text>{estimateInfo.expireEstimatedAt}</Text>
              </View>
            </View>
            <View>
              <Text>{company.companyName}</Text>
              <View style={{ ...tw(`flex flex-col`) }}>
                <Text>〒{company.companyName}</Text>
                <Text>{`${company.prefecture} ${company.city}${company.address}`}</Text>
                <Text>{company.building}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.estimateContent]}>
          <View style={styles.grid}>
            <View style={[styles.col8, styles.center]}>
              <Text>詳細</Text>
            </View>
            <View style={[styles.col2, styles.center]}>
              <Text>数量</Text>
            </View>
            <View style={[styles.col3, styles.center, tw('border-r')]}>
              <Text>単価</Text>
            </View>
            <View style={[styles.col3, styles.center]}>
              <Text>金額</Text>
            </View>
          </View>
          <View>
            {items.map((item, index) => (
              <View key={index} style={styles.grid}>
                <View style={styles.col8}>
                  <Text>{item.description}</Text>
                </View>
                <View style={[styles.col2, styles.right]}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={[styles.col3, styles.right, tw('border-r')]}>
                  <Text>{addComma(item.unitPrice)}</Text>
                </View>
                <View style={[styles.col3, styles.right]}>
                  <Text>{addComma(item.quantity * item.unitPrice)}円</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>

      <Page size="A4" style={[styles.page]}>
        <View style={{ ...tw(`border`) }}>
          <View style={{ ...tw(`border-b p-2 text-center font-semibold`) }}>
            <Text style={{ ...tw(`text-sm`) }}>備考</Text>
          </View>
          <View>
            <View style={{ ...tw(`min-h-[400px] w-full p-2 text-sm`) }}>
              <Text>{note}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  )
}

export default EstimatePdfPage
