import './App.css';

import { Component } from 'react';
import { Search } from './components/search/Search';
import { Results } from './components/results/Results';

interface ResultItem {
  name: string;
  description: string;
}
interface AppState {
  searchTerm: string;
  results: ResultItem[];
}

export class App extends Component<unknown, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
  };

  updateSearchTerm = (term: string): void => {
    this.setState({ searchTerm: term });
  };

  onInputChange = (term: string): void => {
    console.log(term);
  };

  throwError = (): void => {
    throw new Error('Error');
  };

  render() {
    return (
      <>
        <div>
          <Search
            searchTerm={this.state.searchTerm}
            onInputChange={this.onInputChange}
            updateSearchTerm={this.updateSearchTerm}
          />
          <button onClick={this.throwError}>Throw Error</button>
        </div>
        <div>
          <Results results={this.state.results} />
        </div>
      </>
    );
  }
}

export default App;
