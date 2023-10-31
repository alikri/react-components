import './search.css';

import { Component, createRef } from 'react';
import { loadFromLocalStorage, storeInLocalStorage } from '../../utils/localStorage';

interface SearchProps {
  searchTerm: string;
  causeRenderError: boolean;
  onInputChange: (term: string) => void;
}

export class Search extends Component<SearchProps> {
  searchInput = createRef<HTMLInputElement>();

  componentDidMount() {
    const searchTerm = loadFromLocalStorage<string>('searchTerm');

    if (searchTerm && this.searchInput.current) {
      this.searchInput.current.value = searchTerm;
    }
  }

  handleSearch = () => {
    if (this.searchInput.current) {
      const searchTerm = this.searchInput.current.value.trim();
      storeInLocalStorage('searchTerm', searchTerm);
      this.props.onInputChange(searchTerm);
    }
  };

  render() {
    if (this.props.causeRenderError) {
      throw new Error('Forced render error for testing ErrorBoundary');
    }
    return (
      <div className="search-wrapper">
        <input ref={this.searchInput} defaultValue={this.props.searchTerm} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
