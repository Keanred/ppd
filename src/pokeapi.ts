import { PokeCache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  static cache = new PokeCache(1000 * 60 * 60);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (pageURL) {
      const cached = PokeAPI.cache.get<ShallowLocations>(pageURL);
      if (cached) return cached;
    }
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (response.ok) {
      PokeAPI.cache.add(url, jsonResponse);
    }
    return jsonResponse;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    if (url) {
      const cached = PokeAPI.cache.get<Location>(url);
      if (cached) return cached;
    }
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (response.ok) {
      PokeAPI.cache.add(url, jsonResponse);
    }
    return jsonResponse;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: Array<{
        min_level: number;
        max_level: number;
        condition_values: Array<{
          name: string;
          url: string;
        }>;
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }>;
    }>;
  }>;
};
