import { bitwarden } from './factory/BitwardenFactory'
import { AbstractBitwarden } from './bitwarden/AbstractBitwarden'
import { CACHE_KEY, CACHE_MAX_AGE } from './libs/config'
require('dotenv').config()

const alfy = require('alfy')

/**
 * Alfredに引き渡すべきオブジェクト
 * alfy.outputにこの配列を渡す必要がある
 */
interface AlfredItem {
    title: string
    subtitle: string
    arg: string
}

/**
 * 認証情報データを取得し返却
 * 取得したデータはキャッシュに一時保存する
 */
const fetchListItems = async (
    bitwarden: AbstractBitwarden,
    sessionKey: string
): Promise<any[]> => {
    const cacheData = alfy.cache.get(CACHE_KEY)
    if (cacheData !== undefined) {
        return cacheData
    }

    const data = await bitwarden.fetchItems(sessionKey)
    alfy.cache.set(CACHE_KEY, data, { maxAge: CACHE_MAX_AGE })

    return data
}

/**
 * itemsのnameにinputを含むデータのみ抽出し、alfredに渡す形式に変換し返却
 *
 * @param items
 * @param input
 */
const convertAndFilterItems = (items: any[], input: string): AlfredItem[] => {
    // TODO: ここらへんのanyどうにかしたい
    return items
        .filter((item: any): boolean => {
            return (
                item.login &&
                item.name.toLowerCase().includes(input.toLowerCase())
            )
        })
        .map<AlfredItem>(
            (item: any): AlfredItem => ({
                title: item.name,
                subtitle: item.login.username,
                arg: JSON.stringify({
                    username: item.login.username,
                    password: item.login.password,
                }),
            })
        )
}

const main = async (bitwarden: AbstractBitwarden) => {
    const sessionKey = process.env.BW_SESSION
    if (sessionKey === undefined) {
        throw new Error('environment variable BW_SESSION is required.')
    }

    const input: string = alfy.input
    const data = await fetchListItems(bitwarden, sessionKey)
    const items = convertAndFilterItems(data, input)
    alfy.output(items)
}

main(bitwarden)
