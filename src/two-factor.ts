/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Two Factor
 */

import { generateTwoFactorKey, generateTwoFactorURL } from "./util";

export class TwoFactorAuthorization {

    public static from(key: string): TwoFactorAuthorization {

        return new TwoFactorAuthorization(key);
    }

    public static generate(): TwoFactorAuthorization {

        const key: string = generateTwoFactorKey();
        return new TwoFactorAuthorization(key);
    }

    private readonly _key: string;

    private constructor(key: string) {

        this._key = key;
    }

    public getAuthorizationURL(issuer: string, account: string): string {

        const url: string = generateTwoFactorURL(issuer, account, this._key);

        return url;
    }
}
