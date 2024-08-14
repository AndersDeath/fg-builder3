const inputStringReplaceGlobalImagePathToLocal =
  "![Depth first search](https://raw.githubusercontent.com/AndersDeath/holy-theory/main/images/breadth-first-search.png)";
const outputStringReplaceGlobalImagePathToLocal =
  "![Depth first search](./temp/images/breadth-first-search.png)";

const inputStringReplaceMarkdownPageBreakToHtml = `some text \\newpage end of some text`;
const outputStringReplaceMarkdownPageBreakToHtml = `some text <div style="page-break-after: always;"></div> end of some text`;

const inputStringRemoveIgnoreBlock = `some text <!-- ignore start --> some text <!-- ignore end --> end of some text`;
const outputStringRemoveIgnoreBlock = `some text  end of some text`;


export const utilsSpecMock = {
  replaceGlobalImagePathToLocal: {
    input: inputStringReplaceGlobalImagePathToLocal,
    output: outputStringReplaceGlobalImagePathToLocal,
  },
  replaceMarkdownPageBreakToHtml: {
    input: inputStringReplaceMarkdownPageBreakToHtml,
    output: outputStringReplaceMarkdownPageBreakToHtml,
  },
  removeIgnoreBlock: {
    input: inputStringRemoveIgnoreBlock,
    output: outputStringRemoveIgnoreBlock
  }
};
