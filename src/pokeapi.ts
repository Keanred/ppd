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

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    if (url) {
      const cached = PokeAPI.cache.get<Pokemon>(url);
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

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
        url: string;
      };
      rarity: number;
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
      level_learned_at: number;
      order: number;
    }>;
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      is_hidden: boolean;
      slot: number;
      ability: {
        name: string;
        url: string;
      };
    } | null>;
  }>;
  past_stats: Array<{
    generation: {
      name: string;
      url: string;
    };
    stats: Array<{
      stat: {
        name: string;
        url: string;
      };
      effort: number;
      base_stat: number;
    }>;
  }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
  };
  cries: {
    latest: string | null;
    legacy: string | null;
  };
  species: {
    name: string;
    url: string;
  };
  stats: Array<{
    stat: {
      name: string;
      url: string;
    };
    effort: number;
    base_stat: number;
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}
