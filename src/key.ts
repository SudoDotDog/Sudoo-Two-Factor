/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Key
 */

import { generateTwoFactorCode, generateTwoFactorKey, generateTwoFactorURL } from "./util";

export class TwoFactorKey {

    public static from(key: string): TwoFactorKey {

        return new TwoFactorKey(key);
    }

    public static random(): TwoFactorKey {

        const key: string = generateTwoFactorKey();
        return new TwoFactorKey(key);
    }

    private readonly _key: string;

    private constructor(key: string) {

        this._key = key;
    }

    public get key(): string {
        return this._key;
    }

    public getAuthorizationURL(issuer: string, account: string): string {

        const url: string = generateTwoFactorURL(issuer, account, this._key);

        return url;
    }

    public generateCode(time: Date = new Date()): string {

        return generateTwoFactorCode(this._key, time);
    }
}
