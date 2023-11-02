import './paginator.styles.css';
import { useState } from 'react';

interface PaginatorProps {
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export const Paginator = ({ page, limit, totalItems, onPageChange, onLimitChange }: PaginatorProps) => {
  const MAX_ITEMS_PER_PAGE = 100;
  const [inputValue, setInputValue] = useState<string>(String(limit));
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handleSubmit = () => {
    const newLimit = Number(inputValue);

    if (isNaN(newLimit) || !Number.isInteger(newLimit)) {
      setError('Please enter a valid number.');
      return;
    }

    if (newLimit < 1 || newLimit > MAX_ITEMS_PER_PAGE) {
      setError(`Please enter a number between 1 and ${MAX_ITEMS_PER_PAGE}`);
      return;
    }

    setError(null);
    onLimitChange(newLimit);
    onPageChange(1);
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
      <section className="limit-section">
        <div className="limit-selector">
          <label>Items per page:</label>
          <input
            className="limit-input"
            placeholder="enter the number from 1 to 100"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </section>
    </div>
  );
};
