import './paginator.styles.css';

interface PaginatorProps {
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export const Paginator = ({ page, limit, totalItems, onPageChange, onLimitChange }: PaginatorProps) => {
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="paginator">
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>

      <div className="limit-selector">
        <label>Items per page:</label>
        <select
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};
