import './pokemonsList.styles.css';

import { PokemonCard, PokemonItem } from '../pokemonCard/PokemonCard';
import { RightSideContext } from '../../context/context';
import { useContext } from 'react';

interface ResultsProps {
  pokemons: PokemonItem[];
  pokemonError: boolean;
  pokemonsError: boolean;
  currentPage: number;
}

export const PokemonsList = ({ pokemons, pokemonError, pokemonsError }: ResultsProps) => {
  const context = useContext(RightSideContext);
  const { rightSide } = context;

  if (pokemonError) {
    return <h2>Pokemon with this name does not exist</h2>;
  }

  if (pokemonsError) {
    return <h2>Failed to fetch Pokemons list</h2>;
  }

  return (
    <div className={rightSide ? 'pokemons pokemons-sm' : 'pokemons'}>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={`${pokemon.name}${index}`} pokemon={pokemon} />
      ))}
    </div>
  );
};
