import './pokemonCard.styles.css';

import { useNavigate } from 'react-router-dom';

import { capitalize } from '../../utils/utils';
import { RightSideContext } from '../../context/context';
import { useContext } from 'react';
export interface PokemonItem {
  name: string;
  image: string;
  description: string;
}
interface PokemonObject {
  pokemon: PokemonItem;
}

export const PokemonCard = ({ pokemon }: PokemonObject) => {
  const context = useContext(RightSideContext);
  const { rightSide, showRightSide } = context;

  const navigate = useNavigate();
  const handleClick = () => {
    const currentSearchParams = window.location.search;

    navigate(`/details-${pokemon.name}${currentSearchParams}`);
    showRightSide();
  };

  return (
    <div className={rightSide ? 'pokemon-card pokemon-card-sm' : 'pokemon-card'} onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{capitalize(pokemon.name)}</h2>
      <p>{pokemon.description}</p>
    </div>
  );
};
