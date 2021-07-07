/**
 * @author WMXPY
 * @namespace TwoFactor
 * @description Util
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { TwoFactorKey } from "../../src/key";

describe('Given (Simple) Scenario', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('integrate-two-factor-simple');

    it('should be able to generate key and get code', async (): Promise<void> => {

        const key: TwoFactorKey = TwoFactorKey.random();
        const code: string = key.generateCode();

        expect(code).to.have.lengthOf(6);
    });

    it('should be able to verify code', async (): Promise<void> => {

        const key: TwoFactorKey = TwoFactorKey.random();
        const code: string = key.generateCode();

        expect(code).to.have.lengthOf(6);
    });
});
