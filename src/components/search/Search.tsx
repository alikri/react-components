import './search.styles.css';
import { useEffect, useRef } from 'react';
import { loadFromLocalStorage, storeInLocalStorage } from '../../localStorage/localStorage';

interface SearchProps {
  searchTerm: string;
  causeRenderError: boolean;
  onInputChange: (term: string) => void;
}

export const Search = ({ searchTerm, causeRenderError, onInputChange }: SearchProps) => {
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedSearchTerm = loadFromLocalStorage<string>('searchTerm');

    if (storedSearchTerm && searchInput.current) {
      searchInput.current.value = storedSearchTerm;
    }
  }, []);

  const handleSearch = () => {
    if (searchInput.current) {
      const searchTermValue = searchInput.current.value.trim();
      storeInLocalStorage('searchTerm', searchTermValue);
      onInputChange(searchTermValue);
    }
  };

  if (causeRenderError) {
    throw new Error('Forced render error for testing ErrorBoundary');
  }

  return (
    <div className="search-wrapper">
      <input ref={searchInput} defaultValue={searchTerm} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
