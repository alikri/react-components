import './pokemonCard.styles.css';

import { useNavigate } from 'react-router-dom';

import { capitalize } from '../../utils/utils';
export interface PokemonItem {
  name: string;
  image: string;
  description: string;
}
interface PokemonObject {
  pokemon: PokemonItem;
  rightSide: boolean;
  setRightSide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PokemonCard = ({ pokemon, setRightSide, rightSide }: PokemonObject) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/details-${pokemon.name}`);
    setRightSide(true);
  };

  return (
    <div className={rightSide ? 'pokemon-card pokemon-card-sm' : 'pokemon-card'} onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{capitalize(pokemon.name)}</h2>
      <p>{pokemon.description}</p>
    </div>
  );
};
