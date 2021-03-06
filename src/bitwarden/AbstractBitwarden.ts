export abstract class AbstractBitwarden {
    protected execAsync: (command: string) => Promise<string>

    constructor(execAsync: (command: string) => Promise<string>) {
        this.execAsync = execAsync
    }

    /**
     * bitwardenにログインし、成功時にはセッションキーを受け取る
     *
     * @param username
     * @param password
     * @param code
     */
    abstract login(
        username: string,
        password: string,
        code: string
    ): Promise<string>

    /**
     * bitwardenにログインしていない状態であることを担保する
     */
    abstract ensureLogout(): Promise<void>

    // TODO: 返り値のanyなんとかしたい
    /**
     * ログインID/パスワード情報を取得
     *
     * @param sessionKey
     */
    abstract fetchItems(sessionKey: string): Promise<any[]>
}
