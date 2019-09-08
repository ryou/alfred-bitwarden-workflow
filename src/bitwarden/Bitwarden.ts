import { PROJECT_ROOT_PATH } from '../libs/config'
import { AbstractBitwarden } from './AbstractBitwarden'

const bwPath = `${PROJECT_ROOT_PATH}/node_modules/.bin/bw`.replace(/ /g, '\\ ')

export class Bitwarden extends AbstractBitwarden {
    login(username: string, password: string, code: string): Promise<string> {
        const command = `${bwPath} login ${username} ${password} --code ${code} --raw`

        return this.execAsync(command)
    }

    async ensureLogout(): Promise<void> {
        const command = `${bwPath} logout`
        /* TODO: 単に例外握りつぶしているだけな点を改善
         * ログインしていないエラーとそれ以外のエラーを区別する方法がわからんので現状握りつぶしているだけ…
         * それ分かり次第改善
         */
        await this.execAsync(command).catch()
    }

    async fetchItems(sessionKey: string): Promise<any[]> {
        const command = `${bwPath} list items --session ${sessionKey}`
        const result = await this.execAsync(command)

        return JSON.parse(result)
    }
}
