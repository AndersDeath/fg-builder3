import path from "path";
import { pageBreakHtml } from "./ui";

const replaceGlobalImagePathToLocal = async (
  content: string
): Promise<string> => {
  return content.replace(
    /https:\/\/raw\.githubusercontent\.com\/AndersDeath\/holy-theory\/main\/images/g,
    "./temp/images"
  );
};

const replaceMarkdownPageBreakToHtml = async (
  content: string
): Promise<string> => {
  return content.replace(/\\newpage/g, path.join("./", pageBreakHtml()));
};

const removeIgnoreBlock = (content: string): string => {
  // @ts-ignore
  const regex: RegExp = /<!-- ignore start -->(.*?)<!-- ignore end -->/gs;
  content = content.replace(regex, "");
  return content;
};

export {
  replaceGlobalImagePathToLocal,
  replaceMarkdownPageBreakToHtml,
  removeIgnoreBlock,
};
