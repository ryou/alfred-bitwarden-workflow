"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitwarden_1 = require("../bitwarden/Bitwarden");
var util_1 = require("../libs/util");
exports.bitwarden = new Bitwarden_1.Bitwarden(util_1.execAsync);
