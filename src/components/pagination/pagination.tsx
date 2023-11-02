import './pagination.styles.css';

interface PaginationProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

export const Pagination = ({ limit, onLimitChange }: PaginationProps) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <select value={limit} onChange={handleLimitChange}>
      <option value="10">10 items/page</option>
      <option value="20">20 items/page</option>
      <option value="50">50 items/page</option>
    </select>
  );
};
