/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Util
 */

import * as SpeakEasy from "speakeasy";

export const generateTwoFAKey = (): string => {

    const secret: SpeakEasy.GeneratedSecret = SpeakEasy.generateSecret({ length: 32 });
    return secret.base32;
};

export const generateTwoFACode = (key: string): string => {

    return SpeakEasy.totp({
        secret: key,
        encoding: 'base32',
    });
};

export const verifyTwoFACode = (key: string, code: string): boolean => {

    return SpeakEasy.totp.verify({
        secret: key,
        encoding: 'base32',
        token: code,
    });
};
