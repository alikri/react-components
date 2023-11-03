import { Pokemon } from 'pokenode-ts';
import { capitalize } from '../../utils/utils';

interface PokemonDetailsProps {
  pokemonDetails: Pokemon | null;
}

const RenderPokemonDetails = ({ pokemonDetails }: PokemonDetailsProps) => {
  const imageUrl = pokemonDetails && pokemonDetails.sprites.other?.['official-artwork']['front_default'];
  const pokemonNameToDisplay = pokemonDetails && capitalize(pokemonDetails.name);
  return (
    <div className="pokemon-details">
      {imageUrl && <img src={imageUrl} alt={'pokemon abilities'} />}
      {pokemonDetails && <h2>{pokemonNameToDisplay}</h2>}
      <p>This is a great Pokemon with name {pokemonNameToDisplay} 👻</p>
    </div>
  );
};

export default RenderPokemonDetails;
