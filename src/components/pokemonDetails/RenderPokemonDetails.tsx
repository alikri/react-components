import { Pokemon } from 'pokenode-ts';
import { capitalize } from '../../utils/utils';
import { useContext } from 'react';
import { RightSideContext } from '../../context/context';

interface PokemonDetailsProps {
  pokemonDetails: Pokemon | null;
}

const RenderPokemonDetails = ({ pokemonDetails }: PokemonDetailsProps) => {
  const imageUrl = pokemonDetails && pokemonDetails.sprites.other?.['official-artwork']['front_default'];
  const pokemonNameToDisplay = pokemonDetails && capitalize(pokemonDetails.name);

  const context = useContext(RightSideContext);
  const { hideRightSide } = context;

  const closeRightSection = () => {
    hideRightSide();
  };

  return (
    <div className="pokemon-details" onClick={closeRightSection}>
      <button className="close-button"></button>
      {imageUrl && <img src={imageUrl} alt={'pokemon abilities'} />}
      {pokemonDetails && <h2>{pokemonNameToDisplay}</h2>}
      <p>This is a great Pokemon with name {pokemonNameToDisplay} 👻</p>
      <div className="details">
        <div className="abilities-container">
          <h3>Abilities:</h3>
          <ul>
            {pokemonDetails &&
              pokemonDetails.abilities.map((ability, index) => (
                <li key={`${index}${ability.ability.name}`}>{capitalize(ability.ability.name)}</li>
              ))}
          </ul>
        </div>
        <div className="types-container">
          <h3>Types:</h3>
          <ul>
            {pokemonDetails &&
              pokemonDetails.types.map((typeObj, index) => (
                <li key={`${index}${typeObj.type.name}`}>{capitalize(typeObj.type.name)}</li>
              ))}
          </ul>
        </div>
        <div className="body-container">
          <h3>Characteristics:</h3>
          <ul>
            <li>Height: {pokemonDetails ? <span>{pokemonDetails.height}</span> : <span>Unknown</span>}</li>
            <li>Weight: {pokemonDetails ? <span>{pokemonDetails.weight}</span> : <span>Unknown</span>}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderPokemonDetails;
