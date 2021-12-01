/**
 * 気象庁の公開データのURL
 * 利用規約: https://www.jma.go.jp/jma/kishou/info/coment.html
 */
const API_ENDPOINT = 'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json'
/** キャッシュの生存期間設定（秒）： 天気予報は頻繁には更新されないため長めに設定 */
const CACHE_LIFETIME_SEC = 3600

/** 取得中or取得結果を保持（キャッシュ）するPromise */
let dataPromise: Promise<any> | undefined
/** 有効期限が切れる時間 */
let expired = Date.now()

/**
 * 気象情報のJSONデータを取得して返します。
 * 取得結果は一定時間キャッシュされます。
 * 同時・複数呼び出されても、キャッシュの生存期間以内であればリクエストは1度しか発生しないことを保証します。
 */
const loadWeatherData = () => {
  const now = Date.now()
  // キャッシュの生存期間を過ぎていたらクリアする
  if (now > expired) dataPromise = undefined
  // キャッシュがあればそのまま返却
  if (dataPromise) return dataPromise
  // ここから(再)取得処理
  // キャッシュの生存期間を更新
  expired = now + CACHE_LIFETIME_SEC * 1000
  // APIを呼び出して、Promiseをキャッシュとして保持する
  // awaitでPromiseを解決せず、そのまま返していることに注意
  dataPromise = window.fetch(API_ENDPOINT).then(res => res.json())
  return dataPromise
}

/** 気象情報のJSONデータを取得し、そこから「東京の今日の天気」 を抜き出して返します */
export const getTokyoWeather = async () => {
  const data = await loadWeatherData()
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.weathers?.[0] ?? '' as string
}

/** 気象情報のJSONデータを取得し、そこから「東京の今日の風の強さ」 を抜き出して返します */
export const getTokyoWind = async () => {
  const data = await loadWeatherData()
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.winds?.[0] ?? '' as string
}

/** 気象情報のJSONデータを取得し、そこから「東京の今日の波の強さ」 を抜き出して返します */
export const getTokyoWave = async () => {
  const data = await loadWeatherData()
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.waves?.[0] ?? '' as string
}

