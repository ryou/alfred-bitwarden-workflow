#!/usr/bin/env node
import { outputFile } from 'fs-extra'
import { resolve } from 'path'
import { Command } from 'commander'
import { execAsync } from './util'

const program = new Command()
const projectRootPath = resolve(__dirname, '../')
const bwPath = `${projectRootPath}/node_modules/.bin/bw`.replace(/ /g, '\\ ')

/**
 * envファイルを生成する
 *
 * @param sessionKey
 */
const generateEnvFile = (sessionKey: string): Promise<void> => {
    const data = `BW_SESSION=${sessionKey}\n`
    const outputPath = `${projectRootPath}/.env`

    return outputFile(outputPath, data)
}

/**
 * bitwardenからログアウトする
 */
const logout = (): Promise<string> => {
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
const login = (
    username: string,
    password: string,
    code: string
): Promise<string> => {
    const command = `${bwPath} login ${username} ${password} --code ${code} --raw`

    return execAsync(command)
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
