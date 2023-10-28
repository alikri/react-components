import './App.css';

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
}

export class App extends Component<unknown, AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    causeRenderError: false,
  };

  getPokemons = async (): Promise<void> => {
    const data = await await getPokemonsFromAPI();

    if (data && data.results) {
      const pokemonsData = data.results.map((pokemon: PokemonItem, index: number) => {
        return {
          name: pokemon.name,
          description: `This is a greate Pokemon with name ${capitalize(pokemon.name)} 👻`,
          image: `../src/assets/official-artwork/${index + 1}.png`,
        };
      });

      localStorage.setItem('pokemonsData', JSON.stringify(pokemonsData));
      this.setState({ pokemons: pokemonsData });
    }
  };

  getPokemon = async (term: string): Promise<void> => {
    const nameToSearch = term.toLocaleLowerCase().trim();
    const data = await getPokemonByName(nameToSearch);

    if (!data) {
      console.error('API call failed:');
      return;
    }

    const pokemons: PokemonItem[] = JSON.parse(localStorage.getItem('pokemonsData') || '[]');

    const matchingPokemons = pokemons.filter((pokemon) => pokemon.name.includes(nameToSearch));

    if (matchingPokemons.length > 0) {
      this.setState({ pokemons: matchingPokemons });
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
        <section>
          <Pokemons pokemons={this.state.pokemons} />
        </section>
      </ErrorBoundary>
    );
  }
}

export default App;
