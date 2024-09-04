import { file1Mock } from "./file1.mock";
import { file2Mock } from "./file2.mock";

const folder = {
  "somefirst.md": file1Mock,
  "somesecond.md": file2Mock,
};

const files = {
  category1: folder,
  category2: folder,
};
