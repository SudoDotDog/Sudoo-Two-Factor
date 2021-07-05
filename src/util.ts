/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Util
 */

import * as SpeakEasy from "speakeasy";

export const generateTwoFAKey = (): string => {

    const secret: SpeakEasy.GeneratedSecret = SpeakEasy.generateSecret({

        length: 32,
    });

    return secret.base32;
};

export const generateTwoFAUrl = (issuer: string, account: string, key: string): string => {

    const parsedIssuer: string = encodeURIComponent(issuer);
    const parsedAccount: string = encodeURIComponent(account);

    return 'otpauth://totp/' + parsedAccount + '?issuer=' + parsedIssuer + '&secret=' + key;
};

export const generateTwoFACode = (key: string): string => {

    return SpeakEasy.totp({

        secret: key,
        encoding: 'base32',
    });
};

export const verifyTwoFACode = (key: string, code: string): boolean => {

    return SpeakEasy.totp.verify({

        token: code,
        secret: key,
        encoding: 'base32',
    });
};
