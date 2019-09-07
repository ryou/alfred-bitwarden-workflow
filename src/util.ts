import { exec } from 'child_process'

/**
 * Promise版exec
 *
 * @param command
 */
export const execAsync = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => {
            if (err) {
                reject(new Error(stdout))
            } else {
                resolve(stdout)
            }
        })
    })
}
