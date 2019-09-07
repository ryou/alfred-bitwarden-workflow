require('dotenv').config()
const alfy = require('alfy')
const { execAsync } = require('./util')

/**
 * 認証情報データを取得し返却
 * 取得したデータはキャッシュに一時保存する
 *
 * @returns {Promise<any>}
 */
const fetchListItems = async () => {
  const dataJsonString = await execAsync(`npx bw list items --session ${process.env.BW_SESSION}`)
  const data = JSON.parse(dataJsonString)
  const maxAge = 20 * 1000
  alfy.cache.set('list', data, { maxAge })

  return data
}

const main = async () => {
  const data = alfy.cache.get('list') || await fetchListItems()
  const items = alfy.inputMatches(data, 'name')
    .filter(item => item.login)
    .map(item => ({
      title: item.name,
      subtitle: item.login.username,
      arg: JSON.stringify({
        username: item.login.username,
        password: item.login.password
      })
    }))
  alfy.output(items)
}

main()
