import { AbstractBitwarden } from './AbstractBitwarden';
export declare class Bitwarden extends AbstractBitwarden {
    /**
     * bitwardenにログインし、成功時にはセッションキーを受け取る
     *
     * @param username
     * @param password
     * @param code
     */
    login(username: string, password: string, code: string): Promise<string>;
    /**
     * bitwardenからログアウトする
     */
    logout(): Promise<string>;
    /**
     * ログインID/パスワード情報を取得
     *
     * @param sessionKey
     */
    fetchItems(sessionKey: string): Promise<any[]>;
}
