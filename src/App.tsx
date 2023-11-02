import './App.css';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { Home } from './pages/Home/Home';

export const App = () => {
  const onResetError = (): void => {
    console.clear();
  };

  return (
    <ErrorBoundary onResetError={onResetError}>
      <Home />
    </ErrorBoundary>
  );
};

export default App;
