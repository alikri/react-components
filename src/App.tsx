import './App.css';

import { Component } from 'react';
import { Search } from './components/search/Search';
import { Results } from './components/results/Results';
import { ErrorBoundary } from './components/error/ErrorBoundary';

interface ResultItem {
  name: string;
  description: string;
}
interface AppState {
  searchTerm: string;
  results: ResultItem[];
  causeRenderError: boolean;
}

export class App extends Component<unknown, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
    causeRenderError: false,
  };

  updateSearchTerm = (term: string): void => {
    this.setState({ searchTerm: term });
  };

  onInputChange = (term: string): void => {
    console.log(term);
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
        <div>
          <Search
            causeRenderError={this.state.causeRenderError}
            searchTerm={this.state.searchTerm}
            onInputChange={this.onInputChange}
            updateSearchTerm={this.updateSearchTerm}
          />
          <button onClick={this.throwError}>Throw Error</button>
        </div>
        <div>
          <Results results={this.state.results} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
