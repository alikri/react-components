import './mainContent.styles.css';

import { Component } from 'react';

import { PokemonClient, NamedAPIResourceList } from 'pokenode-ts';

import { Loader } from '../loader/Loader';

import { Search } from '../search/Search';
import { Pokemons } from '../pokemons/Pokemons';

import { loadFromLocalStorage } from '../../localStorage/localStorage';
import { capitalize } from '../../utils/utils';
import { ErrorButton } from '../errorButton/ErrorButton';

interface PokemonItem {
  name: string;
  description: string;
  image: string;
}
interface AppState {
  searchTerm: string;
  pokemons: PokemonItem[];
  causeRenderError: boolean;
  pokemonError: boolean;
  pokemonsError: boolean;
  loading: boolean;
}

export class MainContent extends Component {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    causeRenderError: false,
    pokemonError: false,
    pokemonsError: false,
    loading: false,
  };

  api: PokemonClient = new PokemonClient();

  getPokemons = async (): Promise<void> => {
    this.setState({ loading: true, pokemonError: false, pokemonsError: false });
    try {
      const data: NamedAPIResourceList = await this.api.listPokemons();

      if (data && data.results) {
        const fetchDetailsPromises: Promise<PokemonItem>[] = data.results.map(async (pokemonResult) => {
          const pokemonDetails = await this.api.getPokemonByName(pokemonResult.name);
          const imageUrl = pokemonDetails.sprites.other?.['official-artwork']['front_default'];
          return {
            name: pokemonResult.name,
            description: `This is a great Pokemon with name ${capitalize(pokemonResult.name)} 👻`,
            image: imageUrl || `default-image-path/${pokemonResult.name}.png`,
          };
        });

        const pokemonsData = await Promise.all(fetchDetailsPromises);

        this.setState({ loading: false, pokemons: pokemonsData });
      } else {
        this.setState({ loading: false, pokemonsError: true });
      }
    } catch {
      this.setState({ loading: false, pokemonsError: true });
    }
  };

  getPokemon = async (term: string): Promise<void> => {
    this.setState({ loading: true, pokemonError: false, pokemonsError: false });
    if (Number(term)) {
      this.setState({ loading: false, pokemonError: true });
    }
    const nameToSearch = term.toLocaleLowerCase().trim();

    try {
      const pokemonsFromClient = await this.api.getPokemonByName(nameToSearch);
      const pokeImage = pokemonsFromClient.sprites.other?.['official-artwork']['front_default'];

      const pokemon: PokemonItem[] = [
        {
          name: nameToSearch,
          description: `This is a greate Pokemon with name ${capitalize(term)} 👻`,
          image: pokeImage ? pokeImage : '',
        },
      ];

      this.setState({ pokemons: pokemon, loading: false });
    } catch {
      this.setState({ loading: false, pokemonError: true });
    }
  };

  componentDidMount(): void {
    const term = loadFromLocalStorage<string>('searchTerm');

    if (term && term.length !== 0) {
      this.getPokemon(term);
    } else {
      this.getPokemons();
    }
  }

  onInputChange = async (term: string): Promise<void> => {
    this.setState({ searchTerm: term });

    if (term.length > 0) {
      this.getPokemon(term);
    } else {
      this.getPokemons();
    }
  };

  triggerError = (): void => {
    this.setState({ causeRenderError: true });
  };

  render() {
    return (
      <>
        <section className="search-section">
          <Search
            causeRenderError={this.state.causeRenderError}
            searchTerm={this.state.searchTerm}
            onInputChange={this.onInputChange}
          />
          <ErrorButton triggerError={this.triggerError} />
        </section>
        <section className="results-section">
          {this.state.loading ? (
            <Loader />
          ) : (
            <Pokemons
              pokemons={this.state.pokemons}
              pokemonError={this.state.pokemonError}
              pokemonsError={this.state.pokemonsError}
            />
          )}
        </section>
      </>
    );
  }
}
