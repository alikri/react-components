import './mainContent.styles.css';
import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../loader/Loader';
import { Search } from '../search/Search';
import { PokemonsList } from '../pokemonsList/PokemonsList';
import { ErrorButton } from '../errorButton/ErrorButton';
import { Paginator } from '../paginator/Paginator';
import { PageLimit } from '../pageLimit/PageLimit';

import { loadFromLocalStorage } from '../../localStorage/localStorage';
import { RightSideContext } from '../../context/rightSideContext';
import { DEFAULT_PAGE } from '../../constants/constants';
import { PokemonDataContext } from '../../context/pokemonDataContext';
import { SearchContext } from '../../context/searchQueryContext';

export interface RequestErrors {
  pokemonListRequestError: boolean;
  pokemonRequestError: boolean;
}

export const MainContent = () => {
  const navigate = useNavigate();
  const { loading, requestErrors, getPokemons, getPokemon } = useContext(PokemonDataContext);
  const { rightSide, hideRightSide, showRightSide } = useContext(RightSideContext);
  const { setSearchTerm } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [causeRenderError, setCauseRenderError] = useState<boolean>(false);

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);

  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
      showRightSide();
    } else {
      hideRightSide();
    }

    const term = loadFromLocalStorage<string>('searchTerm');
    term && term.length ? getPokemon(term) : getPokemons(page, limit);
  }, []);

  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: limit.toString() });
    getPokemons(page, limit);
  }, [page, limit]);

  const onInputChange = async (term: string): Promise<void> => {
    setSearchTerm(term);
    term.length ? getPokemon(term) : getPokemons(page, limit);
  };

  const triggerError = (): void => {
    setCauseRenderError(true);
  };

  const navigateBack = () => {
    const currentSearchParams = window.location.search;
    navigate(`/${currentSearchParams}`);
  };

  const handleLeftSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.left-panel') && !target.closest('.pokemon-card')) {
      hideRightSide();
      navigateBack();
    }
  };

  return (
    <div className="main-content-container" onClick={(e) => handleLeftSideClick(e)}>
      <section className="left-panel">
        <div className="search-section">
          <Search causeRenderError={causeRenderError} onInputChange={onInputChange} />
          <ErrorButton triggerError={triggerError} />
        </div>
        <div className="results-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              <PageLimit limit={limit} onLimitChange={setLimit} onPageReset={() => setPage(DEFAULT_PAGE)} />
              <Paginator page={page} limit={limit} onPageChange={setPage} />
              <PokemonsList requestErrors={requestErrors} />
            </>
          )}
        </div>
      </section>
      {rightSide && (
        <section className="right-panel">
          <Outlet />
        </section>
      )}
    </div>
  );
};
