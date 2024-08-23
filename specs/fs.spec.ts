import { describe, test, expect } from "@jest/globals";
import { fsTest } from "./file";
import fs from "fs-extra";

jest.mock('fs-extra');

describe("Fs test", () => {
  test("replaceGlobalImagePathToLocal test", async () => {
    expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
    (fs.readFileSync as any).mockReturnValue('file content here');
    expect(fsTest("some/path/test.txt")).toEqual("file content here");
  });
});
