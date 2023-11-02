import { PokemonClient } from 'pokenode-ts';

class PokemonApiClient {
  private client: PokemonClient;

  constructor() {
    this.client = new PokemonClient();
  }

  async listPokemons() {
    return await this.client.listPokemons();
  }

  async getPokemonByName(name: string) {
    return await this.client.getPokemonByName(name);
  }
}

const pokemonApi = new PokemonApiClient();
export default pokemonApi;
