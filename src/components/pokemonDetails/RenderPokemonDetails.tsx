import { useContext } from 'react';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';

import { RightSideContext } from '../../context/rightSideContext';

import { capitalize } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

interface PokemonDetailsProps {
  pokemonDetails: Pokemon | null;
  pokemonSpecies: PokemonSpecies | null;
}

const RenderPokemonDetails = ({ pokemonDetails, pokemonSpecies }: PokemonDetailsProps) => {
  const navigate = useNavigate();

  const imageUrl = pokemonDetails && pokemonDetails.sprites.other?.['official-artwork']['front_default'];
  const pokemonNameToDisplay = pokemonDetails && capitalize(pokemonDetails.name);

  const context = useContext(RightSideContext);
  const { hideRightSide } = context;

  const navigateBack = () => {
    const currentSearchParams = window.location.search;
    navigate(`/${currentSearchParams}`);
  };

  const closeRightSection = () => {
    hideRightSide();
    navigateBack();
  };

  return (
    <div className="pokemon-details">
      <button className="close-button" onClick={closeRightSection}></button>
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
          <h3>Egg Group:</h3>
          <ul>
            {pokemonSpecies &&
              pokemonSpecies.egg_groups.map((group, index) => (
                <li key={`${index}${group.name}`}>{capitalize(group.name)}</li>
              ))}
          </ul>
        </div>
        <div className="body-container">
          <h3>Parameters:</h3>
          <ul>
            <li>Height: {pokemonDetails ? <span>{pokemonDetails.height}</span> : <span>Unknown</span>} cm.</li>
            <li>Weight: {pokemonDetails ? <span>{pokemonDetails.weight}</span> : <span>Unknown</span>} kg.</li>
          </ul>
        </div>
      </div>
      <div className="additional-info">
        <div className="additional-info-container">
          <h3>Additional Characteristics:</h3>
          <ul>
            <li>
              {' '}
              <span className="bold-text">color:</span>{' '}
              {pokemonSpecies ? <span>{pokemonSpecies.color.name}</span> : <span>Unknown</span>}
            </li>
            <li>
              <span className="bold-text">environment: </span>
              {pokemonSpecies ? <span> {pokemonSpecies.habitat.name}</span> : <span>Unknown</span>}
            </li>
            <li>
              <span className="bold-text">shape: </span>
              {pokemonSpecies ? <span> {pokemonSpecies.shape.name}</span> : <span>Unknown</span>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderPokemonDetails;
