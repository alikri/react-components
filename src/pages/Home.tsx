import { MainContent } from '../components/mainContent/MainContent';
import { PokemonDataProvider } from '../context/pokemonDataContext';
import { RightSideProvider } from '../context/rightSideContext';

export const Home = () => {
  return (
    <RightSideProvider>
      <PokemonDataProvider>
        <MainContent />
      </PokemonDataProvider>
    </RightSideProvider>
  );
};
