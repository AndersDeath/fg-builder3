import { describe, test, expect } from "@jest/globals";
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
import { Builder3FS } from "../../src/builder-fs";
import { filesMock } from "../mocks/source.mock";

describe("Builder3 FS proxy functions", () => {
  let tempDir;
  let b3fs: Builder3FS;
  beforeEach(async () => {
    b3fs = new Builder3FS();
    tempDir = await b3fs.mkdtemp(b3fs.pathJoin(os.tmpdir(), "test-"));
    Object.keys(filesMock).forEach(async (folder: string) => {
      await b3fs.mkdirp(b3fs.pathJoin(tempDir, folder));
      Object.keys(filesMock[folder]).forEach((fileName: string) => {
        b3fs.writeFileSync(
          b3fs.pathJoin(tempDir, folder, fileName),
          filesMock[folder][fileName]
        );
      });
    });
  });

  afterEach(async () => {
    await b3fs.remove(tempDir);
  });

  test("Mkdirp test", async () => {
    await b3fs.mkdirp(tempDir);
    expect(await b3fs.pathExists(b3fs.pathJoin(tempDir))).toBe(true);
  });
});
