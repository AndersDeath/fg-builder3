import * as fs from "fs-extra";
import * as path from "path";
import { B3File, RunConfig } from "./models/interfaces";
import { Logger } from "./logger/logger";
import { OUTPUT_DIR, TEMP_DIR } from "./config/folders";

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
      this.mkdirp(OUTPUT_DIR);
      rConf.bookSettings.categories.forEach((category: string): void => {
        this.copyFileSync(this.pathJoin(TEMP_DIR, 'output_from_html_${category}.pdf'),
        this.pathJoin(OUTPUT_DIR,`${category}-${Date.now()}.pdf`)
        );
      });
    } else {
      this.logger.throwError("There are not categories in request");
    }
  }

  public async parseFolders(sourceRootPath: string): Promise<B3File[]> {
    const folders: string[] = await this.readdir(sourceRootPath);
    const sourceFiles: B3File[] = [];
    for (const folder of folders) {
      const folderPath: string = this.pathJoin(
        sourceRootPath,
        folder
      );
      if (this.statSync(folderPath).isDirectory()) {
        sourceFiles.push(...await this.parseFolder(folderPath));
      }
    }
    return sourceFiles;
  }

  private async parseFolder(folderPath: string): Promise<B3File[]> {
    const files: string[] = await this.readdir(folderPath);
    const content: B3File[] = [];

    for (const file of files) {
      const filePath: string = this.pathJoin(folderPath, file);
      if (this.pathExtname(file) === ".md") {
        const pieceOfContent: string = await this.readFile(filePath, "utf-8");
        content.push({
          name: file.replace(/\.[^.]+$/, ""),
          content: pieceOfContent,
          category: file,
          path: filePath,
          sort: 0,
          ignore: false,
        });
      }
    }

    return content;
  }
}
