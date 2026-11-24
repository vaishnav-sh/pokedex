export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2/";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(`${PokeAPI.baseURL}${pageURL}`)
      .then((data) => data.json())
      .then((data) => data.results);

    return response;
  }
  //
  //   async fetchLocation(locationName: string): Promise<Location> {
  //     // implement this
  //   }
}

export type ShallowLocations = {
  name: string;
  url: string;
}[];

export type Location = {
  // add properties here
};
