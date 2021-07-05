/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Verify
 */

import * as SpeakEasy from "speakeasy";

export const verifyTwoFactorCode = (key: string, code: string, date: Date): boolean => {

    return SpeakEasy.totp.verify({

        token: code,
        secret: key,
        encoding: 'base32',

        time: Math.floor(date.getTime() / 1000),
        step: 30,
        digits: 6,
        window: 0,
    });
};
