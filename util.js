const exec = require('child_process').exec

/**
 * Promise版exec
 *
 * @param command
 * @returns {Promise<unknown>}
 */
module.exports.execAsync = (command) => {
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
