import {
  Config,
  B3File,
  RawContent,
  OutputFileTypes,
  RunConfig,
} from "./models/interfaces";
import { pageWrapperHtml } from "./ui/page-wrapper.html";
import { FileGroup } from "./file-group";
import { marked } from "./libs/marked";
import { Logger } from "./logger/logger";
import { Builder3FS } from "./builder-fs";
import { Pandoc, PandocInput } from "./pandoc";
import { removeIgnoreBlock, replaceGlobalImagePathToLocal } from "./utils";
import { targets } from "./config/targets";
import { runConfigResolver } from "./config/runConfigResolver";

const RunConfigDefault: RunConfig = {
  targets: [],
  bookSettings: {
    categories: [],
  },
  sourcePath: "./content",
};

export class Builder3 {
  private parseMDLibInstance: any;
  private rawContent: RawContent[] = [];
  private readonly config: Config;
  private logger: Logger = new Logger();
  private pandoc: Pandoc = new Pandoc();
  private b3fs: Builder3FS = new Builder3FS();

  constructor(config: Config) {
    this.logger.log("Builder constructor is initialized");
    this.config = config;
  }

  public get targets(): [string, string, string] {
    return targets;
  }

  public get categories() {
    return this.getCategories();
  }

  public async run(runConfig: RunConfig = RunConfigDefault): Promise<void> {
    if (runConfig.sourcePath) {
      this.config.sourceRootPath = runConfig.sourcePath;
    }
    this.parseMDLibInstance = await this.parseMDInit();

    const rConf: RunConfig = runConfigResolver(runConfig);

    await this.init();

    if (runConfig.targets?.length === 0) {
      await this.runIfTargetsAreEmpty(rConf);
      return;
    }

    if (rConf.targets && rConf.targets.includes("html"))
      await this.buildStaticHtml();
    if (rConf.targets && rConf.targets.includes("md"))
      await this.buildStaticMD();
    if (rConf.targets && rConf.targets.includes("book")) {
      await this.detectBookBookTemplateCategoriesAndBuild(rConf);
      // await this.copyImageFolder();
      await this.buildBookPdf(rConf);
      await this.b3fs.copyArtifactsFromTempToOutput(rConf);
      this.b3fs.rmSync("./temp", { recursive: true, force: true });
    }
    return;
  }

  private async runIfTargetsAreEmpty(rConf: RunConfig) {
    await this.buildStaticHtml();
    await this.buildStaticMD();
    await this.detectBookBookTemplateCategoriesAndBuild(rConf);
    // await this.copyImageFolder();
    await this.buildBookPdf(rConf);
    await this.b3fs.copyArtifactsFromTempToOutput(rConf);
    this.b3fs.rmSync("./temp", { recursive: true, force: true });
  }

  private async detectBookBookTemplateCategoriesAndBuild(
    rConf: RunConfig
  ): Promise<void> {
    const categories: string[] = rConf.bookSettings?.categories ?? [];
    await Promise.all(
      categories.map((element: string) => this.buildBookTemplate(element))
    );
  }

  private async init(): Promise<void> {

    const sourceFiles: B3File[] = await this.b3fs.parseFolders(this.config.sourceRootPath);
    const parsedContentWithCategory: RawContent[] = await Promise.all(
      sourceFiles.map((file: B3File) => this.parseRawContent(file))
    );
    this.rawContent.push(...parsedContentWithCategory);
  
    this.logger.log(`${this.rawContent.length} content items are parsed`);
  }

  private getCategories(): string[] {
    const folders: string[] = this.b3fs.readdirSync(this.config.sourceRootPath);
    return folders.filter((folder: string) =>
      this.b3fs
        .statSync(this.b3fs.pathJoin(this.config.sourceRootPath, folder))
        .isDirectory()
    );
  }

  private async parseMDInit(): Promise<any> {
    const module = await import("parse-md");
    const parseMD = module.default;
    return parseMD;
  }

  private parseRawContent(file: B3File): RawContent {
    const { metadata, content }: any = this.parseMDLibInstance(file.content);
    return {
      category: file.category,
      metadata,
      content: removeIgnoreBlock(content),
      folderPath: "",
      fileName: file.name,
    };
  }

  private async buildStaticMD(): Promise<void> {
    this.logger.log("Build static md");
    await this.buildStatic(OutputFileTypes.MD, this.config.markdownOutputPath);
  }

  private async buildStaticHtml(): Promise<void> {
    this.logger.log("Build static html");
    await this.buildStatic(OutputFileTypes.HTML, this.config.htmlOutputPath);
  }

  private async buildStatic(
    outputType: string,
    outputPath: string
  ): Promise<void> {
    this.config.outputType = outputType;
    const fileGroup: FileGroup = new FileGroup(this.config, this.rawContent);
    const files: B3File[] = await fileGroup.run();

    for (const file of files) {
      await this.b3fs.createCategoryDir(outputPath, file.category, ["all"]);
      this.b3fs.writeFileSync(
        file.path,
        this.config.outputType === OutputFileTypes.HTML
          ? pageWrapperHtml(marked.parse(file.content))
          : marked.parse(file.content)
      );
    }
  }

  private async buildBookTemplate(category: string): Promise<void> {
    this.logger.log("Build prepared Markdown Book Template " + category);
    this.config.targetCategory = category;
    this.config.outputType = OutputFileTypes.MD;
    const fileGroup = new FileGroup(this.config, this.rawContent);
    const files: B3File[] = await fileGroup.prepareBookTemplateContent(
      "prepared-book-" + category
    );

    this.b3fs.mkdirp(this.config.tempFolderPath);
    for (const file of files) {
      file.content = await replaceGlobalImagePathToLocal(file.content);
      file.content = await removeIgnoreBlock(file.content);
      // file.content = await this.replaceMarkdownPageBreakToHtml(file.content);
      this.b3fs.writeFileSync(file.path, file.content);
    }
  }

  private async buildBookPdf(rConf: RunConfig): Promise<void> {
    if (rConf.bookSettings.categories.length > 0) {
      for (const category of rConf.bookSettings.categories) {
        const config: PandocInput = {
          inputPath: `temp/prepared-book-${category}.md`,
          outputPath: `temp/output_from_html_${category}.pdf`,
          isTableOfContents: true,
          metadataFile: rConf.sourcePath + `/${category}/pandoc-config.yaml`,
        };
        try {
          await this.pandoc.generate(config);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      this.logger.throwError("There are not categories in request");
    }
  }

  private async copyImageFolder(): Promise<void> {
    await this.b3fs.copy(
      this.config.imageFolderPath,
      this.b3fs.pathJoin(this.config.tempFolderPath, "images")
    );
  }
}
