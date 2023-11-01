import { Component } from 'react';
import './mainContent.styles.css';

// Components
import { Loader } from '../loader/Loader';
import { Search } from '../search/Search';
import { Pokemons } from '../pokemons/Pokemons';
import { ErrorButton } from '../errorButton/ErrorButton';

// Utils
import { PokemonClient } from 'pokenode-ts';
import { loadFromLocalStorage } from '../../localStorage/localStorage';
import { capitalize } from '../../utils/utils';
import { isConvertibleToInt } from '../../utils/utils';

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

export class MainContent extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    causeRenderError: false,
    pokemonError: false,
    pokemonsError: false,
    loading: false,
  };

  private api = new PokemonClient();

  componentDidMount(): void {
    const term = loadFromLocalStorage<string>('searchTerm');
    term && term.length ? this.getPokemon(term) : this.getPokemons();
  }

  private getPokemons = async (): Promise<void> => {
    this.setState({ loading: true, pokemonError: false, pokemonsError: false });

    try {
      const data = await this.api.listPokemons();

      if (data?.results) {
        const pokemonsData = await this.fetchAllPokemons(data.results);
        this.setState({ loading: false, pokemons: pokemonsData });
      } else {
        this.setState({ loading: false, pokemonsError: true });
      }
    } catch {
      this.setState({ loading: false, pokemonsError: true });
    }
  };

  private fetchAllPokemons = async (results: { name: string }[]): Promise<PokemonItem[]> => {
    return Promise.all(
      results.map(async ({ name }) => {
        const pokemonDetails = await this.api.getPokemonByName(name);
        const imageUrl = pokemonDetails.sprites.other?.['official-artwork']['front_default'];
        return {
          name,
          description: `This is a great Pokemon with name ${capitalize(name)} 👻`,
          image: imageUrl || `default-image-path/${name}.png`,
        };
      }),
    );
  };

  private getPokemon = async (term: string): Promise<void> => {
    this.setState({ loading: true, pokemonError: false, pokemonsError: false });

    if (isConvertibleToInt(term)) {
      return this.setState({ loading: false, pokemonError: true });
    }

    const nameToSearch = term.toLocaleLowerCase().trim();
    try {
      const pokemonFromClient = await this.api.getPokemonByName(nameToSearch);
      const pokeImage = pokemonFromClient.sprites.other?.['official-artwork']['front_default'];

      this.setState({
        pokemons: [
          {
            name: nameToSearch,
            description: `This is a great Pokemon with name ${capitalize(term)} 👻`,
            image: pokeImage || '',
          },
        ],
        loading: false,
      });
    } catch {
      this.setState({ loading: false, pokemonError: true });
    }
  };

  private onInputChange = async (term: string): Promise<void> => {
    this.setState({ searchTerm: term });
    term.length ? this.getPokemon(term) : this.getPokemons();
  };

  private triggerError = (): void => {
    this.setState({ causeRenderError: true });
  };

  render() {
    const { loading, searchTerm, causeRenderError, pokemons, pokemonError, pokemonsError } = this.state;

    return (
      <>
        <section className="search-section">
          <Search causeRenderError={causeRenderError} searchTerm={searchTerm} onInputChange={this.onInputChange} />
          <ErrorButton triggerError={this.triggerError} />
        </section>
        <section className="results-section">
          {loading ? (
            <Loader />
          ) : (
            <Pokemons pokemons={pokemons} pokemonError={pokemonError} pokemonsError={pokemonsError} />
          )}
        </section>
      </>
    );
  }
}
