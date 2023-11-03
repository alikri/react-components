import './App.css';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { PokemonDetails } from './components/pokemonDetails/PokemonDetails';
import { Home } from './pages/Home/Home';

//react=router imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App = () => {
  const onResetError = (): void => {
    console.clear();
  };

  return (
    <Router>
      <ErrorBoundary onResetError={onResetError}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":pokemonName" element={<PokemonDetails />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
