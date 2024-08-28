import * as fs from "fs-extra";
import * as path from "path";
import { RunConfig } from "./models/interfaces";
import { Logger } from "./logger/logger";

const logger: Logger = new Logger();

const createCategoryDir = async (
  outputPath: string,
  categoryName: string,
  ignoreList: string[] = []
): Promise<void> => {
  if (ignoreList.includes(categoryName)) return;
  return fs.mkdirp(path.join(outputPath, categoryName));
};

const copyArtifactsFromTempToOutput = async (rConf: RunConfig): Promise<void> => {
  if (rConf.bookSettings.categories.length > 0) {
    fs.mkdirp("output");
    rConf.bookSettings.categories.forEach((category: string): void => {
      fs.copyFileSync(
        `temp/output_from_html_${category}.pdf`,
        `output/${category}-${Date.now()}.pdf`
      );
    });
  } else {
    logger.throwError("There are not categories in request");
  }
}


export { createCategoryDir, copyArtifactsFromTempToOutput };
