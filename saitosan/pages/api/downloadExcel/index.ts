import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { CreateEstimateRequest, Estimate } from './type'
import * as XLSX from 'xlsx'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function createChatCompletion(body: CreateEstimateRequest) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-4-32k',
    messages: [
      {
        role: 'system',
        content:
          'あなたはIT専門家です。今からアプリ開発の見積もりを作成してもらいます。',
      },
      {
        role: 'user',
        content: `
        プロジェクト概要：${body.projectOverview}\n
        機能：${body.functions}\n
        その他作業：${body.options}\n
        使用技術：${body.techUsed}\n
        期間：${body.period}\n
        リソース：${body.resources}\n
        予算：${body.budget}\n
        各機能毎の説明とそれにかかる費用、費用の算出式（単価/時間 * 時間/日 * 20日/月 * 期間 * %/全体の割合）を求めてください。
        また、その他作業にかかる説明とそれにかかる費用、費用の算出式も求めてください。
        その情報を以下のJSON形式で提供してください。\n
        {
          "total_cost": "(総費用)",
          "project": "(プロジェクト名)",
          "estimates": [
            {
              "name": "(機能名)",
              "description": "(機能説明)",
              "formula": "(費用算出式)"
              "cost": "(費用)",
            },
            ...
          ]
        }
        注意：
        出力は直接このJSON形式（日本語）で行ってください。
        その後のメッセージや備考は含めないでください。
        `,
      },
    ],
  })
  return completion
}

async function writeToExcel(data: Estimate) {
  const workbook: XLSX.WorkBook = XLSX.utils.book_new()

  // Prepare project info data
  const projectData = [['プロジェクト名', data.project], []]

  // Prepare company info data
  const companyData = [
    ['会社名', 'ダミー会社'],
    ['住所', 'ダミー住所'],
    ['電話番号', 'ダミー電話番号'],
    ['メールアドレス', 'ダミー@メール.com'],
    [],
  ]

  // Prepare contract details
  const contractData = [
    ['件名', 'ダミー件名'],
    ['納期', 'ダミー納期'],
    ['支払い条件', 'ダミー支払い条件'],
    ['有効期限', 'ダミー有効期限'],
    [],
  ]

  // Create worksheet for estimates
  const estimatesData = data.estimates.map((estimate) => [
    estimate.name,
    Number(estimate.cost), // Ensure the cost is treated as a number
  ])
  estimatesData.unshift(['項目', '費用']) // Add headers

  // Add total cost to the end
  const startRow = 5 // adjust as per your data
  const endRow = startRow + data.estimates.length
  const totalCost = ['合計', { f: `SUM(D${startRow}:D${endRow})` }]

  // Prepare project info data
  const totalCostData = [totalCost, []]

  // Note
  const note = data.estimates.map((estimate) => [
    estimate.name,
    estimate.description,
    estimate.formula,
  ])
  note.unshift(['項目', '説明', '見積もり計算式'])
  const noteData = [['備考'], ['各機能の説明'], ...note]

  // Merge companyData, contractData, projectData, estimatesData
  const finalData = [
    ...projectData,
    ...companyData,
    ...contractData,
    ...totalCostData,
    ...estimatesData,
    [],
    [],
    ...noteData,
  ]

  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(finalData)

  XLSX.utils.book_append_sheet(workbook, worksheet, '見積書')

  // Set column widths
  worksheet['!cols'] = [
    { wch: 30 }, // "項目" column width
    { wch: 30 }, // "費用" column width
  ]

  // Double the height of the total cost cell
  const totalCostCell = `A${
    contractData.length + projectData.length + estimatesData.length
  }`
  if (!worksheet[totalCostCell]) {
    worksheet[totalCostCell] = {}
  }
  if (!worksheet[totalCostCell].s) {
    worksheet[totalCostCell].s = {}
  }
  worksheet[totalCostCell].s.hpt = 24 // Set height points to 24 (double of 12)

  // Set cell background color to black
  const blackBackground = {
    patternType: 'solid',
    fgColor: { rgb: '000000' },
    bgColor: { indexed: 64 },
  }
  const cellsToColor = [
    2,
    3,
    4,
    5,
    contractData.length + projectData.length + estimatesData.length,
  ] // Adjust this array as per your data

  cellsToColor.forEach((row) => {
    const cell = `A${row}`
    if (!worksheet[cell]) {
      worksheet[cell] = {}
    }
    if (!worksheet[cell].s) {
      worksheet[cell].s = {}
    }
    worksheet[cell].s.fill = blackBackground
  })

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
  return buffer
}

const createEstimate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // const body = req.body

      // let data: Estimate | null = null
      // let retryCount = 0
      // const MAX_RETRY = 3 // Define the maximum number of retries

      // do {
      //   console.log('count: ' + retryCount + '')
      //   const completion = await createChatCompletion(body)
      //   const content = completion.data.choices[0].message?.content
      //   try {
      //     data = JSON.parse(content!)
      //     console.log(data)
      //     break
      //   } catch (err) {
      //     console.log('Received content is not a valid JSON, retrying...')
      //     retryCount++
      //   }
      // } while (retryCount < MAX_RETRY)

      // if (!data) {
      //   return res.status(500).json({
      //     error: 'OpenAI did not return a valid JSON after multiple attempts.',
      //   })
      // }

      const data: Estimate = {
        total_cost: 4000000,
        project: '世界の医療関連論文翻訳配信アプリ',
        estimates: [
          {
            name: '論文収集',
            description: '世界各地の医療関連論文を自動的に収集する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 20%/全体の割合',
            cost: 640000,
          },
          {
            name: '翻訳',
            description: '収集した論文を自動翻訳する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 20%/全体の割合',
            cost: 640000,
          },
          {
            name: '要約',
            description: '翻訳した論文からポイントを要約する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 10%/全体の割合',
            cost: 320000,
          },
          {
            name: '配信',
            description: '要約された論文をユーザーに配信する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 10%/全体の割合',
            cost: 320000,
          },
          {
            name: 'キーワード出力',
            description: '論文から重要なキーワードを抽出する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 10%/全体の割合',
            cost: 320000,
          },
          {
            name: '検索',
            description: 'キーワードや文章で論文を検索する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 10%/全体の割合',
            cost: 320000,
          },
          {
            name: 'お気に入り',
            description: 'ユーザーが個々の論文をお気に入り登録する機能。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 10%/全体の割合',
            cost: 320000,
          },
          {
            name: '要件定義書作成',
            description:
              'アプリの構造や機能を具体的に定義する要件定義書の作成。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 2.5%/全体の割合',
            cost: 80000,
          },
          {
            name: 'デザイン作成',
            description: 'アプリの画面設計やUI,UXのデザイン作成。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 2.5%/全体の割合',
            cost: 80000,
          },
          {
            name: '仕様書作成',
            description: 'アプリの仕様詳細を定義する仕様書の作成。',
            formula:
              '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 2.5%/全体の割合',
            cost: 80000,
          },
          {
            name: 'テスト',
            description: 'アプリ動作の確認やバグの発見、修正を行うテスト作業。',
            formula: '4000円/時間 * 8時間/日 * 20日/月 * 4ヶ月 * 5%/全体の割合',
            cost: 160000,
          },
        ],
      }

      const excelBuffer: Buffer = await writeToExcel(data)
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      )
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'Estimates.xlsx',
      )
      res.send(excelBuffer)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: 'Error occurred while communicating with OpenAI API.' })
    }
  } else {
    res.status(405).json({
      error: 'Invalid request method. Only POST requests are allowed.',
    })
  }
}

export default createEstimate
