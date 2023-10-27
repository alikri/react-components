import './search.css';

import { Component, createRef } from 'react';

interface SearchProps {
  searchTerm: string;
  causeRenderError: boolean;
  onInputChange: (term: string) => void;
  updateSearchTerm: (term: string) => void;
}

export class Search extends Component<SearchProps> {
  searchInput = createRef<HTMLInputElement>();

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.props.updateSearchTerm(searchTerm.trim());
  }

  handleSearch = () => {
    if (this.searchInput.current) {
      const searchTerm = this.searchInput.current.value.trim() || '';
      localStorage.setItem('searchTerm', searchTerm);
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
