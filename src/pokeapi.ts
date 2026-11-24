export class PokeAPI {
  private static readonly defaultURL = "https://pokeapi.co/api/v2/location-area";

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    try {
      const response = await fetch(pageURL ?? PokeAPI.defaultURL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error("Failed to fetch locations", {
        cause: e,
      });
    }
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
