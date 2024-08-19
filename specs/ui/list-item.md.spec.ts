import { describe, test, expect } from "@jest/globals";
import { listItemMd } from "../../src/ui/list-item.md";

describe("UI ListItem md", () => {
  const inputText = "Some text";
  const h1Text = "- Some text";

  test("listItemMd test", async () => {
    expect(listItemMd(inputText)).toEqual(h1Text);
  });
});
