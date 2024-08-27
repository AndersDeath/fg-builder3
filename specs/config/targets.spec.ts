import { describe, test, expect } from "@jest/globals";
import { targets } from '../../src/config/targets'

describe("Config targets", () => {

  test("Config targets test", async () => {
    expect(targets).toEqual(["md", "html", "book"]);
  });
  
});
