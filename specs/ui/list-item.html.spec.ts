import { describe, test, expect } from "@jest/globals";
import { listItemHtml } from "../../src/ui/list-item.html";

describe("UI ListItem html", () => {
  const inputText = "Some text";
  const h1Text = "<li>Some text</li>";

  test("listItemHtml test", async () => {
    expect(listItemHtml(inputText)).toEqual(h1Text);
  });
});
