import { PROJECT_ROOT_PATH } from '../libs/config'
import { AbstractBitwarden } from './AbstractBitwarden'

const bwPath = `${PROJECT_ROOT_PATH}/node_modules/.bin/bw`.replace(/ /g, '\\ ')

export class Bitwarden extends AbstractBitwarden {
    /**
     * bitwardenにログインし、成功時にはセッションキーを受け取る
     *
     * @param username
     * @param password
     * @param code
     */
    login(username: string, password: string, code: string): Promise<string> {
        const command = `${bwPath} login ${username} ${password} --code ${code} --raw`

        return this.execAsync(command)
    }

    /**
     * bitwardenからログアウトする
     */
    logout(): Promise<string> {
        const command = `${bwPath} logout`

        return this.execAsync(command)
    }

    // TODO: 返り値のanyなんとかしたい
    /**
     * ログインID/パスワード情報を取得
     *
     * @param sessionKey
     */
    async fetchItems(sessionKey: string): Promise<any[]> {
        const command = `${bwPath} list items --session ${sessionKey}`
        const result = await this.execAsync(command)

        return JSON.parse(result)
    }
}
