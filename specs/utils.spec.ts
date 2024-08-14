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

  test("replaceMarkdownPageBreakToHtml test", async () => {
    console.log('some resukt',await utils.replaceMarkdownPageBreakToHtml(
      mock.replaceMarkdownPageBreakToHtml.input
    ));
    expect(
      await utils.replaceMarkdownPageBreakToHtml(
        mock.replaceMarkdownPageBreakToHtml.input
      )
    ).toEqual(mock.replaceMarkdownPageBreakToHtml.output);
  });

  test("removeIgnoreBlock test", async () => {
    expect(
      await utils.removeIgnoreBlock(
        mock.removeIgnoreBlock.input
      )
    ).toEqual(mock.removeIgnoreBlock.output);
  });

});
