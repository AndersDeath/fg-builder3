import { describe, test, expect } from "@jest/globals";
import { utilsSpecMock } from "./mocks/utils.mock";
import {
  removeIgnoreBlock,
  replaceGlobalImagePathToLocal,
  replaceMarkdownPageBreakToHtml,
} from "../src/utils";

describe("Utils class", () => {
  const mock = utilsSpecMock;
  test("replaceGlobalImagePathToLocal test", async () => {
    expect(
      await replaceGlobalImagePathToLocal(
        mock.replaceGlobalImagePathToLocal.input
      )
    ).toEqual(mock.replaceGlobalImagePathToLocal.output);
  });

  test("replaceMarkdownPageBreakToHtml test", async () => {
    expect(
      await replaceMarkdownPageBreakToHtml(
        mock.replaceMarkdownPageBreakToHtml.input
      )
    ).toEqual(mock.replaceMarkdownPageBreakToHtml.output);
  });

  test("removeIgnoreBlock test", async () => {
    expect(await removeIgnoreBlock(mock.removeIgnoreBlock.input)).toEqual(
      mock.removeIgnoreBlock.output
    );
  });
});
