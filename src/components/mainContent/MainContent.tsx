import './mainContent.styles.css';

import { Component } from 'react';

import { Loader } from '../loader/Loader';

import { Search } from '../search/Search';
import { Pokemons } from '../pokemons/Pokemons';
import { getPokemonsFromAPI, getPokemonByName } from '../../api/api';

import { storeInLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';
import { capitalize } from '../../utils/utils';

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

  getPokemons = async (): Promise<void> => {
    this.setState({ loading: true, pokemonError: false, pokemonsError: false });
    try {
      const data = await getPokemonsFromAPI();

      if (data && data.results) {
        const pokemonsData = data.results.map((pokemon: PokemonItem, index: number) => {
          return {
            name: pokemon.name,
            description: `This is a greate Pokemon with name ${capitalize(pokemon.name)} 👻`,
            image: `official-artwork/${index + 1}.png`,
          };
        });

        storeInLocalStorage('pokemonsData', pokemonsData);

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

    const nameToSearch = term.toLocaleLowerCase().trim();

    try {
      await getPokemonByName(nameToSearch);

      const pokemons = loadFromLocalStorage<PokemonItem[]>('pokemonsData');
      if (!pokemons) throw new Error('pokemons are not defined');

      const matchingPokemons = pokemons.filter((pokemon) => pokemon.name.includes(nameToSearch));

      this.setState({ pokemons: matchingPokemons, loading: false });
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

  throwError = (): void => {
    this.setState({ causeRenderError: true });
  };

  render() {
    return (
      <>
        <section className="top-section">
          <Search
            causeRenderError={this.state.causeRenderError}
            searchTerm={this.state.searchTerm}
            onInputChange={this.onInputChange}
          />
          <div className="error-button-wrapper">
            <button className="error-button" onClick={this.throwError}>
              Throw Error
            </button>
          </div>
        </section>
        <section className="bottom-section">
          {this.state.loading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
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
