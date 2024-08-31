import { describe, test, expect } from "@jest/globals";
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
import { mkdirp } from "../../src/builder-fs";

describe("Test Builder FS proxy functions", () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "test-"));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test("Mkdirp test", async () => {
    await mkdirp(tempDir);
    expect(await fs.pathExists(path.join(tempDir))).toBe(true);
  });
});
