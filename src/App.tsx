import './App.css';
import { Component } from 'react';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Home } from './pages/Home/Home';

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
  onResetError = (): void => {
    this.setState({ causeRenderError: false });
    console.clear();
  };

  render() {
    return (
      <ErrorBoundary onResetError={this.onResetError}>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
