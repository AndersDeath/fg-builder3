import { describe, test, expect } from "@jest/globals";
import { headlineHtml } from "../../src/ui/headline.html";

describe("UI Headline html", () => {
  const inputText = "Some text";
  const h1Text = "<h1>Some text</h1>";
  const h2Text = "<h2>Some text</h2>";
  const h4Text = "<h4>Some text</h4>";
  test("headlineHtml H1 test", async () => {
    expect(headlineHtml(inputText, 1)).toEqual(h1Text);
  });

  test("headlineHtml H2 test", async () => {
    expect(headlineHtml(inputText, 2)).toEqual(h2Text);
  });

  test("headlineHtml H4 test", async () => {
    expect(headlineHtml(inputText, 4)).toEqual(h4Text);
  });
});
