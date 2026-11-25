import { Cache } from "./pokecache.js";
import { describe, expect, test } from "vitest";

describe("Cache", () => {
  test("returns a value that was added under a key", () => {
    const cache = new Cache(100);
    try {
      const key = "https://pokeapi.co/api/v2/location-area";
      const value = {
        count: 1,
        results: [{ name: "canalave-city-area" }],
      };

      cache.add(key, value);
      expect(cache.get(key)?.val).toEqual(value);
    } finally {
      cache.stopReapLoop();
    }
  });

  test("replaces an existing value present under the same key", () => {
    const cache = new Cache(100);
    try {
      const key = "https://pokeapi.co/api/v2/location-area";
      const value1 = {
        count: 1,
        results: [{ name: "canalave-city-area" }],
      };
      const value2 = {
        count: 2,
        results: [{ name: "mama-land" }],
      };

      cache.add(key, value1);
      cache.add(key, value2);

      expect(cache.get(key)?.val).toEqual(value2);
    } finally {
      cache.stopReapLoop();
    }
  });

  test("returns undefined if key is missing", () => {
    const cache = new Cache(100);
    try {
      expect(cache.get("random")).toEqual(undefined);
    } finally {
      cache.stopReapLoop();
    }
  });

  test("removes an entry after the interval passes", async () => {
    const cache = new Cache(100);

    try {
      const key = "https://pokeapi.co/api/v2/location-area";
      const value = {
        count: 1,
        results: [{ name: "canalave-city-area" }],
      };

      cache.add(key, value);
      await expect.poll(() => cache.get(key), {
        timeout: 500,
        interval: 50
      }).toBeUndefined();
    } finally {
      cache.stopReapLoop();
    }
  });
});
