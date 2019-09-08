import { bitwarden } from './factory/BitwardenFactory'
import { AbstractBitwarden } from './bitwarden/AbstractBitwarden'
require('dotenv').config()
const alfy = require('alfy')

/**
 * 認証情報データを取得し返却
 * 取得したデータはキャッシュに一時保存する
 */
const fetchListItems = async (
    bitwarden: AbstractBitwarden,
    sessionKey: string
): Promise<any[]> => {
    const data = await bitwarden.fetchItems(sessionKey)
    const maxAge = 20 * 1000
    alfy.cache.set('list', data, { maxAge })

    return data
}

const main = async (bitwarden: AbstractBitwarden) => {
    const sessionKey = process.env.BW_SESSION
    if (sessionKey === undefined) {
        throw new Error('environment variable BW_SESSION is required.')
    }

    const data =
        alfy.cache.get('list') || (await fetchListItems(bitwarden, sessionKey))
    const items = alfy
        .inputMatches(data, 'name')
        // TODO: ここらへんのanyどうにかしたい
        .filter((item: any) => item.login)
        .map((item: any): any => ({
            title: item.name,
            subtitle: item.login.username,
            arg: JSON.stringify({
                username: item.login.username,
                password: item.login.password,
            }),
        }))
    alfy.output(items)
}

main(bitwarden)
