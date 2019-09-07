import { Command } from 'commander'

const program = new Command()

program
    .arguments('<varname> <query>')
    .action(async (varname: string, query: string) => {
        const data = JSON.parse(query)

        process.stdout.write(data[varname])
    })

program.parse(process.argv)
