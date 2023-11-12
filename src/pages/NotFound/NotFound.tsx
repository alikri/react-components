import './notFound.styles.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};
