import { AbstractBitwarden } from './AbstractBitwarden';
export declare class Bitwarden extends AbstractBitwarden {
    login(username: string, password: string, code: string): Promise<string>;
    ensureLogout(): Promise<void>;
    fetchItems(sessionKey: string): Promise<any[]>;
}
