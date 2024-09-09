import { file1Mock } from "./file1.mock";
import { file2Mock } from "./file2.mock";
import { file3Mock } from "./file3.mock";

const folderMock = {
  "somefirst.md": file1Mock,
  "somesecond.md": file2Mock,
  "somethird.md": file3Mock
};

export const filesMock = {
  category1: folderMock,
  category2: folderMock,
  category3: folderMock,
};
