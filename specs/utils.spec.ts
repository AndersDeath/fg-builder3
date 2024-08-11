
import {sum} from '../src/sum';
import { describe, test, expect } from "@jest/globals"
import { Utils } from '../src/utils';

describe('Sum function', () =>{

    const utils = new Utils();

    test('replaceGlobalImagePathToLocal test', async () =>{
        const inputString = '';
        const outputString = '';

        expect(await utils.replaceGlobalImagePathToLocal(inputString)).toEqual(outputString)
    })
})