#!/usr/bin/env node
const program = require('commander')
const fs = require('fs-extra')
const { execAsync } = require('./util')

const projectRootPath = __dirname
const bwPath = `${projectRootPath}/node_modules/.bin/bw`.replace(/ /g, '\\ ')

const generateEnvFile = sessionKey => {
  const data = `BW_SESSION=${sessionKey}\n`
  const outputPath = `${projectRootPath}/.env`

  return fs.outputFile(outputPath, data)
}

const logout = () => {
  const command = `${bwPath} logout`

  return execAsync(command)
}

const login = (username, password, code) => {
  const command = `${bwPath} login ${username} ${password} --code ${code} --raw`

  return execAsync(command)
}

program
  .command('init <username> <password> <code>')
  .description('login bitwarden and generate env file.')
  .action(async (username, password, code) => {
    await logout()
    const sessionKey = await login(username, password, code)
    await generateEnvFile(sessionKey)
    console.log(`generate env file with session key ${sessionKey}`)
  })

program.parse(process.argv)
