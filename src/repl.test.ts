import { cleanInput } from "./repl";
import { describe, it, expect } from "vitest";

describe("cleanInput", () => {
  const cases = [
    { input: "  hello  world  ", expected: ["hello", "world"] },
    { input: "HELLO WORLD", expected: ["hello", "world"] },
    { input: "   ", expected: [] },
    { input: "one", expected: ["one"] },
    { input: "one   two   three", expected: ["one", "two", "three"] },
    { input: "  MiXeD CaSe  ", expected: ["mixed", "case"] },
    { input: "multiple   spaces   here", expected: ["multiple", "spaces", "here"] },
    { input: "trailing   ", expected: ["trailing"] },
    { input: "  leading", expected: ["leading"] },
    { input: "punctuation!", expected: ["punctuation!"] },
    { input: "a b c d e", expected: ["a", "b", "c", "d", "e"] },
  ];

  cases.forEach(({ input, expected }) => {
    it(`should parse "${input}" to ${JSON.stringify(expected)}`, () => {
      const actual = cleanInput(input);
      expect(actual).toHaveLength(expected.length);
      expected.forEach((val, i) => {
        expect(actual[i]).toBe(val);
      });
    });
  });
});
