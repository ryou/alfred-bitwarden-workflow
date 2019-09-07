#!/usr/bin/env node
import { outputFile } from 'fs-extra'
import { Command } from 'commander'
import { login, logout } from './libs/bitwarden'
import { PROJECT_ROOT_PATH } from './libs/config'

const program = new Command()

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

program
    .command('init <username> <password> <code>')
    .description('login bitwarden and generate env file.')
    .action(async (username, password, code) => {
        await logout().catch(error => console.log(error.message))

        console.log('progress login process.')

        const sessionKey = await login(username, password, code)

        console.log(`login completed with session key ${sessionKey}`)

        await generateEnvFile(sessionKey)

        console.log(`generate env file with session key ${sessionKey}`)
    })

program.parse(process.argv)
