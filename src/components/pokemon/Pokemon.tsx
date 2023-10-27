import './pokemon.css';

import { Component } from 'react';
import { capitalize } from '../../utils/utils';

interface PokemonItem {
  name: string;
  description: string;
  image: string;
}

interface PokemonObject {
  pokemon: PokemonItem;
}

export class Pokemon extends Component<PokemonObject> {
  render() {
    return (
      <div className="pokemon-card">
        <img src={this.props.pokemon.image} alt={this.props.pokemon.name} />
        <h2>{capitalize(this.props.pokemon.name)}</h2>
        <p>{this.props.pokemon.description}</p>
      </div>
    );
  }
}
