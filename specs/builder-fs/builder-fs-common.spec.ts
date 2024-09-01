import { describe, test, expect } from "@jest/globals";
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
import { Builder3FS } from "../../src/builder-fs";

describe("Builder3 FS proxy functions", () => {
  let tempDir;
  let b3fs;
  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "test-"));
    b3fs = new Builder3FS();
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test("Mkdirp test", async () => {
    await b3fs.mkdirp(tempDir);
    expect(await fs.pathExists(path.join(tempDir))).toBe(true);
  });
});
