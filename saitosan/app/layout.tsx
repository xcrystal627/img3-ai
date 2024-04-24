import DefaultLayout from '@/components/layouts/DefaultLayout'
import './globals.css'
import type { Metadata } from 'next'
import GoogleAnalytics from '@/features/analytics/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: '見積もり上手の齋藤さん',
  description:
    '見積書自動生成サービス「見積もり上手の齋藤さん」は、見積書を自動で生成してくれる新人AIです。IT受託開発企業向けに設計されたこのサービスは、時間とリソースを節約し、正確でプロフェッショナルな見積書を素早く作成するための最適なツールです。誰でも簡単に操作でき、ビジネスの効率性を向上させます。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning={true}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  )
}
