import './pokemon.css';

import { capitalize } from '../../utils/utils';
export interface PokemonItem {
  name: string;
  image: string;
  description: string;
}
interface PokemonObject {
  pokemon: PokemonItem;
}

export const Pokemon = ({ pokemon }: PokemonObject) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{capitalize(pokemon.name)}</h2>
      <p>{pokemon.description}</p>
    </div>
  );
};
