import { describe, test, expect } from "@jest/globals";
import { pageBreakHtml } from "../../src/ui/page-break.html";

describe("UI PageBreak html", () => {
  test("pageBreakHtml test", async () => {
    expect(pageBreakHtml()).toEqual('<div style="page-break-after: always;"></div>');
  });
});
