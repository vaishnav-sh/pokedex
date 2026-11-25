import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly defaultURL = "https://pokeapi.co/api/v2/location-area?offset=0&limit=20";
  private pokeCache;

  constructor(interval: number) {
    this.pokeCache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    try {
      const url = pageURL ?? PokeAPI.defaultURL;

      if (this.pokeCache.get(url)) {
        return this.pokeCache.get(url)?.val as ShallowLocations
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.pokeCache.add(url, data);
      return data;
    } catch (e) {
      throw new Error("Failed to fetch locations", {
        cause: e,
      });
    }
  }

  closeCache() {
    this.pokeCache.stopReapLoop()
  }

  //
  //   async fetchLocation(locationName: string): Promise<Location> {
  //     // implement this
  //   }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
    }[]
};

export type Location = {
  // add properties here
};
