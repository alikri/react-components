import './App.css';
import LoadingImage from './assets/loader.gif';

import { Component } from 'react';
import { Search } from './components/search/Search';
import { Pokemons } from './components/pokemons/Pokemons';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { getPokemonsFromAPI, getPokemonByName } from './api/api';

import { capitalize } from './utils/utils';

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

export class App extends Component<unknown, AppState> {
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
            image: `../src/assets/official-artwork/${index + 1}.png`,
          };
        });

        localStorage.setItem('pokemonsData', JSON.stringify(pokemonsData));
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

      const pokemons: PokemonItem[] = JSON.parse(localStorage.getItem('pokemonsData') || '[]');
      const matchingPokemons = pokemons.filter((pokemon) => pokemon.name.includes(nameToSearch));

      this.setState({ pokemons: matchingPokemons, loading: false });
    } catch {
      this.setState({ loading: false, pokemonError: true });
    }
  };

  componentDidMount(): void {
    const term = localStorage.getItem('searchTerm');

    if (term) {
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

  onResetError = (): void => {
    this.setState({ causeRenderError: false });
    console.clear();
  };

  render() {
    return (
      <ErrorBoundary onResetError={this.onResetError}>
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
            <img src={LoadingImage} alt="" />
          ) : (
            <Pokemons
              pokemons={this.state.pokemons}
              pokemonError={this.state.pokemonError}
              pokemonsError={this.state.pokemonsError}
            />
          )}
        </section>
      </ErrorBoundary>
    );
  }
}

export default App;
