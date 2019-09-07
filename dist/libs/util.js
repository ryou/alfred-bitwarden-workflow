"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
/**
 * Promise版exec
 *
 * @param command
 */
exports.execAsync = function (command) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(command, function (err, stdout) {
            if (err) {
                reject(new Error(stdout));
            }
            else {
                resolve(stdout);
            }
        });
    });
};
