/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Verify
 */

import { verifyTwoFactorCode } from "./util";

export class TwoFactorVerifier {

    public static from(key: string): TwoFactorVerifier {

        return new TwoFactorVerifier(key);
    }

    private readonly _key: string;

    private _step: number;
    private _window: number;

    private constructor(key: string) {

        this._key = key;

        this._step = 30;
        this._window = 0;
    }

    public setStep(step: number): this {

        this._step = step;
        return this;
    }

    public setWindow(window: number): this {

        this._window = window;
        return this;
    }

    public verify(code: string, date: Date = new Date()): boolean {

        return verifyTwoFactorCode(this._key, code, date, {

            step: this._step,
            window: this._window,
        });
    }
}
