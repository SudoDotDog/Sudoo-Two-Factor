/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Util
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { generateTwoFactorKey, generateTwoFactorURL } from "../../src/util";

describe('Given [Util] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('two-factor-util');

    it('should be able to generate key', async (): Promise<void> => {

        const key: string = generateTwoFactorKey();

        expect(key).to.have.lengthOf(32);
    });

    it('should be able to generate url', async (): Promise<void> => {

        const issuer: string = chance.string();
        const account: string = chance.string();

        const key: string = generateTwoFactorKey();
        const url: string = generateTwoFactorURL(issuer, account, key);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(url.length).to.be.greaterThan(30);
    });
});
