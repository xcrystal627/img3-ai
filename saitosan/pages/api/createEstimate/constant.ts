// NOTE: ダミーデータ
export const data = {
  total_cost: 4000000,
  project:
    '毎日世界の医療関連の論文を収集し、それらを自動翻訳して毎日配信するアプリ',
  estimates: [
    {
      name: '論文収集',
      description: '世界中から医療関連の論文を毎日自動で収集します。',
      formula: '4000 * 5 * 20 * 4 * 0.12',
      cost: 480000,
    },
    {
      name: '翻訳',
      description: '収集した論文を自動で翻訳します。',
      formula: '4000 * 5 * 20 * 4 * 0.12',
      cost: 480000,
    },
    {
      name: '要約',
      description: '翻訳した論文を自動で要約します。',
      formula: '4000 * 5 * 20 * 4 * 0.08',
      cost: 320000,
    },
    {
      name: '配信',
      description: '要約した論文を毎日配信します。',
      formula: '4000 * 5 * 20 * 4 * 0.12',
      cost: 480000,
    },
    {
      name: 'キーワード出力',
      description: '論文から重要なキーワードを自動で抽出します。',
      formula: '4000 * 5 * 20 * 4 * 0.08',
      cost: 320000,
    },
    {
      name: '検索',
      description: '論文をキーワードで検索できます。',
      formula: '4000 * 5 * 20 * 4 * 0.18',
      cost: 720000,
    },
    {
      name: 'お気に入り',
      description: '気に入った論文をお気に入りに追加できます。',
      formula: '4000 * 5 * 20 * 4 * 0.10',
      cost: 400000,
    },
    {
      name: 'その他作業',
      description:
        '企画、設計、テスト、デバッグ、ドキュメンテーションなどのその他全般の作業。',
      formula: '4000 * 5 * 20 * 4 * 0.10',
      cost: 400000,
    },
  ],
}
