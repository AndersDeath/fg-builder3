import * as fs from "fs-extra";
import * as path from "path";
import { RunConfig } from "./models/interfaces";
import { Logger } from "./logger/logger";

export class Builder3FS {
  public mkdirp = fs.mkdirp;

  public copyFileSync = fs.copyFileSync;

  public writeFileSync = fs.writeFileSync;

  public copy = fs.copy;

  public statSync = fs.statSync;

  public readdirSync = fs.readdirSync;

  public rmSync = fs.rmSync;

  public readdir = fs.readdir;

  public readFile = fs.readFile;

  public pathExists = fs.pathExists;

  public mkdtemp = fs.mkdtemp;

  public remove = fs.remove;

  public pathJoin = path.join;

  public pathExtname = path.extname;

  private logger: Logger = new Logger();

  constructor() {}

  public async createCategoryDir(
    outputPath: string,
    categoryName: string,
    ignoreList: string[] = []
  ): Promise<void> {
    if (ignoreList.includes(categoryName)) return;
    return this.mkdirp(path.join(outputPath, categoryName));
  }

  public async copyArtifactsFromTempToOutput(rConf: RunConfig): Promise<void> {
    if (rConf.bookSettings.categories.length > 0) {
      this.mkdirp("output");
      rConf.bookSettings.categories.forEach((category: string): void => {
        this.copyFileSync(
          `temp/output_from_html_${category}.pdf`,
          `output/${category}-${Date.now()}.pdf`
        );
      });
    } else {
      this.logger.throwError("There are not categories in request");
    }
  }
}
