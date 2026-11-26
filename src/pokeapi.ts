import { Cache } from "./pokecache.js";
import { Pokemon } from "./state.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private pokeCache;

  constructor(interval: number) {
    this.pokeCache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    try {
      const url =
        pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

      if (this.pokeCache.get(url)) {
        return this.pokeCache.get(url)?.val as ShallowLocations;
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

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

      if (this.pokeCache.get(url)) {
        return this.pokeCache.get(url)?.val as Location;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.pokeCache.add(url, data);
      return data;
    } catch (e) {
      throw new Error(`Failed to fetch location: ${locationName}`, {
        cause: e,
      });
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    try {
      const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

      console.log(url)

      if (this.pokeCache.get(url)) {
        return this.pokeCache.get(url)?.val as Pokemon;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.pokeCache.add(url, data);
      return data;
    } catch (e) {
      throw new Error(`Failed to fetch Pokemon: ${pokemonName}`, {
        cause: e,
      });
    }
  }

  closeCache() {
    this.pokeCache.stopReapLoop();
  }

}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};
