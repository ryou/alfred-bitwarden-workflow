require('dotenv').config()
const alfy = require('alfy')
const exec = require('child_process').exec

/**
 * Promise版exec
 *
 * @param command
 * @returns {Promise<unknown>}
 */
const execAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: process.cwd() }, (err, stdout) => {
      if (err) {
        reject(stdout)
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * 認証情報データを取得し返却
 * 取得したデータはキャッシュに一時保存する
 *
 * @returns {Promise<any>}
 */
const fetchListItems = async () => {
  const dataJsonString = await execAsync(`bw list items --session ${process.env.BW_SESSION}`)
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
      arg: item.login.password
    }))
  alfy.output(items)
}

main()
