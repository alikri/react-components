import './pokemonsList.styles.css';

import { PokemonCard, PokemonItem } from '../pokemonCard/PokemonCard';
import { RightSideContext } from '../../context/context';
import { useContext } from 'react';
import { RequestErrors } from '../mainContent/MainContent';

interface ResultsProps {
  pokemons: PokemonItem[];
  requestErrors: RequestErrors;
  currentPage: number;
}

export const PokemonsList = ({ pokemons, requestErrors }: ResultsProps) => {
  const context = useContext(RightSideContext);
  const { rightSide } = context;

  if (requestErrors.pokemonRequestError) {
    return <h2>Pokemon with this name does not exist</h2>;
  }

  if (requestErrors.pokemonListRequestError) {
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
