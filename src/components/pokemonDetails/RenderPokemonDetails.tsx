import { Pokemon } from 'pokenode-ts';

interface PokemonDetailsProps {
  pokemonDetails: Pokemon | null;
}

const RenderPokemonDetails = ({ pokemonDetails }: PokemonDetailsProps) => {
  return <div>height:{pokemonDetails?.height}</div>;
};

export default RenderPokemonDetails;
