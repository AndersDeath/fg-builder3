import { describe, test, expect } from "@jest/globals";
import { headlineMd } from "../../src/ui/headline.md";

describe("UI Headline MD", () => {
  const inputText = "Some text";
  const h1Text = "# Some text";
  const h2Text = "## Some text";
  const h4Text = "#### Some text";
  test("headlineMD level 1 test", async () => {
    expect(headlineMd(inputText, 1)).toEqual(h1Text);
  });

  test("headlineMD level 2 test", async () => {
    expect(headlineMd(inputText, 2)).toEqual(h2Text);
  });

  test("headlineMD level 4 test", async () => {
    expect(headlineMd(inputText, 4)).toEqual(h4Text);
  });
});
