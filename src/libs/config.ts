import { resolve } from 'path'
import { pathExists } from 'fs-extra'

export const PROJECT_ROOT_PATH = resolve(__dirname, '../../')

// パスの設定ミスを防ぐために、PROJECT_ROOT_PATHにpackage.jsonが存在していることを確認する
const ensureProjectRootPathIsCorrect = async () => {
    const packageJsonExistsAtRoot = await pathExists(
        `${PROJECT_ROOT_PATH}/package.json`
    )
    if (!packageJsonExistsAtRoot) {
        throw new Error('PROJECT_ROOT_PATHの設定が間違っています。')
    }
}
ensureProjectRootPathIsCorrect()

export const CACHE_KEY = 'list'

export const CACHE_MAX_AGE = 20 * 1000
