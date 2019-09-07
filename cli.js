#!/usr/bin/env node
const program = require('commander')
const fs = require('fs-extra')
const { execAsync } = require('./util')

program
  .command('login')
  .description('login bitwarden and get session key.')
  .action(async () => {
    await execAsync('npx bw login')
  })

program
  .command('generate <sessionKey>')
  .description('generate env file with session key. (if env file already exist. overwrite it.)')
  .action(async sessionKey => {
    const data = `BW_SESSION=${sessionKey}\n`
    fs.outputFile('.env', data)
  })

program.parse(process.argv)
