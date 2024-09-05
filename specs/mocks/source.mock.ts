import { file1Mock } from "./file1.mock";
import { file2Mock } from "./file2.mock";

const folderMock = {
  "somefirst.md": file1Mock,
  "somesecond.md": file2Mock,
};

const filesMock = {
  category1: folderMock,
  category2: folderMock,
};
