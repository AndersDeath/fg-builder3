import { describe, test, expect } from "@jest/globals";
import { pageBreakMd } from "../../src/ui/page-break.md";

describe("UI PageBreak md", () => {
  test("pageBreakMd test", async () => {
    expect(pageBreakMd()).toEqual('\n \\newpage \n\n');
  });
});
