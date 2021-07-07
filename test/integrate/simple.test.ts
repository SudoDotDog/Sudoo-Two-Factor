/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Util
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { TwoFactorKey, TwoFactorVerifier } from "../../src";

describe('Given (Simple) Scenario', (): void => {

    const chance: Chance.Chance = new Chance('integrate-two-factor-simple');

    it('should be able to generate key and get code', async (): Promise<void> => {

        const key: TwoFactorKey = TwoFactorKey.random();
        const code: string = key.generateCode();

        expect(code).to.have.lengthOf(6);
    });

    it('should be able to generate url', async (): Promise<void> => {

        const issuer: string = chance.string();
        const account: string = chance.email();

        const key: TwoFactorKey = TwoFactorKey.random();
        const url: string = key.getAuthorizationURL(issuer, account);

        expect(url).to.be.include(encodeURIComponent(issuer));
        expect(url).to.be.include(encodeURIComponent(account));
    });

    it('should be able to verify code', async (): Promise<void> => {

        const fixedDate: Date = new Date();

        const key: TwoFactorKey = TwoFactorKey.random();
        const verifier: TwoFactorVerifier = TwoFactorVerifier.from(key.key);

        const code: string = key.generateCode(fixedDate);
        const result: boolean = verifier.verify(code, fixedDate);

        expect(result).to.be.true;
    });

    it('should be able to verify code with window - happy path', async (): Promise<void> => {

        const fixedDate: Date = new Date();
        const mergedDate: Date = new Date();

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        mergedDate.setSeconds(mergedDate.getSeconds() - 30);

        const key: TwoFactorKey = TwoFactorKey.random();
        const verifier: TwoFactorVerifier = TwoFactorVerifier.from(key.key);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        verifier.setWindow(30);

        const code: string = key.generateCode(mergedDate);
        const result: boolean = verifier.verify(code, fixedDate);

        expect(result).to.be.true;
    });

    it('should be able to verify code with window - sad path', async (): Promise<void> => {

        const fixedDate: Date = new Date();
        const mergedDate: Date = new Date();

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        mergedDate.setSeconds(mergedDate.getSeconds() - 30);

        const key: TwoFactorKey = TwoFactorKey.random();
        const verifier: TwoFactorVerifier = TwoFactorVerifier.from(key.key);

        const code: string = key.generateCode(mergedDate);
        const result: boolean = verifier.verify(code, fixedDate);

        expect(result).to.be.false;
    });
});
