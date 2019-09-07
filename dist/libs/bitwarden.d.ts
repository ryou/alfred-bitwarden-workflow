/**
 * ログインID/パスワード情報を取得
 *
 * @param sessionKey
 */
export declare const fetchItems: (sessionKey: string) => Promise<any>;
/**
 * bitwardenからログアウトする
 */
export declare const logout: () => Promise<string>;
/**
 * bitwardenにログインし、成功時にはセッションキーを受け取る
 *
 * @param username
 * @param password
 * @param code
 */
export declare const login: (username: string, password: string, code: string) => Promise<string>;
