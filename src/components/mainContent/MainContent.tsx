import './mainContent.styles.css';
import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

// Components
import { Loader } from '../loader/Loader';
import { Search } from '../search/Search';
import { PokemonsList } from '../pokemonsList/PokemonsList';
import { ErrorButton } from '../errorButton/ErrorButton';
import { Paginator } from '../paginator/Paginator';
import { PageLimit } from '../pageLimit/PageLimit';

// Utils
import pokemonApi from '../../api/apiClient';
import { loadFromLocalStorage } from '../../localStorage/localStorage';
import { capitalize } from '../../utils/utils';
import { isConvertibleToInt } from '../../utils/utils';
import { RightSideContext } from '../../context/context';
import { DEFAULT_PAGE } from '../../constants/constants';

interface PokemonItem {
  name: string;
  description: string;
  image: string;
}

export const MainContent = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);

  const [causeRenderError, setCauseRenderError] = useState<boolean>(false);
  const [pokemonError, setPokemonError] = useState<boolean>(false);
  const [pokemonsError, setPokemonsError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);
  const initialItemCount = 100;

  const [totalItems, setTotalItems] = useState<number>(initialItemCount);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const context = useContext(RightSideContext);
  const { rightSide, hideRightSide, showRightSide } = context;

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
      showRightSide();
    } else {
      hideRightSide();
    }

    const term = loadFromLocalStorage<string>('searchTerm');
    term && term.length ? getPokemon(term) : getPokemons();
  }, []);

  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: limit.toString() });
    getPokemons();
  }, [page, limit]);

  const getPokemons = async (): Promise<void> => {
    setLoading(true);
    setPokemonError(false);
    setPokemonsError(false);

    const currentOffset = (page - 1) * limit;

    try {
      const data = await pokemonApi.listPokemons(currentOffset, limit);
      if (totalItems === initialItemCount) {
        setTotalItems(data.count);
      }

      if (data?.results) {
        const pokemonsData = await fetchAllPokemons(data.results);
        setLoading(false);
        setPokemons(pokemonsData);
      } else {
        setLoading(false);
        setPokemonsError(true);
      }
    } catch {
      setLoading(false);
      setPokemonsError(true);
    }
  };

  const fetchAllPokemons = async (results: { name: string }[]): Promise<PokemonItem[]> => {
    return Promise.all(
      results.map(async ({ name }) => {
        const pokemonDetails = await pokemonApi.getPokemonByName(name);
        const imageUrl = pokemonDetails.sprites.other?.['official-artwork']['front_default'];
        return {
          name,
          description: `This is a great Pokemon with name ${capitalize(name)} 👻`,
          image: imageUrl || `default-image-path/${name}.png`,
        };
      }),
    );
  };

  const getPokemon = async (term: string): Promise<void> => {
    setLoading(true);
    setPokemonError(false);
    setPokemonsError(false);

    if (isConvertibleToInt(term)) {
      setPokemonError(true);
      return setLoading(false);
    }

    const nameToSearch = term.toLocaleLowerCase().trim();

    try {
      const pokemonFromClient = await pokemonApi.getPokemonByName(nameToSearch);
      const pokeImage = pokemonFromClient.sprites.other?.['official-artwork']['front_default'];

      setPokemons([
        {
          name: nameToSearch,
          description: `This is a great Pokemon with name ${capitalize(term)} 👻`,
          image: pokeImage || '',
        },
      ]);
      setLoading(false);
    } catch {
      setLoading(false);
      setPokemonError(true);
    }
  };

  const onInputChange = async (term: string): Promise<void> => {
    setSearchTerm(term);
    term.length ? getPokemon(term) : getPokemons();
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
          <Search causeRenderError={causeRenderError} searchTerm={searchTerm} onInputChange={onInputChange} />
          <ErrorButton triggerError={triggerError} />
        </div>
        <div className="results-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              <PageLimit limit={limit} onLimitChange={setLimit} onPageReset={() => setPage(DEFAULT_PAGE)} />
              <Paginator page={page} limit={limit} totalItems={totalItems} onPageChange={setPage} />
              <PokemonsList
                pokemons={pokemons}
                pokemonError={pokemonError}
                pokemonsError={pokemonsError}
                currentPage={page}
              />
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
