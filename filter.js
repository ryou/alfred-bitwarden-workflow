const program = require('commander')

program
  .arguments('<varname> <query>')
  .action(async (varname, query) => {
    const data = JSON.parse(query)

    process.stdout.write(data[varname])
  })

program.parse(process.argv)
