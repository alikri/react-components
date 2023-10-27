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
}

export class Pokemons extends Component<ResultsProps> {
  render() {
    return (
      <div className="pokemons">
        {this.props.pokemons.map((pokemon: PokemonItem, index: number) => (
          <Pokemon key={`${pokemon.name}${index}`} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}
