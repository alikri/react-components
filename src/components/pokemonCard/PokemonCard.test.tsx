import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';
import { RightSideContext } from '../../context/context';

const pokemon = {
  name: 'test name',
  image: 'test image',
  description: 'test description',
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRightSideContext = (rightSideValue: boolean, mockShowRightSide = jest.fn()) => {
  return render(
    <BrowserRouter>
      <RightSideContext.Provider
        value={{
          rightSide: rightSideValue,
          showRightSide: mockShowRightSide,
          hideRightSide: jest.fn(),
        }}
      >
        <PokemonCard pokemon={pokemon} />
      </RightSideContext.Provider>
    </BrowserRouter>,
  );
};

describe('CardTitle', () => {
  it('should display pokemon name', () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={pokemon} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/test name/i)).toBeInTheDocument();
  });

  it('should display the large card UI when rightSide is false', () => {
    renderWithRightSideContext(false);
    const image = screen.getByAltText(new RegExp(pokemon.name, 'i'));
    const pokemonCardDiv = image.closest('div');
    expect(pokemonCardDiv).toHaveClass('pokemon-card');
    expect(pokemonCardDiv).not.toHaveClass('pokemon-card-sm');
  });

  it('should display the small card UI when rightSide is true', () => {
    renderWithRightSideContext(true);
    const image = screen.getByAltText(new RegExp(pokemon.name, 'i'));
    const pokemonCardDiv = image.closest('div');
    expect(pokemonCardDiv).toHaveClass('pokemon-card-sm');
  });

  it('calls navigate and showRightSide on click', () => {
    const mockShowRightSide = jest.fn();

    renderWithRightSideContext(false, mockShowRightSide);

    const image = screen.getByAltText(new RegExp(pokemon.name, 'i'));
    const pokemonCardDiv = image.closest('div');
    if (pokemonCardDiv) {
      fireEvent.click(pokemonCardDiv);
    } else {
      throw new Error('Unable to find the Pokemon card div');
    }

    expect(mockNavigate).toHaveBeenCalledWith(`/details-${pokemon.name}${window.location.search}`);
    expect(mockShowRightSide).toHaveBeenCalled();
  });
});
