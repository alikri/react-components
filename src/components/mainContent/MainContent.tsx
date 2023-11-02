import './mainContent.styles.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import { Loader } from '../loader/Loader';
import { Search } from '../search/Search';
import { Pokemons } from '../pokemons/Pokemons';
import { ErrorButton } from '../errorButton/ErrorButton';

// Utils
import pokemonApi from '../../api/apiClient';
import { loadFromLocalStorage } from '../../localStorage/localStorage';
import { capitalize } from '../../utils/utils';
import { isConvertibleToInt } from '../../utils/utils';

interface PokemonItem {
  name: string;
  description: string;
  image: string;
}

export const MainContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [causeRenderError, setCauseRenderError] = useState<boolean>(false);
  const [pokemonError, setPokemonError] = useState<boolean>(false);
  const [pokemonsError, setPokemonsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const initialOffset = parseInt(searchParams.get('offset') || '0', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [limit, setLimit] = useState<number>(initialLimit);

  useEffect(() => {
    const term = loadFromLocalStorage<string>('searchTerm');
    term && term.length ? getPokemon(term) : getPokemons();
  }, []);

  useEffect(() => {
    setSearchParams({ offset: offset.toString(), limit: limit.toString() });
    getPokemons();
  }, [offset, limit]);

  // useEffect(() => {
  //   setOffset(0);
  //   getPokemons();
  // }, [itemsPerPage]);

  const getPokemons = async (): Promise<void> => {
    setLoading(true);
    setPokemonError(false);
    setPokemonsError(false);

    try {
      const data = await pokemonApi.listPokemons(offset, limit);

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

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setOffset(0);
  };

  return (
    <>
      <section className="search-section">
        <Search causeRenderError={causeRenderError} searchTerm={searchTerm} onInputChange={onInputChange} />
        <ErrorButton triggerError={triggerError} />
        <select value={limit} onChange={handleLimitChange}>
          <option value="10">10 items/page</option>
          <option value="20">20 items/page</option>
          <option value="50">50 items/page</option>
          {/* Add more options as required */}
        </select>
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
};
