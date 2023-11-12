import './pokemonDetails.styles.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';

import pokemonApi from '../../api/apiClient';
import { Loader } from '../loader/Loader';
import RenderPokemonDetails from './RenderPokemonDetails';

export const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const actualPokemonName = pokemonName && pokemonName.replace('details-', '');

  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDetails = async () => {
      const nameToSearch = actualPokemonName && actualPokemonName.toLocaleLowerCase().trim();

      if (nameToSearch) {
        try {
          const [pokemonData, pokemonSpeciesData] = await Promise.all([
            pokemonApi.getPokemonByName(nameToSearch),
            pokemonApi.getPokemonDetails(nameToSearch),
          ]);

          setPokemonDetails(pokemonData);
          setPokemonSpecies(pokemonSpeciesData);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [actualPokemonName]);

  return (
    <>
      {' '}
      {loading ? <Loader /> : <RenderPokemonDetails pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} />}
      {!loading && !pokemonDetails && <div>Error fetching details or details not available.</div>}
    </>
  );
};
