import './App.css';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { PokemonDetails } from './components/pokemonDetails/PokemonDetails';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound/NotFound';

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
