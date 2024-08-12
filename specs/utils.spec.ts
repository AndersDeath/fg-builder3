import { describe, test, expect } from "@jest/globals"
import { Utils } from '../src/utils';

describe('Sum function', () =>{

    const utils = new Utils();

    test('replaceGlobalImagePathToLocal test', async () =>{
        const inputString = '![Depth first search](https://raw.githubusercontent.com/AndersDeath/holy-theory/main/images/breadth-first-search.png)';
        const outputString = '![Depth first search](./temp/images/breadth-first-search.png)';

        expect(await utils.replaceGlobalImagePathToLocal(inputString)).toEqual(outputString)
    })
})