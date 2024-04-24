import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { CreateEstimateRequest, Estimate } from './type'
// import { data } from './constant'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function createChatCompletion(body: CreateEstimateRequest) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'あなたはIT専門家です。今からアプリ開発の見積書を作成してもらいます。',
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
        total_costとestimatesのcostはnumber型で、その他はstring型でお願いします。\n
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

const createEstimate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const body = req.body

      let data: Estimate | null = null
      let retryCount = 0
      const MAX_RETRY = 3 // Define the maximum number of retries

      do {
        console.log('count: ' + retryCount + '')
        const completion = await createChatCompletion(body)
        const content = completion.data.choices[0].message?.content
        try {
          data = JSON.parse(content!) as Estimate
          data = {
            ...data,
            total_cost: Number(data?.total_cost),
            estimates: data?.estimates.map((estimate) => {
              return {
                ...estimate,
                cost: Number(estimate.cost),
              }
            }),
          }
          break
        } catch (err) {
          console.log('Received content is not a valid JSON, retrying...')
          retryCount++
        }
      } while (retryCount < MAX_RETRY)

      if (!data) {
        return res.status(500).json({
          error: 'OpenAI did not return a valid JSON after multiple attempts.',
        })
      }

      return res.status(200).json(data)
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
