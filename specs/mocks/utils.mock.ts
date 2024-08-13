const inputStringReplaceGlobalImagePathToLocal =
  "![Depth first search](https://raw.githubusercontent.com/AndersDeath/holy-theory/main/images/breadth-first-search.png)";
const outputStringReplaceGlobalImagePathToLocal =
  "![Depth first search](./temp/images/breadth-first-search.png)";

export const utilsSpecMock = {
  replaceGlobalImagePathToLocal: {
    input: inputStringReplaceGlobalImagePathToLocal,
    output: outputStringReplaceGlobalImagePathToLocal,
  },
};
