#!/usr/local/bin/node
// TODO: shebangで指定するnodeのパスがこれで本当にいいのかは再考が必要
const program = require('commander')

program
  .arguments('<varname> <query>')
  .action(async (varname, query) => {
    const data = JSON.parse(query)

    process.stdout.write(data[varname])
  })

program.parse(process.argv)
