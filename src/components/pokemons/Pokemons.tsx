import './pokemons.css';

import { Component } from 'react';

import { Pokemon } from '../pokemon/Pokemon';

interface PokemonItem {
  name: string;
  image: string;
  description: string;
}

interface ResultsProps {
  pokemons: PokemonItem[];
  pokemonError: boolean;
  pokemonsError: boolean;
}

export class Pokemons extends Component<ResultsProps> {
  render() {
    if (this.props.pokemonError) {
      return <h2>Pokemon with this name does not exist</h2>;
    }

    if (this.props.pokemonsError) {
      return <h2>Failed to fetch Pokemons list</h2>;
    }

    return (
      <div className="pokemons">
        {this.props.pokemons.map((pokemon: PokemonItem, index: number) => (
          <Pokemon key={`${pokemon.name}${index}`} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}
