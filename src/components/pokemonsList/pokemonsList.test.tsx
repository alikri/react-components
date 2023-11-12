import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonsList } from './PokemonsList';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PokemonsListComponent', () => {
  it('should display error message when pokemonRequestError is true', async () => {
    const requestErrors = {
      pokemonListRequestError: false,
      pokemonRequestError: true,
    };

    render(
      <MemoryRouter>
        <PokemonsList requestErrors={requestErrors} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Pokemon with this name does not exist')).toBeInTheDocument();
    });
  });

  it('should display error message when pokemonListRequestError is true', async () => {
    const requestErrors = {
      pokemonListRequestError: true,
      pokemonRequestError: false,
    };

    render(
      <MemoryRouter>
        <PokemonsList requestErrors={requestErrors} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch Pokemons list')).toBeInTheDocument();
    });
  });
});
