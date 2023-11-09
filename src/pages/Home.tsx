import { MainContent } from '../components/mainContent/MainContent';
import { PokemonDataProvider } from '../context/pokemonDataContext';
import { RightSideProvider } from '../context/rightSideContext';
import { SearchProvider } from '../context/searchQueryContext';

export const Home = () => {
  return (
    <RightSideProvider>
      <PokemonDataProvider>
        <SearchProvider>
          <MainContent />
        </SearchProvider>
      </PokemonDataProvider>
    </RightSideProvider>
  );
};
