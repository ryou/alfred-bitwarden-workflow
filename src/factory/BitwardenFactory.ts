import { Bitwarden } from '../bitwarden/Bitwarden'
import { execAsync } from '../libs/util'

export const bitwarden = new Bitwarden(execAsync)
