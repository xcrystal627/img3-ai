/**
 * Sleep
 */
export const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

/**
 * 本番チェック
 */
export const isRemote = process.env.NODE_ENV === 'production'
export const isDev = process.env.NEXT_PUBLIC_PROJECT_ID === 'police-devlop'

/**
 * 本アプリのログ
 */
export class Logger {
  /**
   * 検証用
   */
  static log = (message: any, ...payload: any) =>
    console.log(`📝[LOG]: ${message}${payload}`)
  static warn = (message: any, ...payload: any) =>
    console.warn(`⚠️[WARN]: ${message}${payload}`)
  static error = (message: any, ...payload: any) =>
    console.error(`🚨[ERROR]: ${message}${payload}`)
  static success = (message: any, ...payload: any) =>
    console.log(`✅[SUCCESS]: ${message}${payload}`)
}

/**
 * プロミス化
 */
export const promisify = <T>(
  fn: (...args: any[]) => void,
): ((...args: any[]) => Promise<T>) => {
  return function (...args: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fn(...args, (err: any, result: T) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

/**
 * ファイルの拡張子を取得
 */
export const getFileExtension = (file: File) => {
  const filename = file.name
  const dotIndex = filename.lastIndexOf('.')
  if (dotIndex === -1) {
    return ''
  }
  return filename.substring(dotIndex + 1)
}

/**
 * 電話番号をフォーマットします
 */
export const formatGlobalPhoneNumber = (phoneNumber: string) => {
  // 先頭の0を削除します
  phoneNumber = phoneNumber.replace(/^0+/, '')

  // 電話番号の長さを確認します
  if (phoneNumber.length === 10) {
    // 10桁の場合は国番号（+81）を追加します
    const formattedNumber =
      '+81' +
      phoneNumber.substring(0, 3) +
      phoneNumber.substring(3, 6) +
      phoneNumber.substring(6)
    return formattedNumber
  } else if (phoneNumber.length === 11) {
    // 11桁の場合は国番号（+）を追加します
    const formattedNumber =
      '+' +
      phoneNumber.substring(0, 1) +
      phoneNumber.substring(1, 4) +
      phoneNumber.substring(4, 7) +
      phoneNumber.substring(7)
    return formattedNumber
  } else {
    // サポートされていない電話番号の長さの場合はエラーメッセージを返します
    return 'サポートされていない電話番号の長さです'
  }
}

/**
 * Firebase Authenticationの電話番号を日本の形式に変換する関数
 */
export function convertPhoneNumber(input: string): string {
  const prefix = '+81'
  const convertedPrefix = '0'

  if (input.startsWith(prefix)) {
    const phoneNumber = input.slice(prefix.length)
    return convertedPrefix + phoneNumber
  }

  return input
}

/**
 * secondsをYYYY-MM-DD HH:mm形式に変換
 */
export const convertSecondsToYYYYMMDDHHmm = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  return `${year}/${month}/${day} ${hour}:${minute}`
}

export const addComma = (num: number) => {
  return num.toLocaleString()
}
