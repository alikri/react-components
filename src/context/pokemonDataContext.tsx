import { createContext, useState } from 'react';
import pokemonApi from '../api/apiClient';
import { capitalize, isConvertibleToInt } from '../utils/utils';
import { RequestErrors } from '../components/mainContent/MainContent';
import { INTIAL_ITEM_COUNT } from '../constants/constants';
import { PokemonItem } from '../components/pokemonCard/PokemonCard';

interface PokemonProviderProps {
  children: React.ReactNode;
}

interface PokemonProps {
  pokemons: PokemonItem[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonItem[]>>;
  loading: boolean;
  totalItems: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  requestErrors: RequestErrors;
  setRequestErrors: React.Dispatch<React.SetStateAction<RequestErrors>>;
  getPokemons: (page: number, limit: number) => void;
  getPokemon: (term: string) => void;
}

export const PokemonDataContext = createContext<PokemonProps>({
  pokemons: [],
  setPokemons: () => {},
  loading: false,
  totalItems: INTIAL_ITEM_COUNT,
  setLoading: () => {},
  requestErrors: {
    pokemonListRequestError: false,
    pokemonRequestError: false,
  },
  setRequestErrors: () => {},
  getPokemons: () => {},
  getPokemon: () => {},
});

export const PokemonDataProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [requestErrors, setRequestErrors] = useState<RequestErrors>({
    pokemonListRequestError: false,
    pokemonRequestError: false,
  });

  const [totalItems, setTotalItems] = useState<number>(INTIAL_ITEM_COUNT);

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

  const getPokemons = async (page: number, limit: number): Promise<void> => {
    setLoading(true);
    setRequestErrors({ pokemonListRequestError: false, pokemonRequestError: false });

    const currentOffset = (page - 1) * limit;

    try {
      const data = await pokemonApi.listPokemons(currentOffset, limit);
      if (totalItems === INTIAL_ITEM_COUNT) {
        setTotalItems(data.count);
      }

      if (data?.results) {
        const pokemonsData = await fetchAllPokemons(data.results);
        setPokemons(pokemonsData);
      } else {
        throw new Error('No pokemons are found');
      }
    } catch {
      setRequestErrors((prevErrors) => ({
        ...prevErrors,
        pokemonListError: true,
      }));
    } finally {
      setLoading(false);
    }
  };

  const getPokemon = async (term: string): Promise<void> => {
    setLoading(true);

    setRequestErrors({ pokemonListRequestError: false, pokemonRequestError: false });

    if (isConvertibleToInt(term)) {
      setRequestErrors((prevErrors) => ({
        ...prevErrors,
        pokemonRequestError: true,
      }));
      return setLoading(false);
    }

    const nameToSearch = term.toLocaleLowerCase().trim();

    try {
      const pokemonFromClient = await pokemonApi.getPokemonByName(nameToSearch);
      const pokemonImage = pokemonFromClient.sprites.other?.['official-artwork']['front_default'];

      if (pokemonImage) {
        setPokemons([
          {
            name: nameToSearch,
            description: `This is a great Pokemon with name ${capitalize(term)} 👻`,
            image: pokemonImage,
          },
        ]);
      } else {
        throw new Error('No pokemon image is found');
      }
    } catch {
      setRequestErrors((prevErrors) => ({
        ...prevErrors,
        pokemonRequestError: true,
      }));
    } finally {
      setLoading(false);
    }
  };

  const value = {
    pokemons,
    setPokemons,
    loading,
    setLoading,
    requestErrors,
    setRequestErrors,
    getPokemons,
    getPokemon,
    totalItems,
  };

  return <PokemonDataContext.Provider value={value}>{children}</PokemonDataContext.Provider>;
};
