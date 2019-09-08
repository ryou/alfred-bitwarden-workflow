export abstract class AbstractBitwarden {
    protected execAsync: (command: string) => Promise<string>

    constructor(execAsync: (command: string) => Promise<string>) {
        this.execAsync = execAsync
    }

    abstract login(
        username: string,
        password: string,
        code: string
    ): Promise<string>

    abstract logout(): Promise<string>

    abstract fetchItems(sessionKey: string): Promise<any[]>
}
