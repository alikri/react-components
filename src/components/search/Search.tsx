import { Component, createRef } from 'react';

interface SearchProps {
  searchTerm: string;
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
    return (
      <div>
        <input ref={this.searchInput} defaultValue={this.props.searchTerm} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
