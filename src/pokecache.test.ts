import { PokeCache } from "./pokecache";
import { test, expect, describe } from "vitest";

describe("PokeCache test cases", () => {
  test.concurrent.each([
    {
      key: "https://example.com",
      val: "testdata",
      interval: 500, // 1/2 second
    },
    {
      key: "https://example.com/path",
      val: "moretestdata",
      interval: 1000, // 1 second
    },
  ])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new PokeCache(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval * 3));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
  });

  test("returns undefined for missing key", () => {
    const cache = new PokeCache(500);
    expect(cache.get("notfound")).toBeUndefined();
    cache.stopReapLoop();
  });

  test("overwrites value for same key", () => {
    const cache = new PokeCache(500);
    cache.add("foo", "bar");
    cache.add("foo", "baz");
    expect(cache.get("foo")).toBe("baz");
    cache.stopReapLoop();
  });

  test("handles multiple keys independently", async () => {
    const cache = new PokeCache(300);
    cache.add("a", 1);
    cache.add("b", 2);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    await new Promise((r) => setTimeout(r, 700));
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
    cache.stopReapLoop();
  });

  test("preserves value type", () => {
    const cache = new PokeCache(500);
    cache.add("obj", { x: 42 });
    const val = cache.get<{ x: number }>("obj");
    expect(val).toEqual({ x: 42 });
    cache.stopReapLoop();
  });

  test("stopReapLoop prevents further reaping", async () => {
    const cache = new PokeCache(200);
    cache.add("persist", "yes");
    cache.stopReapLoop();
    await new Promise((r) => setTimeout(r, 500));
    expect(cache.get("persist")).toBe("yes");
  });
});
