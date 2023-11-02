import './pokemons.css';

import { Pokemon, PokemonItem } from '../pokemon/Pokemon';

interface ResultsProps {
  pokemons: PokemonItem[];
  pokemonError: boolean;
  pokemonsError: boolean;
}

export const Pokemons = ({ pokemons, pokemonError, pokemonsError }: ResultsProps) => {
  if (pokemonError) {
    return <h2>Pokemon with this name does not exist</h2>;
  }

  if (pokemonsError) {
    return <h2>Failed to fetch Pokemons list</h2>;
  }

  return (
    <div className="pokemons">
      {pokemons.map((pokemon, index) => (
        <Pokemon key={`${pokemon.name}${index}`} pokemon={pokemon} />
      ))}
    </div>
  );
};
