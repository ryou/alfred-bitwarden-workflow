"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_root_path_1 = __importDefault(require("app-root-path"));
exports.PROJECT_ROOT_PATH = app_root_path_1.default.path;
exports.CACHE_KEY = 'list';
exports.CACHE_MAX_AGE = 20 * 1000;
