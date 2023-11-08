import './pokemonsList.styles.css';

import { PokemonCard } from '../pokemonCard/PokemonCard';
import { RightSideContext } from '../../context/rightSideContext';
import { useContext } from 'react';
import { RequestErrors } from '../mainContent/MainContent';
import { PokemonDataContext } from '../../context/pokemonDataContext';

interface ResultsProps {
  requestErrors: RequestErrors;
  currentPage: number;
}

export const PokemonsList = ({ requestErrors }: ResultsProps) => {
  const { rightSide } = useContext(RightSideContext);
  const { pokemons } = useContext(PokemonDataContext);

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
