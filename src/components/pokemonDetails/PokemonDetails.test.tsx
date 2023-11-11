import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { PokemonDetails } from './PokemonDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockedUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe('PokemonDetails Component', () => {
  it('displays the Loader component when loading', async () => {
    mockedUseParams.mockReturnValue({ pokemonName: 'details-bulbasaur' });

    render(
      <MemoryRouter>
        <PokemonDetails />
      </MemoryRouter>,
    );
  });

  it('should render Pokemon details after fetching data', async () => {
    render(
      <MemoryRouter>
        <PokemonDetails />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('custom-element')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
