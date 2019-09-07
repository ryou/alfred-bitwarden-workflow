import { execAsync } from './util'
import { PROJECT_ROOT_PATH } from './config'

const bwPath = `${PROJECT_ROOT_PATH}/node_modules/.bin/bw`.replace(/ /g, '\\ ')

// TODO: 返り値のanyなんとかしたい
/**
 * ログインID/パスワード情報を取得
 *
 * @param sessionKey
 */
export const fetchItems = async (sessionKey: string): Promise<any> => {
    const command = `${bwPath} list items --session ${sessionKey}`
    const result = await execAsync(command)

    return JSON.parse(result)
}

/**
 * bitwardenからログアウトする
 */
export const logout = (): Promise<string> => {
    const command = `${bwPath} logout`

    return execAsync(command)
}

/**
 * bitwardenにログインし、成功時にはセッションキーを受け取る
 *
 * @param username
 * @param password
 * @param code
 */
export const login = (
    username: string,
    password: string,
    code: string
): Promise<string> => {
    const command = `${bwPath} login ${username} ${password} --code ${code} --raw`

    return execAsync(command)
}
