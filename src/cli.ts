#!/usr/bin/env node
import { outputFile } from 'fs-extra'
import { Command } from 'commander'
import { bitwarden } from './factory/BitwardenFactory'
import { PROJECT_ROOT_PATH } from './libs/config'
import { AbstractBitwarden } from './bitwarden/AbstractBitwarden'

/**
 * envファイルを生成する
 *
 * @param sessionKey
 */
const generateEnvFile = (sessionKey: string): Promise<void> => {
    const data = `BW_SESSION=${sessionKey}\n`
    const outputPath = `${PROJECT_ROOT_PATH}/.env`

    return outputFile(outputPath, data)
}

const mainAction = async (
    username: string,
    password: string,
    code: string,
    bitwarden: AbstractBitwarden
): Promise<void> => {
    await bitwarden.logout().catch(error => console.log(error.message))

    console.log('progress login process.')

    const sessionKey = await bitwarden.login(username, password, code)

    console.log(`login completed with session key ${sessionKey}`)

    await generateEnvFile(sessionKey)

    console.log(`generate env file with session key ${sessionKey}`)
}

const main = async () => {
    const program = new Command()

    program
        .command('init <username> <password> <code>')
        .description('login bitwarden and generate env file.')
        .action(async (username, password, code) => {
            await mainAction(username, password, code, bitwarden)
        })

    program.parse(process.argv)
}

main()
