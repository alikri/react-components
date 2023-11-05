import './pageLimit.styles.css';
import { useState } from 'react';

import { MAX_ITEMS_PER_PAGE } from '../../constants/constants';

interface PageLimitProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
  onPageReset: () => void;
}

export const PageLimit = ({ limit, onLimitChange, onPageReset }: PageLimitProps) => {
  const [inputValue, setInputValue] = useState<string>(String(limit));
  const [error, setError] = useState<string | null>(null);

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
    onPageReset();
    onLimitChange(newLimit);
  };

  return (
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
  );
};
