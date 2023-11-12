import { PokemonDataContext } from '../../context/pokemonDataContext';
import './paginator.styles.css';

import { useContext } from 'react';

interface PaginatorProps {
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export const Paginator = ({ page, limit, onPageChange }: PaginatorProps) => {
  const { totalItems } = useContext(PokemonDataContext);
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="paginator">
      <section className="pagination-section">
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </section>
    </div>
  );
};
