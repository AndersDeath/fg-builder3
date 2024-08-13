import { describe, test, expect } from "@jest/globals";
import { Utils } from "../src/utils";
import { utilsSpecMock } from "./mocks/utils.mock";

describe("Sum function", () => {
  const utils = new Utils();
  const mock = utilsSpecMock;
  test("replaceGlobalImagePathToLocal test", async () => {
    expect(
      await utils.replaceGlobalImagePathToLocal(
        mock.replaceGlobalImagePathToLocal.input
      )
    ).toEqual(mock.replaceGlobalImagePathToLocal.output);
  });
});
