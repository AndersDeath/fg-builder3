import { describe, test, expect } from "@jest/globals";
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
import { Builder3FS } from "../../src/builder-fs";
import { filesMock } from "../mocks/source.mock";
import { B3File, RawContent } from "../../src/models/interfaces";

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

  test("Check that builder get files", async ()=> {
    const folders: string[] = await b3fs.readdir(
      tempDir
    );

    for (const folder of folders) {
      const folderPath: string = b3fs.pathJoin(
        tempDir,
        folder
      );
      if (b3fs.statSync(folderPath).isDirectory()) {
        console.log(folderPath);
      }
    }
    const a:any = [];
    const sourceFiles: B3File[] = await b3fs.parseFolders(tempDir);
    await Promise.all(
      sourceFiles.map((file: B3File) => a.push(file))
    );
    

    console.log(sourceFiles.length);
  });
});
