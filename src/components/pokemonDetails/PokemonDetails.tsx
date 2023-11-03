import './pokemonDetails.styles.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';

import pokemonApi from '../../api/apiClient';
import { Loader } from '../loader/Loader';
import RenderPokemonDetails from './RenderPokemonDetails';

export const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const actualPokemonName = pokemonName && pokemonName.replace('details-', '');

  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const nameToSearch = actualPokemonName && actualPokemonName.toLocaleLowerCase().trim();

      if (nameToSearch) {
        try {
          const data = await pokemonApi.getPokemonByName(nameToSearch);
          setPokemonDetails(data);
          setLoading(false);
        } catch {
          setLoading(false);
          console.error('Failed to fetch Pokémon details.');
        }
      }
    };

    fetchDetails();
  }, [actualPokemonName]);

  return (
    <>
      {' '}
      {loading ? <Loader /> : <RenderPokemonDetails pokemonDetails={pokemonDetails} />}
      {!loading && !pokemonDetails && <div>Error fetching details or details not available.</div>}
    </>
  );
};
